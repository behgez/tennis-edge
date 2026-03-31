<script lang="ts">
	import { audioManager } from '$lib/stores/audio.svelte';
	import { enableScreenWake, disableScreenWake } from '$lib/utils/screen-wake';

	let {
		type = 'daily',
		duration = 10,
		autoOpen = false,
		onclose
	}: {
		type?: 'pre-match' | 'daily' | 'post-error' | 'pressure';
		duration?: number;
		autoOpen?: boolean;
		onclose?: () => void;
	} = $props();

	let isOpen = $state(false);
	let elapsedSeconds = $state(0);
	let totalSeconds = $derived(duration * 60);
	let timerInterval: ReturnType<typeof setInterval> | null = null;
	let binauralEnabled = $state(true);
	let audioCtx: AudioContext | null = null;
	let currentStepIndex = $state(0);
	let isSpeaking = $state(false);
	let isPaused = $state(false);
	let hasStarted = $state(false);
	let breathPhase = $state<'inhale' | 'hold' | 'exhale' | 'rest'>('rest');
	let breathTimer: ReturnType<typeof setTimeout> | null = null;
	let speechWatchdogId: ReturnType<typeof setTimeout> | null = null;
	let pauseExpectedEnd = 0;
	let sessionStartWall = 0;
	let totalPausedMs = 0;
	let pauseBeganAt = 0;

	// Each step has text + pause configuration
	// fixed: true → pauseAfter is used as-is (breathing, transitions)
	// fixed: false/absent → pauseAfter is a relative weight, scaled to fill remaining time
	// breathe: which phase to show in the breathing circle during this step
	interface VizStep { text: string; pauseAfter: number; breathe?: 'inhale' | 'hold' | 'exhale'; fixed?: boolean }

	const scripts: Record<string, VizStep[]> = {
		'pre-match': [
			// Opening & breathing — fixed short pauses
			{ text: 'Find a quiet space. Close your eyes.', pauseAfter: 4, fixed: true },
			{ text: 'Take a deep breath in through your nose.', pauseAfter: 5, breathe: 'inhale', fixed: true },
			{ text: 'Hold.', pauseAfter: 3, breathe: 'hold', fixed: true },
			{ text: 'And slowly breathe out through your mouth.', pauseAfter: 5, breathe: 'exhale', fixed: true },
			{ text: 'Again. Breathe in deeply.', pauseAfter: 5, breathe: 'inhale', fixed: true },
			{ text: 'Hold.', pauseAfter: 3, breathe: 'hold', fixed: true },
			{ text: 'And let it go.', pauseAfter: 5, breathe: 'exhale', fixed: true },
			// Visualization — scaled, weighted by imagery complexity
			{ text: 'Now picture the tennis court. See the clay surface. The white lines. The net.', pauseAfter: 10 },
			{ text: 'Feel the racquet in your hand. Notice its weight. The grip texture under your fingers.', pauseAfter: 8 },
			{ text: 'Imagine your warm-up. Your body is moving. Loose. Ready. Light on your feet.', pauseAfter: 8 },
			{ text: 'See yourself hitting your forehand. The unit turn. The ball connects perfectly with the sweet spot. Deep to the corner.', pauseAfter: 10 },
			{ text: 'Now your backhand. Feel the coil. The drop. You drive through the ball with confidence.', pauseAfter: 9 },
			{ text: 'Visualize your serve. The toss goes up perfectly. You swing through with full commitment. It lands exactly where you aimed.', pauseAfter: 10 },
			{ text: 'See yourself approaching the net. A short ball comes. You move forward. Hit deep down the line. Split step. Clean volley. Point won.', pauseAfter: 12 },
			{ text: 'Now imagine a pressure moment. It is 5 all in the tiebreak. You feel the tension. And that is okay.', pauseAfter: 9 },
			{ text: 'You turn away from the net. Shoulders back. You breathe. You fix your strings. You plan the next point.', pauseAfter: 8 },
			{ text: 'You step up to serve. You know exactly where you are going. Full commitment. No hesitation.', pauseAfter: 7 },
			{ text: 'The serve lands perfectly. You execute your pattern. Point won. Match won.', pauseAfter: 8 },
			{ text: 'Feel the satisfaction. The confidence. The pride. You earned this.', pauseAfter: 8 },
			{ text: 'Remember this feeling. This is how you will play today.', pauseAfter: 6 },
			// Closing — fixed
			{ text: 'Take one more deep breath in.', pauseAfter: 5, breathe: 'inhale', fixed: true },
			{ text: 'And let it go.', pauseAfter: 4, breathe: 'exhale', fixed: true },
			{ text: 'Open your eyes when you are ready.', pauseAfter: 3, fixed: true },
		],
		daily: [
			// Opening & breathing — fixed
			{ text: 'Sit comfortably. Close your eyes. Let your body relax.', pauseAfter: 4, fixed: true },
			{ text: 'Breathe in slowly through your nose.', pauseAfter: 5, breathe: 'inhale', fixed: true },
			{ text: 'Hold.', pauseAfter: 3, breathe: 'hold', fixed: true },
			{ text: 'Breathe out slowly through your mouth.', pauseAfter: 5, breathe: 'exhale', fixed: true },
			{ text: 'Once more. Breathe in.', pauseAfter: 5, breathe: 'inhale', fixed: true },
			{ text: 'Hold.', pauseAfter: 3, breathe: 'hold', fixed: true },
			{ text: 'And release.', pauseAfter: 5, breathe: 'exhale', fixed: true },
			// Visualization — scaled by complexity
			{ text: 'Now picture yourself on the court. You are moving well. Light on your feet. Ready for anything.', pauseAfter: 10 },
			{ text: 'See your split step. A small hop. You land wide. You push off instantly in the right direction.', pauseAfter: 8 },
			{ text: 'Imagine your best forehand. Feel the unit turn. The racquet drops. You brush up on the ball. Heavy topspin. It lands deep.', pauseAfter: 10 },
			{ text: 'Now your one-handed backhand. The coil. The drop. You drive through with your upper back and core. Clean and powerful.', pauseAfter: 10 },
			{ text: 'A short ball comes. You move forward with purpose. Approach shot deep down the line. Split step at the net. A volley comes. Soft hands. Angled away. Point won.', pauseAfter: 12 },
			{ text: 'See yourself in a long rally. You are patient. Building the point. Control. Hurt. Finish.', pauseAfter: 9 },
			{ text: 'Between every point, you follow your routine. Turn away. Breathe. Strings. Plan. Ritual. Every single point.', pauseAfter: 9 },
			{ text: 'Imagine the final point of a match you win. Feel the joy. The confidence. You played your game.', pauseAfter: 10 },
			// Closing — fixed
			{ text: 'Carry this feeling with you through your day.', pauseAfter: 4, fixed: true },
			{ text: 'Take a final deep breath in.', pauseAfter: 5, breathe: 'inhale', fixed: true },
			{ text: 'And let it go. Open your eyes when you are ready.', pauseAfter: 3, breathe: 'exhale', fixed: true },
		],
		'post-error': [
			// Short reset — mostly fixed since it's a quick routine
			{ text: 'Pause. Take one deep breath.', pauseAfter: 5, breathe: 'inhale', fixed: true },
			{ text: 'The last shot is gone. It happened. Accept it completely.', pauseAfter: 4, fixed: true },
			{ text: 'Now visualize the correct execution of that shot.', pauseAfter: 3, fixed: true },
			// Visualization — scaled
			{ text: 'See the ball coming toward you. Your feet are set. Your preparation is early.', pauseAfter: 6 },
			{ text: 'You swing through the ball cleanly. It lands exactly where you want it.', pauseAfter: 6 },
			{ text: 'Replace the error image with this successful image in your mind.', pauseAfter: 5 },
			// Closing — fixed
			{ text: 'Now refocus. What is your plan for the next point?', pauseAfter: 3, fixed: true },
			{ text: 'Step up with confidence. One point at a time.', pauseAfter: 2, fixed: true },
		],
		pressure: [
			// Pressure routine — mostly fixed (it's a quick on-court routine)
			{ text: 'This is a big moment. And that is okay. Pressure is a privilege.', pauseAfter: 4, fixed: true },
			{ text: 'Take a deep breath. Slow everything down.', pauseAfter: 5, breathe: 'inhale', fixed: true },
			{ text: 'Execute your routine. Turn away. Shoulders back. Breathe.', pauseAfter: 4, fixed: true },
			// Brief visualization — scaled
			{ text: 'Look at your strings. Straighten them. This is your comfort zone.', pauseAfter: 5 },
			{ text: 'Decide your plan. Where are you serving? What is your next shot?', pauseAfter: 5 },
			// Closing — fixed
			{ text: 'Commit fully. No hesitation. Trust your training.', pauseAfter: 3, fixed: true },
			{ text: 'You have practiced this hundreds of times.', pauseAfter: 3, fixed: true },
			{ text: 'Step up. Play your game. One point at a time.', pauseAfter: 2, fixed: true },
		]
	};

	const typeLabels: Record<string, string> = {
		'pre-match': 'Pre-Match Visualization',
		daily: 'Daily Visualization',
		'post-error': 'Post-Error Reset',
		pressure: 'Pressure Moment'
	};

	let currentSteps = $derived(scripts[type] ?? scripts.daily);
	let currentLabel = $derived(typeLabels[type] ?? 'Visualization');

	// Calculate pauses to fill the full duration.
	// Fixed steps (breathing, transitions) use their pauseAfter as-is.
	// Scaled steps (visualization) share the remaining time proportionally by weight.
	let scaledPauses = $derived.by(() => {
		const steps = currentSteps;
		const totalDurationSec = duration * 60;
		// Estimate speech time per step based on text length at rate 0.65
		// ~6 chars/sec at normal rate, so at 0.65 rate ≈ 4 chars/sec
		const estimatedSpeechTime = steps.reduce((sum, s) => sum + Math.max(s.text.length / 4, 2), 0);

		// Sum of fixed pauses
		const fixedPauseTime = steps
			.filter(s => s.fixed)
			.reduce((sum, s) => sum + s.pauseAfter, 0);

		// Time available for scaled (visualization) pauses
		const scaledSteps = steps.filter(s => !s.fixed);
		const scaledWeight = scaledSteps.reduce((sum, s) => sum + s.pauseAfter, 0);
		const availableForScaled = Math.max(
			totalDurationSec - estimatedSpeechTime - fixedPauseTime,
			scaledSteps.length * 5 // minimum 5s per visualization step
		);

		return steps.map(s => {
			if (s.fixed) return s.pauseAfter;
			if (scaledWeight === 0) return 5;
			return Math.max(5, Math.round((s.pauseAfter / scaledWeight) * availableForScaled));
		});
	});
	let timeDisplay = $derived(() => {
		const remaining = Math.max(0, totalSeconds - elapsedSeconds);
		const m = Math.floor(remaining / 60);
		const s = remaining % 60;
		return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
	});
	let progressPct = $derived(totalSeconds > 0 ? (elapsedSeconds / totalSeconds) * 100 : 0);
	let stepProgressPct = $derived(currentSteps.length > 0 ? ((currentStepIndex + 1) / currentSteps.length) * 100 : 0);

	// Pre-load and cache the preferred voice
	let cachedVoice: SpeechSynthesisVoice | null = null;

	function loadVoice(): Promise<SpeechSynthesisVoice | null> {
		return new Promise((resolve) => {
			if (typeof window === 'undefined' || !window.speechSynthesis) { resolve(null); return; }

			function pickVoice(): SpeechSynthesisVoice | null {
				const voices = window.speechSynthesis.getVoices();
				return voices.find(v => v.lang.startsWith('en') && v.name.includes('Samantha'))
					?? voices.find(v => v.lang.startsWith('en') && v.name.includes('Karen'))
					?? voices.find(v => v.lang.startsWith('en') && v.name.includes('Google'))
					?? voices.find(v => v.lang.startsWith('en') && v.name.includes('Female'))
					?? voices.find(v => v.lang.startsWith('en') && !v.localService)
					?? voices.find(v => v.lang.startsWith('en'))
					?? null;
			}

			const v = pickVoice();
			if (v) { resolve(v); return; }

			// Voices not loaded yet — wait for them
			window.speechSynthesis.addEventListener('voiceschanged', () => {
				resolve(pickVoice());
			}, { once: true });

			// Fallback timeout
			setTimeout(() => resolve(pickVoice()), 1000);
		});
	}

	function handleVisibilityChange(): void {
		if (!hasStarted || isPaused) return;

		if (document.hidden) {
			// Page going hidden — speech will be killed by OS.
			// Record the moment so we can calculate skipped time on return.
			return;
		}

		// --- Page is becoming visible again ---

		// Resume AudioContext if suspended (mobile browsers suspend it on screen lock)
		if (audioCtx?.state === 'suspended') {
			audioCtx.resume().catch(() => {});
		}

		const now = Date.now();

		// Case 1: we were in a timed pause that should have ended while hidden
		if (pauseExpectedEnd > 0 && now >= pauseExpectedEnd) {
			if (breathTimer) { clearTimeout(breathTimer); breathTimer = null; }
			pauseExpectedEnd = 0;
			if (currentStepIndex < currentSteps.length - 1) {
				currentStepIndex++;
				restartSpeech();
			} else {
				elapsedSeconds = totalSeconds;
				hasStarted = false;
				stopAll();
			}
			return;
		}

		// Case 2: speech was playing but OS killed it silently (onend never fired)
		// Check the browser's actual state vs our flag
		const browserActuallySpeaking = window.speechSynthesis?.speaking ?? false;
		if (isSpeaking && !browserActuallySpeaking) {
			isSpeaking = false;
			if (speechWatchdogId) { clearTimeout(speechWatchdogId); speechWatchdogId = null; }
			restartSpeech();
			return;
		}

		// Case 3: onerror('interrupted') fired, isSpeaking is false, no pause running
		if (!isSpeaking && pauseExpectedEnd === 0 && currentStepIndex < currentSteps.length) {
			restartSpeech();
		}
	}

	function restartSpeech(): void {
		window.speechSynthesis.cancel();
		setTimeout(() => {
			if (!isPaused && hasStarted) speakCurrentStep();
		}, 300);
	}

	$effect(() => {
		if (autoOpen && !isOpen) open();
		// Pre-load voice on mount
		if (typeof window !== 'undefined' && window.speechSynthesis) {
			loadVoice().then(v => { cachedVoice = v; });
		}
	});

	$effect(() => {
		if (typeof document !== 'undefined') {
			document.addEventListener('visibilitychange', handleVisibilityChange);
			return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
		}
	});

	function open(): void {
		isOpen = true;
		elapsedSeconds = 0;
		currentStepIndex = 0;
		hasStarted = false;
		isPaused = false;
	}

	function close(): void {
		isOpen = false;
		stopAll();
		audioManager.unregister();
		onclose?.();
	}

	async function startSession(): Promise<void> {
		hasStarted = true;
		isPaused = false;
		sessionStartWall = Date.now();
		totalPausedMs = 0;
		enableScreenWake();
		audioManager.register({ type: 'visualization', title: currentLabel, stop: () => close() });
		startTimer();
		startBinaural();
		// Ensure voice is loaded before first speech
		if (!cachedVoice) {
			cachedVoice = await loadVoice();
		}
		// Warm up speech synthesis with a silent utterance to init the audio context
		if (window.speechSynthesis) {
			const warmup = new SpeechSynthesisUtterance('');
			warmup.volume = 0;
			if (cachedVoice) warmup.voice = cachedVoice;
			window.speechSynthesis.speak(warmup);
			await new Promise(r => setTimeout(r, 300));
		}
		speakCurrentStep();
	}

	function togglePause(): void {
		if (isPaused) {
			totalPausedMs += Date.now() - pauseBeganAt;
			isPaused = false;
			startTimer();
			if (binauralEnabled) startBinaural();
			speakCurrentStep();
		} else {
			pauseBeganAt = Date.now();
			isPaused = true;
			stopTimer();
			stopBinaural();
			if (typeof window !== 'undefined' && window.speechSynthesis) {
				window.speechSynthesis.cancel();
			}
			if (breathTimer) { clearTimeout(breathTimer); breathTimer = null; }
		}
	}

	function startTimer(): void {
		stopTimer();
		timerInterval = setInterval(() => {
			if (!isPaused && sessionStartWall > 0) {
				const wallElapsed = Date.now() - sessionStartWall - totalPausedMs;
				elapsedSeconds = Math.min(Math.floor(wallElapsed / 1000), totalSeconds);
			}
		}, 1000);
	}

	function stopTimer(): void {
		if (timerInterval) { clearInterval(timerInterval); timerInterval = null; }
	}

	function stopAll(): void {
		stopTimer();
		stopBinaural();
		disableScreenWake();
		if (typeof window !== 'undefined' && window.speechSynthesis) window.speechSynthesis.cancel();
		if (breathTimer) { clearTimeout(breathTimer); breathTimer = null; }
		if (speechWatchdogId) { clearTimeout(speechWatchdogId); speechWatchdogId = null; }
		pauseExpectedEnd = 0;
		hasStarted = false;
		isSpeaking = false;
	}

	// --- Binaural beats: 7.83 Hz (Schumann resonance / theta-alpha border) ---
	// Research: theta waves (4-8 Hz) associated with deep relaxation, visualization, meditation
	// 7.83 Hz is Earth's electromagnetic resonance — used in meditation and sports visualization
	function startBinaural(): void {
		if (!binauralEnabled) return;
		try {
			audioCtx = new AudioContext();
			// Base frequency: 174 Hz (Solfeggio frequency — associated with pain relief/relaxation)
			// Left ear: 174 Hz
			const oscL = audioCtx.createOscillator();
			const panL = audioCtx.createStereoPanner();
			const gainL = audioCtx.createGain();
			oscL.frequency.value = 174;
			oscL.type = 'sine';
			panL.pan.value = -1;
			gainL.gain.value = 0.05;
			oscL.connect(gainL).connect(panL).connect(audioCtx.destination);
			// Right ear: 181.83 Hz (7.83 Hz difference = theta/Schumann)
			const oscR = audioCtx.createOscillator();
			const panR = audioCtx.createStereoPanner();
			const gainR = audioCtx.createGain();
			oscR.frequency.value = 181.83;
			oscR.type = 'sine';
			panR.pan.value = 1;
			gainR.gain.value = 0.05;
			oscR.connect(gainR).connect(panR).connect(audioCtx.destination);
			oscL.start();
			oscR.start();
		} catch { /* Web Audio not available */ }
	}

	function stopBinaural(): void {
		try { audioCtx?.close(); } catch {}
		audioCtx = null;
	}

	// --- Speech ---
	// Splits text into sentences and speaks them one at a time.
	// This avoids Chrome's ~15s speech cutoff AND the pause()/resume() keep-alive
	// hack which was cutting off speech on mobile browsers.
	function speakCurrentStep(): void {
		if (isPaused || currentStepIndex >= currentSteps.length) return;
		if (typeof window === 'undefined' || !window.speechSynthesis) {
			advanceAfterPause();
			return;
		}

		window.speechSynthesis.cancel();
		if (speechWatchdogId) { clearTimeout(speechWatchdogId); speechWatchdogId = null; }

		const step = currentSteps[currentStepIndex];
		// Split into sentences — each is short enough to not hit browser limits
		const sentences = step.text.split(/(?<=[.!?])\s+/).filter(s => s.trim().length > 0);
		if (sentences.length === 0) { advanceAfterPause(); return; }

		isSpeaking = true;

		// Sync breathing circle to when the user actually hears the first word
		const targetBreathPhase = step.breathe ?? 'rest';
		let breathPhaseSet = false;
		let sentenceIdx = 0;

		function speakNextSentence(): void {
			if (isPaused || sentenceIdx >= sentences.length) {
				if (sentenceIdx >= sentences.length) {
					isSpeaking = false;
					if (speechWatchdogId) { clearTimeout(speechWatchdogId); speechWatchdogId = null; }
					advanceAfterPause();
				}
				return;
			}

			const text = sentences[sentenceIdx];
			const utterance = new SpeechSynthesisUtterance(text);
			utterance.rate = 0.65;
			utterance.pitch = 0.85;
			utterance.volume = 0.85;
			utterance.lang = 'en-US';
			if (cachedVoice) {
				utterance.voice = cachedVoice;
			} else {
				const voices = window.speechSynthesis.getVoices();
				const v = voices.find(v => v.lang.startsWith('en') && v.name.includes('Samantha'))
					?? voices.find(v => v.lang.startsWith('en') && !v.localService)
					?? voices.find(v => v.lang.startsWith('en'));
				if (v) { utterance.voice = v; cachedVoice = v; }
			}

			// Set breath phase on first sentence start
			if (!breathPhaseSet) {
				utterance.addEventListener('start', () => {
					if (!breathPhaseSet) { breathPhaseSet = true; breathPhase = targetBreathPhase; }
				});
				setTimeout(() => {
					if (!breathPhaseSet) { breathPhaseSet = true; breathPhase = targetBreathPhase; }
				}, 1000);
			}

			// Per-sentence watchdog (generous: 500ms/char + 8s buffer)
			const sentenceWatchdog = setTimeout(() => {
				if (isSpeaking && !isPaused) {
					window.speechSynthesis.cancel();
					sentenceIdx++;
					if (sentenceIdx < sentences.length) {
						setTimeout(speakNextSentence, 200);
					} else {
						isSpeaking = false;
						advanceAfterPause();
					}
				}
			}, Math.max(text.length * 500, 5000) + 8000);

			utterance.onend = () => {
				clearTimeout(sentenceWatchdog);
				sentenceIdx++;
				if (sentenceIdx < sentences.length) {
					setTimeout(speakNextSentence, 250);
				} else {
					isSpeaking = false;
					advanceAfterPause();
				}
			};

			utterance.onerror = (e: any) => {
				clearTimeout(sentenceWatchdog);
				if (e?.error !== 'interrupted') {
					sentenceIdx++;
					if (sentenceIdx < sentences.length) {
						setTimeout(speakNextSentence, 250);
					} else {
						isSpeaking = false;
						advanceAfterPause();
					}
				}
			};

			window.speechSynthesis.speak(utterance);
		}

		speakNextSentence();
	}

	function advanceAfterPause(): void {
		if (isPaused) return;
		const step = currentSteps[currentStepIndex];
		// Use scaled pause that's calculated to fill the full duration
		const pauseMs = (scaledPauses[currentStepIndex] ?? 10) * 1000;
		pauseExpectedEnd = Date.now() + pauseMs;

		// Breathing circle holds the current step's phase during the pause
		// (already set in speakCurrentStep — no animation needed)

		breathTimer = setTimeout(() => {
			breathTimer = null;
			pauseExpectedEnd = 0;
			if (isPaused) return;
			if (currentStepIndex < currentSteps.length - 1) {
				currentStepIndex++;
				speakCurrentStep();
			} else {
				// Session complete — sync timer to show 00:00
				elapsedSeconds = totalSeconds;
				hasStarted = false;
				stopAll();
			}
		}, pauseMs);
	}

	$effect(() => {
		return () => stopAll();
	});
