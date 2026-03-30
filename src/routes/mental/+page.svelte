<script lang="ts">
	// --- State ---
	let activeExercise: number | null = $state(null);
	let expandedMonth: number | null = $state(null);
	let showReadingList = $state(false);

	// Timer state
	let timerRunning = $state(false);
	let timerSeconds = $state(600); // 10 minutes
	let timerInterval: ReturnType<typeof setInterval> | null = $state(null);

	// Checklist state
	let checklist = $state({
		visualized: false,
		routine: false,
		journal: false
	});

	// Visualization prompts (rotate daily)
	const visualizationPrompts = [
		"Visualize your ideal forehand: the grip, the unit turn, the contact point, the follow-through. Feel the ball compress on the strings.",
		"See yourself serving an ace down the T. Feel the trophy position, the snap of the wrist, hear the ball hit the service box.",
		"Imagine a tough rally — you move your opponent side to side, then attack the short ball with a clean winner down the line.",
		"Picture yourself at 5-5 in the tiebreak. You breathe deeply, bounce the ball, and serve with total commitment. Watch it land perfectly.",
		"Visualize your between-point routine after losing a tough point. You turn away, relax your shoulders, take a deep breath, and walk back ready.",
		"See yourself executing the Control-Hurt-Finish framework. Patient cross-court rallies, then the inside-out forehand, then the clean finish.",
		"Imagine approaching the net behind a deep topspin shot. You split-step, read the pass, and punch a crisp volley into the open court."
	];

	let todayPrompt = $derived(visualizationPrompts[new Date().getDay()]);

	let timerDisplay = $derived(() => {
		const mins = Math.floor(timerSeconds / 60);
		const secs = timerSeconds % 60;
		return `${mins}:${secs.toString().padStart(2, '0')}`;
	});

	let timerProgress = $derived((600 - timerSeconds) / 600 * 100);

	function toggleTimer() {
		if (timerRunning) {
			if (timerInterval) clearInterval(timerInterval);
			timerInterval = null;
			timerRunning = false;
		} else {
			if (timerSeconds <= 0) timerSeconds = 600;
			timerRunning = true;
			timerInterval = setInterval(() => {
				timerSeconds--;
				if (timerSeconds <= 0) {
					if (timerInterval) clearInterval(timerInterval);
					timerInterval = null;
					timerRunning = false;
				}
			}, 1000);
		}
	}

	function resetTimer() {
		if (timerInterval) clearInterval(timerInterval);
		timerInterval = null;
		timerRunning = false;
		timerSeconds = 600;
	}

	function toggleExercise(id: number) {
		activeExercise = activeExercise === id ? null : id;
	}

	function toggleMonth(month: number) {
		expandedMonth = expandedMonth === month ? null : month;
	}

	let checklistCount = $derived(
		(checklist.visualized ? 1 : 0) + (checklist.routine ? 1 : 0) + (checklist.journal ? 1 : 0)
	);
</script>

<!-- Page Header -->
<div class="mb-8 animate-slide-up">
	<div class="flex items-center gap-3 mb-2">
		<div class="w-10 h-10 rounded-xl bg-accent-purple/15 flex items-center justify-center">
			<svg class="w-6 h-6 text-accent-purple" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
				<path d="M12 2a5 5 0 015 5c0 1.1-.4 2.1-1 2.9a5 5 0 011 3.1 5 5 0 01-3 4.6V20a2 2 0 01-2 2h0a2 2 0 01-2-2v-2.4A5 5 0 017 13a5 5 0 011-3.1A5 5 0 017 7a5 5 0 015-5z"/>
				<path d="M12 2v20"/>
			</svg>
		</div>
		<div>
			<h1 class="text-2xl lg:text-3xl font-bold text-text-primary">Mental Training</h1>
			<p class="text-text-secondary text-sm">The difference maker: up to <strong class="text-accent-purple">30% of performance</strong></p>
		</div>
	</div>
</div>

