<script lang="ts">
	import { progressStore } from '$lib/stores/progress.svelte';

	let {
		items,
		date,
		category
	}: {
		items: { id: string; label: string; description?: string }[];
		date: string;
		category: string;
	} = $props();

	let completionRate = $derived(
		progressStore.getCompletionRate(date, items.length)
	);

	function activityId(itemId: string): string {
		return `${category}::${itemId}`;
	}

	function isChecked(itemId: string): boolean {
		return progressStore.isCompleted(date, activityId(itemId));
	}

	function toggle(itemId: string): void {
		progressStore.toggleActivity(date, activityId(itemId));
	}
</script>

<div class="space-y-3">
	<!-- Completion header -->
	<div class="flex items-center justify-between mb-1">
		<span class="text-sm font-medium text-text-secondary">
			{progressStore.getCompletedForDate(date).filter(id => id.startsWith(category + '::')).length}/{items.length} completed
		</span>
		<span class="text-sm font-bold {completionRate === 100 ? 'text-success' : 'text-ball-yellow'}">
			{completionRate}%
		</span>
	</div>

	<!-- Progress bar -->
	<div class="progress-bar">
		<div
			class="progress-bar-fill {completionRate === 100 ? 'bg-success' : 'bg-ball-yellow'}"
			style="width: {completionRate}%"
		></div>
	</div>

	<!-- Items -->
	<ul class="space-y-1.5 mt-3">
		{#each items as item (item.id)}
			{@const checked = isChecked(item.id)}
			<li>
				<button
					onclick={() => toggle(item.id)}
					class="w-full flex items-start gap-3 p-3 rounded-lg text-left transition-all duration-200
						{checked
							? 'bg-success/5 border border-success/10'
							: 'bg-surface-light/50 border border-transparent hover:bg-surface-light hover:border-white/5'}"
				>
					<!-- Checkbox -->
					<span
						class="flex-shrink-0 w-5 h-5 mt-0.5 rounded border-2 flex items-center justify-center transition-all duration-300
							{checked
								? 'bg-success border-success'
								: 'border-text-muted/40 hover:border-text-secondary'}"
					>
						{#if checked}
							<svg class="w-3 h-3 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
								<polyline points="20 6 9 17 4 12"/>
							</svg>
						{/if}
					</span>

					<!-- Label and description -->
					<div class="flex-1 min-w-0">
						<span
							class="text-sm font-medium transition-all duration-300
								{checked ? 'text-text-muted line-through' : 'text-text-primary'}"
						>
							{item.label}
						</span>
						{#if item.description}
							<p class="text-xs text-text-muted mt-0.5 {checked ? 'line-through' : ''}">
								{item.description}
							</p>
						{/if}
					</div>
				</button>
			</li>
		{/each}
	</ul>
</div>
