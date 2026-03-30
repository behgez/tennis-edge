<script lang="ts">
	import { allExercises, exercisesByCategory } from '$lib/data/exercises';
	import type { Exercise } from '$lib/data/types';
	import ExerciseCard from '$lib/components/ExerciseCard.svelte';
	import Timer from '$lib/components/Timer.svelte';

	// Search and filter state
	let searchQuery = $state('');
	let selectedMainGroup = $state('All');
	let selectedLevel = $state('All');

	// Timer overlay state
	let timerExercise = $state<Exercise | null>(null);
	let timerDuration = $state(60);

	// Category grouping
	const categoryGroups: Record<string, string[]> = {
		'Gym Workouts': ['GYM_LOWER_BODY', 'GYM_CORE', 'GYM_UPPER_BODY', 'GYM_WRIST_FOREARM', 'GYM_POWER'],
		'Home Workouts': ['HOME_LOWER', 'HOME_UPPER', 'HOME_CORE'],
		'Warm-up': ['WARMUP'],
		'Prehab': ['PREHAB_SHOULDER', 'PREHAB_ELBOW', 'PREHAB_KNEE', 'PREHAB_CALF'],
		'Footwork': ['FOOTWORK'],
		'Flexibility': ['FLEXIBILITY'],
		'Micro-Workouts': ['MICRO_A', 'MICRO_B', 'MICRO_C', 'MICRO_D', 'MICRO_E']
	};

	// Human-readable category labels
	const categoryLabels: Record<string, string> = {
		GYM_LOWER_BODY: 'Lower Body',
		GYM_CORE: 'Core',
		GYM_UPPER_BODY: 'Upper Body',
		GYM_WRIST_FOREARM: 'Wrist & Forearm',
		GYM_POWER: 'Power',
		HOME_LOWER: 'Lower Body',
		HOME_UPPER: 'Upper Body',
		HOME_CORE: 'Core',
		WARMUP: 'Warm-up Routine',
		PREHAB_SHOULDER: 'Shoulder',
		PREHAB_ELBOW: 'Elbow',
		PREHAB_KNEE: 'Knee',
		PREHAB_CALF: 'Calf',
		FOOTWORK: 'Footwork Drills',
		FLEXIBILITY: 'Flexibility & Mobility',
		MICRO_A: 'A: Lower Body',
		MICRO_B: 'B: Shoulder',
		MICRO_C: 'C: Wrist',
		MICRO_D: 'D: Core',
		MICRO_E: 'E: Mobility'
	};

	// Group icons/emotes for section headers
	const groupIcons: Record<string, string> = {
		'Gym Workouts': 'M6.5 6.5h11M6 3h1v18H6a1 1 0 01-1-1V4a1 1 0 011-1zM17 3h1a1 1 0 011 1v16a1 1 0 01-1 1h-1V3zM3 7h2v10H3a1 1 0 01-1-1V8a1 1 0 011-1zM19 7h2a1 1 0 011 1v8a1 1 0 01-1 1h-2V7z',
		'Home Workouts': 'M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z',
		'Warm-up': 'M13 2L3 14h9l-1 8 10-12h-9l1-8z',
		'Prehab': 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
		'Footwork': 'M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10M20 16V8a1 1 0 00-1-1h-5',
		'Flexibility': 'M4 12a8 8 0 0116 0M12 4v16M8 8l4 4 4-4',
		'Micro-Workouts': 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
	};

	const groupColors: Record<string, string> = {
		'Gym Workouts': 'text-accent-blue',
		'Home Workouts': 'text-court-green',
		'Warm-up': 'text-accent-orange',
		'Prehab': 'text-accent-purple',
		'Footwork': 'text-ball-yellow',
		'Flexibility': 'text-court-green',
		'Micro-Workouts': 'text-accent-red'
	};

	const groupBorderColors: Record<string, string> = {
		'Gym Workouts': 'border-accent-blue/30',
		'Home Workouts': 'border-court-green/30',
		'Warm-up': 'border-accent-orange/30',
		'Prehab': 'border-accent-purple/30',
		'Footwork': 'border-ball-yellow/30',
		'Flexibility': 'border-court-green/30',
		'Micro-Workouts': 'border-accent-red/30'
	};

	const mainGroups = ['All', 'Gym', 'Home', 'Warm-up', 'Prehab', 'Footwork', 'Flexibility', 'Micro-Workouts'];
	const levels = ['All', 'beginner', 'intermediate', 'advanced'];

	// Map main group filter names to categoryGroups keys
	const mainGroupMapping: Record<string, string> = {
		'Gym': 'Gym Workouts',
		'Home': 'Home Workouts',
		'Warm-up': 'Warm-up',
		'Prehab': 'Prehab',
		'Footwork': 'Footwork',
		'Flexibility': 'Flexibility',
		'Micro-Workouts': 'Micro-Workouts'
	};

	// Collapsed sections state
	let collapsedSections = $state<Record<string, boolean>>({});

	function toggleSection(key: string) {
		collapsedSections[key] = !collapsedSections[key];
	}

	// Filter exercises
	let filteredExercises = $derived.by(() => {
		let result = allExercises;

		// Search filter
		if (searchQuery.trim()) {
			const q = searchQuery.toLowerCase();
			result = result.filter(
				(ex) =>
					ex.name.toLowerCase().includes(q) ||
					ex.description.toLowerCase().includes(q) ||
					ex.muscleGroups.some((mg) => mg.toLowerCase().includes(q)) ||
					ex.equipment.some((eq) => eq.toLowerCase().includes(q))
			);
		}

		// Level filter
		if (selectedLevel !== 'All') {
			result = result.filter((ex) => ex.level === selectedLevel);
		}

		return result;
	});

	// Get categories for the selected main group
	let activeGroupKeys = $derived.by(() => {
		if (selectedMainGroup === 'All') {
			return Object.keys(categoryGroups);
		}
		const mapped = mainGroupMapping[selectedMainGroup];
		return mapped ? [mapped] : Object.keys(categoryGroups);
	});

	// Build grouped data for display
	let groupedData = $derived.by(() => {
		const groups: Array<{
			groupName: string;
			categories: Array<{
				categoryKey: string;
				label: string;
				exercises: Exercise[];
			}>;
			totalCount: number;
		}> = [];

		for (const groupName of activeGroupKeys) {
			const cats = categoryGroups[groupName];
			if (!cats) continue;

			const categoryData: Array<{
				categoryKey: string;
				label: string;
				exercises: Exercise[];
			}> = [];

			let groupTotal = 0;

			for (const cat of cats) {
				const catExercises = filteredExercises.filter((ex) => ex.category === cat);
				if (catExercises.length > 0) {
					categoryData.push({
						categoryKey: cat,
						label: categoryLabels[cat] ?? cat,
						exercises: catExercises
					});
					groupTotal += catExercises.length;
				}
			}

			if (categoryData.length > 0) {
				groups.push({
					groupName,
					categories: categoryData,
					totalCount: groupTotal
				});
			}
		}

		return groups;
	});

	let totalFiltered = $derived(filteredExercises.length);

	function parseDurationToSeconds(duration: string): number {
		const lower = duration.toLowerCase().trim();
		// Try "X min" pattern
		const minMatch = lower.match(/(\d+)\s*min/);
		if (minMatch) return parseInt(minMatch[1]) * 60;
		// Try "X sec" or "X seconds"
		const secMatch = lower.match(/(\d+)\s*sec/);
		if (secMatch) return parseInt(secMatch[1]);
		// Try "Xm" pattern
		const mMatch = lower.match(/^(\d+)m$/);
		if (mMatch) return parseInt(mMatch[1]) * 60;
		return 60; // default 1 minute
	}

	function openTimer(exercise: Exercise) {
		timerDuration = parseDurationToSeconds(exercise.duration);
		timerExercise = exercise;
	}

	function closeTimer() {
		timerExercise = null;
	}