<!-- ===== DAILY PRACTICE ===== -->
<div class="glass-card p-5 mb-6 glow-green animate-slide-up">
	<div class="flex items-center gap-2 mb-4">
		<div class="w-8 h-8 rounded-lg bg-court-green/15 flex items-center justify-center">
			<svg class="w-4 h-4 text-court-green" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
				<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
			</svg>
		</div>
		<h2 class="text-lg font-bold text-text-primary">Daily Practice</h2>
		<span class="badge bg-court-green/20 text-court-green ml-auto">{checklistCount}/3 today</span>
	</div>

	<!-- Today's Visualization Prompt -->
	<div class="bg-surface-light rounded-xl p-4 mb-4">
		<p class="text-accent-purple text-xs font-semibold uppercase tracking-wider mb-2">Today's Visualization</p>
		<p class="text-text-secondary text-sm leading-relaxed italic">"{todayPrompt}"</p>
	</div>

	<!-- Visualization Timer -->
	<div class="bg-surface-light rounded-xl p-4 mb-4">
		<div class="flex items-center justify-between mb-3">
			<p class="text-text-primary text-sm font-semibold">10-Minute Visualization Session</p>
			<span class="text-2xl font-mono font-bold {timerSeconds <= 60 && timerRunning ? 'text-accent-red' : timerRunning ? 'text-court-green' : 'text-text-secondary'}">
				{timerDisplay()}
			</span>
		</div>
		<div class="progress-bar mb-3">
			<div class="progress-bar-fill bg-accent-purple" style="width: {timerProgress}%"></div>
		</div>
		<div class="flex gap-2">
			<button
				onclick={toggleTimer}
				class="flex-1 py-2 px-4 rounded-lg text-sm font-semibold transition-all duration-200
					{timerRunning
						? 'bg-accent-red/15 text-accent-red hover:bg-accent-red/25'
						: 'bg-court-green/15 text-court-green hover:bg-court-green/25'}"
			>
				{timerRunning ? 'Pause' : timerSeconds < 600 ? 'Resume' : 'Start'}
			</button>
			<button
				onclick={resetTimer}
				class="py-2 px-4 rounded-lg text-sm font-semibold bg-surface-lighter text-text-secondary hover:text-text-primary transition-colors"
			>
				Reset
			</button>
		</div>
	</div>

	<!-- Quick Checklist -->
	<div class="space-y-2">
		<label class="flex items-center gap-3 bg-surface-light rounded-lg p-3 cursor-pointer hover:bg-surface-lighter transition-colors">
			<input type="checkbox" bind:checked={checklist.visualized} class="w-4 h-4 rounded accent-accent-purple"/>
			<span class="text-sm {checklist.visualized ? 'text-court-green line-through' : 'text-text-primary'}">Did you visualize today?</span>
		</label>
		<label class="flex items-center gap-3 bg-surface-light rounded-lg p-3 cursor-pointer hover:bg-surface-lighter transition-colors">
			<input type="checkbox" bind:checked={checklist.routine} class="w-4 h-4 rounded accent-accent-purple"/>
			<span class="text-sm {checklist.routine ? 'text-court-green line-through' : 'text-text-primary'}">Between-point routine practice?</span>
		</label>
		<label class="flex items-center gap-3 bg-surface-light rounded-lg p-3 cursor-pointer hover:bg-surface-lighter transition-colors">
			<input type="checkbox" bind:checked={checklist.journal} class="w-4 h-4 rounded accent-accent-purple"/>
			<span class="text-sm {checklist.journal ? 'text-court-green line-through' : 'text-text-primary'}">Journal entry complete?</span>
		</label>
	</div>
</div>

