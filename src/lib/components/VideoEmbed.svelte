<script lang="ts">
	let {
		url,
		title = 'Video'
	}: {
		url: string;
		title?: string;
	} = $props();

	let loaded = $state(false);

	let videoId = $derived(extractVideoId(url));
	let thumbnailUrl = $derived(
		videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : ''
	);
	let embedUrl = $derived(
		videoId ? `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0` : ''
	);

	function extractVideoId(url: string): string | null {
		if (!url) return null;
		// Handle youtu.be/ID
		const shortMatch = url.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/);
		if (shortMatch) return shortMatch[1];
		// Handle youtube.com/watch?v=ID
		const longMatch = url.match(/[?&]v=([a-zA-Z0-9_-]{11})/);
		if (longMatch) return longMatch[1];
		// Handle youtube.com/embed/ID
		const embedMatch = url.match(/embed\/([a-zA-Z0-9_-]{11})/);
		if (embedMatch) return embedMatch[1];
		return null;
	}
</script>

<div class="rounded-xl overflow-hidden bg-surface-light border border-white/5">
	{#if !videoId}
		<div class="aspect-video flex items-center justify-center bg-surface-card">
			<p class="text-sm text-text-muted">Invalid video URL</p>
		</div>
	{:else if !loaded}
		<!-- Thumbnail with play button -->
		<button
			onclick={() => loaded = true}
			class="relative w-full aspect-video group cursor-pointer"
			aria-label="Play {title}"
		>
			<img
				src={thumbnailUrl}
				alt={title}
				class="w-full h-full object-cover"
				loading="lazy"
			/>
			<!-- Dark overlay -->
			<div class="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors"></div>
			<!-- Play button -->
			<div class="absolute inset-0 flex items-center justify-center">
				<div class="w-16 h-16 rounded-full bg-accent-red/90 flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-200">
					<svg class="w-7 h-7 text-white ml-1" viewBox="0 0 24 24" fill="currentColor">
						<polygon points="5 3 19 12 5 21 5 3"/>
					</svg>
				</div>
			</div>
			<!-- Title bar -->
			<div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
				<p class="text-sm font-medium text-white truncate">{title}</p>
			</div>
		</button>
	{:else}
		<!-- Iframe embed -->
		<div class="aspect-video">
			<iframe
				src={embedUrl}
				{title}
				class="w-full h-full"
				frameborder="0"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
				allowfullscreen
			></iframe>
		</div>
	{/if}
</div>
