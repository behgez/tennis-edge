<script lang="ts">
	type Pose = 'standing' | 'squat' | 'lunge' | 'plank' | 'rotation' | 'arms-up' | 'arms-out' | 'balance' | 'calf-raise' | 'shoulder-rotation';

	interface Step {
		instruction: string;
		figure: Pose;
	}

	let {
		exerciseName,
		steps,
		autoPlay = false,
		looping = true
	}: {
		exerciseName: string;
		steps: Step[];
		autoPlay?: boolean;
		looping?: boolean;
	} = $props();

	let currentStep = $state(0);
	let isPlaying = $state(false);
	let audioEnabled = $state(false);
	let speechSupported = $state(false);
	let stepInterval: ReturnType<typeof setInterval> | null = null;

	const STEP_DURATION = 3000; // 3 seconds per step

	// Joint positions for each pose
	// Coordinate system: SVG viewBox 200x300
	// Joints: headX, headY, shoulderY, leftHandX, leftHandY, rightHandX, rightHandY,
	//         hipY, leftFootX, leftFootY, rightFootX, rightFootY
	interface JointPositions {
		headX: number;
		headY: number;
		shoulderY: number;
		leftHandX: number;
		leftHandY: number;
		rightHandX: number;
		rightHandY: number;
		hipX: number;
		hipY: number;
		leftKneeX: number;
		leftKneeY: number;
		rightKneeX: number;
		rightKneeY: number;
		leftFootX: number;
		leftFootY: number;
		rightFootX: number;
		rightFootY: number;
	}

	const poses: Record<Pose, JointPositions> = {
		standing: {
			headX: 100, headY: 55,
			shoulderY: 95,
			leftHandX: 70, leftHandY: 155,
			rightHandX: 130, rightHandY: 155,
			hipX: 100, hipY: 170,
			leftKneeX: 85, leftKneeY: 215,
			rightKneeX: 115, rightKneeY: 215,
			leftFootX: 80, leftFootY: 265,
			rightFootX: 120, rightFootY: 265
		},
		squat: {
			headX: 100, headY: 85,
			shoulderY: 125,
			leftHandX: 60, leftHandY: 125,
			rightHandX: 140, rightHandY: 125,
			hipX: 100, hipY: 190,
			leftKneeX: 70, leftKneeY: 210,
			rightKneeX: 130, rightKneeY: 210,
			leftFootX: 70, leftFootY: 265,
			rightFootX: 130, rightFootY: 265
		},
		lunge: {
			headX: 100, headY: 65,
			shoulderY: 105,
			leftHandX: 75, leftHandY: 155,
			rightHandX: 125, rightHandY: 155,
			hipX: 100, hipY: 175,
			leftKneeX: 60, leftKneeY: 210,
			rightKneeX: 140, rightKneeY: 195,
			leftFootX: 50, leftFootY: 265,
			rightFootX: 155, rightFootY: 265
		},
		plank: {
			headX: 40, headY: 145,
			shoulderY: 160,
			leftHandX: 30, leftHandY: 200,
			rightHandX: 30, rightHandY: 220,
			hipX: 120, hipY: 155,
			leftKneeX: 145, leftKneeY: 165,
			rightKneeX: 145, rightKneeY: 175,
			leftFootX: 170, leftFootY: 175,
			rightFootX: 175, rightFootY: 185
		},
		rotation: {
			headX: 100, headY: 55,
			shoulderY: 95,
			leftHandX: 40, leftHandY: 110,
			rightHandX: 160, rightHandY: 110,
			hipX: 100, hipY: 170,
			leftKneeX: 85, leftKneeY: 215,
			rightKneeX: 115, rightKneeY: 215,
			leftFootX: 80, leftFootY: 265,
			rightFootX: 120, rightFootY: 265
		},
		'arms-up': {
			headX: 100, headY: 55,
			shoulderY: 95,
			leftHandX: 70, leftHandY: 25,
			rightHandX: 130, rightHandY: 25,
			hipX: 100, hipY: 170,
			leftKneeX: 85, leftKneeY: 215,
			rightKneeX: 115, rightKneeY: 215,
			leftFootX: 80, leftFootY: 265,
			rightFootX: 120, rightFootY: 265
		},
		'arms-out': {
			headX: 100, headY: 55,
			shoulderY: 95,
			leftHandX: 20, leftHandY: 95,
			rightHandX: 180, rightHandY: 95,
			hipX: 100, hipY: 170,
			leftKneeX: 85, leftKneeY: 215,
			rightKneeX: 115, rightKneeY: 215,
			leftFootX: 80, leftFootY: 265,
			rightFootX: 120, rightFootY: 265
		},
		balance: {
			headX: 100, headY: 55,
			shoulderY: 95,
			leftHandX: 45, leftHandY: 85,
			rightHandX: 155, rightHandY: 85,
			hipX: 100, hipY: 170,
			leftKneeX: 85, leftKneeY: 155,
			rightKneeX: 110, rightKneeY: 215,
			leftFootX: 120, leftFootY: 145,
			rightFootX: 115, rightFootY: 265
		},
		'calf-raise': {
			headX: 100, headY: 45,
			shoulderY: 85,
			leftHandX: 70, leftHandY: 145,
			rightHandX: 130, rightHandY: 145,
			hipX: 100, hipY: 160,
			leftKneeX: 88, leftKneeY: 200,
			rightKneeX: 112, rightKneeY: 200,
			leftFootX: 85, leftFootY: 248,
			rightFootX: 115, rightFootY: 248
		},
		'shoulder-rotation': {
			headX: 100, headY: 55,
			shoulderY: 95,
			leftHandX: 75, leftHandY: 155,
			rightHandX: 155, rightHandY: 55,
			hipX: 100, hipY: 170,
			leftKneeX: 85, leftKneeY: 215,
			rightKneeX: 115, rightKneeY: 215,
			leftFootX: 80, leftFootY: 265,
			rightFootX: 120, rightFootY: 265
		}
	};

	let currentPose = $derived(steps[currentStep]?.figure ?? 'standing');
	let joints = $derived(poses[currentPose] ?? poses.standing);
	let currentInstruction = $derived(steps[currentStep]?.instruction ?? '');
	let progress = $derived(steps.length > 0 ? ((currentStep + 1) / steps.length) * 100 : 0);

	// Check speech support
	$effect(() => {
		speechSupported = typeof window !== 'undefined' && 'speechSynthesis' in window;
		if (autoPlay) {
			startPlaying();
		}
		return () => {
			stopPlaying();
			if (typeof window !== 'undefined' && window.speechSynthesis) {
				window.speechSynthesis.cancel();
			}
		};
	});

	function startPlaying(): void {
		if (isPlaying) return;
		isPlaying = true;
		if (audioEnabled) speakStep();
		stepInterval = setInterval(() => {
			advance();
		}, STEP_DURATION);
	}

	function stopPlaying(): void {
		isPlaying = false;
		if (stepInterval !== null) {
			clearInterval(stepInterval);
			stepInterval = null;
		}
		if (typeof window !== 'undefined' && window.speechSynthesis) {
			window.speechSynthesis.cancel();
		}
	}

	function togglePlay(): void {
		if (isPlaying) {
			stopPlaying();
		} else {
			startPlaying();
		}
	}

	function advance(): void {
		if (currentStep < steps.length - 1) {
			currentStep++;
			if (audioEnabled) speakStep();
		} else if (looping) {
			currentStep = 0;
			if (audioEnabled) speakStep();
		} else {
			stopPlaying();
		}
	}

	function goToStep(index: number): void {
		currentStep = index;
		if (audioEnabled) speakStep();
	}

	function speakStep(): void {
		if (!speechSupported || !window.speechSynthesis) return;
		window.speechSynthesis.cancel();
		const utterance = new SpeechSynthesisUtterance(steps[currentStep]?.instruction ?? '');
		utterance.rate = 0.9;
		utterance.volume = 0.8;
		window.speechSynthesis.speak(utterance);
	}

	function toggleAudio(): void {
		audioEnabled = !audioEnabled;
		if (audioEnabled && isPlaying) {
			speakStep();
		} else if (!audioEnabled && window.speechSynthesis) {
			window.speechSynthesis.cancel();
		}
	}

	// Pose label map
	const poseLabels: Record<Pose, string> = {
		standing: 'Standing',
		squat: 'Squat',
		lunge: 'Lunge',
		plank: 'Plank',
		rotation: 'Rotation',
		'arms-up': 'Arms Up',
		'arms-out': 'Arms Out',
		balance: 'Balance',
		'calf-raise': 'Calf Raise',
		'shoulder-rotation': 'Shoulder Rotation'
	};