<!-- ===== MENTAL EXERCISES LIBRARY ===== -->
<div class="mb-6">
	<div class="flex items-center gap-2 mb-4">
		<div class="w-8 h-8 rounded-lg bg-accent-blue/15 flex items-center justify-center">
			<svg class="w-4 h-4 text-accent-blue" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
				<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 9h6M9 13h6M9 17h4"/>
			</svg>
		</div>
		<h2 class="text-lg font-bold text-text-primary">Mental Exercises Library</h2>
	</div>

	<div class="space-y-3">
		<!-- Exercise 1: 16-Second Cure -->
		<div class="glass-card overflow-hidden">
			<button
				onclick={() => toggleExercise(1)}
				class="w-full text-left p-4 flex items-center gap-4 hover:bg-white/[0.02] transition-colors"
			>
				<div class="w-10 h-10 rounded-lg bg-accent-blue/15 flex items-center justify-center shrink-0">
					<span class="text-accent-blue font-bold text-sm">16s</span>
				</div>
				<div class="flex-1 min-w-0">
					<h3 class="font-bold text-text-primary">16-Second Cure</h3>
					<p class="text-text-secondary text-xs">Loehr's between-point recovery system</p>
				</div>
				<span class="badge bg-accent-red/15 text-accent-red">Essential</span>
				<svg class="w-5 h-5 text-text-muted transition-transform duration-200 {activeExercise === 1 ? 'rotate-180' : ''}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
			</button>
			{#if activeExercise === 1}
				<div class="px-4 pb-5 border-t border-white/5 animate-slide-up">
					<div class="pl-14 mt-4">
						<p class="text-text-secondary text-sm mb-4">The 16-second period between points is where matches are won and lost. This is your mental reset system.</p>

						<div class="space-y-4">
							<div class="glass-card p-4 border-l-2 border-accent-blue/50">
								<div class="flex items-center gap-2 mb-2">
									<span class="w-7 h-7 rounded-full bg-accent-blue/20 text-accent-blue font-bold text-xs flex items-center justify-center">1</span>
									<h4 class="font-bold text-text-primary text-sm">Positive Physical Response (3-5 seconds)</h4>
								</div>
								<p class="text-text-secondary text-sm pl-9">
									<strong class="text-text-primary">Turn away from the net.</strong> Shoulders back, head up, confident posture. Walk with purpose regardless of the last point. Your body language signals your brain: "I'm in control."
								</p>
							</div>

							<div class="glass-card p-4 border-l-2 border-court-green/50">
								<div class="flex items-center gap-2 mb-2">
									<span class="w-7 h-7 rounded-full bg-court-green/20 text-court-green font-bold text-xs flex items-center justify-center">2</span>
									<h4 class="font-bold text-text-primary text-sm">Relaxation (6-15 seconds)</h4>
								</div>
								<p class="text-text-secondary text-sm pl-9">
									Look at your strings or fix them. <strong class="text-text-primary">Take one deep, slow breath.</strong> Say the word "relax" internally. Let the tension leave your shoulders, hands, and jaw. This is the physical reset.
								</p>
							</div>

							<div class="glass-card p-4 border-l-2 border-warning/50">
								<div class="flex items-center gap-2 mb-2">
									<span class="w-7 h-7 rounded-full bg-warning/20 text-warning font-bold text-xs flex items-center justify-center">3</span>
									<h4 class="font-bold text-text-primary text-sm">Preparation (3-5 seconds)</h4>
								</div>
								<p class="text-text-secondary text-sm pl-9">
									<strong class="text-text-primary">Decide your tactic for the next point.</strong> Where will you serve? What pattern will you play? What is your intention? Commit to a specific plan — no vagueness.
								</p>
							</div>

							<div class="glass-card p-4 border-l-2 border-accent-purple/50">
								<div class="flex items-center gap-2 mb-2">
									<span class="w-7 h-7 rounded-full bg-accent-purple/20 text-accent-purple font-bold text-xs flex items-center justify-center">4</span>
									<h4 class="font-bold text-text-primary text-sm">Ritual (5-8 seconds)</h4>
								</div>
								<p class="text-text-secondary text-sm pl-9">
									<strong class="text-text-primary">Perform your consistent pre-point routine.</strong> Bounce the ball a set number of times. Adjust your strings. Whatever your ritual — do it the same way every time. This anchors your focus to the present point.
								</p>
							</div>
						</div>
					</div>
				</div>
			{/if}
		</div>

		<!-- Exercise 2: Pre-Match Visualization -->
		<div class="glass-card overflow-hidden">
			<button
				onclick={() => toggleExercise(2)}
				class="w-full text-left p-4 flex items-center gap-4 hover:bg-white/[0.02] transition-colors"
			>
				<div class="w-10 h-10 rounded-lg bg-accent-purple/15 flex items-center justify-center shrink-0">
					<svg class="w-5 h-5 text-accent-purple" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
						<circle cx="12" cy="12" r="3"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
					</svg>
				</div>
				<div class="flex-1 min-w-0">
					<h3 class="font-bold text-text-primary">Pre-Match Visualization</h3>
					<p class="text-text-secondary text-xs">VAKE method for match preparation</p>
				</div>
				<span class="badge bg-accent-red/15 text-accent-red">Essential</span>
				<svg class="w-5 h-5 text-text-muted transition-transform duration-200 {activeExercise === 2 ? 'rotate-180' : ''}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
			</button>
			{#if activeExercise === 2}
				<div class="px-4 pb-5 border-t border-white/5 animate-slide-up">
					<div class="pl-14 mt-4">
						<h4 class="text-accent-purple font-bold text-sm mb-3">The VAKE Method</h4>
						<div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
							<div class="glass-card p-3">
								<p class="text-accent-purple font-semibold text-sm mb-1">V — Visual</p>
								<p class="text-text-secondary text-xs">See the court clearly. The lines, the net, the surface. Visualize yourself on court.</p>
							</div>
							<div class="glass-card p-3">
								<p class="text-accent-blue font-semibold text-sm mb-1">A — Auditory</p>
								<p class="text-text-secondary text-xs">Hear the ball hitting the strings. The bounce on the court. The sound of a clean strike.</p>
							</div>
							<div class="glass-card p-3">
								<p class="text-court-green font-semibold text-sm mb-1">K — Kinesthetic</p>
								<p class="text-text-secondary text-xs">Feel your strokes. The grip in your hand. The rotation of your body. The weight transfer.</p>
							</div>
							<div class="glass-card p-3">
								<p class="text-warning font-semibold text-sm mb-1">E — Emotional</p>
								<p class="text-text-secondary text-xs">Feel the confidence. The calm determination. The competitive fire. You are ready.</p>
							</div>
						</div>

						<h4 class="text-accent-purple font-bold text-sm mb-3">Pre-Match Timeline</h4>
						<div class="glass-card p-4">
							<div class="space-y-3">
								<div class="flex items-start gap-3">
									<span class="badge bg-accent-purple/20 text-accent-purple shrink-0">60-45 min</span>
									<p class="text-text-secondary text-sm">Physical warm-up — light hitting, movement, stretching</p>
								</div>
								<div class="flex items-start gap-3">
									<span class="badge bg-accent-blue/20 text-accent-blue shrink-0">30-15 min</span>
									<p class="text-text-secondary text-sm"><strong class="text-text-primary">Visualization session (5-10 min)</strong> — use the VAKE method</p>
								</div>
								<div class="flex items-start gap-3">
									<span class="badge bg-court-green/20 text-court-green shrink-0">10-5 min</span>
									<p class="text-text-secondary text-sm">Music, affirmations, review game plan, deep breathing</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			{/if}
		</div>

		<!-- Exercise 3: Bounce-Hit Focus -->
		<div class="glass-card overflow-hidden">
			<button
				onclick={() => toggleExercise(3)}
				class="w-full text-left p-4 flex items-center gap-4 hover:bg-white/[0.02] transition-colors"
			>
				<div class="w-10 h-10 rounded-lg bg-ball-yellow/15 flex items-center justify-center shrink-0">
					<svg class="w-5 h-5 text-ball-yellow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
						<circle cx="12" cy="12" r="10"/>
						<path d="M2.5 12c3 0 5.5-2.5 5.5-5.5M16 21.5c0-3-2.5-5.5-5.5-5.5"/>
					</svg>
				</div>
				<div class="flex-1 min-w-0">
					<h3 class="font-bold text-text-primary">Bounce-Hit Focus</h3>
					<p class="text-text-secondary text-xs">Simple yet powerful concentration technique</p>
				</div>
				<span class="badge bg-court-green/15 text-court-green">Recommended</span>
				<svg class="w-5 h-5 text-text-muted transition-transform duration-200 {activeExercise === 3 ? 'rotate-180' : ''}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
			</button>
			{#if activeExercise === 3}
				<div class="px-4 pb-5 border-t border-white/5 animate-slide-up">
					<div class="pl-14 mt-4">
						<div class="glass-card p-4 mb-4 border-l-2 border-ball-yellow/50">
							<p class="text-text-secondary text-sm leading-relaxed">
								Call <strong class="text-ball-yellow text-lg">"Bounce"</strong> (internally or aloud) when the ball hits the court. Call <strong class="text-ball-yellow text-lg">"Hit"</strong> when the ball contacts any racquet.
							</p>
						</div>
						<h4 class="font-semibold text-text-primary text-sm mb-2">Why It Works</h4>
						<ul class="text-text-secondary text-sm space-y-2">
							<li class="flex items-start gap-2"><span class="text-ball-yellow">&#9679;</span> <strong class="text-text-primary">Eliminates negative self-talk</strong> — your inner monologue is occupied with "bounce" and "hit"</li>
							<li class="flex items-start gap-2"><span class="text-ball-yellow">&#9679;</span> <strong class="text-text-primary">Anchors attention to the present</strong> — you can't worry about the last point if you're tracking the ball</li>
							<li class="flex items-start gap-2"><span class="text-ball-yellow">&#9679;</span> <strong class="text-text-primary">Improves timing</strong> — you naturally start watching the ball more closely</li>
							<li class="flex items-start gap-2"><span class="text-ball-yellow">&#9679;</span> <strong class="text-text-primary">Simple and effective</strong> — deceptively powerful despite its simplicity</li>
						</ul>
					</div>
				</div>
			{/if}
		</div>

		<!-- Exercise 4: Green/Yellow Light -->
		<div class="glass-card overflow-hidden">
			<button
				onclick={() => toggleExercise(4)}
				class="w-full text-left p-4 flex items-center gap-4 hover:bg-white/[0.02] transition-colors"
			>
				<div class="w-10 h-10 rounded-lg bg-court-green/15 flex items-center justify-center shrink-0">
					<svg class="w-5 h-5 text-court-green" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
						<rect x="6" y="2" width="12" height="20" rx="3"/><circle cx="12" cy="8" r="2"/><circle cx="12" cy="16" r="2"/>
					</svg>
				</div>
				<div class="flex-1 min-w-0">
					<h3 class="font-bold text-text-primary">Green/Yellow Light System</h3>
					<p class="text-text-secondary text-xs">Automatic response to emotional triggers</p>
				</div>
				<span class="badge bg-court-green/15 text-court-green">Recommended</span>
				<svg class="w-5 h-5 text-text-muted transition-transform duration-200 {activeExercise === 4 ? 'rotate-180' : ''}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
			</button>
			{#if activeExercise === 4}
				<div class="px-4 pb-5 border-t border-white/5 animate-slide-up">
					<div class="pl-14 mt-4">
						<div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
							<div class="glass-card p-4 border-l-2 border-court-green/50">
								<div class="flex items-center gap-2 mb-2">
									<span class="w-4 h-4 rounded-full bg-court-green"></span>
									<h4 class="font-bold text-court-green text-sm">GREEN Light</h4>
								</div>
								<p class="text-text-secondary text-sm mb-2">Your standard, consistent between-point routine.</p>
								<ul class="text-text-secondary text-xs space-y-1 list-disc list-inside">
									<li>Consistent pattern between every point</li>
									<li>Steady breathing rhythm</li>
									<li>Tactical preparation</li>
									<li>Positive, process-focused mindset</li>
								</ul>
							</div>

							<div class="glass-card p-4 border-l-2 border-warning/50">
								<div class="flex items-center gap-2 mb-2">
									<span class="w-4 h-4 rounded-full bg-warning"></span>
									<h4 class="font-bold text-warning text-sm">YELLOW Light</h4>
								</div>
								<p class="text-text-secondary text-sm mb-2">Activated after mistakes or frustration. Enhanced routine:</p>
								<ul class="text-text-secondary text-xs space-y-1 list-disc list-inside">
									<li>Extra pause before next point</li>
									<li>More deliberate, deeper breathing</li>
									<li>Positive self-talk: "let it go", "next point"</li>
									<li>Extended relaxation phase in 16-Second Cure</li>
								</ul>
							</div>
						</div>
						<div class="glass-card p-3 bg-accent-purple/5">
							<p class="text-text-secondary text-xs"><strong class="text-accent-purple">Tip:</strong> The key is recognizing when you shift from Green to Yellow. The earlier you catch the emotional shift, the faster you can activate the enhanced routine and prevent a downward spiral.</p>
						</div>
					</div>
				</div>
			{/if}
		</div>

		<!-- Exercise 5: Pressure Handling -->
		<div class="glass-card overflow-hidden">
			<button
				onclick={() => toggleExercise(5)}
				class="w-full text-left p-4 flex items-center gap-4 hover:bg-white/[0.02] transition-colors"
			>
				<div class="w-10 h-10 rounded-lg bg-accent-red/15 flex items-center justify-center shrink-0">
					<svg class="w-5 h-5 text-accent-red" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
						<path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
					</svg>
				</div>
				<div class="flex-1 min-w-0">
					<h3 class="font-bold text-text-primary">Pressure Handling</h3>
					<p class="text-text-secondary text-xs">Tiebreaks, break points, and match points</p>
				</div>
				<span class="badge bg-accent-red/15 text-accent-red">Essential</span>
				<svg class="w-5 h-5 text-text-muted transition-transform duration-200 {activeExercise === 5 ? 'rotate-180' : ''}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
			</button>
			{#if activeExercise === 5}
				<div class="px-4 pb-5 border-t border-white/5 animate-slide-up">
					<div class="pl-14 mt-4">
						<div class="space-y-4">
							<div class="glass-card p-4 border-l-2 border-accent-purple/50">
								<h4 class="font-bold text-text-primary mb-2">Tiebreaks</h4>
								<ul class="text-text-secondary text-sm space-y-1">
									<li class="flex items-start gap-2"><span class="text-accent-purple">&#9679;</span> <strong class="text-text-primary">Focus beats talent</strong> — the more focused player usually wins</li>
									<li class="flex items-start gap-2"><span class="text-accent-purple">&#9679;</span> Point-by-point mentality — forget the score</li>
									<li class="flex items-start gap-2"><span class="text-accent-purple">&#9679;</span> Percentage tennis — play your safest, highest-percentage shots</li>
									<li class="flex items-start gap-2"><span class="text-accent-purple">&#9679;</span> Stick to your proven patterns — no experiments</li>
								</ul>
							</div>

							<div class="glass-card p-4 border-l-2 border-warning/50">
								<h4 class="font-bold text-text-primary mb-2">Break Points (When Serving)</h4>
								<ul class="text-text-secondary text-sm space-y-1">
									<li class="flex items-start gap-2"><span class="text-warning">&#9679;</span> Go to your <strong class="text-text-primary">best serve</strong></li>
									<li class="flex items-start gap-2"><span class="text-warning">&#9679;</span> <strong class="text-text-primary">Commit fully</strong> — hesitation kills</li>
									<li class="flex items-start gap-2"><span class="text-warning">&#9679;</span> Lockdown mode — extra focus on routine</li>
								</ul>
							</div>

							<div class="glass-card p-4 border-l-2 border-accent-red/50">
								<h4 class="font-bold text-text-primary mb-2">Match Points</h4>
								<ul class="text-text-secondary text-sm space-y-1">
									<li class="flex items-start gap-2"><span class="text-accent-red">&#9679;</span> Recall past successes closing out matches</li>
									<li class="flex items-start gap-2"><span class="text-accent-red">&#9679;</span> Redouble your rituals — be MORE deliberate</li>
									<li class="flex items-start gap-2"><span class="text-accent-red">&#9679;</span> Control the controllable: effort, attitude, process</li>
									<li class="flex items-start gap-2"><span class="text-accent-red">&#9679;</span> <strong class="text-text-primary">Accept nerves as engagement</strong> — reframe anxiety as excitement</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			{/if}
		</div>

		<!-- Exercise 6: Cue Words -->
		<div class="glass-card overflow-hidden">
			<button
				onclick={() => toggleExercise(6)}
				class="w-full text-left p-4 flex items-center gap-4 hover:bg-white/[0.02] transition-colors"
			>
				<div class="w-10 h-10 rounded-lg bg-warning/15 flex items-center justify-center shrink-0">
					<svg class="w-5 h-5 text-warning" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
						<path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
					</svg>
				</div>
				<div class="flex-1 min-w-0">
					<h3 class="font-bold text-text-primary">Cue Words</h3>
					<p class="text-text-secondary text-xs">Personal trigger words for instant mindset shifts</p>
				</div>
				<span class="badge bg-court-green/15 text-court-green">Recommended</span>
				<svg class="w-5 h-5 text-text-muted transition-transform duration-200 {activeExercise === 6 ? 'rotate-180' : ''}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
			</button>
			{#if activeExercise === 6}
				<div class="px-4 pb-5 border-t border-white/5 animate-slide-up">
					<div class="pl-14 mt-4">
						<p class="text-text-secondary text-sm mb-4">Cue words are personal trigger words that instantly shift your mental state. Choose 2-3 that resonate most with you.</p>

						<div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
							{#each [
								{ word: 'FIGHT', use: 'Determination', when: 'When you need to dig deep, fight for every ball', color: 'accent-red' },
								{ word: 'CALM', use: 'Anxiety reduction', when: 'When nerves spike, before big points', color: 'accent-blue' },
								{ word: 'FOCUS', use: 'Concentration', when: 'When mind wanders, after distractions', color: 'accent-purple' },
								{ word: 'MOVE', use: 'Footwork', when: 'When feet get heavy, remind yourself to stay active', color: 'court-green' },
								{ word: 'WATCH', use: 'Ball tracking', when: 'When timing is off, not watching ball to contact', color: 'warning' }
							] as cue}
								<div class="glass-card p-3">
									<p class="text-{cue.color} font-bold text-lg mb-1">"{cue.word}"</p>
									<p class="text-text-primary text-xs font-semibold mb-1">{cue.use}</p>
									<p class="text-text-muted text-xs">{cue.when}</p>
								</div>
							{/each}
						</div>

						<div class="glass-card p-3 bg-accent-purple/5">
							<p class="text-text-secondary text-xs"><strong class="text-accent-purple">Practice tip:</strong> Choose your 2-3 cue words and write them on a piece of tape on your racquet frame. Use them deliberately in practice until they become automatic.</p>
						</div>
					</div>
				</div>
			{/if}
		</div>

		<!-- Exercise 7: Opponent Reading -->
		<div class="glass-card overflow-hidden">
			<button
				onclick={() => toggleExercise(7)}
				class="w-full text-left p-4 flex items-center gap-4 hover:bg-white/[0.02] transition-colors"
			>
				<div class="w-10 h-10 rounded-lg bg-accent-orange/15 flex items-center justify-center shrink-0">
					<svg class="w-5 h-5 text-accent-orange" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
						<circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>
					</svg>
				</div>
				<div class="flex-1 min-w-0">
					<h3 class="font-bold text-text-primary">Opponent Reading</h3>
					<p class="text-text-secondary text-xs">Deliberate observation for warm-up and match</p>
				</div>
				<span class="badge bg-accent-orange/15 text-accent-orange">Supplementary</span>
				<svg class="w-5 h-5 text-text-muted transition-transform duration-200 {activeExercise === 7 ? 'rotate-180' : ''}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
			</button>
			{#if activeExercise === 7}
				<div class="px-4 pb-5 border-t border-white/5 animate-slide-up">
					<div class="pl-14 mt-4">
						<h4 class="text-accent-orange font-bold text-sm mb-3">Warm-Up Observation Checklist</h4>
						<div class="glass-card p-4 mb-4">
							<ul class="text-text-secondary text-sm space-y-2">
								{#each [
									'Which side is stronger — forehand or backhand?',
									'Backhand: slice, topspin, or both?',
									'Movement speed: lateral vs forward/back?',
									'Serve patterns: flat, kick, slice? Preferred side?',
									'Net comfort: confident or avoidant?',
									'Temperament: calm, nervous, aggressive?'
								] as item}
									<li class="flex items-start gap-2"><span class="text-accent-orange">&#9744;</span> {item}</li>
								{/each}
							</ul>
						</div>

						<h4 class="text-accent-orange font-bold text-sm mb-3">During Match</h4>
						<div class="glass-card p-4">
							<ul class="text-text-secondary text-sm space-y-2">
								{#each [
									'Emotional responses to errors — do they get frustrated?',
									'Recovery speed — how fast do they reset mentally?',
									'Serve selection under pressure — big or safe?',
									'Which patterns do they avoid? (reveals weakness)',
									'Physical fatigue signals — slower movement, shorter backswing?'
								] as item}
									<li class="flex items-start gap-2"><span class="text-accent-orange">&#9744;</span> {item}</li>
								{/each}
							</ul>
						</div>
					</div>
				</div>
			{/if}
		</div>
	</div>
</div>

<!-- ===== 4-MONTH MENTAL TOUGHNESS PROGRAM ===== -->
<div class="mb-6">
	<div class="flex items-center gap-2 mb-4">
		<div class="w-8 h-8 rounded-lg bg-court-green/15 flex items-center justify-center">
			<svg class="w-4 h-4 text-court-green" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
				<polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>
			</svg>
		</div>
		<h2 class="text-lg font-bold text-text-primary">4-Month Mental Toughness Program</h2>
	</div>

	<!-- Visual timeline bar -->
	<div class="glass-card p-4 mb-4">
		<div class="flex items-center gap-1">
			{#each [1,2,3,4] as month}
				<button
					onclick={() => toggleMonth(month)}
					aria-label="Month {month}"
					class="flex-1 h-2 rounded-full transition-all duration-200 cursor-pointer
						{expandedMonth === month
							? month === 1 ? 'bg-accent-blue' : month === 2 ? 'bg-warning' : month === 3 ? 'bg-accent-purple' : 'bg-court-green'
							: 'bg-surface-lighter hover:bg-surface-light'}"
				></button>
			{/each}
		</div>
		<div class="flex justify-between mt-2 text-xs text-text-muted">
			<span>Month 1</span>
			<span>Month 2</span>
			<span>Month 3</span>
			<span>Month 4</span>
		</div>
	</div>

	<div class="space-y-3">
		<!-- Month 1 -->
		<div class="glass-card overflow-hidden">
			<button
				onclick={() => toggleMonth(1)}
				class="w-full text-left p-4 flex items-center gap-4 hover:bg-white/[0.02] transition-colors"
			>
				<div class="w-10 h-10 rounded-lg bg-accent-blue/15 flex items-center justify-center shrink-0">
					<span class="text-accent-blue font-bold text-sm">M1</span>
				</div>
				<div class="flex-1 min-w-0">
					<h3 class="font-bold text-text-primary">Month 1: FOUNDATION</h3>
					<p class="text-text-secondary text-xs">Establish routines and daily habits</p>
				</div>
				<svg class="w-5 h-5 text-text-muted transition-transform duration-200 {expandedMonth === 1 ? 'rotate-180' : ''}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
			</button>
			{#if expandedMonth === 1}
				<div class="px-4 pb-5 border-t border-white/5 animate-slide-up">
					<div class="pl-14 mt-4 space-y-3">
						<div class="glass-card p-3 border-l-2 border-accent-blue/50">
							<p class="text-text-primary text-sm font-semibold mb-1">Core Tasks</p>
							<ul class="text-text-secondary text-sm space-y-1 list-disc list-inside">
								<li>Establish a consistent between-point routine</li>
								<li>Start a tennis journal — write after every session/match</li>
								<li>Read <strong class="text-text-primary">"The Inner Game of Tennis"</strong> by Gallwey</li>
								<li>10 minutes of daily visualization (use the timer above)</li>
							</ul>
						</div>
						<div class="glass-card p-3">
							<p class="text-accent-blue text-sm font-semibold mb-2">Weekly Focus</p>
							<div class="grid grid-cols-2 gap-2">
								<div class="bg-surface-light rounded-lg p-2 text-center">
									<p class="text-text-muted text-xs">Week 1</p>
									<p class="text-text-primary text-xs font-semibold">Breathing</p>
								</div>
								<div class="bg-surface-light rounded-lg p-2 text-center">
									<p class="text-text-muted text-xs">Week 2</p>
									<p class="text-text-primary text-xs font-semibold">Cue Words</p>
								</div>
								<div class="bg-surface-light rounded-lg p-2 text-center">
									<p class="text-text-muted text-xs">Week 3</p>
									<p class="text-text-primary text-xs font-semibold">Body Language</p>
								</div>
								<div class="bg-surface-light rounded-lg p-2 text-center">
									<p class="text-text-muted text-xs">Week 4</p>
									<p class="text-text-primary text-xs font-semibold">Full Routine</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			{/if}
		</div>

		<!-- Month 2 -->
		<div class="glass-card overflow-hidden">
			<button
				onclick={() => toggleMonth(2)}
				class="w-full text-left p-4 flex items-center gap-4 hover:bg-white/[0.02] transition-colors"
			>
				<div class="w-10 h-10 rounded-lg bg-warning/15 flex items-center justify-center shrink-0">
					<span class="text-warning font-bold text-sm">M2</span>
				</div>
				<div class="flex-1 min-w-0">
					<h3 class="font-bold text-text-primary">Month 2: PRESSURE</h3>
					<p class="text-text-secondary text-xs">High-pressure practice and stress management</p>
				</div>
				<svg class="w-5 h-5 text-text-muted transition-transform duration-200 {expandedMonth === 2 ? 'rotate-180' : ''}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
			</button>
			{#if expandedMonth === 2}
				<div class="px-4 pb-5 border-t border-white/5 animate-slide-up">
					<div class="pl-14 mt-4 space-y-3">
						<div class="glass-card p-3 border-l-2 border-warning/50">
							<p class="text-text-primary text-sm font-semibold mb-1">Core Tasks</p>
							<ul class="text-text-secondary text-sm space-y-1 list-disc list-inside">
								<li>High-pressure practice scenarios:</li>
								<ul class="ml-5 text-xs space-y-0.5 list-disc list-inside">
									<li>Start sets at 5-5</li>
									<li>Start games at 30-40 on serve</li>
									<li>Practice sets starting down 0-3</li>
								</ul>
								<li>Track mental game in journal with specific ratings</li>
								<li>Read <strong class="text-text-primary">"Winning Ugly"</strong> by Brad Gilbert</li>
								<li>Add pre-match visualization (VAKE method) before every match</li>
							</ul>
						</div>
					</div>
				</div>
			{/if}
		</div>

		<!-- Month 3 -->
		<div class="glass-card overflow-hidden">
			<button
				onclick={() => toggleMonth(3)}
				class="w-full text-left p-4 flex items-center gap-4 hover:bg-white/[0.02] transition-colors"
			>
				<div class="w-10 h-10 rounded-lg bg-accent-purple/15 flex items-center justify-center shrink-0">
					<span class="text-accent-purple font-bold text-sm">M3</span>
				</div>
				<div class="flex-1 min-w-0">
					<h3 class="font-bold text-text-primary">Month 3: COMPETITION</h3>
					<p class="text-text-secondary text-xs">Apply skills in competitive settings</p>
				</div>
				<svg class="w-5 h-5 text-text-muted transition-transform duration-200 {expandedMonth === 3 ? 'rotate-180' : ''}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
			</button>
			{#if expandedMonth === 3}
				<div class="px-4 pb-5 border-t border-white/5 animate-slide-up">
					<div class="pl-14 mt-4 space-y-3">
						<div class="glass-card p-3 border-l-2 border-accent-purple/50">
							<p class="text-text-primary text-sm font-semibold mb-1">Core Tasks</p>
							<ul class="text-text-secondary text-sm space-y-1 list-disc list-inside">
								<li>Practice with stakes — play points that "count" (pushups, sprints for losers)</li>
								<li>Journal both tactical AND mental notes after every match</li>
								<li>Read opponents deliberately using the observation checklist</li>
								<li>Practice mid-match adjustments — change tactics consciously during play</li>
								<li>Read <strong class="text-text-primary">"The Best Tennis of Your Life"</strong> by Greenwald</li>
							</ul>
						</div>
					</div>
				</div>
			{/if}
		</div>

		<!-- Month 4 -->
		<div class="glass-card overflow-hidden">
			<button
				onclick={() => toggleMonth(4)}
				class="w-full text-left p-4 flex items-center gap-4 hover:bg-white/[0.02] transition-colors"
			>
				<div class="w-10 h-10 rounded-lg bg-court-green/15 flex items-center justify-center shrink-0">
					<span class="text-court-green font-bold text-sm">M4</span>
				</div>
				<div class="flex-1 min-w-0">
					<h3 class="font-bold text-text-primary">Month 4: REFINEMENT</h3>
					<p class="text-text-secondary text-xs">Review, refine, and compete</p>
				</div>
				<svg class="w-5 h-5 text-text-muted transition-transform duration-200 {expandedMonth === 4 ? 'rotate-180' : ''}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
			</button>
			{#if expandedMonth === 4}
				<div class="px-4 pb-5 border-t border-white/5 animate-slide-up">
					<div class="pl-14 mt-4 space-y-3">
						<div class="glass-card p-3 border-l-2 border-court-green/50">
							<p class="text-text-primary text-sm font-semibold mb-1">Core Tasks</p>
							<ul class="text-text-secondary text-sm space-y-1 list-disc list-inside">
								<li>Review journal patterns — identify recurring mental weaknesses</li>
								<li>Work on specific mental weaknesses with targeted exercises</li>
								<li>Develop your personal <strong class="text-text-primary">"lockdown mode"</strong> — heightened focus state for big moments</li>
								<li>Compete in tournaments — apply everything in real competition</li>
								<li>Debrief every match: what worked mentally, what didn't, what to adjust</li>
							</ul>
						</div>
					</div>
				</div>
			{/if}
		</div>
	</div>
</div>

<!-- ===== READING LIST ===== -->
<div class="mb-6">
	<button
		onclick={() => showReadingList = !showReadingList}
		class="w-full glass-card p-4 flex items-center gap-4 hover:bg-white/[0.02] transition-colors"
	>
		<div class="w-10 h-10 rounded-lg bg-ball-yellow/15 flex items-center justify-center shrink-0">
			<svg class="w-5 h-5 text-ball-yellow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
				<path d="M4 19.5A2.5 2.5 0 016.5 17H20"/>
				<path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/>
			</svg>
		</div>
		<div class="flex-1 min-w-0 text-left">
			<h2 class="text-lg font-bold text-text-primary">Recommended Reading</h2>
			<p class="text-text-secondary text-xs">10 books for the mental game of tennis</p>
		</div>
		<svg class="w-5 h-5 text-text-muted transition-transform duration-200 {showReadingList ? 'rotate-180' : ''}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
	</button>

	{#if showReadingList}
		<div class="mt-3 space-y-3 animate-slide-up">
			{#each [
				{
					title: 'The Inner Game of Tennis',
					author: 'W. Timothy Gallwey',
					desc: 'The foundational text on the mental game. Explores Self-1 (the critical mind) vs Self-2 (the performing self), and teaches how to quiet the internal critic to let your body play its best tennis.',
					priority: 'essential',
					color: 'accent-red'
				},
				{
					title: 'Winning Ugly',
					author: 'Brad Gilbert',
					desc: 'The tactical bible for competitive players. Shows how to win matches without playing your best tennis — by out-thinking your opponent, adapting your game plan, and making smart decisions under pressure.',
					priority: 'essential',
					color: 'accent-red'
				},
				{
					title: 'Essential Tennis',
					author: 'Ian Westermann',
					desc: 'A modern approach combining technique, strategy, and mindset into one cohesive system. Includes QR codes linking to video demonstrations of each concept.',
					priority: 'essential',
					color: 'accent-red'
				},
				{
					title: 'The Best Tennis of Your Life',
					author: 'Jeff Greenwald',
					desc: '50 practical mental strategies you can implement immediately. Covers everything from pre-match preparation to in-point focus to post-match recovery.',
					priority: 'recommended',
					color: 'accent-orange'
				},
				{
					title: 'Tennis: Winning the Mental Match',
					author: 'Allen Fox',
					desc: 'Written by a former tour player and PhD psychologist. Deep dive into controlling emotions, managing competitive fears, and developing mental resilience on court.',
					priority: 'recommended',
					color: 'accent-orange'
				},
				{
					title: 'Think to Win',
					author: 'Allen Fox',
					desc: 'Focuses on the strategic and mental dimensions of match play. How to think clearly during competition, make good decisions under pressure, and outsmart opponents.',
					priority: 'recommended',
					color: 'accent-orange'
				},
				{
					title: 'Tennis Tactics: Winning Patterns of Play',
					author: 'USTA',
					desc: 'The official USTA guide to point construction. Covers patterns of play for singles and doubles, with detailed diagrams and shot selection frameworks.',
					priority: 'recommended',
					color: 'accent-orange'
				},
				{
					title: 'Mental Toughness Training for Sports',
					author: 'James Loehr',
					desc: 'The original source of the 16-Second Cure and the Ideal Performance State concept. Comprehensive mental training system used by tour professionals.',
					priority: 'essential',
					color: 'accent-red'
				},
				{
					title: 'Tennis Confidence',
					author: 'Patrick Cohn',
					desc: 'Specialized focus on building and maintaining confidence in tournament settings. Practical exercises for overcoming self-doubt and performing under competitive pressure.',
					priority: 'supplementary',
					color: 'accent-blue'
				},
				{
					title: "The Champion's Mind",
					author: 'Jim Afremow',
					desc: 'Sports psychology practical exercises that translate directly to tennis. Covers goal setting, visualization, self-talk, focus training, and building a champion mindset.',
					priority: 'supplementary',
					color: 'accent-blue'
				}
			] as book, i}
				<div class="glass-card p-4 flex items-start gap-4">
					<div class="w-8 h-8 rounded-lg bg-surface-lighter flex items-center justify-center shrink-0 mt-0.5">
						<span class="text-text-muted font-bold text-xs">{i + 1}</span>
					</div>
					<div class="flex-1 min-w-0">
						<div class="flex items-start justify-between gap-2 mb-1">
							<div>
								<h3 class="font-bold text-text-primary text-sm">{book.title}</h3>
								<p class="text-text-muted text-xs">{book.author}</p>
							</div>
							<span class="badge bg-{book.color}/15 text-{book.color} shrink-0 capitalize">{book.priority}</span>
						</div>
						<p class="text-text-secondary text-xs leading-relaxed">{book.desc}</p>
					</div>
				</div>
			{/each}
		</div>
	{/if}
</div>

<!-- Bottom spacer for mobile nav -->
<div class="h-4"></div>
