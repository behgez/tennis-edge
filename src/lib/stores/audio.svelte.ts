// Global audio manager — stops all audio/workouts/visualizations on navigation
import { browser } from '$app/environment';

interface ActiveSession {
	type: 'workout' | 'visualization' | 'audio';
	title: string;
	stop: () => void;
}

function createAudioManager() {
	let activeSession = $state<ActiveSession | null>(null);
	let showLeaveWarning = $state(false);
	let pendingNavigation = $state<(() => void) | null>(null);

	function register(session: ActiveSession): void {
		// Stop any existing session first
		if (activeSession) {
			activeSession.stop();
		}
		activeSession = session;
	}

	function unregister(): void {
		activeSession = null;
	}

	function stopAll(): void {
		if (activeSession) {
			activeSession.stop();
			activeSession = null;
		}
		if (browser && window.speechSynthesis) {
			window.speechSynthesis.cancel();
		}
		showLeaveWarning = false;
		pendingNavigation = null;
	}

	function requestNavigation(navigate: () => void): boolean {
		if (activeSession) {
			showLeaveWarning = true;
			pendingNavigation = () => {
				stopAll();
				navigate();
			};
			return false; // blocked — show warning
		}
		return true; // no active session — proceed
	}

	function confirmLeave(): void {
		const nav = pendingNavigation;
		stopAll();
		if (nav) nav();
	}

	function cancelLeave(): void {
		showLeaveWarning = false;
		pendingNavigation = null;
	}

	return {
		get activeSession() { return activeSession; },
		get showLeaveWarning() { return showLeaveWarning; },
		register,
		unregister,
		stopAll,
		requestNavigation,
		confirmLeave,
		cancelLeave
	};
}

export const audioManager = createAudioManager();
