<script lang="ts">
	let { query, title, channel }: { query: string; title: string; channel?: string } = $props();
	let searchUrl = $derived(`https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`);
</script>

<a
	href={searchUrl}
	target="_blank"
	rel="noopener noreferrer"
	class="flex items-center gap-3 p-3 rounded-xl bg-accent-red/5 border border-accent-red/15 hover:border-accent-red/40 hover:bg-accent-red/10 transition-all group"
>
	<div class="flex-shrink-0 w-12 h-12 rounded-lg bg-accent-red/15 flex items-center justify-center group-hover:bg-accent-red/25 transition-colors">
		<svg class="w-6 h-6 text-accent-red" viewBox="0 0 24 24" fill="currentColor">
			<path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
		</svg>
	</div>
	<div class="flex-1 min-w-0">
		<p class="text-sm font-medium text-text-primary group-hover:text-ball-yellow transition-colors">{title}</p>
		<p class="text-xs text-text-muted">{channel ? `Watch on ${channel}'s YouTube channel` : 'Find the best video on YouTube'} &rarr;</p>
	</div>
	<svg class="w-5 h-5 text-accent-red group-hover:translate-x-0.5 transition-all flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
</a>
