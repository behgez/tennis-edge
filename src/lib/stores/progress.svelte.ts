import { browser } from '$app/environment';
import type { SkillAssessment } from '$lib/data/types';

interface StreakInfo {
	current: number;
	longest: number;
	lastDate: string;
}

interface ProgressData {
	completedActivities: Record<string, string[]>;
	skillAssessments: SkillAssessment[];
	streaks: StreakInfo;
}

const STORAGE_KEY = 'tennisedge-progress';

const defaultData: ProgressData = {
	completedActivities: {},
	skillAssessments: [],
	streaks: { current: 0, longest: 0, lastDate: '' }
};

function createProgressStore() {
	let data = $state<ProgressData>(loadFromStorage());

	function loadFromStorage(): ProgressData {
		if (!browser) return structuredClone(defaultData);
		try {
			const stored = localStorage.getItem(STORAGE_KEY);
			if (!stored) return structuredClone(defaultData);
			const parsed = JSON.parse(stored);
			// Ensure all required properties exist (handles partial/corrupt data)
			return {
				completedActivities: parsed.completedActivities ?? {},
				skillAssessments: parsed.skillAssessments ?? [],
				streaks: {
					current: parsed.streaks?.current ?? 0,
					longest: parsed.streaks?.longest ?? 0,
					lastDate: parsed.streaks?.lastDate ?? ''
				}
			};
		} catch {
			return structuredClone(defaultData);
		}
	}

	function save(): void {
		if (browser) {
			localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
		}
	}

	function updateStreaks(date: string): void {
		const today = new Date(date);
		const lastDate = data.streaks.lastDate ? new Date(data.streaks.lastDate) : null;

		if (!lastDate) {
			data.streaks.current = 1;
			data.streaks.longest = 1;
			data.streaks.lastDate = date;
			return;
		}

		const diffMs = today.getTime() - lastDate.getTime();
		const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));

		if (diffDays === 1) {
			data.streaks.current += 1;
		} else if (diffDays > 1) {
			data.streaks.current = 1;
		}
		// diffDays === 0 means same day, no change to streak count

		if (data.streaks.current > data.streaks.longest) {
			data.streaks.longest = data.streaks.current;
		}

		if (diffDays >= 0) {
			data.streaks.lastDate = date;
		}
	}

	function toggleActivity(date: string, activityId: string): void {
		if (!data.completedActivities[date]) {
			data.completedActivities[date] = [];
		}

		const index = data.completedActivities[date].indexOf(activityId);
		if (index === -1) {
			data.completedActivities[date].push(activityId);
			updateStreaks(date);
		} else {
			data.completedActivities[date].splice(index, 1);
			if (data.completedActivities[date].length === 0) {
				delete data.completedActivities[date];
			}
		}
		save();
	}

	function isCompleted(date: string, activityId: string): boolean {
		return data?.completedActivities?.[date]?.includes(activityId) ?? false;
	}

	function getCompletionRate(date: string, totalActivities: number): number {
		if (totalActivities === 0) return 0;
		const completed = data?.completedActivities?.[date]?.length ?? 0;
		return Math.round((completed / totalActivities) * 100);
	}

	function addSkillAssessment(assessment: SkillAssessment): void {
		data.skillAssessments.push(assessment);
		save();
	}

	function getStreakInfo(): StreakInfo {
		return { current: data?.streaks?.current ?? 0, longest: data?.streaks?.longest ?? 0, lastDate: data?.streaks?.lastDate ?? '' };
	}

	function getCompletedForDate(date: string): string[] {
		return data?.completedActivities?.[date] ?? [];
	}

	function getRecentAssessments(count: number = 10): SkillAssessment[] {
		return (data?.skillAssessments ?? [])
			.slice()
			.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
			.slice(0, count);
	}

	return {
		get data() { return data; },
		toggleActivity,
		isCompleted,
		getCompletionRate,
		addSkillAssessment,
		getStreakInfo,
		getCompletedForDate,
		getRecentAssessments
	};
}

export const progressStore = createProgressStore();