</script>

<div class="glass-card overflow-hidden">
	<!-- Header -->
	<div class="p-4 pb-3 border-b border-white/5">
		<div class="flex items-center justify-between">
			<div class="flex items-center gap-3">
				<div class="w-9 h-9 rounded-lg bg-court-green/15 flex items-center justify-center">
					<svg class="w-5 h-5 text-court-green" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<path d="M18 20V10M12 20V4M6 20v-6"/>
					</svg>
				</div>
				<div>
					<h3 class="text-base font-semibold text-text-primary">{exerciseName}</h3>
					<p class="text-xs text-text-muted">Step {currentStep + 1} of {steps.length} &middot; {poseLabels[currentPose]}</p>
				</div>
			</div>

			<!-- Audio toggle -->
			{#if speechSupported}
				<button
					onclick={toggleAudio}
					class="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors
						{audioEnabled
							? 'bg-ball-yellow/15 text-ball-yellow'
							: 'bg-white/5 text-text-muted hover:bg-white/10'}"
					aria-label="Toggle audio narration"
				>
					<svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
						{#if audioEnabled}
							<path d="M15.54 8.46a5 5 0 010 7.07"/>
							<path d="M19.07 4.93a10 10 0 010 14.14"/>
						{:else}
							<line x1="23" y1="9" x2="17" y2="15"/>
							<line x1="17" y1="9" x2="23" y2="15"/>
						{/if}
					</svg>
					{audioEnabled ? 'On' : 'Off'}
				</button>
			{/if}
		</div>

		<!-- Progress bar -->
		<div class="progress-bar mt-3">
			<div
				class="progress-bar-fill bg-ball-yellow"
				style="width: {progress}%"
			></div>
		</div>
	</div>

	<!-- SVG Figure -->
	<div class="flex justify-center py-6 px-4 bg-surface/50">
		<svg viewBox="0 0 200 300" class="w-48 h-72" aria-label="Stick figure demonstrating {poseLabels[currentPose]}">
			<defs>
				<filter id="figure-glow">
					<feGaussianBlur stdDeviation="3" result="blur"/>
					<feMerge>
						<feMergeNode in="blur"/>
						<feMergeNode in="SourceGraphic"/>
					</feMerge>
				</filter>
			</defs>

			<!-- Ground line -->
			<line
				x1="20" y1="275"
				x2="180" y2="275"
				stroke="var(--color-surface-lighter)"
				stroke-width="1"
				stroke-dasharray="4 4"
				opacity="0.5"
			/>

			<!-- Calf-raise tip-toe indicators -->
			{#if currentPose === 'calf-raise'}
				<line
					x1={joints.leftFootX - 5} y1="265"
					x2={joints.leftFootX + 5} y2="265"
					stroke="var(--color-ball-yellow)"
					stroke-width="2"
					opacity="0.5"
					style="transition: all 0.5s ease;"
				/>
				<line
					x1={joints.rightFootX - 5} y1="265"
					x2={joints.rightFootX + 5} y2="265"
					stroke="var(--color-ball-yellow)"
					stroke-width="2"
					opacity="0.5"
					style="transition: all 0.5s ease;"
				/>
			{/if}

			<!-- Left leg: foot -> knee -->
			<line
				x1={joints.leftFootX} y1={joints.leftFootY}
				x2={joints.leftKneeX} y2={joints.leftKneeY}
				stroke="var(--color-ball-yellow)"
				stroke-width="3.5"
				stroke-linecap="round"
				filter="url(#figure-glow)"
				style="transition: all 0.5s ease;"
			/>

			<!-- Left leg: knee -> hip -->
			<line
				x1={joints.leftKneeX} y1={joints.leftKneeY}
				x2={joints.hipX} y2={joints.hipY}
				stroke="var(--color-ball-yellow)"
				stroke-width="3.5"
				stroke-linecap="round"
				filter="url(#figure-glow)"
				style="transition: all 0.5s ease;"
			/>

			<!-- Right leg: foot -> knee -->
			<line
				x1={joints.rightFootX} y1={joints.rightFootY}
				x2={joints.rightKneeX} y2={joints.rightKneeY}
				stroke="var(--color-ball-yellow)"
				stroke-width="3.5"
				stroke-linecap="round"
				filter="url(#figure-glow)"
				style="transition: all 0.5s ease;"
			/>

			<!-- Right leg: knee -> hip -->
			<line
				x1={joints.rightKneeX} y1={joints.rightKneeY}
				x2={joints.hipX} y2={joints.hipY}
				stroke="var(--color-ball-yellow)"
				stroke-width="3.5"
				stroke-linecap="round"
				filter="url(#figure-glow)"
				style="transition: all 0.5s ease;"
			/>

			<!-- Torso: hip -> shoulders -->
			<line
				x1={joints.hipX} y1={joints.hipY}
				x2={joints.headX} y2={joints.shoulderY}
				stroke="var(--color-ball-yellow)"
				stroke-width="4"
				stroke-linecap="round"
				filter="url(#figure-glow)"
				style="transition: all 0.5s ease;"
			/>

			<!-- Left arm: shoulder -> hand -->
			<line
				x1={joints.headX} y1={joints.shoulderY}
				x2={joints.leftHandX} y2={joints.leftHandY}
				stroke="var(--color-ball-yellow)"
				stroke-width="3"
				stroke-linecap="round"
				filter="url(#figure-glow)"
				style="transition: all 0.5s ease;"
			/>

			<!-- Right arm: shoulder -> hand -->
			<line
				x1={joints.headX} y1={joints.shoulderY}
				x2={joints.rightHandX} y2={joints.rightHandY}
				stroke="var(--color-ball-yellow)"
				stroke-width="3"
				stroke-linecap="round"
				filter="url(#figure-glow)"
				style="transition: all 0.5s ease;"
			/>

			<!-- Neck: shoulders -> head -->
			<line
				x1={joints.headX} y1={joints.shoulderY}
				x2={joints.headX} y2={joints.headY + 16}
				stroke="var(--color-ball-yellow)"
				stroke-width="3"
				stroke-linecap="round"
				filter="url(#figure-glow)"
				style="transition: all 0.5s ease;"
			/>

			<!-- Head -->
			<circle
				cx={joints.headX}
				cy={joints.headY}
				r="16"
				fill="none"
				stroke="var(--color-ball-yellow)"
				stroke-width="3"
				filter="url(#figure-glow)"
				style="transition: all 0.5s ease;"
			/>

			<!-- Joint dots for knees and hands -->
			<circle cx={joints.leftKneeX} cy={joints.leftKneeY} r="3" fill="var(--color-ball-yellow-dim)" style="transition: all 0.5s ease;" />
			<circle cx={joints.rightKneeX} cy={joints.rightKneeY} r="3" fill="var(--color-ball-yellow-dim)" style="transition: all 0.5s ease;" />
			<circle cx={joints.leftHandX} cy={joints.leftHandY} r="3" fill="var(--color-ball-yellow-dim)" style="transition: all 0.5s ease;" />
			<circle cx={joints.rightHandX} cy={joints.rightHandY} r="3" fill="var(--color-ball-yellow-dim)" style="transition: all 0.5s ease;" />
			<circle cx={joints.hipX} cy={joints.hipY} r="3" fill="var(--color-ball-yellow-dim)" style="transition: all 0.5s ease;" />
		</svg>
	</div>

	<!-- Instruction text -->
	<div class="px-5 py-4 border-t border-white/5">
		<p class="text-sm text-text-primary text-center font-medium leading-relaxed min-h-[40px] flex items-center justify-center">
			{currentInstruction}
		</p>
	</div>

	<!-- Controls -->
	<div class="px-5 pb-5 pt-1">
		<div class="flex items-center justify-center gap-3">
			<!-- Previous -->
			<button
				onclick={() => goToStep(Math.max(0, currentStep - 1))}
				disabled={currentStep === 0 && !looping}
				class="w-10 h-10 rounded-full bg-surface-light flex items-center justify-center text-text-muted hover:text-text-primary hover:bg-surface-lighter transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
				aria-label="Previous step"
			>
				<svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
					<path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/>
				</svg>
			</button>

			<!-- Play/Pause -->
			<button
				onclick={togglePlay}
				class="w-13 h-13 rounded-full flex items-center justify-center transition-all duration-200 shadow-lg
					{isPlaying
						? 'bg-accent-orange text-surface shadow-accent-orange/20'
						: 'bg-ball-yellow text-surface-card shadow-ball-yellow/20'
					}"
				style="width: 52px; height: 52px;"
				aria-label={isPlaying ? 'Pause' : 'Play'}
			>
				{#if isPlaying}
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

			<!-- Next -->
			<button
				onclick={() => goToStep(Math.min(steps.length - 1, currentStep + 1))}
				disabled={currentStep >= steps.length - 1 && !looping}
				class="w-10 h-10 rounded-full bg-surface-light flex items-center justify-center text-text-muted hover:text-text-primary hover:bg-surface-lighter transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
				aria-label="Next step"
			>
				<svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
					<path d="M16 6h2v12h-2zm-3.5 6L4 6v12z" transform="rotate(180 12 12)"/>
				</svg>
			</button>
		</div>

		<!-- Step indicators -->
		<div class="flex items-center justify-center gap-1.5 mt-4">
			{#each steps as _, i}
				<button
					onclick={() => goToStep(i)}
					class="w-2 h-2 rounded-full transition-all duration-300
						{i === currentStep
							? 'bg-ball-yellow w-5'
							: i < currentStep
								? 'bg-ball-yellow/40'
								: 'bg-surface-lighter'}"
					aria-label="Go to step {i + 1}"
				></button>
			{/each}
		</div>

		<!-- Looping indicator -->
		{#if looping}
			<div class="flex items-center justify-center gap-1.5 mt-3">
				<svg class="w-3.5 h-3.5 text-text-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
					<polyline points="17 1 21 5 17 9"/>
					<path d="M3 11V9a4 4 0 014-4h14"/>
					<polyline points="7 23 3 19 7 15"/>
					<path d="M21 13v2a4 4 0 01-4 4H3"/>
				</svg>
				<span class="text-xs text-text-muted">Looping</span>
			</div>
		{/if}
	</div>
</div>
