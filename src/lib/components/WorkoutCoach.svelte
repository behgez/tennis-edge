<script lang="ts">
	import { audioManager } from '$lib/stores/audio.svelte';

	let {
		exercises,
		title,
		totalDuration = 300
	}: {
		exercises: { name: string; instruction: string; type: 'reps' | 'timed'; reps?: number; seconds?: number }[];
		title: string;
		totalDuration?: number;
	} = $props();

	let currentIndex = $state(0);
	let phase = $state<'idle' | 'explain' | 'active' | 'rest' | 'done'>('idle');
	let countdown = $state(0);
	let repCount = $state(0);
	let elapsedTotal = $state(0);
	let isPaused = $state(false);
	let isSpeaking = $state(false);
	let totalTimerId: ReturnType<typeof setInterval> | null = null;
	let countdownId: ReturnType<typeof setInterval> | null = null;
	let cancelled = false;
	let pauseResolve: (() => void) | null = null;

	let currentExercise = $derived(exercises[currentIndex]);
	let cachedVoice: SpeechSynthesisVoice | null = null;

	// Pre-load voice on mount
	$effect(() => {
		if (typeof window !== 'undefined' && window.speechSynthesis) {
			const pick = () => {
				const voices = window.speechSynthesis.getVoices();
				cachedVoice = voices.find(v => v.lang.startsWith('en') && v.name.includes('Samantha'))
					?? voices.find(v => v.lang.startsWith('en') && !v.localService)
					?? voices.find(v => v.lang.startsWith('en'))
					?? null;
			};
			pick();
			if (!cachedVoice) {
				window.speechSynthesis.addEventListener('voiceschanged', pick, { once: true });
			}
		}
	});
	let progressPct = $derived(exercises.length > 0 ? (currentIndex / exercises.length) * 100 : 0);
	let timeStr = $derived(() => {
		const r = Math.max(0, totalDuration - elapsedTotal);
		return `${Math.floor(r / 60)}:${String(r % 60).padStart(2, '0')}`;
	});

	// Wait until unpaused
	function waitForUnpause(): Promise<void> {
		return new Promise((resolve) => {
			if (!isPaused || cancelled) { resolve(); return; }
			const check = setInterval(() => {
				if (!isPaused || cancelled) { clearInterval(check); resolve(); }
			}, 200);
		});
	}

	// --- Speech ---
	function speak(text: string, rate = 0.9): Promise<void> {
		return new Promise(async (resolve) => {
			if (cancelled) { resolve(); return; }
			if (isPaused) await waitForUnpause();
			if (cancelled) { resolve(); return; }
			if (typeof window === 'undefined' || !window.speechSynthesis) { resolve(); return; }
			window.speechSynthesis.cancel();
			const u = new SpeechSynthesisUtterance(text);
			u.rate = rate;
			u.pitch = 0.95;
			u.volume = 0.9;
			u.lang = 'en-US';
			if (cachedVoice) {
				u.voice = cachedVoice;
			} else {
				const voices = window.speechSynthesis.getVoices();
				const picked = voices.find(v => v.lang.startsWith('en') && v.name.includes('Samantha'))
					?? voices.find(v => v.lang.startsWith('en') && !v.localService)
					?? voices.find(v => v.lang.startsWith('en'));
				if (picked) { u.voice = picked; cachedVoice = picked; }
			}
			isSpeaking = true;
			u.onend = () => { isSpeaking = false; resolve(); };
			u.onerror = () => { isSpeaking = false; resolve(); };
			window.speechSynthesis.speak(u);
			const ka = setInterval(() => {
				if (!isSpeaking) { clearInterval(ka); return; }
				window.speechSynthesis.pause();
				window.speechSynthesis.resume();
			}, 10000);
		});
	}

	function wait(ms: number): Promise<void> {
		return new Promise((resolve) => {
			if (cancelled) { resolve(); return; }
			const id = setTimeout(resolve, ms);
			// Allow cancellation to resolve early
			const check = setInterval(() => {
				if (cancelled) { clearTimeout(id); clearInterval(check); resolve(); }
			}, 100);
			setTimeout(() => clearInterval(check), ms + 100);
		});
	}

	// Pause-aware wait: pauses the countdown when isPaused is true
	function waitPauseable(ms: number): Promise<void> {
		return new Promise((resolve) => {
			if (cancelled) { resolve(); return; }
			let remaining = ms;
			const interval = setInterval(() => {
				if (cancelled) { clearInterval(interval); resolve(); return; }
				if (!isPaused) {
					remaining -= 100;
					if (remaining <= 0) { clearInterval(interval); resolve(); }
				}
			}, 100);
		});
	}

	// --- Controls ---
	async function startWorkout(): Promise<void> {
		cancelled = false;
		currentIndex = 0;
		elapsedTotal = 0;
		isPaused = false;
		phase = 'explain';
		audioManager.register({ type: 'workout', title, stop: stopWorkout });
		// Warm up speech engine with silent utterance to ensure voice is ready
		if (window.speechSynthesis) {
			if (!cachedVoice) {
				const voices = window.speechSynthesis.getVoices();
				cachedVoice = voices.find(v => v.lang.startsWith('en') && v.name.includes('Samantha'))
					?? voices.find(v => v.lang.startsWith('en') && !v.localService)
					?? voices.find(v => v.lang.startsWith('en')) ?? null;
			}
			const warmup = new SpeechSynthesisUtterance('');
			warmup.volume = 0;
			if (cachedVoice) warmup.voice = cachedVoice;
			window.speechSynthesis.speak(warmup);
			await new Promise(r => setTimeout(r, 250));
		}
		startTotalTimer();
		runWorkout();
	}

	function togglePause(): void {
		if (isPaused) {
			isPaused = false;
		} else {
			isPaused = true;
			// Cancel any in-progress speech immediately — it'll resume from the right point via the loop
			if (typeof window !== 'undefined' && window.speechSynthesis) {
				window.speechSynthesis.cancel();
			}
			isSpeaking = false;
		}
	}

	function stopWorkout(): void {
		cancelled = true;
		isPaused = false;
		phase = 'idle';
		isSpeaking = false;
		if (typeof window !== 'undefined' && window.speechSynthesis) window.speechSynthesis.cancel();
		if (totalTimerId) { clearInterval(totalTimerId); totalTimerId = null; }
		if (countdownId) { clearInterval(countdownId); countdownId = null; }
		audioManager.unregister();
	}

	function startTotalTimer(): void {
		if (totalTimerId) clearInterval(totalTimerId);
		totalTimerId = setInterval(() => { if (!isPaused && !cancelled) elapsedTotal++; }, 1000);
	}

	// --- Main workout loop ---
	async function runWorkout(): Promise<void> {
		for (let i = 0; i < exercises.length; i++) {
			if (cancelled) return;
			currentIndex = i;
			const ex = exercises[i];

			// EXPLAIN phase
			phase = 'explain';
			await speak(`Exercise ${i + 1} of ${exercises.length}.`);
			if (cancelled) return;
			await speak(ex.name, 0.85);
			if (cancelled) return;
			await wait(500);
			// Explain how to do it
			await speak(ex.instruction, 0.8);
			if (cancelled) return;
			await wait(800);

			if (ex.type === 'timed') {
				const secs = ex.seconds ?? 30;
				await speak(`${secs} seconds. Get ready.`, 0.9);
				if (cancelled) return;
				await wait(1500);
				await speak('Go!', 1.0);
				phase = 'active';

				// Countdown
				countdown = secs;
				for (let s = secs; s > 0; s--) {
					if (cancelled) return;
					countdown = s;
					// Voice cues at key moments
					if (s === Math.floor(secs / 2) && secs > 10) {
						speak('Halfway. Keep it up.', 0.95);
					} else if (s === 10 && secs > 15) {
						speak('Ten seconds.', 1.0);
					} else if (s === 5) {
						speak('Five.', 1.0);
					} else if (s === 3) {
						speak('Three.', 1.0);
					} else if (s === 2) {
						speak('Two.', 1.0);
					} else if (s === 1) {
						speak('One.', 1.0);
					}
					await waitPauseable(1000);
				}
				countdown = 0;
				if (cancelled) return;
				await speak('Done. Nice work!', 0.95);

			} else {
				const reps = ex.reps ?? 15;
				await speak(`${reps} reps. Nice and controlled. Let's go.`, 0.9);
				if (cancelled) return;
				phase = 'active';
				repCount = 0;

				// Count reps at ~2.5 second pace
				for (let r = 1; r <= reps; r++) {
					if (cancelled) return;
					repCount = r;
					// Voice at key moments
					if (r <= 3) {
						speak(`${r}`, 1.0);
					} else if (r === Math.floor(reps / 2)) {
						speak(`${r}. Halfway. Good form.`, 0.95);
					} else if (r === reps - 2) {
						speak('Almost there.', 0.95);
					} else if (r === reps) {
						speak(`${r}. Done!`, 1.0);
					}
					await waitPauseable(2500);
				}
				if (cancelled) return;
				await speak('Well done.', 0.95);
			}

			// Rest between exercises (not after last)
			if (i < exercises.length - 1) {
				if (cancelled) return;
				phase = 'rest';
				await speak('Rest. Take a breath.', 0.85);
				await waitPauseable(4000);
				if (cancelled) return;
				await speak('Next exercise.', 0.9);
				await waitPauseable(1500);
			}
		}

		if (cancelled) return;
		phase = 'done';
		if (totalTimerId) { clearInterval(totalTimerId); totalTimerId = null; }
		await speak('Workout complete. Great job!', 0.85);
	}

	$effect(() => { return () => stopWorkout(); });
