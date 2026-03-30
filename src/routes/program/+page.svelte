<script lang="ts">
	import { progressStore } from '$lib/stores/progress.svelte';
	import { settingsStore } from '$lib/stores/settings.svelte';
	import type { SkillAssessment } from '$lib/data/types';

	// ---- Phase data ----

	interface Phase {
		id: number;
		name: string;
		startDate: string;
		endDate: string;
		weekStart: number;
		weekEnd: number;
		objectives: string[];
		focusAreas: string[];
		tennisHours: number;
		fitnessHours: number;
		totalHours: number;
		weeklyStructure: string[];
		color: string;
		bgColor: string;
		borderColor: string;
	}

	const phases: Phase[] = [
		{
			id: 1,
			name: 'Foundation + Competition',
			startDate: 'Mar 29',
			endDate: 'May 10',
			weekStart: 1,
			weekEnd: 6,
			objectives: [
				'Establish consistent training habits',
				'Build baseline fitness with gym and prehab routines',
				'Compete in early-season matches to gauge current level',
				'Develop fundamental movement patterns on court'
			],
			focusAreas: ['Rally consistency', 'Split-step timing', 'Basic serve placement', 'Match play experience'],
			tennisHours: 4,
			fitnessHours: 3,
			totalHours: 7,
			weeklyStructure: [
				'2x tennis training sessions (1.5h each)',
				'1x competitive match',
				'2x gym sessions (45 min each)',
				'Daily prehab + micro-workouts (15 min)',
				'3x footwork sessions (20 min each)'
			],
			color: 'text-court-green',
			bgColor: 'bg-court-green/10',
			borderColor: 'border-court-green/30'
		},
		{
			id: 2,
			name: 'Development',
			startDate: 'May 11',
			endDate: 'Jul 5',
			weekStart: 7,
			weekEnd: 14,
			objectives: [
				'Increase topspin consistency on both wings',
				'Develop approach shot and net play',
				'Build tactical point construction patterns',
				'Increase overall strength and power output'
			],
			focusAreas: ['Topspin development', 'Net approach patterns', 'Tactical awareness', 'Strength gains'],
			tennisHours: 5,
			fitnessHours: 3.5,
			totalHours: 8.5,
			weeklyStructure: [
				'3x tennis training sessions (1.5h each)',
				'1x match or practice set',
				'2x gym sessions (50 min each)',
				'Daily prehab + micro-workouts (15 min)',
				'2x footwork drills (25 min each)'
			],
			color: 'text-accent-blue',
			bgColor: 'bg-accent-blue/10',
			borderColor: 'border-accent-blue/30'
		},
		{
			id: 3,
			name: 'Peak Competition',
			startDate: 'Jul 6',
			endDate: 'Sep 13',
			weekStart: 15,
			weekEnd: 24,
			objectives: [
				'Compete at highest possible level',
				'Apply trained patterns under match pressure',
				'Develop mental toughness in close sets',
				'Maintain fitness without overtraining'
			],
			focusAreas: ['Match performance', 'Mental game', 'Shot variety under pressure', 'Recovery management'],
			tennisHours: 6,
			fitnessHours: 2.5,
			totalHours: 8.5,
			weeklyStructure: [
				'2x focused training sessions (1.5h each)',
				'2x competitive matches',
				'2x maintenance gym sessions (40 min each)',
				'Daily prehab (15 min)',
				'1x light footwork session (20 min)'
			],
			color: 'text-accent-orange',
			bgColor: 'bg-accent-orange/10',
			borderColor: 'border-accent-orange/30'
		},
		{
			id: 4,
			name: 'Off-Season Build',
			startDate: 'Sep 14',
			endDate: 'Dec 6',
			weekStart: 25,
			weekEnd: 37,
			objectives: [
				'Address technical weaknesses identified during competition',
				'Build maximum strength and power',
				'Develop new shot variations',
				'Improve backhand consistency and depth'
			],
			focusAreas: ['Technical refinement', 'Strength building', 'Backhand development', 'Serve power'],
			tennisHours: 4,
			fitnessHours: 4.5,
			totalHours: 8.5,
			weeklyStructure: [
				'2x tennis training sessions (focused drills, 1.5h each)',
				'1x practice match or hitting session',
				'3x gym sessions (50 min each)',
				'Daily prehab + micro-workouts (20 min)',
				'3x footwork sessions (25 min each)'
			],
			color: 'text-accent-purple',
			bgColor: 'bg-accent-purple/10',
			borderColor: 'border-accent-purple/30'
		},
		{
			id: 5,
			name: 'Winter Preparation',
			startDate: 'Dec 7',
			endDate: 'Feb 28',
			weekStart: 38,
			weekEnd: 48,
			objectives: [
				'Peak fitness levels for upcoming season',
				'Refine tactical game plans for different opponents',
				'Build confidence with expanded shot repertoire',
				'Solidify mental routines and between-point habits'
			],
			focusAreas: ['Peak conditioning', 'Tactical versatility', 'Mental routines', 'Serve + return'],
			tennisHours: 5,
			fitnessHours: 3.5,
			totalHours: 8.5,
			weeklyStructure: [
				'3x tennis training sessions (1.5h each)',
				'1x practice set / match simulation',
				'2x gym sessions (50 min each)',
				'Daily prehab + micro-workouts (15 min)',
				'2x footwork sessions (25 min each)'
			],
			color: 'text-accent-blue',
			bgColor: 'bg-accent-blue/10',
			borderColor: 'border-accent-blue/30'
		},
		{
			id: 6,
			name: 'Pre-Season',
			startDate: 'Mar 1',
			endDate: 'Mar 27',
			weekStart: 49,
			weekEnd: 52,
			objectives: [
				'Sharpen match readiness',
				'Fine-tune tactics against upcoming opponents',
				'Taper fitness to fresh legs and explosive movement',
				'Build positive momentum for competition season'
			],
			focusAreas: ['Match sharpness', 'Confidence building', 'Fitness tapering', 'Competition readiness'],
			tennisHours: 6,
			fitnessHours: 2,
			totalHours: 8,
			weeklyStructure: [
				'3x tennis sessions (mix of training and sets)',
				'2x competitive practice matches',
				'1x light gym session (maintenance, 30 min)',
				'Daily prehab (10 min)',
				'1x footwork sharpening session (20 min)'
			],
			color: 'text-ball-yellow',
			bgColor: 'bg-ball-yellow/10',
			borderColor: 'border-ball-yellow/30'
		}
	];

	// ---- Skill gap data ----

	interface SkillGap {
		skill: string;
		key: string;
		current: string;
		target: string;
	}

	const skillGaps: SkillGap[] = [
		{ skill: 'Rally consistency', key: 'rally_consistency', current: '6-10 shots', target: '15-25+ with direction' },
		{ skill: 'Groundstroke depth', key: 'groundstroke_depth', current: 'Random, often short', target: 'Consistent deep placement' },
		{ skill: 'Topspin', key: 'topspin', current: 'Minimal / inconsistent', target: 'Reliable on both wings' },
		{ skill: 'Serve', key: 'serve', current: 'Gets it in', target: 'Placed with spin variation' },
		{ skill: 'Volley', key: 'volley', current: 'Basic, uncomfortable', target: 'Reliable, confident at net' },
		{ skill: 'Footwork', key: 'footwork', current: 'Arriving late', target: 'Sound, balanced, recovers well' },
		{ skill: 'Tactical awareness', key: 'tactical_awareness', current: 'Hits and hopes', target: 'Constructs points with patterns' },
		{ skill: 'Shot variety', key: 'shot_variety', current: '1-2 types per wing', target: '3-4 variations' },
		{ skill: 'Handling pace', key: 'handling_pace', current: 'Struggles with fast balls', target: 'Redirects pace' },
		{ skill: 'Game plan', key: 'game_plan', current: 'One approach for everyone', target: 'Adapts to opponent' },
		{ skill: 'Mental game', key: 'mental_game', current: 'Frustrated by errors', target: 'Manages emotions, stays focused' }
	];

	// ---- Reactive state ----

	let currentWeek = $derived(settingsStore.settings.currentWeek);

	let currentPhase = $derived(
		phases.find((p) => currentWeek >= p.weekStart && currentWeek <= p.weekEnd) ?? phases[0]
	);

	let weekInPhase = $derived(currentWeek - currentPhase.weekStart + 1);
	let phaseWeekCount = $derived(currentPhase.weekEnd - currentPhase.weekStart + 1);
	let overallProgress = $derived(Math.round((currentWeek / 52) * 100));

	// Self-assessment state
	let showAssessment = $state(false);
	let assessmentRatings = $state<Record<string, number>>({});

	function initAssessmentRatings() {
		const ratings: Record<string, number> = {};
		for (const gap of skillGaps) {
			ratings[gap.key] = 5;
		}
		assessmentRatings = ratings;
	}

	function openAssessment() {
		initAssessmentRatings();

		// Pre-fill from last assessment if available
		const recent = progressStore.getRecentAssessments(1);
		if (recent.length > 0) {
			for (const [key, val] of Object.entries(recent[0].skills)) {
				if (key in assessmentRatings) {
					assessmentRatings[key] = val;
				}
			}
		}

		showAssessment = true;
	}

	function closeAssessment() {
		showAssessment = false;
	}

	function submitAssessment() {
		const assessment: SkillAssessment = {
			id: `assess-${Date.now()}`,
			date: new Date().toISOString().split('T')[0],
			skills: { ...assessmentRatings }
		};
		progressStore.addSkillAssessment(assessment);
		showAssessment = false;
	}

	function getPhaseStatus(phase: Phase): 'past' | 'current' | 'future' {
		if (currentWeek > phase.weekEnd) return 'past';
		if (currentWeek >= phase.weekStart && currentWeek <= phase.weekEnd) return 'current';
		return 'future';
	}

	// Last assessment for display
	let lastAssessment = $derived(progressStore.getRecentAssessments(1)[0] ?? null);