</script>

<!-- Trigger button (if not auto-opened) -->
{#if !autoOpen}
	<button onclick={open} class="glass-card w-full p-4 text-left hover:border-accent-purple/30 transition-all group">
		<div class="flex items-center gap-3">
			<div class="w-10 h-10 rounded-xl bg-accent-purple/15 flex items-center justify-center">
				<svg class="w-5 h-5 text-accent-purple" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8" fill="currentColor" stroke="none"/></svg>
			</div>
			<div class="flex-1">
				<h3 class="text-sm font-semibold text-text-primary">{currentLabel}</h3>
				<p class="text-xs text-text-muted">{duration} min &middot; {currentSteps.length} steps &middot; With binaural beats</p>
			</div>
			<svg class="w-5 h-5 text-text-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>
		</div>
	</button>
{/if}

<!-- Full-screen overlay -->
{#if isOpen}
	<div class="fixed inset-0 z-50 flex flex-col bg-gradient-to-b from-[#080c18] via-[#0d1220] to-[#080c18]" role="dialog" aria-modal="true">
		<!-- Ambient orbs -->
		<div class="absolute inset-0 overflow-hidden pointer-events-none">
			<div class="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-accent-purple/[0.03] blur-3xl" style="animation: float 12s ease-in-out infinite"></div>
			<div class="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-court-green/[0.03] blur-3xl" style="animation: float 16s ease-in-out 2s infinite"></div>
		</div>

		<div class="relative z-10 flex flex-col h-full">
			<!-- Top bar -->
			<div class="flex items-center justify-between p-4">
				<div class="flex items-center gap-3">
					<span class="text-sm font-mono text-text-muted tabular-nums">{timeDisplay()}</span>
					<div class="w-32 h-1 rounded-full bg-white/10">
						<div class="h-full rounded-full bg-accent-purple/60 transition-all duration-1000" style="width: {progressPct}%"></div>
					</div>
				</div>
				<div class="flex items-center gap-2">
					<button
						onclick={() => { binauralEnabled = !binauralEnabled; if (!binauralEnabled) stopBinaural(); else if (hasStarted) startBinaural(); }}
						class="px-3 py-1.5 rounded-lg text-xs font-medium transition-colors
							{binauralEnabled ? 'bg-accent-purple/20 text-accent-purple' : 'bg-white/5 text-text-muted'}"
						aria-label="Toggle binaural beats"
					>
						{binauralEnabled ? '🎧 Binaural On' : '🎧 Off'}
					</button>
					<button onclick={close} aria-label="Close"
						class="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-text-muted hover:text-text-primary transition-colors">
						<svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
					</button>
				</div>
			</div>

			<!-- Main content area -->
			<div class="flex-1 flex flex-col items-center justify-center px-6">
				{#if !hasStarted}
					<!-- Start screen -->
					<div class="text-center space-y-6 animate-slide-up">
						<h2 class="text-2xl font-bold text-text-primary">{currentLabel}</h2>
						<p class="text-text-secondary text-sm max-w-md mx-auto">
							{#if type === 'daily'}
								A guided visualization to sharpen your mental game. Use headphones for binaural beats.
							{:else if type === 'pre-match'}
								Prepare your mind for competition. Visualize your best tennis. Use headphones for the best experience.
							{:else if type === 'post-error'}
								A quick mental reset after a frustrating error. Replace the negative image.
							{:else}
								A calming routine for high-pressure moments. Regain control.
							{/if}
						</p>
						<p class="text-xs text-text-muted">{currentSteps.length} steps &middot; ~{duration} min &middot; {binauralEnabled ? 'Binaural beats enabled' : 'No binaural beats'}</p>
						<button onclick={startSession}
							class="w-24 h-24 mx-auto rounded-full bg-accent-purple text-white flex items-center justify-center shadow-lg shadow-accent-purple/30 hover:scale-105 transition-transform">
							<svg class="w-12 h-12 ml-1" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
						</button>
						<p class="text-xs text-text-muted">Tap to begin &middot; Use headphones for binaural beats</p>
					</div>
				{:else}
					<!-- Active session -->
					<div class="w-full max-w-lg text-center space-y-8">
						<!-- Breathing circle -->
						<div class="relative w-32 h-32 mx-auto">
							<div class="absolute inset-0 rounded-full transition-all duration-[4000ms] ease-in-out
								{breathPhase === 'inhale' ? 'scale-110 bg-accent-purple/15' : breathPhase === 'hold' ? 'scale-110 bg-accent-blue/10' : breathPhase === 'exhale' ? 'scale-75 bg-court-green/10' : 'scale-90 bg-white/5'}">
							</div>
							<div class="absolute inset-4 rounded-full border-2 transition-all duration-[3000ms] flex items-center justify-center
								{breathPhase === 'inhale' ? 'border-accent-purple/40 scale-105' : breathPhase === 'hold' ? 'border-accent-blue/30' : breathPhase === 'exhale' ? 'border-court-green/30 scale-90' : 'border-white/10'}">
								<span class="text-xs font-medium uppercase tracking-widest transition-colors duration-1000
									{breathPhase === 'inhale' ? 'text-accent-purple' : breathPhase === 'hold' ? 'text-accent-blue' : breathPhase === 'exhale' ? 'text-court-green' : 'text-text-muted'}">
									{breathPhase === 'rest' ? '' : breathPhase === 'inhale' ? 'breathe in' : breathPhase === 'hold' ? 'hold' : 'breathe out'}
								</span>
							</div>
						</div>

						<!-- Current step text -->
						<p class="text-xl font-light text-text-primary leading-relaxed px-4 min-h-[80px] flex items-center justify-center">
							{#if currentStepIndex < currentSteps.length}
								{currentSteps[currentStepIndex].text}
							{:else}
								Session complete. Well done.
							{/if}
						</p>

						<!-- Step progress -->
						<div class="flex items-center justify-center gap-1.5">
							{#each currentSteps as _, i}
								<div class="w-2 h-2 rounded-full transition-all duration-300
									{i < currentStepIndex ? 'bg-accent-purple' : i === currentStepIndex ? 'bg-ball-yellow scale-125' : 'bg-white/15'}"></div>
							{/each}
						</div>
						<p class="text-xs text-text-muted">Step {currentStepIndex + 1} of {currentSteps.length}</p>

						<!-- Pause button -->
						<button onclick={togglePause}
							class="px-6 py-2 rounded-full bg-white/5 text-text-secondary text-sm hover:bg-white/10 transition-colors">
							{isPaused ? '▶ Resume' : '⏸ Pause'}
						</button>
					</div>
				{/if}
			</div>

			<!-- Speaking indicator at bottom -->
			{#if isSpeaking}
				<div class="flex items-center justify-center gap-1.5 pb-6">
					<div class="flex items-end gap-0.5 h-4">
						<span class="w-1 rounded-full bg-accent-purple" style="animation: bar 0.8s ease-in-out infinite; height: 40%"></span>
						<span class="w-1 rounded-full bg-accent-purple" style="animation: bar 0.8s ease-in-out 0.1s infinite; height: 80%"></span>
						<span class="w-1 rounded-full bg-accent-purple" style="animation: bar 0.8s ease-in-out 0.2s infinite; height: 60%"></span>
					</div>
				</div>
			{/if}
		</div>
	</div>
{/if}

<style>
	@keyframes float {
		0%, 100% { transform: translateY(0) translateX(0); }
		33% { transform: translateY(-20px) translateX(10px); }
		66% { transform: translateY(10px) translateX(-15px); }
	}
	@keyframes bar {
		0%, 100% { height: 20%; }
		50% { height: 100%; }
	}
</style>
