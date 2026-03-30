<script lang="ts">
	import type { Exercise } from '$lib/data/types';

	let { exercise }: { exercise: Exercise } = $props();

	let expanded = $state(false);

	const levelColors: Record<string, string> = {
		beginner: 'bg-ball-yellow/20 text-ball-yellow',
		intermediate: 'bg-accent-blue/20 text-accent-blue',
		advanced: 'bg-accent-purple/20 text-accent-purple'
	};

	let levelClass = $derived(levelColors[exercise.level] ?? levelColors.beginner);
</script>

<div class="glass-card overflow-hidden transition-all duration-300 {expanded ? 'glow-green' : ''}">
	<!-- Header (always visible) -->
	<button
		class="w-full text-left p-4 flex items-start gap-3 cursor-pointer"
		onclick={() => expanded = !expanded}
	>
		<div class="flex-1 min-w-0">
			<div class="flex items-center gap-2 flex-wrap mb-1">
				<h3 class="text-base font-semibold text-text-primary truncate">{exercise.name}</h3>
				<span class="badge {levelClass}">{exercise.level}</span>
			</div>
			<p class="text-sm text-text-secondary line-clamp-2">{exercise.description}</p>

			<!-- Quick info -->
			<div class="flex items-center gap-4 mt-2 text-xs text-text-muted">
				{#if exercise.sets}
					<span class="flex items-center gap-1">
						<svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<path d="M20 12V8H6a2 2 0 01-2-2c0-1.1.9-2 2-2h12v4"/>
							<path d="M4 6v12c0 1.1.9 2 2 2h14v-4"/>
							<path d="M18 12a2 2 0 000 4h4v-4h-4z"/>
						</svg>
						{exercise.sets} sets
					</span>
				{/if}
				{#if exercise.reps}
					<span class="flex items-center gap-1">
						<svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<polyline points="17 1 21 5 17 9"/>
							<path d="M3 11V9a4 4 0 014-4h14"/>
							<polyline points="7 23 3 19 7 15"/>
							<path d="M21 13v2a4 4 0 01-4 4H3"/>
						</svg>
						{exercise.reps}
					</span>
				{/if}
				{#if exercise.duration}
					<span class="flex items-center gap-1">
						<svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<circle cx="12" cy="12" r="10"/>
							<polyline points="12 6 12 12 16 14"/>
						</svg>
						{exercise.duration}
					</span>
				{/if}
			</div>
		</div>

		<!-- Expand indicator -->
		<div class="flex-shrink-0 mt-1 transition-transform duration-300 {expanded ? 'rotate-180' : ''}">
			<svg class="w-5 h-5 text-text-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
				<polyline points="6 9 12 15 18 9"/>
			</svg>
		</div>
	</button>

	<!-- Expandable content -->
	{#if expanded}
		<div class="px-4 pb-4 animate-slide-up">
			<div class="border-t border-white/5 pt-4 space-y-4">
				<!-- Muscle groups -->
				{#if exercise.muscleGroups?.length}
					<div>
						<h4 class="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">Muscle Groups</h4>
						<div class="flex flex-wrap gap-1.5">
							{#each exercise.muscleGroups as group}
								<span class="px-2.5 py-1 rounded-md bg-court-green/15 text-court-green text-xs font-medium">
									{group}
								</span>
							{/each}
						</div>
					</div>
				{/if}

				<!-- Equipment -->
				{#if exercise.equipment?.length}
					<div>
						<h4 class="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">Equipment</h4>
						<div class="flex flex-wrap gap-1.5">
							{#each exercise.equipment as equip}
								<span class="px-2.5 py-1 rounded-md bg-accent-orange/15 text-accent-orange text-xs font-medium">
									{equip}
								</span>
							{/each}
						</div>
					</div>
				{/if}

				<!-- Instructions -->
				{#if exercise.instructions?.length}
					<div>
						<h4 class="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">Instructions</h4>
						<ol class="space-y-2">
							{#each exercise.instructions as step, i}
								<li class="flex gap-3 text-sm text-text-secondary">
									<span class="flex-shrink-0 w-5 h-5 rounded-full bg-surface-lighter flex items-center justify-center text-xs font-bold text-text-muted">
										{i + 1}
									</span>
									<span>{step}</span>
								</li>
							{/each}
						</ol>
					</div>
				{/if}

				<!-- Tips -->
				{#if exercise.tips?.length}
					<div>
						<h4 class="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">Tips</h4>
						<ul class="space-y-1.5">
							{#each exercise.tips as tip}
								<li class="flex items-start gap-2 text-sm text-text-secondary">
									<svg class="w-4 h-4 text-ball-yellow flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
										<path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
									</svg>
									<span>{tip}</span>
								</li>
							{/each}
						</ul>
					</div>
				{/if}

				<!-- Video link -->
				<a
					href={exercise.videoUrl ?? `https://www.youtube.com/results?search_query=${encodeURIComponent(exercise.name + ' exercise form how to')}`}
					target="_blank"
					rel="noopener noreferrer"
					class="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-accent-red/10 text-accent-red text-sm font-medium hover:bg-accent-red/20 transition-colors"
				>
					<svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
						<path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
					</svg>
					{exercise.videoUrl ? 'Watch Video' : 'Find Video on YouTube'}
				</a>
			</div>
		</div>
	{/if}
</div>

<style>
	.line-clamp-2 {
		display: -webkit-box;
		-webkit-line-clamp: 2;
		line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}
</style>
