<script lang="ts">
	import { journalStore } from '$lib/stores/journal.svelte';
	import { progressStore } from '$lib/stores/progress.svelte';
	import type { JournalEntry } from '$lib/data/types';

	// Form visibility
	let showForm = $state(false);
	let expandedEntryId = $state<string | null>(null);
	let confirmDeleteId = $state<string | null>(null);
	let editingEntryId = $state<string | null>(null);

	// Form fields
	let formDate = $state(new Date().toISOString().split('T')[0]);
	let formOpponent = $state('');
	let formSurface = $state('Hard');
	let formConditions = $state('');
	let formGamePlan = $state('');
	let formScore = $state('');
	let formFirstServe = $state(60);
	let formUnforcedErrors = $state(0);
	let formWinners = $state(0);
	let formTacticalReview = $state('');
	let formMentalReview = $state('');
	let formAction1 = $state('');
	let formAction2 = $state('');
	let formAction3 = $state('');
	let formMentalRating = $state(5);

	const surfaces = ['Clay', 'Hard', 'Grass', 'Indoor'];

	// Match day detection (Mon=1, Thu=4, Sat=6)
	const isMatchDay = [1, 4, 6].includes(new Date().getDay());
	const today = new Date().toISOString().split('T')[0];

	// Collapsible sections
	let duringMatchCollapsed = $state(false);
	let preMatchCollapsed = $state(false);
	let postMatchCollapsed = $state(false);

	// ==========================================
	// MATCH MODE STATE (auto-saved to localStorage)
	// ==========================================
	const MATCH_MODE_KEY = 'tennisedge-live-match';

	interface LiveMatchData {
		active: boolean;
		tab: 'tips' | 'changeover' | 'between' | 'scores';
		changeoverNotes: string[];
		confidenceHistory: number[];
		cueWords: string[];
		setScores: [number, number][];
		working: string;
		toChange: string;
		opponentNotes: string;
		startedAt: string;
	}

	function loadLiveMatch(): LiveMatchData | null {
		if (typeof window === 'undefined') return null;
		try {
			const raw = localStorage.getItem(MATCH_MODE_KEY);
			return raw ? JSON.parse(raw) : null;
		} catch { return null; }
	}

	function saveLiveMatch(): void {
		if (typeof window === 'undefined' || !matchModeActive) return;
		const data: LiveMatchData = {
			active: true,
			tab: matchModeTab,
			changeoverNotes,
			confidenceHistory,
			cueWords,
			setScores: matchSetScores,
			working: matchWorking,
			toChange: matchToChange,
			opponentNotes: matchOpponentNotes,
			startedAt: matchStartedAt
		};
		localStorage.setItem(MATCH_MODE_KEY, JSON.stringify(data));
	}

	function clearLiveMatch(): void {
		if (typeof window !== 'undefined') localStorage.removeItem(MATCH_MODE_KEY);
	}

	// Restore from saved state or use defaults
	const savedMatch = loadLiveMatch();
	let matchModeActive = $state(savedMatch?.active ?? false);
	let matchModeTab = $state<'tips' | 'changeover' | 'between' | 'scores'>(savedMatch?.tab ?? 'tips');
	let matchStartedAt = $state(savedMatch?.startedAt ?? new Date().toISOString());

	// Quick Tips expanded state
	let expandedTipId = $state<string | null>(null);

	// Changeover state
	let changeoverQuestionIndex = $state(0);
	let confidenceRating = $state(5);
	let changeoverNote = $state('');
	let changeoverNotes = $state<string[]>(savedMatch?.changeoverNotes ?? []);
	let confidenceHistory = $state<number[]>(savedMatch?.confidenceHistory ?? []);

	// Between Points state
	let cueWords = $state(savedMatch?.cueWords ?? ['Move', 'Calm', 'Compete']);
	let editingCueWords = $state(false);
	let routineRunning = $state(false);
	let routineStep = $state(0);
	let routineTimerId = $state<ReturnType<typeof setTimeout> | null>(null);

	// Score & Notes state
	let matchSetScores = $state<[number, number][]>(savedMatch?.setScores ?? [[0, 0], [0, 0], [0, 0]]);
	let matchWorking = $state(savedMatch?.working ?? '');
	let matchToChange = $state(savedMatch?.toChange ?? '');
	let matchOpponentNotes = $state(savedMatch?.opponentNotes ?? '');

	// Auto-save match mode state every time something changes
	$effect(() => {
		if (matchModeActive) {
			saveLiveMatch();
		}
	});

	// Quick Tips data
	const quickTips = [
		{
			id: 'losing-momentum',
			title: "I'm losing momentum",
			color: 'red' as const,
			tips: [
				'Slow down. Breathe. Use the full 25 seconds.',
				'Change ONE thing tactically.',
				'Win the first point of the next game.',
				'Focus on effort and attitude, not the score.',
				'Go back to what was working earlier.'
			]
		},
		{
			id: 'lead-slipping',
			title: "I had a lead and it's slipping",
			color: 'red' as const,
			tips: [
				'Go back to what was working. Do NOT change tactics.',
				'Stay aggressive. Do NOT play safe.',
				'Stop thinking about the score.',
				'One point at a time. Swing freely.',
				'High first-serve percentage is crucial right now.'
			]
		},
		{
			id: 'dominating',
			title: "I'm dominating",
			color: 'green' as const,
			tips: [
				'Same tactics. Same energy. Same aggression.',
				'Do not let up until the last point is won.',
				'High first-serve percentage.',
				'Treat every game as if the match just started.',
				'Do NOT start aiming for lines — keep same margins.'
			]
		},
		{
			id: 'weak-backhand',
			title: "Opponent's backhand is weak",
			color: 'blue' as const,
			tips: [
				'Hit deep, heavy topspin to the backhand.',
				'Rally cross-court to backhand, attack the short reply.',
				'On big points, default to targeting the backhand.'
			]
		},
		{
			id: 'opponent-far-back',
			title: 'Opponent stands too far back',
			color: 'blue' as const,
			tips: [
				'Drop shots to pull them forward.',
				'Short angles to the service box.',
				'Approach the net behind deep shots.'
			]
		},
		{
			id: 'opponent-baseline',
			title: 'Opponent crowds the baseline',
			color: 'blue' as const,
			tips: [
				'Heavy topspin to push bounce above their strike zone.',
				'Mix in slice to disrupt timing.',
				'Lob when they position aggressively.'
			]
		},
		{
			id: 'opponent-pusher',
			title: 'Opponent is a pusher',
			color: 'blue' as const,
			tips: [
				'Move them forward and backward (drop, deep, drop).',
				'Be patient — do NOT try winners too early.',
				'Approach on short balls. Vary pace.'
			]
		},
		{
			id: 'unforced-errors',
			title: 'Too many unforced errors',
			color: 'orange' as const,
			tips: [
				'Aim 2-3 feet inside all lines.',
				'Hit at 70% power, not 100%.',
				'Focus on getting one more ball back.',
				'Watch ball, bend knees, complete follow-through.'
			]
		},
		{
			id: 'low-first-serve',
			title: 'Low first serve %',
			color: 'orange' as const,
			tips: [
				'Reduce pace 10-15%, focus on placement.',
				'Aim body or center for more margin.',
				'Add more spin for higher net clearance.'
			]
		},
		{
			id: 'serving-for-set',
			title: 'Serving for the set/match',
			color: 'red' as const,
			tips: [
				'Swing freely — do not steer shots.',
				'Clear plan for the first point.',
				'Break points: go to most reliable serve+rally pattern.',
				'Breathe. Most choking comes from shallow breathing.'
			]
		}
	];

	// Changeover questions pool
	const changeoverQuestions = [
		'How is my energy level right now? Flat, over-aroused, or balanced?',
		'Am I carrying frustration from the last game?',
		'Is my current game plan working? What specifically is failing?',
		'What has felt solid today? Build on it.',
		'What pattern is my opponent struggling with?',
		'Where is my opponent standing? Deep? On the baseline?',
		'Am I controlling the points or reacting?',
		"What is my opponent's go-to shot under pressure?",
		'Which side is weaker? Am I targeting it enough?',
		'What is my ONE intention for the next game?',
		'Should I change the pace or rhythm?',
		'Am I using enough variety, or am I predictable?',
		'If serving: strategy for the opening point?'
	];

	// Between Points routine steps
	const routineSteps = [
		{ label: 'POSITIVE RESPONSE', duration: 4000, description: 'Turn away. Shoulders back. Head up. Confident posture.' },
		{ label: 'RELAX', duration: 10000, description: 'Fix strings. Deep breath in (5s). Out (5s). "Relax."' },
		{ label: 'PREPARE', duration: 4000, description: 'Decide: where am I serving/returning? Pattern?' },
		{ label: 'RITUAL', duration: 6000, description: 'Same bounces. Same routine. Every point.' }
	];

	function getTipColorClasses(color: 'red' | 'green' | 'blue' | 'orange') {
		switch (color) {
			case 'red': return { bg: 'bg-accent-red/10', border: 'border-accent-red/30', text: 'text-accent-red', dot: 'bg-accent-red' };
			case 'green': return { bg: 'bg-success/10', border: 'border-success/30', text: 'text-success', dot: 'bg-success' };
			case 'blue': return { bg: 'bg-accent-blue/10', border: 'border-accent-blue/30', text: 'text-accent-blue', dot: 'bg-accent-blue' };
			case 'orange': return { bg: 'bg-accent-orange/10', border: 'border-accent-orange/30', text: 'text-accent-orange', dot: 'bg-accent-orange' };
		}
	}

	function getVisibleQuestions(): string[] {
		const start = changeoverQuestionIndex;
		const questions: string[] = [];
		for (let i = 0; i < 4; i++) {
			questions.push(changeoverQuestions[(start + i) % changeoverQuestions.length]);
		}
		return questions;
	}

	function nextQuestions() {
		changeoverQuestionIndex = (changeoverQuestionIndex + 4) % changeoverQuestions.length;
	}

	function saveChangeoverNote() {
		if (changeoverNote.trim()) {
			changeoverNotes.push(changeoverNote.trim());
			changeoverNote = '';
		}
		confidenceHistory.push(confidenceRating);
	}

	// Web Audio API beep
	function playBeep(frequency = 880, duration = 200) {
		try {
			const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
			const osc = ctx.createOscillator();
			const gain = ctx.createGain();
			osc.connect(gain);
			gain.connect(ctx.destination);
			osc.frequency.value = frequency;
			osc.type = 'sine';
			gain.gain.value = 0.3;
			osc.start();
			osc.stop(ctx.currentTime + duration / 1000);
			// Also vibrate if supported
			if (navigator.vibrate) navigator.vibrate(200);
		} catch {
			// Audio not available
			if (navigator.vibrate) navigator.vibrate(200);
		}
	}

	function startRoutine() {
		routineRunning = true;
		routineStep = 0;
		playBeep(660, 300);
		advanceRoutine();
	}

	function advanceRoutine() {
		if (routineTimerId) clearTimeout(routineTimerId);
		if (routineStep >= routineSteps.length) {
			routineRunning = false;
			routineStep = 0;
			playBeep(1200, 400);
			return;
		}
		routineTimerId = setTimeout(() => {
			routineStep++;
			if (routineStep < routineSteps.length) {
				playBeep(880, 200);
			}
			advanceRoutine();
		}, routineSteps[routineStep].duration);
	}

	function stopRoutine() {
		if (routineTimerId) clearTimeout(routineTimerId);
		routineRunning = false;
		routineStep = 0;
	}

	function openMatchMode() {
		matchModeActive = true;
		matchModeTab = 'tips';
		matchStartedAt = new Date().toISOString();
		saveLiveMatch();
	}

	function endMatch() {
		// Build journal entry from match mode data
		const setScoreStr = matchSetScores
			.filter(([a, b]) => a > 0 || b > 0)
			.map(([a, b]) => `${a}-${b}`)
			.join(' ');

		const avgConfidence = confidenceHistory.length > 0
			? Math.round(confidenceHistory.reduce((a, b) => a + b, 0) / confidenceHistory.length)
			: 5;

		const mentalReviewParts: string[] = [];
		if (changeoverNotes.length > 0) {
			mentalReviewParts.push('Changeover notes: ' + changeoverNotes.join('; '));
		}
		if (confidenceHistory.length > 0) {
			mentalReviewParts.push('Confidence over match: ' + confidenceHistory.join(' -> '));
		}

		const entry: JournalEntry = {
			id: Date.now().toString(),
			date: new Date().toISOString().split('T')[0],
			opponent: '',
			surface: 'Hard',
			conditions: '',
			gamePlan: '',
			score: setScoreStr,
			firstServePercent: 60,
			unforcedErrors: 0,
			winners: 0,
			tacticalReview: [
				matchWorking ? 'What worked: ' + matchWorking : '',
				matchToChange ? 'What to change: ' + matchToChange : '',
				matchOpponentNotes ? 'Opponent: ' + matchOpponentNotes : ''
			].filter(Boolean).join('\n'),
			mentalReview: mentalReviewParts.join('\n'),
			actionItems: [],
			mentalRating: avgConfidence
		};
		journalStore.addEntry(entry);
		clearLiveMatch();

		// Reset all match mode state
		matchModeActive = false;
		expandedTipId = null;
		changeoverQuestionIndex = 0;
		confidenceRating = 5;
		changeoverNote = '';
		changeoverNotes = [];
		confidenceHistory = [];
		matchSetScores = [[0, 0], [0, 0], [0, 0]];
		matchWorking = '';
		matchToChange = '';
		matchOpponentNotes = '';
		stopRoutine();
	}

	function closeMatchMode() {
		// Don't clear saved data — just close the overlay. Data stays saved.
		matchModeActive = false;
		stopRoutine();
	}

	function resumeMatchMode() {
		matchModeActive = true;
	}

	// Speech synthesis
	function speakText(text: string) {
		if (typeof window !== 'undefined' && window.speechSynthesis) {
			window.speechSynthesis.cancel();
			const u = new SpeechSynthesisUtterance(text);
			u.lang = 'en-US';
			window.speechSynthesis.speak(u);
		}
	}

	function speakAllItems(items: { text: string }[]) {
		if (typeof window !== 'undefined' && window.speechSynthesis) {
			window.speechSynthesis.cancel();
			items.forEach((item, i) => {
				const u = new SpeechSynthesisUtterance(item.text);
				u.lang = 'en-US';
				window.speechSynthesis.speak(u);
			});
		}
	}

	// Pre-match checklist data
	const preMatchSections = [
		{
			label: '60 min before',
			items: [
				{ id: 'prematch-1', text: 'Eat a light snack (banana, energy bar) + hydrate (500ml water)' },
				{ id: 'prematch-2', text: 'Pack: racquet, extra grip, towel, water bottle, snack, sunscreen' },
				{ id: 'prematch-3', text: 'Check court booking / match time confirmed' },
			]
		},
		{
			label: '30 min before',
			items: [
				{ id: 'prematch-4', text: 'Dynamic warm-up (10 min): jog, high knees, butt kicks, box shuffles, walking lunges with rotation, arm circles, YTW shoulder activation, shadow strokes' },
				{ id: 'prematch-5', text: 'Prehab: calf raises 2x15, shoulder band rotations 2x12' },
			]
		},
		{
			label: '15 min before',
			items: [
				{ id: 'prematch-6', text: 'Visualization (5 min): Close eyes. See the court. Feel your strokes. Imagine your serve landing perfectly. See yourself at the net, confident. Feel a pressure moment \u2014 you handle it with your routine.' },
				{ id: 'prematch-7', text: "Game plan: Write 2-3 tactical priorities (e.g., 'Serve wide, attack open court', 'Approach on every short ball', 'Deep cross-court returns')" },
				{ id: 'prematch-8', text: "Review opponent: What's their weakness? What worked last time?" },
			]
		},
		{
			label: '5 min before',
			items: [
				{ id: 'prematch-9', text: "Between-point routine reminder: Turn away \u2192 Breathe \u2192 Strings \u2192 Plan \u2192 Ritual" },
				{ id: 'prematch-10', text: "Cue words: Pick your 3 words for today (e.g., 'Move', 'Calm', 'Compete')" },
				{ id: 'prematch-11', text: 'Deep breaths: 3 slow breaths (in 5 sec, hold 3, out 5)' },
				{ id: 'prematch-12', text: "Positive self-talk: 'I've trained for this. I trust my game. One point at a time.'" },
			]
		},
		{
			label: 'On court',
			items: [
				{ id: 'prematch-13', text: 'During warm-up: Study opponent (forehand/backhand strength, movement, serve patterns, net comfort)' },
				{ id: 'prematch-14', text: "Test all your shots (don't try to win the warm-up)" },
			]
		}
	];

	const allPreMatchItems = preMatchSections.flatMap(s => s.items);

	// Post-match checklist data
	const postMatchSections = [
		{
			label: 'Immediately after (within 10 min)',
			items: [
				{ id: 'postmatch-1', text: 'Cool down: 5 min light stretching (calves, hamstrings, hip flexors, shoulders)' },
				{ id: 'postmatch-2', text: 'Rehydrate: Drink 500ml water/electrolytes' },
				{ id: 'postmatch-3', text: "Quick mental note: What's the ONE thing that worked best today?" },
			]
		},
		{
			label: 'Within 30 min',
			items: [
				{ id: 'postmatch-4', text: 'Recovery snack: Protein + carbs (banana + peanut butter, chocolate milk, protein bar)' },
				{ id: 'postmatch-5', text: 'Foam roll: 5 min (quads, hamstrings, calves, IT band, upper back)' },
			]
		},
		{
			label: 'Within 2 hours',
			items: [
				{ id: 'postmatch-6', text: 'Fill in match journal (below): Score, first serve %, UE estimate, what worked, what didn\'t' },
				{ id: 'postmatch-7', text: 'Rate your mental game 1-10' },
				{ id: 'postmatch-8', text: 'Write 3 action items for next practice' },
				{ id: 'postmatch-9', text: 'Review SwingVision data if recorded (shot depth, placement heat map, serve stats)' },
			]
		},
		{
			label: 'Evening',
			items: [
				{ id: 'postmatch-10', text: '10 min flexibility routine (hip openers, thoracic rotation, hamstring stretch)' },
				{ id: 'postmatch-11', text: 'Visualize 2-3 corrections: replay missed shots with the CORRECT execution' },
				{ id: 'postmatch-12', text: 'Set intention for next session: what ONE thing will you focus on?' },
			]
		}
	];

	const allPostMatchItems = postMatchSections.flatMap(s => s.items);

	// Pre-match completion tracking
	let preMatchCompleted = $derived(
		allPreMatchItems.filter(item => progressStore.isCompleted(today, item.id)).length
	);

	let postMatchCompleted = $derived(
		allPostMatchItems.filter(item => progressStore.isCompleted(today, item.id)).length
	);

	// Sorted entries
	let sortedEntries = $derived(journalStore.getEntries());

	// Win/loss detection from score string
	function detectResult(score: string): 'win' | 'loss' | 'unknown' {
		if (!score.trim()) return 'unknown';
		// Common formats: "6-3 6-4", "6-3, 6-4", "6-3 4-6 7-5"
		const sets = score.trim().split(/[,\s]+/).filter(s => /^\d+-\d+$/.test(s));
		if (sets.length === 0) return 'unknown';
		let playerSetsWon = 0;
		let opponentSetsWon = 0;
		for (const set of sets) {
			const [a, b] = set.split('-').map(Number);
			if (a > b) playerSetsWon++;
			else if (b > a) opponentSetsWon++;
		}
		if (playerSetsWon > opponentSetsWon) return 'win';
		if (opponentSetsWon > playerSetsWon) return 'loss';
		return 'unknown';
	}

	// Stats
	let stats = $derived.by(() => {
		const entries = sortedEntries;
		if (entries.length === 0) return null;

		let wins = 0;
		let losses = 0;
		let totalFirstServe = 0;
		let totalMental = 0;

		for (const e of entries) {
			const result = detectResult(e.score);
			if (result === 'win') wins++;
			else if (result === 'loss') losses++;
			totalFirstServe += e.firstServePercent;
			totalMental += e.mentalRating;
		}

		const avgFirstServe = Math.round(totalFirstServe / entries.length);
		const avgMental = (totalMental / entries.length).toFixed(1);

		// Trend: based on last 5 mental ratings
		let trend: 'improving' | 'stable' | 'declining' = 'stable';
		if (entries.length >= 3) {
			const recent = entries.slice(0, Math.min(5, entries.length));
			const firstHalf = recent.slice(Math.floor(recent.length / 2));
			const secondHalf = recent.slice(0, Math.floor(recent.length / 2));
			const avgFirst = firstHalf.reduce((s, e) => s + e.mentalRating, 0) / firstHalf.length;
			const avgSecond = secondHalf.reduce((s, e) => s + e.mentalRating, 0) / secondHalf.length;
			if (avgSecond - avgFirst > 0.5) trend = 'improving';
			else if (avgFirst - avgSecond > 0.5) trend = 'declining';
		}

		return { total: entries.length, wins, losses, avgFirstServe, avgMental, trend };
	});

	function mentalRatingLabel(val: number): string {
		if (val <= 1) return 'Terrible';
		if (val <= 2) return 'Very Poor';
		if (val <= 3) return 'Poor';
		if (val <= 4) return 'Below Avg';
		if (val <= 5) return 'Average';
		if (val <= 6) return 'Above Avg';
		if (val <= 7) return 'Good';
		if (val <= 8) return 'Very Good';
		if (val <= 9) return 'Excellent';
		return 'Outstanding';
	}

	function mentalRatingColor(val: number): string {
		if (val <= 3) return 'text-accent-red';
		if (val <= 5) return 'text-accent-orange';
		if (val <= 7) return 'text-ball-yellow';
		return 'text-success';
	}

	function resetForm() {
		formDate = new Date().toISOString().split('T')[0];
		formOpponent = '';
		formSurface = 'Hard';
		formConditions = '';
		formGamePlan = '';
		formScore = '';
		formFirstServe = 60;
		formUnforcedErrors = 0;
		formWinners = 0;
		formTacticalReview = '';
		formMentalReview = '';
		formAction1 = '';
		formAction2 = '';
		formAction3 = '';
		formMentalRating = 5;
	}

	function handleSave() {
		const entryData = {
			date: formDate,
			opponent: formOpponent,
			surface: formSurface,
			conditions: formConditions,
			gamePlan: formGamePlan,
			score: formScore,
			firstServePercent: formFirstServe,
			unforcedErrors: formUnforcedErrors,
			winners: formWinners,
			tacticalReview: formTacticalReview,
			mentalReview: formMentalReview,
			actionItems: [formAction1, formAction2, formAction3].filter(a => a.trim()),
			mentalRating: formMentalRating
		};

		if (editingEntryId) {
			journalStore.updateEntry(editingEntryId, entryData);
			editingEntryId = null;
		} else {
			journalStore.addEntry({ ...entryData, id: Date.now().toString() });
		}
		resetForm();
		showForm = false;
	}

	function handleCancel() {
		resetForm();
		editingEntryId = null;
		showForm = false;
	}

	function startEditing(entry: JournalEntry) {
		editingEntryId = entry.id;
		formDate = entry.date;
		formOpponent = entry.opponent;
		formSurface = entry.surface;
		formConditions = entry.conditions;
		formGamePlan = entry.gamePlan;
		formScore = entry.score;
		formFirstServe = entry.firstServePercent;
		formUnforcedErrors = entry.unforcedErrors;
		formWinners = entry.winners;
		formTacticalReview = entry.tacticalReview;
		formMentalReview = entry.mentalReview;
		formAction1 = entry.actionItems[0] ?? '';
		formAction2 = entry.actionItems[1] ?? '';
		formAction3 = entry.actionItems[2] ?? '';
		formMentalRating = entry.mentalRating;
		showForm = true;
		expandedEntryId = null;
		// Scroll to top
		if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
	}

	function handleDelete(id: string) {
		journalStore.deleteEntry(id);
		confirmDeleteId = null;
		expandedEntryId = null;
	}

	function toggleExpand(id: string) {
		expandedEntryId = expandedEntryId === id ? null : id;
		confirmDeleteId = null;
	}

	function formatDate(dateStr: string): string {
		try {
			return new Date(dateStr + 'T12:00:00').toLocaleDateString('en-US', {
				weekday: 'short',
				year: 'numeric',
				month: 'short',
				day: 'numeric'
			});
		} catch {
			return dateStr;
		}
	}

	function surfaceColor(surface: string): string {
		switch (surface.toLowerCase()) {
			case 'clay': return 'bg-clay/20 text-clay';
			case 'grass': return 'bg-court-green/20 text-court-green';
			case 'hard': return 'bg-accent-blue/20 text-accent-blue';
			case 'indoor': return 'bg-accent-purple/20 text-accent-purple';
			default: return 'bg-surface-lighter text-text-muted';
		}
	}

	function resultBorderClass(score: string): string {
		const result = detectResult(score);
		if (result === 'win') return 'border-l-4 border-l-success/50';
		if (result === 'loss') return 'border-l-4 border-l-accent-red/50';
		return 'border-l-4 border-l-surface-lighter';
	}
