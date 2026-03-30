<script lang="ts">
	let {
		duration,
		label = 'Timer',
		onComplete
	}: {
		duration: number;
		label?: string;
		onComplete?: () => void;
	} = $props();

	let remaining = $state(0);
	let isRunning = $state(false);
	let intervalId: ReturnType<typeof setInterval> | null = null;

	// Sync remaining when duration prop changes
	$effect(() => {
		remaining = duration;
	});

	let progress = $derived(duration > 0 ? remaining / duration : 0);
	let minutes = $derived(Math.floor(remaining / 60));
	let seconds = $derived(remaining % 60);
	let displayTime = $derived(
		`${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
	);

	// SVG circle properties
	const size = 200;
	const strokeWidth = 8;
	const radius = (size - strokeWidth) / 2;
	const circumference = 2 * Math.PI * radius;
	let dashOffset = $derived(circumference * (1 - progress));

	function start(): void {
		if (remaining <= 0) return;
		isRunning = true;
		intervalId = setInterval(() => {
			remaining -= 1;
			if (remaining <= 0) {
				remaining = 0;
				stop();
				playBeep();
				onComplete?.();
			}
		}, 1000);
	}

	function stop(): void {
		isRunning = false;
		if (intervalId !== null) {
			clearInterval(intervalId);
			intervalId = null;
		}
	}

	function reset(): void {
		stop();
		remaining = duration;
	}

	function toggle(): void {
		if (isRunning) {
			stop();
		} else {
			start();
		}
	}

	function playBeep(): void {
		try {
			const ctx = new AudioContext();
			const oscillator = ctx.createOscillator();
			const gain = ctx.createGain();

			oscillator.connect(gain);
			gain.connect(ctx.destination);

			oscillator.type = 'sine';
			oscillator.frequency.setValueAtTime(880, ctx.currentTime);
			gain.gain.setValueAtTime(0.3, ctx.currentTime);
			gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);

			oscillator.start(ctx.currentTime);
			oscillator.stop(ctx.currentTime + 0.5);

			// Second beep
			const osc2 = ctx.createOscillator();
			const gain2 = ctx.createGain();
			osc2.connect(gain2);
			gain2.connect(ctx.destination);
			osc2.type = 'sine';
			osc2.frequency.setValueAtTime(1100, ctx.currentTime + 0.2);
			gain2.gain.setValueAtTime(0.3, ctx.currentTime + 0.2);
			gain2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.7);
			osc2.start(ctx.currentTime + 0.2);
			osc2.stop(ctx.currentTime + 0.7);

			// Third beep (longer, higher pitch)
			const osc3 = ctx.createOscillator();
			const gain3 = ctx.createGain();
			osc3.connect(gain3);
			gain3.connect(ctx.destination);
			osc3.type = 'sine';
			osc3.frequency.setValueAtTime(1320, ctx.currentTime + 0.5);
			gain3.gain.setValueAtTime(0.4, ctx.currentTime + 0.5);
			gain3.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2);
			osc3.start(ctx.currentTime + 0.5);
			osc3.stop(ctx.currentTime + 1.2);
		} catch {
			// Web Audio API not available
		}
	}

	// Cleanup on destroy
	$effect(() => {
		return () => {
			if (intervalId !== null) {
				clearInterval(intervalId);
			}
		};
	});
</script>

<div class="flex flex-col items-center gap-5">
	<!-- Label -->
	<span class="text-sm font-semibold text-text-secondary uppercase tracking-wider">{label}</span>

	<!-- Circular display -->
	<div class="relative" style="width: {size}px; height: {size}px;">
		<svg
			width={size}
			height={size}
			class="transform -rotate-90"
			viewBox="0 0 {size} {size}"
		>
			<!-- Background ring -->
			<circle
				cx={size / 2}
				cy={size / 2}
				r={radius}
				fill="none"
				stroke="var(--color-surface-lighter)"
				stroke-width={strokeWidth}
			/>
			<!-- Progress ring -->
			<circle
				cx={size / 2}
				cy={size / 2}
				r={radius}
				fill="none"
				stroke="var(--color-ball-yellow)"
				stroke-width={strokeWidth}
				stroke-linecap="round"
				stroke-dasharray={circumference}
				stroke-dashoffset={dashOffset}
				class="transition-[stroke-dashoffset] duration-1000 ease-linear"
				style="filter: drop-shadow(0 0 6px rgba(204, 255, 0, 0.3));"
			/>
		</svg>

		<!-- Time display -->
		<div class="absolute inset-0 flex flex-col items-center justify-center">
			<span
				class="text-4xl font-bold tracking-wider tabular-nums
					{remaining === 0 ? 'text-accent-red' : 'text-text-primary'}"
			>
				{displayTime}
			</span>
			{#if remaining === 0 && !isRunning}
				<span class="text-xs text-accent-red font-medium mt-1 animate-pulse">COMPLETE</span>
			{/if}
		</div>
	</div>

	<!-- Controls -->
	<div class="flex items-center gap-3">
		<!-- Reset -->
		<button
			onclick={reset}
			class="w-11 h-11 rounded-full bg-surface-light flex items-center justify-center text-text-muted hover:text-text-primary hover:bg-surface-lighter transition-colors"
			aria-label="Reset timer"
		>
			<svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
				<polyline points="1 4 1 10 7 10"/>
				<path d="M3.51 15a9 9 0 102.13-9.36L1 10"/>
			</svg>
		</button>

		<!-- Play/Pause -->
		<button
			onclick={toggle}
			disabled={remaining === 0 && !isRunning}
			class="w-14 h-14 rounded-full flex items-center justify-center transition-all duration-200
				{isRunning
					? 'bg-accent-orange text-surface shadow-lg shadow-accent-orange/20'
					: 'bg-ball-yellow text-surface-card shadow-lg shadow-ball-yellow/20'
				}
				disabled:opacity-30 disabled:cursor-not-allowed"
			aria-label={isRunning ? 'Pause timer' : 'Start timer'}
		>
			{#if isRunning}
				<svg class="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
					<rect x="6" y="4" width="4" height="16" rx="1"/>
					<rect x="14" y="4" width="4" height="16" rx="1"/>
				</svg>
			{:else}
				<svg class="w-6 h-6 ml-0.5" viewBox="0 0 24 24" fill="currentColor">
					<polygon points="5 3 19 12 5 21 5 3"/>
				</svg>
			{/if}
		</button>

		<!-- Spacer to balance layout -->
		<div class="w-11 h-11"></div>
	</div>
</div>
