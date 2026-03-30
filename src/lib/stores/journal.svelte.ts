import { browser } from '$app/environment';
import type { JournalEntry } from '$lib/data/types';

const STORAGE_KEY = 'tennisedge-journal';

function createJournalStore() {
	let entries = $state<JournalEntry[]>(loadFromStorage());

	function loadFromStorage(): JournalEntry[] {
		if (!browser) return [];
		try {
			const stored = localStorage.getItem(STORAGE_KEY);
			return stored ? JSON.parse(stored) : [];
		} catch {
			return [];
		}
	}

	function save(): void {
		if (browser) {
			localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
		}
	}

	function addEntry(entry: JournalEntry): void {
		entries.push(entry);
		save();
	}

	function updateEntry(id: string, partial: Partial<JournalEntry>): void {
		const index = entries.findIndex((e) => e.id === id);
		if (index !== -1) {
			entries[index] = { ...entries[index], ...partial };
			save();
		}
	}

	function deleteEntry(id: string): void {
		const index = entries.findIndex((e) => e.id === id);
		if (index !== -1) {
			entries.splice(index, 1);
			save();
		}
	}

	function getEntries(): JournalEntry[] {
		return entries.slice().sort(
			(a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
		);
	}

	function getEntry(id: string): JournalEntry | undefined {
		return entries.find((e) => e.id === id);
	}

	return {
		get entries() { return entries; },
		addEntry,
		updateEntry,
		deleteEntry,
		getEntries,
		getEntry
	};
}

export const journalStore = createJournalStore();
