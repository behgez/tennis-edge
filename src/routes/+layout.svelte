<script>
	import { page } from '$app/state';
	import { beforeNavigate, goto } from '$app/navigation';
	import Nav from '$lib/components/Nav.svelte';
	import { audioManager } from '$lib/stores/audio.svelte';
	import '../app.css';

	let { children } = $props();
	let blockedUrl = $state('');

	// Intercept navigation when a session is active
	beforeNavigate(({ cancel, to }) => {
		if (audioManager.activeSession && to) {
			blockedUrl = to.url.pathname;
			cancel();
			audioManager.requestNavigation(() => {
				goto(blockedUrl);
			});
		}
	});

	function handleConfirmLeave() {
		audioManager.confirmLeave();
	}
</script>

<div class="min-h-screen bg-[#0f172a]">
	<Nav path={page.url.pathname} />

	<!-- Main content area -->
	<main class="lg:ml-64 min-h-screen pb-20 lg:pb-0">
		<div class="max-w-5xl mx-auto px-4 py-6 lg:px-8 lg:py-8">
			{@render children()}
		</div>
	</main>
</div>

<!-- Global "Leave session?" warning modal -->
{#if audioManager.showLeaveWarning}
	<div class="fixed inset-0 bg-black/70 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
		<div class="glass-card max-w-sm w-full p-6 space-y-4 animate-slide-up">
			<div class="flex items-center gap-3">
				<div class="w-10 h-10 rounded-xl bg-warning/15 flex items-center justify-center">
					<svg class="w-5 h-5 text-warning" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
						<line x1="12" y1="9" x2="12" y2="13"/>
						<line x1="12" y1="17" x2="12.01" y2="17"/>
					</svg>
				</div>
				<div>
					<h3 class="text-base font-bold text-text-primary">Session in Progress</h3>
					<p class="text-xs text-text-muted">
						{audioManager.activeSession?.type === 'workout' ? 'Guided workout' :
						 audioManager.activeSession?.type === 'visualization' ? 'Visualization session' :
						 'Audio guide'} is running
					</p>
				</div>
			</div>

			<p class="text-sm text-text-secondary">
				You have an active <strong class="text-text-primary">{audioManager.activeSession?.title ?? 'session'}</strong> running. Leaving this page will stop it.
			</p>

			<div class="flex gap-3">
				<button
					onclick={() => audioManager.cancelLeave()}
					class="flex-1 px-4 py-2.5 rounded-xl bg-ball-yellow text-surface-card font-bold text-sm transition-all hover:bg-ball-yellow-dim"
				>
					Stay & Continue
				</button>
				<button
					onclick={handleConfirmLeave}
					class="flex-1 px-4 py-2.5 rounded-xl bg-surface-lighter text-text-secondary font-semibold text-sm transition-all hover:bg-accent-red/15 hover:text-accent-red"
				>
					Stop & Leave
				</button>
			</div>
		</div>
	</div>
{/if}
