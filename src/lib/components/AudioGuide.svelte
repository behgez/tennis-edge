<script lang="ts">
	import { audioManager } from '$lib/stores/audio.svelte';

	let {
		steps,
		title,
		pauseBetweenSteps = 3,
		autoPlay = false
	}: {
		steps: string[];
		title: string;
		pauseBetweenSteps?: number;
		autoPlay?: boolean;
	} = $props();

	let currentStep = $state(0);
	let isPlaying = $state(false);
	let isSpeaking = $state(false);
	let isComplete = $state(false);
	let speed = $state(1);
	let volume = $state(0.8);
	let completedSteps = $state<Set<number>>(new Set());
	let speechSupported = $state(false);
	let pauseTimeoutId: ReturnType<typeof setTimeout> | null = null;
	let keepAliveId: ReturnType<typeof setInterval> | null = null;
	let hasInteracted = $state(false);
	let audioGuideVoice: SpeechSynthesisVoice | null = null;

	const speeds = [0.7, 0.8, 0.9, 1, 1.1];

	let progress = $derived(steps.length > 0 ? ((currentStep + 1) / steps.length) * 100 : 0);
	let currentText = $derived(steps[currentStep] ?? '');

	$effect(() => {
		if (typeof window !== 'undefined') {
			speechSupported = 'speechSynthesis' in window;
			// Pre-load voices
			if (speechSupported) {
				window.speechSynthesis.getVoices();
			}
		}
		return () => cleanup();
	});

	function cleanup(): void {
		if (typeof window !== 'undefined' && window.speechSynthesis) {
			window.speechSynthesis.cancel();
		}
		if (pauseTimeoutId !== null) { clearTimeout(pauseTimeoutId); pauseTimeoutId = null; }
		if (keepAliveId !== null) { clearInterval(keepAliveId); keepAliveId = null; }
	}

	function speak(text: string): void {
		if (!speechSupported || typeof window === 'undefined') return;

		window.speechSynthesis.cancel();
		if (keepAliveId !== null) { clearInterval(keepAliveId); keepAliveId = null; }

		const utterance = new SpeechSynthesisUtterance(text);
		utterance.rate = speed;
		utterance.volume = volume;
		utterance.lang = 'en-US';

		// Pick a good voice
		// Cache voice on first use
		if (!audioGuideVoice) {
			const voices = window.speechSynthesis.getVoices();
			audioGuideVoice = voices.find(v => v.lang.startsWith('en') && v.name.includes('Samantha'))
				?? voices.find(v => v.lang.startsWith('en') && !v.localService)
				?? voices.find(v => v.lang.startsWith('en')) ?? null;
		}
		if (audioGuideVoice) utterance.voice = audioGuideVoice;

		isSpeaking = true;

		utterance.onend = () => {
			isSpeaking = false;
			if (keepAliveId !== null) { clearInterval(keepAliveId); keepAliveId = null; }
			if (!isPlaying) return;

			const next = new Set(completedSteps);
			next.add(currentStep);
			completedSteps = next;

			if (currentStep < steps.length - 1) {
				pauseTimeoutId = setTimeout(() => {
					pauseTimeoutId = null;
					if (!isPlaying) return;
					currentStep++;
					speak(steps[currentStep]);
				}, pauseBetweenSteps * 1000);
			} else {
				isPlaying = false;
				isComplete = true;
			}
		};

		utterance.onerror = () => {
			isSpeaking = false;
			if (keepAliveId !== null) { clearInterval(keepAliveId); keepAliveId = null; }
		};

		window.speechSynthesis.speak(utterance);

		// Chrome workaround: speech pauses after ~15s. Keep poking it.
		keepAliveId = setInterval(() => {
			if (!isSpeaking) { clearInterval(keepAliveId!); keepAliveId = null; return; }
			window.speechSynthesis.pause();
			window.speechSynthesis.resume();
		}, 10000);
	}

	function play(): void {
		if (!speechSupported) return;
		hasInteracted = true;
		if (isComplete) {
			currentStep = 0;
			completedSteps = new Set();
			isComplete = false;
		}
		isPlaying = true;
		audioManager.register({ type: 'audio', title, stop });
		speak(steps[currentStep]);
	}

	function pause(): void {
		isPlaying = false;
		isSpeaking = false;
		if (typeof window !== 'undefined' && window.speechSynthesis) {
			window.speechSynthesis.cancel();
		}
		if (pauseTimeoutId !== null) { clearTimeout(pauseTimeoutId); pauseTimeoutId = null; }
		if (keepAliveId !== null) { clearInterval(keepAliveId); keepAliveId = null; }
	}

	function stop(): void {
		pause();
		currentStep = 0;
		completedSteps = new Set();
		isComplete = false;
		audioManager.unregister();
	}

	function nextStep(): void {
		if (currentStep >= steps.length - 1) return;
		const next = new Set(completedSteps);
		next.add(currentStep);
		completedSteps = next;
		if (typeof window !== 'undefined' && window.speechSynthesis) window.speechSynthesis.cancel();
		if (pauseTimeoutId !== null) { clearTimeout(pauseTimeoutId); pauseTimeoutId = null; }
		currentStep++;
		if (isPlaying) speak(steps[currentStep]);
	}

	function previousStep(): void {
		if (currentStep <= 0) return;
		if (typeof window !== 'undefined' && window.speechSynthesis) window.speechSynthesis.cancel();
		if (pauseTimeoutId !== null) { clearTimeout(pauseTimeoutId); pauseTimeoutId = null; }
		currentStep--;
		if (isPlaying) speak(steps[currentStep]);
	}

	function goToStep(index: number): void {
		if (typeof window !== 'undefined' && window.speechSynthesis) window.speechSynthesis.cancel();
		if (pauseTimeoutId !== null) { clearTimeout(pauseTimeoutId); pauseTimeoutId = null; }
		currentStep = index;
		if (isPlaying) speak(steps[currentStep]);
	}

	function cycleSpeed(): void {
		const idx = speeds.indexOf(speed);
		speed = speeds[(idx + 1) % speeds.length];
	}