</script>

<div class="glass-card overflow-hidden">
	<!-- Header -->
	<div class="p-4 border-b border-white/5">
		<div class="flex items-center justify-between">
			<div class="flex items-center gap-3">
				<div class="w-9 h-9 rounded-lg bg-accent-orange/15 flex items-center justify-center">
					<svg class="w-5 h-5 text-accent-orange" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
					</svg>
				</div>
				<div>
					<h3 class="text-sm font-semibold text-text-primary">{title}</h3>
					<p class="text-xs text-text-muted">
						{#if phase === 'idle'}
							{exercises.length} exercises
						{:else if phase === 'done'}
							Complete!
						{:else}
							{currentIndex + 1}/{exercises.length} &middot; {timeStr()} left
						{/if}
					</p>
				</div>
			</div>
			{#if isSpeaking}
				<div class="flex items-end gap-0.5 h-4">
					<span class="w-1 rounded-full bg-accent-orange" style="animation: bar 0.8s ease-in-out infinite; height: 40%"></span>
					<span class="w-1 rounded-full bg-accent-orange" style="animation: bar 0.8s ease-in-out 0.1s infinite; height: 80%"></span>
					<span class="w-1 rounded-full bg-accent-orange" style="animation: bar 0.8s ease-in-out 0.2s infinite; height: 60%"></span>
				</div>
			{/if}
		</div>
		{#if phase !== 'idle'}
			<div class="progress-bar mt-3">
				<div class="progress-bar-fill bg-accent-orange transition-all duration-500" style="width: {progressPct}%"></div>
			</div>
		{/if}
	</div>

	<div class="p-4">
		{#if phase === 'idle'}
			<!-- Start screen with exercise list -->
			<div class="space-y-3 mb-4">
				{#each exercises as ex, i}
					<div class="flex items-start gap-2.5 text-sm">
						<span class="w-6 h-6 rounded-full bg-surface-lighter flex items-center justify-center text-xs font-bold text-text-muted flex-shrink-0 mt-0.5">{i + 1}</span>
						<div class="flex-1 min-w-0">
							<div class="flex items-center gap-2">
								<span class="font-medium text-text-primary">{ex.name}</span>
								<span class="text-text-muted">— {ex.type === 'timed' ? `${ex.seconds}s` : `${ex.reps} reps`}</span>
								<a
									href="https://www.youtube.com/results?search_query={encodeURIComponent(ex.name + ' exercise form')}"
									target="_blank"
									rel="noopener noreferrer"
									class="flex items-center gap-0.5 text-accent-red text-[10px] hover:underline ml-auto flex-shrink-0"
								>
									<svg class="w-3 h-3" viewBox="0 0 24 24" fill="currentColor"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
									video
								</a>
							</div>
							<p class="text-xs text-text-muted mt-0.5">{ex.instruction}</p>
						</div>
					</div>
				{/each}
			</div>
			<div class="text-center">
				<button onclick={startWorkout}
					class="px-6 py-3 rounded-xl bg-accent-orange text-white font-bold text-sm shadow-lg shadow-accent-orange/20 hover:scale-105 transition-transform flex items-center gap-2 mx-auto">
					<svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
					Start Guided Workout
				</button>
				<p class="text-xs text-text-muted mt-2">Voice will explain each exercise, count reps, and time holds</p>
			</div>

		{:else if phase === 'done'}
			<div class="text-center py-6 animate-slide-up">
				<div class="w-14 h-14 mx-auto mb-3 rounded-full bg-success/15 flex items-center justify-center">
					<svg class="w-7 h-7 text-success" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
				</div>
				<h4 class="text-lg font-bold text-text-primary">Workout Complete!</h4>
				<p class="text-sm text-text-secondary mt-1">{exercises.length} exercises in {Math.floor(elapsedTotal / 60)}:{String(elapsedTotal % 60).padStart(2, '0')}</p>
				<button onclick={() => { phase = 'idle'; }} class="mt-4 px-4 py-2 rounded-lg bg-surface-light text-text-secondary text-sm hover:bg-surface-lighter transition-colors">
					Close
				</button>
			</div>

		{:else}
			<!-- Active workout: two-panel layout -->
			<div class="space-y-4">

				<!-- TOP: Exercise reference panel (always visible) -->
				<div class="bg-surface-card/50 rounded-lg p-3 border border-white/5">
					<h4 class="text-[10px] font-semibold text-text-muted uppercase tracking-wider mb-2">Today's Exercises — tap any for video</h4>
					<div class="flex flex-wrap gap-1.5">
						{#each exercises as ex, i}
							{@const isCurrentEx = i === currentIndex}
							{@const isDoneEx = i < currentIndex}
							<a
								href="https://www.youtube.com/results?search_query={encodeURIComponent(ex.name + ' exercise form how to')}"
								target="_blank"
								rel="noopener noreferrer"
								class="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs transition-all
									{isCurrentEx ? 'bg-accent-orange/20 text-accent-orange border border-accent-orange/30 font-bold' :
									 isDoneEx ? 'bg-success/10 text-success/70 line-through' :
									 'bg-surface-lighter text-text-muted hover:bg-surface-light hover:text-text-secondary'}"
							>
								<span class="w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold flex-shrink-0
									{isCurrentEx ? 'bg-accent-orange text-white' : isDoneEx ? 'bg-success/30 text-success' : 'bg-surface-light text-text-muted'}">
									{#if isDoneEx}
										<svg class="w-2.5 h-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>
									{:else}
										{i + 1}
									{/if}
								</span>
								{ex.name}
								<svg class="w-2.5 h-2.5 text-accent-red flex-shrink-0" viewBox="0 0 24 24" fill="currentColor"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
							</a>
						{/each}
					</div>
				</div>

				<!-- MIDDLE: Current exercise display -->
				<div class="text-center space-y-3">
					<!-- Phase label -->
					<p class="text-xs font-semibold uppercase tracking-wider
						{phase === 'explain' ? 'text-accent-blue' : phase === 'active' ? 'text-accent-orange' : 'text-court-green'}">
						{phase === 'explain' ? 'Get Ready' : phase === 'active' ? 'Go!' : 'Rest'}
					</p>

					<!-- Exercise name + video link -->
					<div class="flex items-center justify-center gap-2">
						<h4 class="text-xl font-bold text-text-primary">{currentExercise?.name ?? ''}</h4>
						<a
							href="https://www.youtube.com/results?search_query={encodeURIComponent((currentExercise?.name ?? '') + ' exercise form how to')}"
							target="_blank"
							rel="noopener noreferrer"
							class="flex items-center gap-1 px-2 py-1 rounded bg-accent-red/10 text-accent-red text-xs hover:bg-accent-red/20 transition-colors flex-shrink-0"
						>
							<svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
							How to
						</a>
					</div>

					<!-- Instruction text (always visible) -->
					<p class="text-sm text-text-secondary leading-relaxed px-2">{currentExercise?.instruction ?? ''}</p>

					{#if phase === 'explain'}
						<div class="flex items-center justify-center gap-2">
							<div class="w-2 h-2 rounded-full bg-accent-blue animate-pulse"></div>
							<span class="text-xs text-accent-blue">Listening to instructions...</span>
						</div>
					{/if}

					<!-- Counter display -->
					{#if phase === 'active'}
						{#if currentExercise?.type === 'timed'}
							<div class="relative w-28 h-28 mx-auto">
								<svg class="w-full h-full -rotate-90" viewBox="0 0 36 36">
									<circle cx="18" cy="18" r="15.5" fill="none" stroke="#242b3d" stroke-width="3"/>
									<circle cx="18" cy="18" r="15.5" fill="none" stroke="#fb923c" stroke-width="3"
										stroke-dasharray="{(countdown / (currentExercise.seconds ?? 30)) * 97.4} 97.4"
										stroke-linecap="round" class="transition-all duration-1000"/>
								</svg>
								<div class="absolute inset-0 flex flex-col items-center justify-center">
									<span class="text-3xl font-bold text-accent-orange tabular-nums">{countdown}</span>
									<span class="text-[10px] text-text-muted">seconds</span>
								</div>
							</div>
						{:else}
							<div>
								<span class="text-4xl font-extrabold text-ball-yellow tabular-nums">{repCount}</span>
								<span class="text-lg text-text-muted">/{currentExercise?.reps ?? 0}</span>
							</div>
						{/if}
					{/if}

					{#if phase === 'rest'}
						<div class="py-3">
							<div class="w-12 h-12 mx-auto rounded-full bg-court-green/15 flex items-center justify-center animate-pulse">
								<svg class="w-6 h-6 text-court-green" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
									<path d="M4.93 4.93a10 10 0 1014.14 0"/><path d="M12 2v4"/>
								</svg>
							</div>
							<p class="text-xs text-court-green mt-1">Rest — take a breath</p>
						</div>
					{/if}
				</div>

				<!-- BOTTOM: Controls -->
				<div class="flex items-center justify-center gap-3">
					<button onclick={togglePause}
						class="px-5 py-2 rounded-lg font-semibold text-sm transition-all
							{isPaused ? 'bg-ball-yellow text-surface-card' : 'bg-surface-lighter text-text-secondary hover:bg-surface-light'}">
						{isPaused ? '▶ Resume' : '⏸ Pause'}
					</button>
					<button onclick={stopWorkout}
						class="px-5 py-2 rounded-lg bg-accent-red/15 text-accent-red font-semibold text-sm hover:bg-accent-red/25 transition-all">
						■ Stop
					</button>
				</div>
				{#if isPaused}
					<p class="text-xs text-ball-yellow animate-pulse text-center">Paused</p>
				{/if}
			</div>
		{/if}
	</div>
</div>

<style>
	@keyframes bar {
		0%, 100% { height: 20%; }
		50% { height: 100%; }
	}
</style>