</script>

<svelte:head>
	<title>Match Journal | TennisEdge</title>
</svelte:head>

<!-- ==========================================
     MATCH MODE FULL-SCREEN OVERLAY
     ========================================== -->
{#if matchModeActive}
	<div class="fixed inset-0 z-50 bg-[#0a0e1a] flex flex-col overflow-hidden" style="font-size: 16px;">
		<!-- Match Mode Header -->
		<div class="flex items-center justify-between px-4 py-3 bg-[#0f1420] border-b border-white/10 shrink-0">
			<h1 class="text-lg font-bold text-ball-yellow tracking-tight">MATCH MODE</h1>
			<div class="flex items-center gap-2">
				<button
					onclick={endMatch}
					class="px-4 py-2 rounded-xl bg-accent-red/20 text-accent-red font-bold text-sm min-h-[44px] hover:bg-accent-red/30 transition-colors"
				>
					End Match
				</button>
				<button
					onclick={closeMatchMode}
					class="w-11 h-11 rounded-xl bg-surface-lighter flex items-center justify-center text-text-muted hover:text-text-primary transition-colors"
				>
					<svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
						<line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
					</svg>
				</button>
			</div>
		</div>

		<!-- Tab Bar -->
		<div class="flex shrink-0 bg-[#0f1420] border-b border-white/10 px-2">
			{#each [
				{ key: 'tips', label: 'QUICK TIPS' },
				{ key: 'changeover', label: 'CHANGEOVER' },
				{ key: 'between', label: 'BETWEEN' },
				{ key: 'scores', label: 'SCORE' }
			] as tab}
				<button
					onclick={() => matchModeTab = tab.key as typeof matchModeTab}
					class="flex-1 py-3 text-xs font-bold tracking-wider text-center min-h-[44px] transition-colors
						{matchModeTab === tab.key ? 'text-ball-yellow border-b-2 border-ball-yellow' : 'text-text-muted hover:text-text-secondary'}"
				>
					{tab.label}
				</button>
			{/each}
		</div>

		<!-- Tab Content -->
		<div class="flex-1 overflow-y-auto px-4 py-4 space-y-3">

			<!-- ===== TAB 1: QUICK TIPS ===== -->
			{#if matchModeTab === 'tips'}
				{#each quickTips as tip}
					{@const colors = getTipColorClasses(tip.color)}
					<div class="rounded-xl border {colors.border} {colors.bg} overflow-hidden">
						<button
							onclick={() => expandedTipId = expandedTipId === tip.id ? null : tip.id}
							class="w-full text-left px-4 py-3.5 flex items-center gap-3 min-h-[52px]"
						>
							<span class="w-2.5 h-2.5 rounded-full {colors.dot} shrink-0"></span>
							<span class="font-bold text-text-primary text-[15px] flex-1">{tip.title}</span>
							<svg class="w-5 h-5 text-text-muted shrink-0 transition-transform duration-200 {expandedTipId === tip.id ? 'rotate-180' : ''}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
								<polyline points="6 9 12 15 18 9"/>
							</svg>
						</button>
						{#if expandedTipId === tip.id}
							<div class="px-4 pb-4 space-y-2">
								{#each tip.tips as line}
									<p class="text-text-secondary text-[15px] leading-relaxed flex items-start gap-2">
										<span class="{colors.text} mt-1.5 shrink-0 text-[8px]">&#9679;</span>
										{line}
									</p>
								{/each}
							</div>
						{/if}
					</div>
				{/each}

			<!-- ===== TAB 2: CHANGEOVER ===== -->
			{:else if matchModeTab === 'changeover'}
				<div class="space-y-4">
					<!-- Questions -->
					<div class="space-y-3">
						<h3 class="text-xs font-bold text-accent-blue uppercase tracking-wider">Ask yourself:</h3>
						{#each getVisibleQuestions() as question, i}
							<div class="rounded-xl bg-accent-blue/8 border border-accent-blue/20 px-4 py-3.5">
								<p class="text-text-primary text-[15px] leading-relaxed">
									<span class="text-accent-blue font-bold mr-2">{i + 1}.</span>{question}
								</p>
							</div>
						{/each}
						<button
							onclick={nextQuestions}
							class="w-full py-3 rounded-xl bg-accent-blue/15 text-accent-blue font-bold text-sm min-h-[44px] hover:bg-accent-blue/25 transition-colors"
						>
							Next Questions
						</button>
					</div>

					<!-- Confidence Slider -->
					<div class="rounded-xl bg-surface-light/50 border border-white/10 p-4 space-y-2">
						<div class="flex items-center justify-between">
							<span class="text-xs font-bold text-text-muted uppercase tracking-wider">Confidence</span>
							<span class="text-lg font-bold {mentalRatingColor(confidenceRating)}">{confidenceRating}/10</span>
						</div>
						<input
							type="range"
							bind:value={confidenceRating}
							min="1"
							max="10"
							step="1"
							class="w-full h-3 rounded-full appearance-none cursor-pointer bg-surface-lighter accent-ball-yellow"
						/>
						<div class="flex justify-between text-[11px] text-text-muted">
							<span>Low</span><span>Mid</span><span>High</span>
						</div>
					</div>

					<!-- Quick Note -->
					<div class="rounded-xl bg-surface-light/50 border border-white/10 p-4 space-y-2">
						<span class="text-xs font-bold text-text-muted uppercase tracking-wider">Quick note</span>
						<div class="flex gap-2">
							<input
								type="text"
								bind:value={changeoverNote}
								placeholder="e.g. serving wide is working"
								class="flex-1 bg-surface-lighter border border-white/10 rounded-lg px-3 py-2.5 text-[15px] text-text-primary placeholder-text-muted focus:outline-none focus:border-ball-yellow/50 min-h-[44px]"
							/>
							<button
								onclick={saveChangeoverNote}
								class="px-4 rounded-lg bg-ball-yellow text-surface-card font-bold text-sm min-h-[44px] hover:bg-ball-yellow-dim transition-colors shrink-0"
							>
								Save
							</button>
						</div>
						{#if changeoverNotes.length > 0}
							<div class="space-y-1 pt-1">
								{#each changeoverNotes as note, i}
									<p class="text-text-secondary text-sm flex items-start gap-2">
										<span class="text-ball-yellow shrink-0 mt-0.5">{i + 1}.</span>{note}
									</p>
								{/each}
							</div>
						{/if}
					</div>
				</div>

			<!-- ===== TAB 3: BETWEEN POINTS ===== -->
			{:else if matchModeTab === 'between'}
				<div class="space-y-4">
					<!-- 4-Step Routine -->
					<div class="space-y-3">
						{#each routineSteps as step, i}
							{@const isActive = routineRunning && routineStep === i}
							{@const isDone = routineRunning && routineStep > i}
							<div class="rounded-xl border transition-all duration-300
								{isActive
									? 'bg-ball-yellow/15 border-ball-yellow/50 shadow-lg shadow-ball-yellow/10'
									: isDone
										? 'bg-success/10 border-success/30'
										: 'bg-surface-light/50 border-white/10'}
								px-4 py-4"
							>
								<div class="flex items-center gap-3">
									<div class="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold shrink-0
										{isActive
											? 'bg-ball-yellow text-surface-card'
											: isDone
												? 'bg-success/20 text-success'
												: 'bg-surface-lighter text-text-muted'}"
									>
										{#if isDone}
											<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
												<polyline points="20 6 9 17 4 12"/>
											</svg>
										{:else}
											{i + 1}
										{/if}
									</div>
									<div class="flex-1">
										<p class="font-bold text-[15px] {isActive ? 'text-ball-yellow' : isDone ? 'text-success' : 'text-text-primary'}">{step.label}</p>
										<p class="text-text-secondary text-[14px] mt-0.5">{step.description}</p>
									</div>
									{#if isActive}
										<div class="w-3 h-3 rounded-full bg-ball-yellow animate-pulse shrink-0"></div>
									{/if}
								</div>
							</div>
						{/each}
					</div>

					<!-- Start/Stop Routine -->
					{#if routineRunning}
						<button
							onclick={stopRoutine}
							class="w-full py-4 rounded-xl bg-accent-red/20 text-accent-red font-bold text-base min-h-[52px] hover:bg-accent-red/30 transition-colors"
						>
							Stop Routine
						</button>
					{:else}
						<button
							onclick={startRoutine}
							class="w-full py-4 rounded-xl bg-ball-yellow text-surface-card font-bold text-base min-h-[52px] shadow-lg shadow-ball-yellow/20 hover:shadow-ball-yellow/40 transition-all"
						>
							Start Routine
						</button>
					{/if}

					<!-- Cue Words -->
					<div class="rounded-xl bg-surface-light/50 border border-white/10 p-4 space-y-3">
						<div class="flex items-center justify-between">
							<span class="text-xs font-bold text-text-muted uppercase tracking-wider">Cue Words</span>
							<button
								onclick={() => editingCueWords = !editingCueWords}
								class="text-xs font-semibold text-accent-blue hover:text-accent-blue/80 transition-colors min-h-[44px] px-2"
							>
								{editingCueWords ? 'Done' : 'Edit'}
							</button>
						</div>
						{#if editingCueWords}
							<div class="flex gap-2 flex-wrap">
								{#each cueWords as _, i}
									<input
										type="text"
										bind:value={cueWords[i]}
										class="w-28 bg-surface-lighter border border-white/10 rounded-lg px-3 py-2.5 text-[15px] text-text-primary text-center focus:outline-none focus:border-ball-yellow/50 min-h-[44px]"
									/>
								{/each}
							</div>
						{:else}
							<div class="flex gap-3 flex-wrap">
								{#each cueWords as word}
									<span class="px-5 py-2.5 rounded-xl bg-ball-yellow/15 text-ball-yellow font-bold text-base border border-ball-yellow/30">
										{word}
									</span>
								{/each}
							</div>
						{/if}
					</div>
				</div>

			<!-- ===== TAB 4: SCORE & NOTES ===== -->
			{:else if matchModeTab === 'scores'}
				<div class="space-y-4">
					<!-- Set Scores -->
					<div class="rounded-xl bg-surface-light/50 border border-white/10 p-4 space-y-3">
						<span class="text-xs font-bold text-text-muted uppercase tracking-wider">Set Scores</span>
						{#each matchSetScores as _, setIndex}
							<div class="flex items-center gap-3">
								<span class="text-text-muted text-sm font-bold w-12 shrink-0">Set {setIndex + 1}</span>
								<select
									bind:value={matchSetScores[setIndex][0]}
									class="flex-1 bg-surface-lighter border border-white/10 rounded-lg px-3 py-2.5 text-[15px] text-text-primary text-center focus:outline-none focus:border-ball-yellow/50 min-h-[44px]"
								>
									{#each Array.from({ length: 8 }, (_, i) => i) as n}
										<option value={n}>{n}</option>
									{/each}
								</select>
								<span class="text-text-muted font-bold">-</span>
								<select
									bind:value={matchSetScores[setIndex][1]}
									class="flex-1 bg-surface-lighter border border-white/10 rounded-lg px-3 py-2.5 text-[15px] text-text-primary text-center focus:outline-none focus:border-ball-yellow/50 min-h-[44px]"
								>
									{#each Array.from({ length: 8 }, (_, i) => i) as n}
										<option value={n}>{n}</option>
									{/each}
								</select>
							</div>
						{/each}
					</div>

					<!-- What's Working -->
					<div class="rounded-xl bg-surface-light/50 border border-white/10 p-4 space-y-2">
						<label class="text-xs font-bold text-success uppercase tracking-wider" for="mm-working">What's working</label>
						<textarea
							id="mm-working"
							bind:value={matchWorking}
							placeholder="Short notes..."
							rows="2"
							class="w-full bg-surface-lighter border border-white/10 rounded-lg px-3 py-2.5 text-[15px] text-text-primary placeholder-text-muted focus:outline-none focus:border-ball-yellow/50 resize-none min-h-[60px]"
						></textarea>
					</div>

					<!-- What to Change -->
					<div class="rounded-xl bg-surface-light/50 border border-white/10 p-4 space-y-2">
						<label class="text-xs font-bold text-accent-orange uppercase tracking-wider" for="mm-change">What to change</label>
						<textarea
							id="mm-change"
							bind:value={matchToChange}
							placeholder="Short notes..."
							rows="2"
							class="w-full bg-surface-lighter border border-white/10 rounded-lg px-3 py-2.5 text-[15px] text-text-primary placeholder-text-muted focus:outline-none focus:border-ball-yellow/50 resize-none min-h-[60px]"
						></textarea>
					</div>

					<!-- Opponent Notes -->
					<div class="rounded-xl bg-surface-light/50 border border-white/10 p-4 space-y-2">
						<label class="text-xs font-bold text-accent-blue uppercase tracking-wider" for="mm-opponent">Opponent observations</label>
						<textarea
							id="mm-opponent"
							bind:value={matchOpponentNotes}
							placeholder="Weaknesses, patterns..."
							rows="2"
							class="w-full bg-surface-lighter border border-white/10 rounded-lg px-3 py-2.5 text-[15px] text-text-primary placeholder-text-muted focus:outline-none focus:border-ball-yellow/50 resize-none min-h-[60px]"
						></textarea>
					</div>

					<!-- End Match (also accessible here) -->
					<button
						onclick={endMatch}
						class="w-full py-4 rounded-xl bg-accent-red/20 text-accent-red font-bold text-base min-h-[52px] border border-accent-red/30 hover:bg-accent-red/30 transition-colors"
					>
						End Match & Save Journal Entry
					</button>
				</div>
			{/if}
		</div>
	</div>
{/if}

<div class="space-y-6 animate-slide-up">
	<!-- Header -->
	<div class="flex items-center justify-between flex-wrap gap-4">
		<div>
			<h1 class="text-3xl font-bold text-text-primary tracking-tight">Match Journal</h1>
			<p class="text-text-secondary mt-1">Track your matches, review your game, improve consistently</p>
			{#if isMatchDay}
				<p class="text-ball-yellow text-sm mt-1 font-semibold flex items-center gap-1.5">
					<svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
					Match Day -- Complete your checklists!
				</p>
			{/if}
		</div>
		<div class="flex items-center gap-2">
			{#if savedMatch?.active && !matchModeActive}
				<button
					onclick={resumeMatchMode}
					class="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200
						bg-accent-orange text-white shadow-lg shadow-accent-orange/30 hover:shadow-accent-orange/50 animate-pulse"
				>
					<svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<polygon points="5 3 19 12 5 21 5 3"/>
					</svg>
					Resume Match
				</button>
			{:else}
				<button
					onclick={openMatchMode}
					class="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200
						bg-court-green text-white shadow-lg shadow-court-green/30 hover:shadow-court-green/50 hover:bg-court-green-dark"
				>
					<svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/>
					</svg>
					Start Match Mode
				</button>
			{/if}
			<button
				onclick={() => { showForm = !showForm; if (showForm && !editingEntryId) resetForm(); }}
				class="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200
					{showForm
						? 'bg-surface-light text-text-secondary hover:bg-surface-lighter'
						: 'bg-ball-yellow text-surface-card shadow-lg shadow-ball-yellow/20 hover:shadow-ball-yellow/40'}"
			>
				{#if showForm}
					<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
					</svg>
					Close
				{:else}
					<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
						<path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
					</svg>
					Post-Match Review
				{/if}
			</button>
		</div>
	</div>

	<!-- PRE-MATCH CHECKLIST (match days only) -->
	{#if isMatchDay}
		<div class="glass-card glow-green p-6 space-y-5 animate-slide-up">
			<button class="w-full flex items-center justify-between flex-wrap gap-3" onclick={() => preMatchCollapsed = !preMatchCollapsed}>
				<div class="flex items-center gap-3">
					<div class="w-10 h-10 rounded-xl bg-court-green/20 flex items-center justify-center">
						<svg class="w-5 h-5 text-court-green" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>
						</svg>
					</div>
					<div class="text-left">
						<h2 class="text-xl font-bold text-text-primary">Pre-Match Checklist</h2>
						<p class="text-xs text-text-muted mt-0.5">{preMatchCompleted}/{allPreMatchItems.length} completed</p>
					</div>
				</div>
				<div class="flex items-center gap-2">
					{#if !preMatchCollapsed}
						<span class="text-xs text-text-muted" onclick={(e) => { e.stopPropagation(); speakAllItems(allPreMatchItems); }}>
							<span class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-accent-blue/15 text-accent-blue text-xs font-semibold hover:bg-accent-blue/25 transition-colors">
								<svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>
								Read All
							</span>
						</span>
					{/if}
					<svg class="w-5 h-5 text-text-muted transition-transform duration-200 {preMatchCollapsed ? '' : 'rotate-180'}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
				</div>
			</button>

			<!-- Progress bar (always visible) -->
			<div class="progress-bar">
				<div class="progress-bar-fill bg-court-green" style="width: {(preMatchCompleted / allPreMatchItems.length) * 100}%"></div>
			</div>

			{#if !preMatchCollapsed}
			{#each preMatchSections as section}
				<div class="space-y-2">
					<h3 class="text-xs font-bold text-court-green uppercase tracking-wider flex items-center gap-2">
						<span class="w-5 h-0.5 bg-court-green/30 rounded"></span>
						{section.label}
					</h3>
					{#each section.items as item}
						{@const completed = progressStore.isCompleted(today, item.id)}
						<div class="flex items-start gap-3 p-3 rounded-lg transition-colors {completed ? 'bg-court-green/5' : 'bg-surface-light/50 hover:bg-surface-light'}">
							<button
								onclick={() => progressStore.toggleActivity(today, item.id)}
								class="mt-0.5 shrink-0 w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all duration-200
									{completed ? 'bg-court-green border-court-green' : 'border-white/20 hover:border-court-green/50'}"
							>
								{#if completed}
									<svg class="w-3 h-3 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
										<polyline points="20 6 9 17 4 12"/>
									</svg>
								{/if}
							</button>
							<p class="text-sm flex-1 {completed ? 'text-text-muted line-through' : 'text-text-secondary'}">
								{item.text}
							</p>
							<button
								onclick={() => speakText(item.text)}
								class="shrink-0 mt-0.5 w-7 h-7 rounded-md flex items-center justify-center text-text-muted hover:text-accent-blue hover:bg-accent-blue/10 transition-colors"
								title="Read aloud"
							>
								<svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/></svg>
							</button>
						</div>
					{/each}
				</div>
			{/each}
tt{/if}
		</div>
	{/if}

	<!-- Stats Overview -->
	{#if stats}
		<div class="grid grid-cols-2 md:grid-cols-5 gap-3">
			<div class="glass-card p-4 text-center">
				<p class="text-2xl font-bold text-text-primary">{stats.total}</p>
				<p class="text-xs text-text-muted mt-1">Matches</p>
			</div>
			<div class="glass-card p-4 text-center">
				<p class="text-2xl font-bold">
					<span class="text-success">{stats.wins}</span>
					<span class="text-text-muted mx-1">/</span>
					<span class="text-accent-red">{stats.losses}</span>
				</p>
				<p class="text-xs text-text-muted mt-1">W / L</p>
			</div>
			<div class="glass-card p-4 text-center">
				<p class="text-2xl font-bold text-accent-blue">{stats.avgFirstServe}%</p>
				<p class="text-xs text-text-muted mt-1">Avg 1st Serve</p>
			</div>
			<div class="glass-card p-4 text-center">
				<p class="text-2xl font-bold {mentalRatingColor(Number(stats.avgMental))}">{stats.avgMental}</p>
				<p class="text-xs text-text-muted mt-1">Avg Mental</p>
			</div>
			<div class="glass-card p-4 text-center col-span-2 md:col-span-1">
				<p class="text-2xl font-bold {stats.trend === 'improving' ? 'text-success' : stats.trend === 'declining' ? 'text-accent-red' : 'text-text-secondary'}">
					{#if stats.trend === 'improving'}
						<svg class="w-6 h-6 inline" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
					{:else if stats.trend === 'declining'}
						<svg class="w-6 h-6 inline" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="23 18 13.5 8.5 8.5 13.5 1 6"/><polyline points="17 18 23 18 23 12"/></svg>
					{:else}
						<svg class="w-6 h-6 inline" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="1" y1="12" x2="23" y2="12"/></svg>
					{/if}
				</p>
				<p class="text-xs text-text-muted mt-1">Trend</p>
			</div>
		</div>
	{/if}

	<!-- Journal Entry Form -->
	{#if showForm}
		<div class="glass-card glow-yellow p-6 space-y-6 animate-slide-up">
			<h2 class="text-xl font-bold text-text-primary flex items-center gap-2">
				<svg class="w-5 h-5 text-ball-yellow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
					<path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
				</svg>
				{editingEntryId ? 'Edit Match Entry' : 'New Match Entry'}
			</h2>

			<!-- Pre-Match Section -->
			<div class="space-y-4">
				<h3 class="text-sm font-semibold text-ball-yellow uppercase tracking-wider flex items-center gap-2">
					<span class="w-6 h-0.5 bg-ball-yellow/30 rounded"></span>
					Pre-Match
				</h3>
				<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
					<div>
						<label class="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-1.5" for="date">Date</label>
						<input
							type="date"
							id="date"
							bind:value={formDate}
							class="w-full bg-surface-light border border-white/10 rounded-lg px-4 py-2.5 text-sm text-text-primary focus:outline-none focus:border-ball-yellow/50 focus:ring-1 focus:ring-ball-yellow/20 transition-colors"
						/>
					</div>
					<div>
						<label class="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-1.5" for="opponent">Opponent</label>
						<input
							type="text"
							id="opponent"
							bind:value={formOpponent}
							placeholder="Name or description"
							class="w-full bg-surface-light border border-white/10 rounded-lg px-4 py-2.5 text-sm text-text-primary placeholder-text-muted focus:outline-none focus:border-ball-yellow/50 focus:ring-1 focus:ring-ball-yellow/20 transition-colors"
						/>
					</div>
					<div>
						<label class="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-1.5" for="surface">Surface</label>
						<select
							id="surface"
							bind:value={formSurface}
							class="w-full bg-surface-light border border-white/10 rounded-lg px-4 py-2.5 text-sm text-text-primary focus:outline-none focus:border-ball-yellow/50 focus:ring-1 focus:ring-ball-yellow/20 transition-colors"
						>
							{#each surfaces as s}
								<option value={s}>{s}</option>
							{/each}
						</select>
					</div>
					<div>
						<label class="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-1.5" for="conditions">Conditions</label>
						<input
							type="text"
							id="conditions"
							bind:value={formConditions}
							placeholder="Wind, temperature, indoor/outdoor..."
							class="w-full bg-surface-light border border-white/10 rounded-lg px-4 py-2.5 text-sm text-text-primary placeholder-text-muted focus:outline-none focus:border-ball-yellow/50 focus:ring-1 focus:ring-ball-yellow/20 transition-colors"
						/>
					</div>
				</div>
				<div>
					<label class="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-1.5" for="gameplan">Game Plan</label>
					<textarea
						id="gameplan"
						bind:value={formGamePlan}
						placeholder="What are your 2-3 tactical priorities?"
						rows="3"
						class="w-full bg-surface-light border border-white/10 rounded-lg px-4 py-2.5 text-sm text-text-primary placeholder-text-muted focus:outline-none focus:border-ball-yellow/50 focus:ring-1 focus:ring-ball-yellow/20 transition-colors resize-none"
					></textarea>
				</div>
			</div>

			<!-- Results Section -->
			<div class="space-y-4">
				<h3 class="text-sm font-semibold text-accent-blue uppercase tracking-wider flex items-center gap-2">
					<span class="w-6 h-0.5 bg-accent-blue/30 rounded"></span>
					Results
				</h3>
				<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
					<div>
						<label class="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-1.5" for="score">Score</label>
						<input
							type="text"
							id="score"
							bind:value={formScore}
							placeholder="e.g. 6-3 4-6 7-5"
							class="w-full bg-surface-light border border-white/10 rounded-lg px-4 py-2.5 text-sm text-text-primary placeholder-text-muted focus:outline-none focus:border-ball-yellow/50 focus:ring-1 focus:ring-ball-yellow/20 transition-colors"
						/>
					</div>
					<div>
						<label class="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-1.5" for="ue">Unforced Errors (est.)</label>
						<input
							type="number"
							id="ue"
							bind:value={formUnforcedErrors}
							min="0"
							class="w-full bg-surface-light border border-white/10 rounded-lg px-4 py-2.5 text-sm text-text-primary focus:outline-none focus:border-ball-yellow/50 focus:ring-1 focus:ring-ball-yellow/20 transition-colors"
						/>
					</div>
					<div>
						<label class="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-1.5" for="winners">Winners (est.)</label>
						<input
							type="number"
							id="winners"
							bind:value={formWinners}
							min="0"
							class="w-full bg-surface-light border border-white/10 rounded-lg px-4 py-2.5 text-sm text-text-primary focus:outline-none focus:border-ball-yellow/50 focus:ring-1 focus:ring-ball-yellow/20 transition-colors"
						/>
					</div>
				</div>
				<div>
					<label class="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-1.5" for="firstserve">
						First Serve % &mdash; <span class="text-ball-yellow font-bold">{formFirstServe}%</span>
					</label>
					<input
						type="range"
						id="firstserve"
						bind:value={formFirstServe}
						min="0"
						max="100"
						step="1"
						class="w-full h-2 rounded-full appearance-none cursor-pointer bg-surface-lighter accent-ball-yellow"
					/>
					<div class="flex justify-between text-[10px] text-text-muted mt-1">
						<span>0%</span><span>25%</span><span>50%</span><span>75%</span><span>100%</span>
					</div>
				</div>
			</div>

			<!-- Review Section -->
			<div class="space-y-4">
				<h3 class="text-sm font-semibold text-accent-purple uppercase tracking-wider flex items-center gap-2">
					<span class="w-6 h-0.5 bg-accent-purple/30 rounded"></span>
					Review
				</h3>
				<div>
					<label class="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-1.5" for="tactical">Tactical Review</label>
					<textarea
						id="tactical"
						bind:value={formTacticalReview}
						placeholder="What worked? What didn't? Mid-match adjustments?"
						rows="3"
						class="w-full bg-surface-light border border-white/10 rounded-lg px-4 py-2.5 text-sm text-text-primary placeholder-text-muted focus:outline-none focus:border-ball-yellow/50 focus:ring-1 focus:ring-ball-yellow/20 transition-colors resize-none"
					></textarea>
				</div>
				<div>
					<label class="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-1.5" for="mental">Mental Review</label>
					<textarea
						id="mental"
						bind:value={formMentalReview}
						placeholder="Focus lapses? Pressure handling? Routine compliance?"
						rows="3"
						class="w-full bg-surface-light border border-white/10 rounded-lg px-4 py-2.5 text-sm text-text-primary placeholder-text-muted focus:outline-none focus:border-ball-yellow/50 focus:ring-1 focus:ring-ball-yellow/20 transition-colors resize-none"
					></textarea>
				</div>
				<div>
					<label class="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-1.5" for="mentalrating">
						Mental Rating &mdash; <span class="{mentalRatingColor(formMentalRating)} font-bold">{formMentalRating}/10 ({mentalRatingLabel(formMentalRating)})</span>
					</label>
					<input
						type="range"
						id="mentalrating"
						bind:value={formMentalRating}
						min="1"
						max="10"
						step="1"
						class="w-full h-2 rounded-full appearance-none cursor-pointer bg-surface-lighter accent-ball-yellow"
					/>
					<div class="flex justify-between text-[10px] text-text-muted mt-1">
						<span>1 Terrible</span><span>5 Average</span><span>10 Excellent</span>
					</div>
				</div>
			</div>

			<!-- Actions Section -->
			<div class="space-y-4">
				<h3 class="text-sm font-semibold text-court-green uppercase tracking-wider flex items-center gap-2">
					<span class="w-6 h-0.5 bg-court-green/30 rounded"></span>
					Action Items
				</h3>
				<p class="text-xs text-text-muted -mt-2">What to practice before your next match</p>
				<div class="space-y-3">
					<div class="flex items-center gap-3">
						<span class="text-xs font-bold text-text-muted w-4 shrink-0">1.</span>
						<input
							type="text"
							bind:value={formAction1}
							placeholder="First priority..."
							class="w-full bg-surface-light border border-white/10 rounded-lg px-4 py-2.5 text-sm text-text-primary placeholder-text-muted focus:outline-none focus:border-ball-yellow/50 focus:ring-1 focus:ring-ball-yellow/20 transition-colors"
						/>
					</div>
					<div class="flex items-center gap-3">
						<span class="text-xs font-bold text-text-muted w-4 shrink-0">2.</span>
						<input
							type="text"
							bind:value={formAction2}
							placeholder="Second priority..."
							class="w-full bg-surface-light border border-white/10 rounded-lg px-4 py-2.5 text-sm text-text-primary placeholder-text-muted focus:outline-none focus:border-ball-yellow/50 focus:ring-1 focus:ring-ball-yellow/20 transition-colors"
						/>
					</div>
					<div class="flex items-center gap-3">
						<span class="text-xs font-bold text-text-muted w-4 shrink-0">3.</span>
						<input
							type="text"
							bind:value={formAction3}
							placeholder="Third priority..."
							class="w-full bg-surface-light border border-white/10 rounded-lg px-4 py-2.5 text-sm text-text-primary placeholder-text-muted focus:outline-none focus:border-ball-yellow/50 focus:ring-1 focus:ring-ball-yellow/20 transition-colors"
						/>
					</div>
				</div>
			</div>

			<!-- Form Buttons -->
			<div class="flex items-center gap-3 pt-2">
				<button
					onclick={handleSave}
					class="px-6 py-2.5 rounded-xl bg-ball-yellow text-surface-card font-semibold text-sm shadow-lg shadow-ball-yellow/20 hover:shadow-ball-yellow/40 transition-all duration-200"
				>
					{editingEntryId ? 'Update Entry' : 'Save Entry'}
				</button>
				<button
					onclick={handleCancel}
					class="px-6 py-2.5 rounded-xl bg-surface-light text-text-secondary font-semibold text-sm hover:bg-surface-lighter transition-colors"
				>
					Cancel
				</button>
			</div>
		</div>
	{/if}

	<!-- DURING THE MATCH QUICK REFERENCE CARD (match days only) -->
	{#if isMatchDay}
		<div class="glass-card glow-yellow overflow-hidden animate-slide-up">
			<button
				onclick={() => duringMatchCollapsed = !duringMatchCollapsed}
				class="w-full text-left p-5 flex items-center justify-between cursor-pointer hover:bg-white/[0.02] transition-colors"
			>
				<div class="flex items-center gap-3">
					<div class="w-10 h-10 rounded-xl bg-ball-yellow/20 flex items-center justify-center">
						<svg class="w-5 h-5 text-ball-yellow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
						</svg>
					</div>
					<div>
						<h2 class="text-lg font-bold text-text-primary">During the Match</h2>
						<p class="text-xs text-text-muted">Quick reference reminders</p>
					</div>
				</div>
				<svg class="w-5 h-5 text-text-muted transition-transform duration-200 {duringMatchCollapsed ? '' : 'rotate-180'}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<polyline points="6 9 12 15 18 9"/>
				</svg>
			</button>

			{#if !duringMatchCollapsed}
				<div class="px-5 pb-5 space-y-5 border-t border-white/5">
					<!-- Between every point -->
					<div class="space-y-2 pt-4">
						<h3 class="text-xs font-bold text-ball-yellow uppercase tracking-wider flex items-center gap-2">
							<span class="w-5 h-0.5 bg-ball-yellow/30 rounded"></span>
							Between every point
						</h3>
						<ul class="space-y-1.5 ml-1">
							<li class="flex items-start gap-2 text-sm text-text-secondary">
								<span class="text-ball-yellow mt-1 shrink-0">&#8226;</span>
								Turn away from net, confident posture
							</li>
							<li class="flex items-start gap-2 text-sm text-text-secondary">
								<span class="text-ball-yellow mt-1 shrink-0">&#8226;</span>
								Breathe: in through nose, out through mouth
							</li>
							<li class="flex items-start gap-2 text-sm text-text-secondary">
								<span class="text-ball-yellow mt-1 shrink-0">&#8226;</span>
								Fix strings (mental anchor)
							</li>
							<li class="flex items-start gap-2 text-sm text-text-secondary">
								<span class="text-ball-yellow mt-1 shrink-0">&#8226;</span>
								Decide next point plan
							</li>
							<li class="flex items-start gap-2 text-sm text-text-secondary">
								<span class="text-ball-yellow mt-1 shrink-0">&#8226;</span>
								Pre-serve/return ritual
							</li>
						</ul>
					</div>

					<!-- At changeovers -->
					<div class="space-y-2">
						<h3 class="text-xs font-bold text-accent-blue uppercase tracking-wider flex items-center gap-2">
							<span class="w-5 h-0.5 bg-accent-blue/30 rounded"></span>
							At changeovers
						</h3>
						<ul class="space-y-1.5 ml-1">
							<li class="flex items-start gap-2 text-sm text-text-secondary">
								<span class="text-accent-blue mt-1 shrink-0">&#8226;</span>
								Hydrate (3-4 sips)
							</li>
							<li class="flex items-start gap-2 text-sm text-text-secondary">
								<span class="text-accent-blue mt-1 shrink-0">&#8226;</span>
								Towel off
							</li>
							<li class="flex items-start gap-2 text-sm text-text-secondary">
								<span class="text-accent-blue mt-1 shrink-0">&#8226;</span>
								Review: what's working? What needs adjusting?
							</li>
							<li class="flex items-start gap-2 text-sm text-text-secondary">
								<span class="text-accent-blue mt-1 shrink-0">&#8226;</span>
								Reset mental energy
							</li>
						</ul>
					</div>

					<!-- When losing focus -->
					<div class="space-y-2">
						<h3 class="text-xs font-bold text-accent-orange uppercase tracking-wider flex items-center gap-2">
							<span class="w-5 h-0.5 bg-accent-orange/30 rounded"></span>
							When losing focus
						</h3>
						<ul class="space-y-1.5 ml-1">
							<li class="flex items-start gap-2 text-sm text-text-secondary">
								<span class="text-accent-orange mt-1 shrink-0">&#8226;</span>
								"Bounce-hit" -- say it as the ball bounces and as you hit
							</li>
							<li class="flex items-start gap-2 text-sm text-text-secondary">
								<span class="text-accent-orange mt-1 shrink-0">&#8226;</span>
								Come back to cue words
							</li>
							<li class="flex items-start gap-2 text-sm text-text-secondary">
								<span class="text-accent-orange mt-1 shrink-0">&#8226;</span>
								Focus on feet movement
							</li>
						</ul>
					</div>

					<!-- Under pressure -->
					<div class="space-y-2">
						<h3 class="text-xs font-bold text-accent-red uppercase tracking-wider flex items-center gap-2">
							<span class="w-5 h-0.5 bg-accent-red/30 rounded"></span>
							Under pressure (break points, tiebreaks)
						</h3>
						<ul class="space-y-1.5 ml-1">
							<li class="flex items-start gap-2 text-sm text-text-secondary">
								<span class="text-accent-red mt-1 shrink-0">&#8226;</span>
								Go to your best serve
							</li>
							<li class="flex items-start gap-2 text-sm text-text-secondary">
								<span class="text-accent-red mt-1 shrink-0">&#8226;</span>
								Play percentages -- no hero shots
							</li>
							<li class="flex items-start gap-2 text-sm text-text-secondary">
								<span class="text-accent-red mt-1 shrink-0">&#8226;</span>
								Recall a past win in a similar situation
							</li>
							<li class="flex items-start gap-2 text-sm text-text-secondary">
								<span class="text-accent-red mt-1 shrink-0">&#8226;</span>
								Stick to patterns, don't improvise
							</li>
						</ul>
					</div>
				</div>
			{/if}
		</div>
	{/if}

	<!-- POST-MATCH CHECKLIST (always visible) -->
	<div class="glass-card p-6 space-y-5 animate-slide-up">
		<button class="w-full flex items-center justify-between flex-wrap gap-3" onclick={() => postMatchCollapsed = !postMatchCollapsed}>
			<div class="flex items-center gap-3">
				<div class="w-10 h-10 rounded-xl bg-accent-purple/20 flex items-center justify-center">
					<svg class="w-5 h-5 text-accent-purple" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
					</svg>
				</div>
				<div class="text-left">
					<h2 class="text-xl font-bold text-text-primary">Post-Match Checklist</h2>
					<p class="text-xs text-text-muted mt-0.5">{postMatchCompleted}/{allPostMatchItems.length} completed</p>
				</div>
			</div>
			<div class="flex items-center gap-2">
				{#if !postMatchCollapsed}
					<span onclick={(e) => { e.stopPropagation(); speakAllItems(allPostMatchItems); }}
						class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-accent-blue/15 text-accent-blue text-xs font-semibold hover:bg-accent-blue/25 transition-colors">
						<svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/></svg>
						Read All
					</span>
				{/if}
				<svg class="w-5 h-5 text-text-muted transition-transform duration-200 {postMatchCollapsed ? '' : 'rotate-180'}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
			</div>
		</button>

		<!-- Progress bar (always visible) -->
		<div class="progress-bar">
			<div class="progress-bar-fill bg-accent-purple" style="width: {(postMatchCompleted / allPostMatchItems.length) * 100}%"></div>
		</div>

		{#if !postMatchCollapsed}
		{#each postMatchSections as section}
			<div class="space-y-2">
				<h3 class="text-xs font-bold text-accent-purple uppercase tracking-wider flex items-center gap-2">
					<span class="w-5 h-0.5 bg-accent-purple/30 rounded"></span>
					{section.label}
				</h3>
				{#each section.items as item}
					{@const completed = progressStore.isCompleted(today, item.id)}
					<div class="flex items-start gap-3 p-3 rounded-lg transition-colors {completed ? 'bg-accent-purple/5' : 'bg-surface-light/50 hover:bg-surface-light'}">
						<button
							onclick={() => progressStore.toggleActivity(today, item.id)}
							class="mt-0.5 shrink-0 w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all duration-200
								{completed ? 'bg-accent-purple border-accent-purple' : 'border-white/20 hover:border-accent-purple/50'}"
						>
							{#if completed}
								<svg class="w-3 h-3 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
									<polyline points="20 6 9 17 4 12"/>
								</svg>
							{/if}
						</button>
						<p class="text-sm flex-1 {completed ? 'text-text-muted line-through' : 'text-text-secondary'}">
							{item.text}
						</p>
						<button
							onclick={() => speakText(item.text)}
							class="shrink-0 mt-0.5 w-7 h-7 rounded-md flex items-center justify-center text-text-muted hover:text-accent-blue hover:bg-accent-blue/10 transition-colors"
							title="Read aloud"
						>
							<svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/></svg>
						</button>
					</div>
				{/each}
			</div>
		{/each}
		{/if}
	</div>

	<!-- Entries List -->
	{#if sortedEntries.length === 0 && !showForm}
		<div class="glass-card p-12 text-center">
			<svg class="w-16 h-16 mx-auto text-text-muted mb-4 opacity-40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
				<path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
			</svg>
			<p class="text-text-secondary text-lg font-medium">No journal entries yet</p>
			<p class="text-text-muted text-sm mt-1">Record your first match to start tracking your progress</p>
			<button
				onclick={() => { showForm = true; resetForm(); }}
				class="mt-4 px-5 py-2.5 rounded-xl bg-ball-yellow text-surface-card font-semibold text-sm shadow-lg shadow-ball-yellow/20 hover:shadow-ball-yellow/40 transition-all duration-200"
			>
				Create First Entry
			</button>
		</div>
	{/if}

	{#if sortedEntries.length > 0}
		<div class="space-y-3">
			<h2 class="text-lg font-bold text-text-primary flex items-center gap-2">
				<svg class="w-5 h-5 text-ball-yellow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
				</svg>
				Match History
			</h2>

			{#each sortedEntries as entry (entry.id)}
				{@const result = detectResult(entry.score)}
				{@const isExpanded = expandedEntryId === entry.id}

				<div class="glass-card overflow-hidden {resultBorderClass(entry.score)} animate-slide-up">
					<!-- Collapsed Card Header -->
					<button
						onclick={() => toggleExpand(entry.id)}
						class="w-full text-left p-4 flex items-center gap-4 cursor-pointer hover:bg-white/[0.02] transition-colors"
					>
						<!-- Result indicator -->
						<div class="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold
							{result === 'win' ? 'bg-success/15 text-success' : result === 'loss' ? 'bg-accent-red/15 text-accent-red' : 'bg-surface-lighter text-text-muted'}">
							{result === 'win' ? 'W' : result === 'loss' ? 'L' : '?'}
						</div>

						<div class="flex-1 min-w-0">
							<div class="flex items-center gap-2 flex-wrap">
								<span class="font-semibold text-text-primary text-sm">{entry.opponent || 'Unknown'}</span>
								{#if entry.score}
									<span class="text-text-secondary text-sm font-mono">{entry.score}</span>
								{/if}
							</div>
							<p class="text-xs text-text-muted mt-0.5">{formatDate(entry.date)}</p>
						</div>

						<div class="flex items-center gap-2 shrink-0">
							<span class="badge {surfaceColor(entry.surface)}">{entry.surface}</span>
							<span class="badge {mentalRatingColor(entry.mentalRating)} bg-surface-lighter text-xs">
								{entry.mentalRating}/10
							</span>
							<svg class="w-4 h-4 text-text-muted transition-transform duration-200 {isExpanded ? 'rotate-180' : ''}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
								<polyline points="6 9 12 15 18 9"/>
							</svg>
						</div>
					</button>

					<!-- Expanded Details -->
					{#if isExpanded}
						<div class="px-4 pb-5 pt-1 border-t border-white/5 space-y-5 animate-slide-up">
							<!-- Pre-match -->
							<div class="space-y-2">
								<h4 class="text-xs font-semibold text-ball-yellow uppercase tracking-wider">Pre-Match</h4>
								<div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
									<div>
										<span class="text-text-muted">Opponent:</span>
										<span class="text-text-primary ml-2">{entry.opponent || '-'}</span>
									</div>
									<div>
										<span class="text-text-muted">Surface:</span>
										<span class="badge ml-2 {surfaceColor(entry.surface)}">{entry.surface}</span>
									</div>
									{#if entry.conditions}
										<div class="sm:col-span-2">
											<span class="text-text-muted">Conditions:</span>
											<span class="text-text-secondary ml-2">{entry.conditions}</span>
										</div>
									{/if}
									{#if entry.gamePlan}
										<div class="sm:col-span-2">
											<span class="text-text-muted">Game Plan:</span>
											<p class="text-text-secondary mt-1 whitespace-pre-wrap">{entry.gamePlan}</p>
										</div>
									{/if}
								</div>
							</div>

							<!-- Results -->
							<div class="space-y-2">
								<h4 class="text-xs font-semibold text-accent-blue uppercase tracking-wider">Results</h4>
								<div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
									<div class="bg-surface-light rounded-lg p-3 text-center">
										<p class="text-lg font-bold text-text-primary font-mono">{entry.score || '-'}</p>
										<p class="text-[10px] text-text-muted mt-0.5">Score</p>
									</div>
									<div class="bg-surface-light rounded-lg p-3 text-center">
										<p class="text-lg font-bold text-accent-blue">{entry.firstServePercent}%</p>
										<p class="text-[10px] text-text-muted mt-0.5">1st Serve</p>
									</div>
									<div class="bg-surface-light rounded-lg p-3 text-center">
										<p class="text-lg font-bold text-accent-red">{entry.unforcedErrors}</p>
										<p class="text-[10px] text-text-muted mt-0.5">UE</p>
									</div>
									<div class="bg-surface-light rounded-lg p-3 text-center">
										<p class="text-lg font-bold text-success">{entry.winners}</p>
										<p class="text-[10px] text-text-muted mt-0.5">Winners</p>
									</div>
								</div>
								{#if entry.unforcedErrors > 0}
									<p class="text-xs text-text-muted">
										W/UE Ratio: <span class="font-semibold text-text-secondary">{(entry.winners / entry.unforcedErrors).toFixed(2)}</span>
										{#if entry.winners / entry.unforcedErrors >= 1}
											<span class="text-success ml-1">(positive)</span>
										{:else}
											<span class="text-accent-orange ml-1">(needs work)</span>
										{/if}
									</p>
								{/if}
							</div>

							<!-- Reviews -->
							<div class="space-y-2">
								<h4 class="text-xs font-semibold text-accent-purple uppercase tracking-wider">Review</h4>
								{#if entry.tacticalReview}
									<div class="bg-surface-light rounded-lg p-3">
										<p class="text-xs font-semibold text-text-muted mb-1">Tactical</p>
										<p class="text-sm text-text-secondary whitespace-pre-wrap">{entry.tacticalReview}</p>
									</div>
								{/if}
								{#if entry.mentalReview}
									<div class="bg-surface-light rounded-lg p-3">
										<p class="text-xs font-semibold text-text-muted mb-1">Mental</p>
										<p class="text-sm text-text-secondary whitespace-pre-wrap">{entry.mentalReview}</p>
									</div>
								{/if}
								<div class="flex items-center gap-2">
									<span class="text-xs text-text-muted">Mental Rating:</span>
									<span class="text-sm font-bold {mentalRatingColor(entry.mentalRating)}">{entry.mentalRating}/10</span>
									<span class="text-xs {mentalRatingColor(entry.mentalRating)}">({mentalRatingLabel(entry.mentalRating)})</span>
								</div>
							</div>

							<!-- Action Items -->
							{#if entry.actionItems.length > 0}
								<div class="space-y-2">
									<h4 class="text-xs font-semibold text-court-green uppercase tracking-wider">Action Items</h4>
									<ul class="space-y-1.5">
										{#each entry.actionItems as item, i}
											<li class="flex items-start gap-2 text-sm">
												<span class="mt-0.5 w-5 h-5 rounded-md bg-court-green/15 text-court-green flex items-center justify-center text-xs font-bold shrink-0">{i + 1}</span>
												<span class="text-text-secondary">{item}</span>
											</li>
										{/each}
									</ul>
								</div>
							{/if}

							<!-- Edit / Delete -->
							<div class="pt-2 border-t border-white/5 flex justify-between items-center">
								<button
									onclick={() => startEditing(entry)}
									class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-text-secondary hover:text-ball-yellow hover:bg-ball-yellow/10 text-xs font-medium transition-colors"
								>
									<svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
										<path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
										<path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
									</svg>
									Edit
								</button>
								<div>
								{#if confirmDeleteId === entry.id}
									<div class="flex items-center gap-2 text-sm">
										<span class="text-accent-red">Delete this entry?</span>
										<button
											onclick={() => handleDelete(entry.id)}
											class="px-3 py-1.5 rounded-lg bg-danger/20 text-danger font-semibold text-xs hover:bg-danger/30 transition-colors"
										>
											Confirm
										</button>
										<button
											onclick={() => (confirmDeleteId = null)}
											class="px-3 py-1.5 rounded-lg bg-surface-lighter text-text-muted font-semibold text-xs hover:text-text-secondary transition-colors"
										>
											Cancel
										</button>
									</div>
								{:else}
									<button
										onclick={() => (confirmDeleteId = entry.id)}
										class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-text-muted hover:text-accent-red hover:bg-accent-red/10 text-xs font-medium transition-colors"
									>
										<svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
											<polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/>
										</svg>
										Delete
									</button>
								{/if}
							</div>
							</div>
						</div>
					{/if}
				</div>
			{/each}
		</div>
	{/if}
</div>
