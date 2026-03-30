<script lang="ts">
	import { base } from '$app/paths';
	let { path = '/' }: { path: string } = $props();

	interface NavItem {
		label: string;
		href: string;
		icon: string;
	}

	const navItems: NavItem[] = [
		{ label: 'Mission Control', href: `${base}/`, icon: 'home' },
		{ label: 'Schedule', href: `${base}/schedule`, icon: 'calendar' },
		{ label: 'Exercises', href: `${base}/exercises`, icon: 'dumbbell' },
		{ label: 'Program', href: `${base}/program`, icon: 'trending' },
		{ label: 'Knowledge', href: `${base}/knowledge`, icon: 'book' },
		{ label: 'Mental', href: `${base}/mental`, icon: 'brain' },
		{ label: 'Journal', href: `${base}/journal`, icon: 'edit' },
		{ label: 'Progress', href: `${base}/progress`, icon: 'chart' }
	];

	const mobileMainItems = navItems.slice(0, 4);
	const mobileMoreItems = navItems.slice(4);

	let moreOpen = $state(false);

	function isActive(href: string): boolean {
		if (href === '/') return path === '/';
		return path.startsWith(href);
	}

	function closeMore(): void {
		moreOpen = false;
	}
</script>

<!-- Desktop sidebar (lg+) -->
<nav class="hidden lg:flex fixed left-0 top-0 bottom-0 w-64 flex-col bg-surface border-r border-white/5 z-40">
	<div class="flex items-center gap-3 px-6 py-5 border-b border-white/5">
		<div class="w-9 h-9 rounded-lg bg-ball-yellow/10 flex items-center justify-center">
			<svg class="w-5 h-5 text-ball-yellow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
				<circle cx="12" cy="12" r="10"/>
				<path d="M2.5 12c3 0 5.5-2.5 5.5-5.5M16 21.5c0-3-2.5-5.5-5.5-5.5M21.5 12c-3 0-5.5 2.5-5.5 5.5M8 2.5c0 3 2.5 5.5 5.5 5.5"/>
			</svg>
		</div>
		<span class="text-lg font-bold text-text-primary tracking-tight">TennisEdge</span>
	</div>

	<div class="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
		{#each navItems as item}
			<a
				href={item.href}
				class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200
					{isActive(item.href)
						? 'bg-ball-yellow/10 text-ball-yellow glow-yellow'
						: 'text-text-secondary hover:text-text-primary hover:bg-surface-light'}"
			>
				<span class="w-5 h-5 flex items-center justify-center">
					{@html getIcon(item.icon, isActive(item.href))}
				</span>
				{item.label}
				{#if isActive(item.href)}
					<span class="ml-auto w-1.5 h-1.5 rounded-full bg-ball-yellow"></span>
				{/if}
			</a>
		{/each}
	</div>

	<div class="px-4 py-4 border-t border-white/5">
		<div class="text-xs text-text-muted">TennisEdge v1.0</div>
	</div>
</nav>

<!-- Mobile bottom nav -->
<nav class="lg:hidden fixed bottom-0 left-0 right-0 bg-surface/95 backdrop-blur-lg border-t border-white/10 z-40 safe-bottom">
	<div class="flex items-center justify-around px-2 py-1">
		{#each mobileMainItems as item}
			<a
				href={item.href}
				class="flex flex-col items-center gap-0.5 py-2 px-3 rounded-lg transition-all duration-200 min-w-[56px]
					{isActive(item.href) ? 'text-ball-yellow' : 'text-text-muted'}"
			>
				{#if isActive(item.href)}
					<span class="absolute -top-0 w-8 h-0.5 rounded-full bg-ball-yellow"></span>
				{/if}
				<span class="w-6 h-6 flex items-center justify-center relative">
					{@html getIcon(item.icon, isActive(item.href))}
				</span>
				<span class="text-[10px] font-medium">{item.label}</span>
			</a>
		{/each}

		<!-- More button -->
		<button
			onclick={() => moreOpen = !moreOpen}
			class="flex flex-col items-center gap-0.5 py-2 px-3 rounded-lg transition-all duration-200 min-w-[56px]
				{moreOpen || mobileMoreItems.some(i => isActive(i.href)) ? 'text-ball-yellow' : 'text-text-muted'}"
		>
			<span class="w-6 h-6 flex items-center justify-center">
				<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" class="w-5 h-5">
					<circle cx="12" cy="5" r="1.5"/>
					<circle cx="12" cy="12" r="1.5"/>
					<circle cx="12" cy="19" r="1.5"/>
				</svg>
			</span>
			<span class="text-[10px] font-medium">More</span>
		</button>
	</div>
</nav>

<!-- Mobile "More" drawer -->
{#if moreOpen}
	<!-- Backdrop -->
	<button
		class="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
		onclick={closeMore}
		onkeydown={(e) => e.key === 'Escape' && closeMore()}
		aria-label="Close menu"
	></button>

	<!-- Drawer -->
	<div class="lg:hidden fixed bottom-[68px] left-3 right-3 z-50 animate-slide-up">
		<div class="glass-card p-2 shadow-2xl">
			{#each mobileMoreItems as item}
				<a
					href={item.href}
					onclick={closeMore}
					class="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200
						{isActive(item.href)
							? 'bg-ball-yellow/10 text-ball-yellow'
							: 'text-text-secondary hover:text-text-primary hover:bg-surface-light'}"
				>
					<span class="w-5 h-5 flex items-center justify-center">
						{@html getIcon(item.icon, isActive(item.href))}
					</span>
					{item.label}
				</a>
			{/each}
		</div>
	</div>
{/if}

<script lang="ts" module>
	function getIcon(name: string, active: boolean): string {
		const color = active ? 'currentColor' : 'currentColor';
		const weight = active ? '2.5' : '2';
		const icons: Record<string, string> = {
			home: `<svg viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="${weight}" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
			calendar: `<svg viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="${weight}" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`,
			dumbbell: `<svg viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="${weight}" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5"><path d="M6.5 6.5h11M6 3h1v18H6a1 1 0 01-1-1V4a1 1 0 011-1zM17 3h1a1 1 0 011 1v16a1 1 0 01-1 1h-1V3zM3 7h2v10H3a1 1 0 01-1-1V8a1 1 0 011-1zM19 7h2a1 1 0 011 1v8a1 1 0 01-1 1h-2V7z"/></svg>`,
			trending: `<svg viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="${weight}" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>`,
			book: `<svg viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="${weight}" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/></svg>`,
			brain: `<svg viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="${weight}" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5"><path d="M12 2a5 5 0 015 5c0 1.1-.4 2.1-1 2.9a5 5 0 011 3.1 5 5 0 01-3 4.6V20a2 2 0 01-2 2h0a2 2 0 01-2-2v-2.4A5 5 0 017 13a5 5 0 011-3.1A5 5 0 017 7a5 5 0 015-5z"/><path d="M12 2v20"/></svg>`,
			edit: `<svg viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="${weight}" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>`,
			chart: `<svg viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="${weight}" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>`
		};
		return icons[name] ?? '';
	}
</script>

<style>
	.safe-bottom {
		padding-bottom: env(safe-area-inset-bottom, 0px);
	}
</style>
