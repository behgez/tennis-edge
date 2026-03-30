import { browser } from '$app/environment';

interface Settings {
	currentWeek: number;
	currentPhase: string;
	gymWeekRotation: 'A' | 'B' | 'C';
	notificationsEnabled: boolean;
	theme: 'dark';
}

const STORAGE_KEY = 'tennisedge-settings';

const defaultSettings: Settings = {
	currentWeek: 1,
	currentPhase: 'Foundation',
	gymWeekRotation: 'A',
	notificationsEnabled: false,
	theme: 'dark'
};

function createSettingsStore() {
	let settings = $state<Settings>(loadFromStorage());

	function loadFromStorage(): Settings {
		if (!browser) return { ...defaultSettings };
		try {
			const stored = localStorage.getItem(STORAGE_KEY);
			return stored ? { ...defaultSettings, ...JSON.parse(stored) } : { ...defaultSettings };
		} catch {
			return { ...defaultSettings };
		}
	}

	function save(): void {
		if (browser) {
			localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
		}
	}

	function update(partial: Partial<Settings>): void {
		Object.assign(settings, partial);
		save();
	}

	function setWeek(week: number): void {
		settings.currentWeek = Math.max(1, Math.min(52, week));
		save();
	}

	function setPhase(phase: string): void {
		settings.currentPhase = phase;
		save();
	}

	function setGymRotation(rotation: 'A' | 'B' | 'C'): void {
		settings.gymWeekRotation = rotation;
		save();
	}

	function toggleNotifications(): void {
		settings.notificationsEnabled = !settings.notificationsEnabled;
		save();
	}

	function reset(): void {
		Object.assign(settings, { ...defaultSettings });
		save();
	}

	return {
		get settings() { return settings; },
		update,
		setWeek,
		setPhase,
		setGymRotation,
		toggleNotifications,
		reset
	};
}

export const settingsStore = createSettingsStore();