</script>

<div class="glass-card overflow-hidden">
	<!-- Header -->
	<div class="p-4 pb-3 border-b border-white/5">
		<div class="flex items-center justify-between mb-3">
			<div class="flex items-center gap-3">
				<div class="w-9 h-9 rounded-lg bg-ball-yellow/15 flex items-center justify-center">
					<svg class="w-5 h-5 text-ball-yellow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
						<path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z"/>
						<path d="M19 10v2a7 7 0 01-14 0v-2"/>
						<line x1="12" y1="19" x2="12" y2="23"/>
						<line x1="8" y1="23" x2="16" y2="23"/>
					</svg>
				</div>
				<div>
					<h3 class="text-sm font-semibold text-text-primary">{title}</h3>
					<p class="text-xs text-text-muted">
						{#if !speechSupported}
							Speech not supported in this browser
						{:else}
							Step {currentStep + 1} of {steps.length}
						{/if}
					</p>
				</div>
			</div>

			{#if isSpeaking}
				<div class="flex items-center gap-1.5">
					<div class="flex items-end gap-0.5 h-4">
						<span class="w-1 bg-ball-yellow rounded-full" style="animation: bar 0.8s ease-in-out infinite; height: 40%"></span>
						<span class="w-1 bg-ball-yellow rounded-full" style="animation: bar 0.8s ease-in-out 0.1s infinite; height: 80%"></span>
						<span class="w-1 bg-ball-yellow rounded-full" style="animation: bar 0.8s ease-in-out 0.2s infinite; height: 60%"></span>
						<span class="w-1 bg-ball-yellow rounded-full" style="animation: bar 0.8s ease-in-out 0.3s infinite; height: 30%"></span>
					</div>
					<span class="text-xs text-ball-yellow font-medium">Speaking</span>
				</div>
			{/if}
		</div>

		<div class="progress-bar">
			<div class="progress-bar-fill {isComplete ? 'bg-success' : 'bg-ball-yellow'}" style="width: {progress}%"></div>
		</div>
	</div>

	<!-- Content -->
	<div class="p-4">
		{#if isComplete}
			<div class="text-center py-6 animate-slide-up">
				<div class="w-14 h-14 mx-auto mb-3 rounded-full bg-success/15 flex items-center justify-center">
					<svg class="w-7 h-7 text-success" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="20 6 9 17 4 12"/></svg>
				</div>
				<h4 class="text-lg font-bold text-text-primary mb-1">Session Complete!</h4>
				<p class="text-sm text-text-secondary mb-4">Great work on all {steps.length} steps.</p>
				<button onclick={stop} class="px-4 py-2 rounded-lg bg-ball-yellow/15 text-ball-yellow text-sm font-semibold hover:bg-ball-yellow/25 transition-colors">
					Start Again
				</button>
			</div>
		{:else if !hasInteracted}
			<!-- Big play button for first interaction (needed for browser audio permission) -->
			<div class="text-center py-6">
				<p class="text-base font-medium text-text-primary mb-2">"{currentText}"</p>
				<p class="text-xs text-text-muted mb-5">Tap play to start the audio-guided session</p>
				<button
					onclick={play}
					disabled={!speechSupported}
					class="w-20 h-20 mx-auto rounded-full bg-ball-yellow text-surface-card flex items-center justify-center shadow-lg shadow-ball-yellow/20 hover:scale-105 transition-transform disabled:opacity-30"
					aria-label="Play"
				>
					<svg class="w-10 h-10 ml-1" viewBox="0 0 24 24" fill="currentColor">
						<polygon points="5 3 19 12 5 21 5 3"/>
					</svg>
				</button>
				{#if !speechSupported}
					<p class="text-xs text-accent-red mt-3">Your browser does not support text-to-speech.</p>
				{/if}
			</div>
		{:else}
			<!-- Active step -->
			<div class="min-h-[60px] flex items-center justify-center mb-4">
				<p class="text-center text-lg font-medium text-text-primary leading-relaxed px-2">
					"{currentText}"
				</p>
			</div>

			<!-- Playback controls -->
			<div class="flex items-center justify-center gap-3 mb-4">
				<button onclick={previousStep} disabled={currentStep === 0} aria-label="Previous step"
					class="w-10 h-10 rounded-full bg-surface-light flex items-center justify-center text-text-muted hover:text-text-primary transition-colors disabled:opacity-30">
					<svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/></svg>
				</button>

				<button onclick={stop} aria-label="Stop"
					class="w-10 h-10 rounded-full bg-surface-light flex items-center justify-center text-text-muted hover:text-accent-red transition-colors">
					<svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="6" width="12" height="12" rx="1"/></svg>
				</button>

				<button
					onclick={() => isPlaying ? pause() : play()}
					disabled={!speechSupported}
					class="w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all
						{isPlaying ? 'bg-accent-orange text-surface shadow-accent-orange/20' : 'bg-ball-yellow text-surface-card shadow-ball-yellow/20'}
						disabled:opacity-30"
					aria-label={isPlaying ? 'Pause' : 'Play'}
				>
					{#if isPlaying}
						<svg class="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/></svg>
					{:else}
						<svg class="w-6 h-6 ml-0.5" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
					{/if}
				</button>

				<button onclick={nextStep} disabled={currentStep >= steps.length - 1} aria-label="Next step"
					class="w-10 h-10 rounded-full bg-surface-light flex items-center justify-center text-text-muted hover:text-text-primary transition-colors disabled:opacity-30">
					<svg class="w-5 h-5 rotate-180" viewBox="0 0 24 24" fill="currentColor"><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/></svg>
				</button>

				<button onclick={cycleSpeed} aria-label="Change speed"
					class="w-10 h-10 rounded-full bg-surface-light flex items-center justify-center text-text-secondary text-xs font-bold hover:bg-surface-lighter transition-colors">
					{speed}x
				</button>
			</div>

			<!-- Volume -->
			<div class="flex items-center gap-2 justify-center mb-4">
				<svg class="w-4 h-4 text-text-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
					<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
					<path d="M15.54 8.46a5 5 0 010 7.07"/>
				</svg>
				<input type="range" min="0" max="1" step="0.1" bind:value={volume} class="w-32 accent-[#ccff00]" aria-label="Volume" />
			</div>
		{/if}
	</div>

	<!-- Step list (always visible) -->
	{#if !isComplete}
		<div class="border-t border-white/5 p-4 max-h-[240px] overflow-y-auto">
			<h4 class="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">All Steps</h4>
			<ol class="space-y-1">
				{#each steps as step, i}
					{@const isActive = i === currentStep}
					{@const isDone = completedSteps.has(i)}
					<li>
						<button
							onclick={() => { hasInteracted = true; goToStep(i); if (!isPlaying) play(); }}
							class="w-full flex items-start gap-2 px-2 py-1.5 rounded-lg text-left text-xs transition-all
								{isActive ? 'bg-ball-yellow/10 border border-ball-yellow/20' : isDone ? 'bg-success/5' : 'hover:bg-surface-light'}"
						>
							<span class="flex-shrink-0 w-5 h-5 mt-0.5 rounded-full flex items-center justify-center text-[10px] font-bold
								{isActive ? 'bg-ball-yellow text-surface-card' : isDone ? 'bg-success text-white' : 'bg-surface-lighter text-text-muted'}">
								{#if isDone}
									<svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>
								{:else}
									{i + 1}
								{/if}
							</span>
							<span class="flex-1 leading-snug {isActive ? 'text-text-primary font-medium' : isDone ? 'text-text-muted line-through' : 'text-text-secondary'}">
								{step}
							</span>
						</button>
					</li>
				{/each}
			</ol>
		</div>
	{/if}
</div>

<style>
	@keyframes bar {
		0%, 100% { height: 20%; }
		50% { height: 100%; }
	}
</style>