</script>

<svelte:head>
	<title>Training Program | TennisEdge</title>
</svelte:head>

<!-- Self-Assessment Modal -->
{#if showAssessment}
	<div class="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
		<div class="glass-card glow-green p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto relative">
			<button
				onclick={closeAssessment}
				class="absolute top-4 right-4 w-8 h-8 rounded-full bg-surface-light flex items-center justify-center text-text-muted hover:text-text-primary transition-colors"
				aria-label="Close assessment"
			>
				<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<line x1="18" y1="6" x2="6" y2="18" />
					<line x1="6" y1="6" x2="18" y2="18" />
				</svg>
			</button>

			<h2 class="text-xl font-bold text-text-primary mb-1">Self-Assessment</h2>
			<p class="text-sm text-text-secondary mb-6">Rate each skill from 1 (beginner) to 10 (expert)</p>

			<div class="space-y-5">
				{#each skillGaps as gap}
					<div>
						<div class="flex items-center justify-between mb-1.5">
							<label for="skill-{gap.key}" class="text-sm font-medium text-text-primary">{gap.skill}</label>
							<span class="text-sm font-bold text-ball-yellow tabular-nums w-6 text-right">
								{assessmentRatings[gap.key] ?? 5}
							</span>
						</div>
						<input
							id="skill-{gap.key}"
							type="range"
							min="1"
							max="10"
							step="1"
							bind:value={assessmentRatings[gap.key]}
							class="w-full accent-ball-yellow h-2 bg-surface-lighter rounded-lg appearance-none cursor-pointer"
						/>
						<div class="flex justify-between text-[10px] text-text-muted mt-0.5">
							<span>1</span>
							<span>5</span>
							<span>10</span>
						</div>
					</div>
				{/each}
			</div>

			<div class="flex gap-3 mt-8">
				<button
					onclick={closeAssessment}
					class="flex-1 px-4 py-2.5 rounded-lg bg-surface-light text-text-secondary hover:text-text-primary text-sm font-medium transition-colors"
				>
					Cancel
				</button>
				<button
					onclick={submitAssessment}
					class="flex-1 px-4 py-2.5 rounded-lg bg-ball-yellow text-surface-card text-sm font-bold hover:bg-ball-yellow-dim transition-colors shadow-lg shadow-ball-yellow/20"
				>
					Save Assessment
				</button>
			</div>
		</div>
	</div>
{/if}

<div class="space-y-8 animate-slide-up">
	<!-- Header -->
	<div class="glass-card glow-green p-6">
		<div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
			<div>
				<h1 class="text-3xl font-bold text-text-primary tracking-tight">
					Your Path: <span class="text-ball-yellow">KNLTB 7</span>
					<svg class="inline w-6 h-6 text-text-muted mx-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<line x1="5" y1="12" x2="19" y2="12" />
						<polyline points="12 5 19 12 12 19" />
					</svg>
					<span class="text-court-green">5</span>
				</h1>
				<p class="text-text-secondary mt-1">52-week periodized training program</p>
			</div>

			<!-- Big progress circle -->
			<div class="flex items-center gap-4">
				<div class="relative w-20 h-20">
					<svg class="w-20 h-20 -rotate-90" viewBox="0 0 80 80">
						<circle cx="40" cy="40" r="34" fill="none" stroke="var(--color-surface-lighter)" stroke-width="6" />
						<circle
							cx="40"
							cy="40"
							r="34"
							fill="none"
							stroke="var(--color-ball-yellow)"
							stroke-width="6"
							stroke-linecap="round"
							stroke-dasharray={2 * Math.PI * 34}
							stroke-dashoffset={2 * Math.PI * 34 * (1 - overallProgress / 100)}
							style="filter: drop-shadow(0 0 4px rgba(204, 255, 0, 0.3));"
						/>
					</svg>
					<div class="absolute inset-0 flex flex-col items-center justify-center">
						<span class="text-lg font-bold text-text-primary tabular-nums">{currentWeek}</span>
						<span class="text-[10px] text-text-muted">of 52</span>
					</div>
				</div>
				<div class="text-sm">
					<p class="text-text-secondary">Week {currentWeek}</p>
					<p class="text-text-muted">{overallProgress}% complete</p>
				</div>
			</div>
		</div>
	</div>

	<!-- Phase Timeline -->
	<div>
		<h2 class="text-lg font-bold text-text-primary mb-4">Phase Timeline</h2>
		<div class="glass-card p-4 overflow-x-auto">
			<div class="flex gap-1 min-w-[600px]">
				{#each phases as phase}
					{@const status = getPhaseStatus(phase)}
					{@const widthPercent = ((phase.weekEnd - phase.weekStart + 1) / 52) * 100}
					<div
						class="relative rounded-lg p-3 transition-all duration-300 flex-shrink-0
							{status === 'current'
								? `${phase.bgColor} ${phase.borderColor} border-2 shadow-lg`
								: status === 'past'
									? 'bg-surface-light/50 border border-white/5 opacity-60'
									: 'bg-surface-light border border-white/5'}"
						style="width: {widthPercent}%;"
					>
						{#if status === 'current'}
							<div class="absolute -top-2 left-1/2 -translate-x-1/2">
								<span class="badge bg-ball-yellow text-surface-card text-[9px] shadow-lg shadow-ball-yellow/20">NOW</span>
							</div>
						{/if}
						<p class="text-[10px] font-bold {status === 'current' ? phase.color : 'text-text-secondary'} truncate">
							{phase.name}
						</p>
						<p class="text-[9px] text-text-muted mt-0.5">W{phase.weekStart}-{phase.weekEnd}</p>
					</div>
				{/each}
			</div>
			<!-- Progress indicator line -->
			<div class="mt-3 relative">
				<div class="progress-bar">
					<div
						class="progress-bar-fill bg-ball-yellow"
						style="width: {overallProgress}%;"
					></div>
				</div>
			</div>
		</div>
	</div>

	<!-- Current Phase Detail -->
	<div class="glass-card glow-green p-6 border {currentPhase.borderColor}">
		<div class="flex items-center gap-3 mb-4">
			<div class="w-10 h-10 rounded-xl {currentPhase.bgColor} flex items-center justify-center">
				<svg class="w-5 h-5 {currentPhase.color}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
				</svg>
			</div>
			<div>
				<h2 class="text-xl font-bold text-text-primary">Phase {currentPhase.id}: {currentPhase.name}</h2>
				<p class="text-sm text-text-secondary">
					{currentPhase.startDate} - {currentPhase.endDate}
					<span class="text-text-muted mx-1">|</span>
					Week {weekInPhase} of {phaseWeekCount}
				</p>
			</div>
		</div>

		<!-- Phase progress bar -->
		<div class="mb-6">
			<div class="flex justify-between text-xs text-text-muted mb-1">
				<span>Phase progress</span>
				<span>{Math.round((weekInPhase / phaseWeekCount) * 100)}%</span>
			</div>
			<div class="progress-bar">
				<div
					class="progress-bar-fill bg-gradient-to-r from-court-green to-ball-yellow"
					style="width: {(weekInPhase / phaseWeekCount) * 100}%;"
				></div>
			</div>
		</div>

		<div class="grid gap-6 md:grid-cols-2">
			<!-- Objectives -->
			<div>
				<h3 class="text-sm font-semibold text-text-muted uppercase tracking-wider mb-3">Key Objectives</h3>
				<ul class="space-y-2">
					{#each currentPhase.objectives as obj}
						<li class="flex items-start gap-2 text-sm text-text-secondary">
							<svg class="w-4 h-4 text-court-green flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
								<circle cx="12" cy="12" r="10" />
								<polyline points="12 6 12 12 16 14" />
							</svg>
							<span>{obj}</span>
						</li>
					{/each}
				</ul>
			</div>

			<!-- Weekly structure -->
			<div>
				<h3 class="text-sm font-semibold text-text-muted uppercase tracking-wider mb-3">Weekly Structure</h3>
				<ul class="space-y-2">
					{#each currentPhase.weeklyStructure as item}
						<li class="flex items-start gap-2 text-sm text-text-secondary">
							<svg class="w-4 h-4 text-ball-yellow flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
								<polyline points="20 6 9 17 4 12" />
							</svg>
							<span>{item}</span>
						</li>
					{/each}
				</ul>
			</div>
		</div>

		<!-- Hours breakdown -->
		<div class="mt-6 flex flex-wrap gap-4">
			<div class="flex-1 min-w-[120px] bg-surface-light rounded-xl p-4 text-center">
				<p class="text-2xl font-bold text-court-green">{currentPhase.tennisHours}h</p>
				<p class="text-xs text-text-muted mt-1">Tennis / week</p>
			</div>
			<div class="flex-1 min-w-[120px] bg-surface-light rounded-xl p-4 text-center">
				<p class="text-2xl font-bold text-accent-blue">{currentPhase.fitnessHours}h</p>
				<p class="text-xs text-text-muted mt-1">Fitness / week</p>
			</div>
			<div class="flex-1 min-w-[120px] bg-surface-light rounded-xl p-4 text-center">
				<p class="text-2xl font-bold text-ball-yellow">{currentPhase.totalHours}h</p>
				<p class="text-xs text-text-muted mt-1">Total / week</p>
			</div>
		</div>

		<!-- Focus areas -->
		<div class="mt-6">
			<h3 class="text-sm font-semibold text-text-muted uppercase tracking-wider mb-3">Focus Areas</h3>
			<div class="flex flex-wrap gap-2">
				{#each currentPhase.focusAreas as area}
					<span class="px-3 py-1.5 rounded-lg bg-surface-light text-sm text-text-secondary border border-white/5">
						{area}
					</span>
				{/each}
			</div>
		</div>
	</div>

	<!-- All Phases Overview -->
	<div>
		<h2 class="text-lg font-bold text-text-primary mb-4">All Phases</h2>
		<div class="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
			{#each phases as phase}
				{@const status = getPhaseStatus(phase)}
				<div
					class="glass-card p-5 transition-all duration-300
						{status === 'current'
							? `${phase.borderColor} border-2 glow-green`
							: status === 'past'
								? 'opacity-60'
								: ''}"
				>
					<!-- Phase header -->
					<div class="flex items-center justify-between mb-3">
						<div class="flex items-center gap-2">
							<span class="w-7 h-7 rounded-lg {phase.bgColor} flex items-center justify-center text-xs font-bold {phase.color}">
								{phase.id}
							</span>
							<div>
								<h3 class="text-sm font-bold {status === 'current' ? phase.color : 'text-text-primary'}">{phase.name}</h3>
								<p class="text-[10px] text-text-muted">{phase.startDate} - {phase.endDate}</p>
							</div>
						</div>
						{#if status === 'current'}
							<span class="badge bg-ball-yellow/20 text-ball-yellow text-[10px]">Current</span>
						{:else if status === 'past'}
							<span class="badge bg-surface-lighter text-text-muted text-[10px]">Done</span>
						{:else}
							<span class="badge bg-surface-lighter text-text-muted text-[10px]">
								W{phase.weekStart}-{phase.weekEnd}
							</span>
						{/if}
					</div>

					<!-- Duration -->
					<p class="text-xs text-text-muted mb-3">
						{phase.weekEnd - phase.weekStart + 1} weeks
					</p>

					<!-- Focus areas -->
					<ul class="space-y-1.5 mb-4">
						{#each phase.focusAreas as area}
							<li class="flex items-center gap-2 text-xs text-text-secondary">
								<span class="w-1 h-1 rounded-full {status === 'current' ? 'bg-ball-yellow' : 'bg-text-muted'} flex-shrink-0"></span>
								{area}
							</li>
						{/each}
					</ul>

					<!-- Hours -->
					<div class="flex gap-2 text-[10px]">
						<span class="px-2 py-1 rounded-md bg-court-green/10 text-court-green font-semibold">
							Tennis {phase.tennisHours}h
						</span>
						<span class="px-2 py-1 rounded-md bg-accent-blue/10 text-accent-blue font-semibold">
							Fitness {phase.fitnessHours}h
						</span>
						<span class="px-2 py-1 rounded-md bg-surface-lighter text-text-muted font-semibold">
							Total {phase.totalHours}h
						</span>
					</div>
				</div>
			{/each}
		</div>
	</div>

	<!-- Skill Gap Table -->
	<div>
		<div class="flex items-center justify-between mb-4 flex-wrap gap-3">
			<div>
				<h2 class="text-lg font-bold text-text-primary">KNLTB 7 &rarr; 5 Skill Gap</h2>
				<p class="text-sm text-text-secondary">11 dimensions to bridge</p>
			</div>
			<button
				onclick={openAssessment}
				class="px-4 py-2.5 rounded-lg bg-ball-yellow text-surface-card text-sm font-bold hover:bg-ball-yellow-dim transition-colors shadow-lg shadow-ball-yellow/20 flex items-center gap-2"
			>
				<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
					<path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
				</svg>
				Self-Assessment
			</button>
		</div>

		<div class="glass-card overflow-hidden">
			<!-- Table header -->
			<div class="hidden sm:grid grid-cols-[1fr_1fr_1fr] gap-4 px-5 py-3 bg-surface-light/50 border-b border-white/5">
				<span class="text-xs font-semibold text-text-muted uppercase tracking-wider">Skill</span>
				<span class="text-xs font-semibold text-text-muted uppercase tracking-wider">Level 7 (Current)</span>
				<span class="text-xs font-semibold text-text-muted uppercase tracking-wider">Level 5 (Target)</span>
			</div>

			<!-- Table rows -->
			{#each skillGaps as gap, i}
				<div
					class="grid grid-cols-1 sm:grid-cols-[1fr_1fr_1fr] gap-1 sm:gap-4 px-5 py-3.5 border-b border-white/5 last:border-b-0
						{i % 2 === 0 ? '' : 'bg-surface-light/20'}"
				>
					<div class="flex items-center gap-2">
						<span class="text-sm font-semibold text-text-primary">{gap.skill}</span>
						{#if lastAssessment?.skills[gap.key]}
							<span class="badge bg-ball-yellow/15 text-ball-yellow text-[10px]">
								{lastAssessment.skills[gap.key]}/10
							</span>
						{/if}
					</div>
					<div class="sm:flex sm:items-center">
						<span class="text-xs sm:text-sm text-text-muted sm:hidden font-semibold">Current: </span>
						<span class="text-sm text-accent-red">{gap.current}</span>
					</div>
					<div class="sm:flex sm:items-center">
						<span class="text-xs sm:text-sm text-text-muted sm:hidden font-semibold">Target: </span>
						<span class="text-sm text-court-green">{gap.target}</span>
					</div>
				</div>
			{/each}
		</div>

		{#if lastAssessment}
			<p class="text-xs text-text-muted mt-2 text-right">
				Last assessment: {lastAssessment.date}
			</p>
		{/if}
	</div>

	<!-- Week Navigator -->
	<div class="glass-card p-4">
		<div class="flex items-center justify-between">
			<span class="text-sm text-text-secondary">Adjust current week</span>
			<div class="flex items-center gap-3">
				<button
					onclick={() => settingsStore.setWeek(currentWeek - 1)}
					disabled={currentWeek <= 1}
					class="w-8 h-8 rounded-lg bg-surface-light flex items-center justify-center text-text-muted hover:text-text-primary disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
					aria-label="Previous week"
				>
					<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<polyline points="15 18 9 12 15 6" />
					</svg>
				</button>
				<span class="text-lg font-bold text-text-primary tabular-nums w-16 text-center">
					Week {currentWeek}
				</span>
				<button
					onclick={() => settingsStore.setWeek(currentWeek + 1)}
					disabled={currentWeek >= 52}
					class="w-8 h-8 rounded-lg bg-surface-light flex items-center justify-center text-text-muted hover:text-text-primary disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
					aria-label="Next week"
				>
					<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<polyline points="9 18 15 12 9 6" />
					</svg>
				</button>
			</div>
		</div>
	</div>
</div>

<style>
	input[type='range'] {
		-webkit-appearance: none;
		appearance: none;
		height: 6px;
		border-radius: 3px;
		background: var(--color-surface-lighter);
		outline: none;
	}

	input[type='range']::-webkit-slider-thumb {
		-webkit-appearance: none;
		appearance: none;
		width: 18px;
		height: 18px;
		border-radius: 50%;
		background: var(--color-ball-yellow);
		cursor: pointer;
		box-shadow: 0 0 8px rgba(204, 255, 0, 0.3);
	}

	input[type='range']::-moz-range-thumb {
		width: 18px;
		height: 18px;
		border-radius: 50%;
		background: var(--color-ball-yellow);
		cursor: pointer;
		border: none;
		box-shadow: 0 0 8px rgba(204, 255, 0, 0.3);
	}
</style>