</script>

<svelte:head>
	<title>Exercise Library | TennisEdge</title>
</svelte:head>

<!-- Timer Modal -->
{#if timerExercise}
	<div class="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
		<div class="glass-card glow-green p-8 max-w-sm w-full relative">
			<button
				onclick={closeTimer}
				class="absolute top-4 right-4 w-8 h-8 rounded-full bg-surface-light flex items-center justify-center text-text-muted hover:text-text-primary transition-colors"
				aria-label="Close timer"
			>
				<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<line x1="18" y1="6" x2="6" y2="18" />
					<line x1="6" y1="6" x2="18" y2="18" />
				</svg>
			</button>
			<Timer duration={timerDuration} label={timerExercise.name} />
		</div>
	</div>
{/if}

<div class="space-y-6 animate-slide-up">
	<!-- Header -->
	<div class="flex items-end justify-between gap-4 flex-wrap">
		<div>
			<h1 class="text-3xl font-bold text-text-primary tracking-tight">Exercise Library</h1>
			<p class="text-text-secondary mt-1">
				{totalFiltered} exercise{totalFiltered !== 1 ? 's' : ''}
				{#if totalFiltered !== allExercises.length}
					<span class="text-text-muted">of {allExercises.length} total</span>
				{/if}
			</p>
		</div>
		<div class="flex items-center gap-2 text-sm text-text-muted">
			<svg class="w-4 h-4 text-ball-yellow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
				<circle cx="12" cy="12" r="10" />
				<path d="M2.5 12c3 0 5.5-2.5 5.5-5.5M16 21.5c0-3-2.5-5.5-5.5-5.5M21.5 12c-3 0-5.5 2.5-5.5 5.5M8 2.5c0 3 2.5 5.5 5.5 5.5" />
			</svg>
			TennisEdge
		</div>
	</div>

	<!-- Filter Bar -->
	<div class="glass-card p-4 space-y-4">
		<!-- Search -->
		<div class="relative">
			<svg
				class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted pointer-events-none"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
			>
				<circle cx="11" cy="11" r="8" />
				<line x1="21" y1="21" x2="16.65" y2="16.65" />
			</svg>
			<input
				type="text"
				bind:value={searchQuery}
				placeholder="Search exercises, muscles, equipment..."
				class="w-full bg-surface-light border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-sm text-text-primary placeholder-text-muted focus:outline-none focus:border-ball-yellow/50 focus:ring-1 focus:ring-ball-yellow/20 transition-colors"
			/>
			{#if searchQuery}
				<button
					onclick={() => (searchQuery = '')}
					class="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary transition-colors"
					aria-label="Clear search"
				>
					<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<line x1="18" y1="6" x2="6" y2="18" />
						<line x1="6" y1="6" x2="18" y2="18" />
					</svg>
				</button>
			{/if}
		</div>

		<!-- Category pills -->
		<div>
			<span class="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2 block">Category</span>
			<div class="flex flex-wrap gap-2">
				{#each mainGroups as group}
					<button
						onclick={() => (selectedMainGroup = group)}
						class="px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200
							{selectedMainGroup === group
								? 'bg-ball-yellow text-surface-card shadow-lg shadow-ball-yellow/20'
								: 'bg-surface-light text-text-secondary hover:bg-surface-lighter hover:text-text-primary border border-white/5'}"
					>
						{group}
					</button>
				{/each}
			</div>
		</div>

		<!-- Level pills -->
		<div>
			<span class="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2 block">Level</span>
			<div class="flex flex-wrap gap-2">
				{#each levels as level}
					{@const levelColorMap: Record<string, string> = {
						beginner: selectedLevel === level ? 'bg-ball-yellow text-surface-card shadow-lg shadow-ball-yellow/20' : '',
						intermediate: selectedLevel === level ? 'bg-accent-blue text-surface-card shadow-lg shadow-accent-blue/20' : '',
						advanced: selectedLevel === level ? 'bg-accent-purple text-surface-card shadow-lg shadow-accent-purple/20' : '',
						All: selectedLevel === level ? 'bg-ball-yellow text-surface-card shadow-lg shadow-ball-yellow/20' : ''
					}}
					<button
						onclick={() => (selectedLevel = level)}
						class="px-3 py-1.5 rounded-full text-xs font-semibold capitalize transition-all duration-200
							{selectedLevel === level
								? levelColorMap[level]
								: 'bg-surface-light text-text-secondary hover:bg-surface-lighter hover:text-text-primary border border-white/5'}"
					>
						{level === 'All' ? 'All Levels' : level}
					</button>
				{/each}
			</div>
		</div>
	</div>

	<!-- No results -->
	{#if groupedData.length === 0}
		<div class="glass-card p-12 text-center">
			<svg class="w-16 h-16 mx-auto text-text-muted mb-4 opacity-50" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
				<circle cx="11" cy="11" r="8" />
				<line x1="21" y1="21" x2="16.65" y2="16.65" />
				<line x1="8" y1="8" x2="14" y2="14" />
				<line x1="14" y1="8" x2="8" y2="14" />
			</svg>
			<p class="text-text-secondary text-lg font-medium">No exercises found</p>
			<p class="text-text-muted text-sm mt-1">Try adjusting your search or filters</p>
			<button
				onclick={() => { searchQuery = ''; selectedMainGroup = 'All'; selectedLevel = 'All'; }}
				class="mt-4 px-4 py-2 rounded-lg bg-surface-light text-text-secondary hover:text-text-primary text-sm font-medium transition-colors"
			>
				Clear all filters
			</button>
		</div>
	{/if}

	<!-- Grouped exercise sections -->
	{#each groupedData as group}
		<section class="space-y-4">
			<!-- Group header -->
			<div class="flex items-center gap-3">
				<div class="w-10 h-10 rounded-xl bg-surface-light flex items-center justify-center {groupColors[group.groupName] ?? 'text-text-muted'}">
					<svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<path d={groupIcons[group.groupName] ?? 'M12 2v20M2 12h20'} />
					</svg>
				</div>
				<div>
					<h2 class="text-xl font-bold text-text-primary">{group.groupName}</h2>
					<p class="text-xs text-text-muted">{group.totalCount} exercise{group.totalCount !== 1 ? 's' : ''}</p>
				</div>
			</div>

			<!-- Sub-categories within this group -->
			{#each group.categories as cat}
				{@const sectionKey = `${group.groupName}-${cat.categoryKey}`}
				{@const isCollapsed = collapsedSections[sectionKey] ?? false}

				<div class="ml-2 border-l-2 pl-4 {groupBorderColors[group.groupName] ?? 'border-white/10'}">
					<!-- Sub-category header -->
					<button
						onclick={() => toggleSection(sectionKey)}
						class="w-full flex items-center justify-between py-2 group cursor-pointer"
					>
						<div class="flex items-center gap-2">
							<h3 class="text-sm font-semibold text-text-secondary group-hover:text-text-primary transition-colors">
								{cat.label}
							</h3>
							<span class="badge bg-surface-lighter text-text-muted text-[10px]">{cat.exercises.length}</span>
						</div>
						<svg
							class="w-4 h-4 text-text-muted transition-transform duration-200 {isCollapsed ? '' : 'rotate-180'}"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
						>
							<polyline points="6 9 12 15 18 9" />
						</svg>
					</button>

					<!-- Exercise cards -->
					{#if !isCollapsed}
						<div class="space-y-2 pb-4">
							{#each cat.exercises as exercise (exercise.id)}
								<div class="relative">
									<ExerciseCard {exercise} />
									<!-- Timer button for timed exercises -->
									{#if exercise.duration}
										<button
											onclick={() => openTimer(exercise)}
											class="absolute top-4 right-12 p-1.5 rounded-lg bg-ball-yellow/10 text-ball-yellow hover:bg-ball-yellow/20 transition-colors"
											aria-label="Start timer for {exercise.name}"
											title="Start Timer"
										>
											<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
												<circle cx="12" cy="12" r="10" />
												<polyline points="12 6 12 12 16 14" />
											</svg>
										</button>
									{/if}
								</div>
							{/each}
						</div>
					{/if}
				</div>
			{/each}
		</section>
	{/each}
</div>
