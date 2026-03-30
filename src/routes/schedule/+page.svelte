<script lang="ts">
	import { progressStore } from '$lib/stores/progress.svelte';
	import { settingsStore } from '$lib/stores/settings.svelte';
	import Timer from '$lib/components/Timer.svelte';
	import WorkoutCoach from '$lib/components/WorkoutCoach.svelte';
	import GuidedVisualization from '$lib/components/GuidedVisualization.svelte';
	import type { ScheduleActivityType } from '$lib/data/types';

	// --- State ---
	let weekOffset = $state(0);
	let selectedDayIndex = $state(-1); // -1 means auto-detect today
	let expandedActivity = $state<string | null>(null);
	let showTimer = $state<string | null>(null);
	let showWorkoutCoach = $state<string | null>(null);
	let showVisualization = $state<string | null>(null);

	// --- Current week from settings ---
	let displayWeek = $derived(Math.max(1, Math.min(52, settingsStore.settings.currentWeek + weekOffset)));

	// --- Date Utilities ---
	const dayLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
	const dayFullLabels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
	const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

	const PROGRAM_START = new Date(2026, 2, 23); // March 23, 2026 (Monday of Week 1)

	function getMondayForWeek(weekNum: number): Date {
		const monday = new Date(PROGRAM_START);
		monday.setDate(PROGRAM_START.getDate() + (weekNum - 1) * 7);
		return monday;
	}

	let weekMonday = $derived(getMondayForWeek(displayWeek));

	let weekDates: Date[] = $derived.by(() => {
		const dates: Date[] = [];
		for (let i = 0; i < 7; i++) {
			const d = new Date(weekMonday);
			d.setDate(weekMonday.getDate() + i);
			dates.push(d);
		}
		return dates;
	});

	let weekSunday = $derived(weekDates[6]);

	function formatDateKey(d: Date): string {
		return d.toISOString().slice(0, 10);
	}

	function isToday(d: Date): boolean {
		const now = new Date();
		return d.getDate() === now.getDate() &&
			d.getMonth() === now.getMonth() &&
			d.getFullYear() === now.getFullYear();
	}

	let weekRangeLabel = $derived(
		weekMonday.getMonth() === weekSunday.getMonth()
			? `${monthNames[weekMonday.getMonth()]} ${weekMonday.getDate()} - ${weekSunday.getDate()}, ${weekMonday.getFullYear()}`
			: weekMonday.getFullYear() === weekSunday.getFullYear()
				? `${monthNames[weekMonday.getMonth()]} ${weekMonday.getDate()} - ${monthNames[weekSunday.getMonth()]} ${weekSunday.getDate()}, ${weekMonday.getFullYear()}`
				: `${monthNames[weekMonday.getMonth()]} ${weekMonday.getDate()}, ${weekMonday.getFullYear()} - ${monthNames[weekSunday.getMonth()]} ${weekSunday.getDate()}, ${weekSunday.getFullYear()}`
	);

	// Determine today's day index in this week (or -1 if today isn't in this week)
	let todayDayIndex = $derived.by(() => {
		for (let i = 0; i < weekDates.length; i++) {
			if (isToday(weekDates[i])) return i;
		}
		return -1;
	});

	// The active selected day (auto-select today if no manual selection, fallback to Monday)
	let activeDayIndex = $derived(
		selectedDayIndex >= 0 ? selectedDayIndex : (todayDayIndex >= 0 ? todayDayIndex : 0)
	);

	let activeDate = $derived(weekDates[activeDayIndex]);
	let activeDateKey = $derived(formatDateKey(activeDate));

	// --- Navigation ---
	function prevWeek(): void {
		if (displayWeek > 1) {
			weekOffset -= 1;
			selectedDayIndex = -1;
			expandedActivity = null;
			showTimer = null;
			showWorkoutCoach = null;
			showVisualization = null;
		}
	}
	function nextWeek(): void {
		if (displayWeek < 52) {
			weekOffset += 1;
			selectedDayIndex = -1;
			expandedActivity = null;
			showTimer = null;
			showWorkoutCoach = null;
			showVisualization = null;
		}
	}
	function goToCurrent(): void {
		weekOffset = 0;
		selectedDayIndex = -1;
		expandedActivity = null;
		showTimer = null;
		showWorkoutCoach = null;
		showVisualization = null;
	}

	function selectDay(index: number): void {
		selectedDayIndex = index;
		expandedActivity = null;
		showTimer = null;
		showWorkoutCoach = null;
		showVisualization = null;
	}

	let isCurrentWeek = $derived(weekOffset === 0);

	// --- Activity Type Colors and Labels ---
	function typeColor(type: ScheduleActivityType): string {
		const colors: Record<string, string> = {
			mental: 'accent-purple',
			prehab: 'accent-blue',
			micro_workout: 'accent-orange',
			tennis_match: 'court-green',
			tennis_training: 'court-green',
			gym: 'clay',
			footwork: 'ball-yellow',
			wall_drills: 'ball-yellow',
			warmup: 'accent-orange',
			rest: 'text-muted',
			competition: 'accent-red',
			strength: 'clay'
		};
		return colors[type] ?? 'text-secondary';
	}

	function typeIcon(type: ScheduleActivityType): string {
		const icons: Record<string, string> = {
			mental: 'brain',
			prehab: 'shield',
			micro_workout: 'zap',
			tennis_match: 'racket',
			tennis_training: 'racket',
			gym: 'dumbbell',
			footwork: 'foot',
			wall_drills: 'wall',
			warmup: 'flame',
			rest: 'moon',
			competition: 'trophy',
			strength: 'dumbbell'
		};
		return icons[type] ?? 'circle';
	}

	function typeEmoji(type: ScheduleActivityType): string {
		const emojis: Record<string, string> = {
			mental: '\u{1F9E0}',
			prehab: '\u{1F6E1}',
			micro_workout: '\u{26A1}',
			tennis_match: '\u{1F3BE}',
			tennis_training: '\u{1F3BE}',
			gym: '\u{1F4AA}',
			footwork: '\u{1F463}',
			wall_drills: '\u{1F9F1}',
			warmup: '\u{1F525}',
			rest: '\u{1F319}',
			competition: '\u{1F3C6}',
			strength: '\u{1F4AA}'
		};
		return emojis[type] ?? '\u{2B55}';
	}

	// --- Schedule Item Interface ---
	interface ScheduleItem {
		id: string;
		time: string;
		title: string;
		description: string;
		duration: string;
		durationMinutes: number;
		type: ScheduleActivityType;
		items: string[];
		isNew?: boolean;
	}

	// --- Activity Status ---
	type ActivityStatus = 'completed' | 'current' | 'upcoming' | 'overdue';

	function getActivityStatus(activity: ScheduleItem, dateKey: string): ActivityStatus {
		if (progressStore.isCompleted(dateKey, activity.id)) return 'completed';

		const now = new Date();
		const activityDate = new Date(dateKey);
		const todayStr = formatDateKey(now);

		// If the activity date is in the past and not today, it's overdue
		if (dateKey < todayStr) return 'overdue';

		// If it's today, check times
		if (dateKey === todayStr) {
			const timeParts = activity.time.split('-')[0].split(':');
			const actHour = parseInt(timeParts[0]);
			const actMin = parseInt(timeParts[1] ?? '0');
			const nowMinutes = now.getHours() * 60 + now.getMinutes();
			const actStartMinutes = actHour * 60 + actMin;
			const actEndMinutes = actStartMinutes + activity.durationMinutes;

			if (nowMinutes >= actStartMinutes && nowMinutes < actEndMinutes) return 'current';
			if (nowMinutes >= actEndMinutes) return 'overdue';
		}

		return 'upcoming';
	}

	// =====================================================================
	// PROGRESSIVE SCHEDULE ENGINE
	// =====================================================================

	// --- Week Themes ---
	function getWeekTheme(w: number): string {
		const themes: Record<number, string> = {
			1: 'Building the Foundation \u2014 Consistency & Habit',
			2: 'Settling In \u2014 Rally Depth & Basic Patterns',
			3: 'Adding Layers \u2014 Wrist Work & Flexibility',
			4: 'Consolidation \u2014 Own the Basics',
			5: 'Level Up \u2014 Footwork & Technique Focus',
			6: 'Forehand Evolution \u2014 Modern Topspin',
			7: 'Backhand Development \u2014 Topspin & Slice',
			8: 'Integration Week \u2014 Putting It Together',
			9: 'Pattern Play \u2014 Serve+1 Introduction',
			10: 'Approach & Finish \u2014 Net Game Foundations',
			11: 'Full Court Coverage \u2014 Movement Mastery',
			12: 'Consolidation \u2014 Patterns Under Pressure',
			13: 'Tactical Awakening \u2014 Control-Hurt-Finish',
			14: 'Reading the Opponent \u2014 Anticipation Skills',
			15: 'Point Construction \u2014 Building the Rally',
			16: 'Decision Making \u2014 When to Attack',
			17: 'Inside-Out Forehand \u2014 Weapon Building',
			18: 'Pressure Play \u2014 Deuce & Tiebreak Mentality',
			19: 'Advanced Doubles \u2014 Poaching & Formation',
			20: 'Aggressive Returns \u2014 Taking Control Early',
			21: 'Competition Mode \u2014 Match Simulation',
			22: 'Mental Fortress \u2014 Composure Under Fire',
			23: 'Peak Performance \u2014 Everything Clicks',
			24: 'Strategic Variety \u2014 Plan B Tactics',
			25: 'Championship Mindset \u2014 Playing to Win',
			26: 'Half-Year Review \u2014 Assess & Recalibrate',
		};
		if (w <= 26) return themes[w] ?? `Week ${w} \u2014 Progressive Training`;
		const cycleW = ((w - 27) % 26) + 1;
		const base = themes[cycleW] ?? `Week ${cycleW} \u2014 Progressive Training`;
		return `Advanced: ${base}`;
	}

	// --- Phase Detection ---
	function getPhase(w: number): string {
		if (w <= 4) return 'Foundation';
		if (w <= 8) return 'Technique';
		if (w <= 12) return 'Patterns';
		if (w <= 16) return 'Tactics';
		if (w <= 20) return 'Advanced';
		if (w <= 26) return 'Peak';
		return 'Mastery';
	}

	// --- What's New This Week ---
	function getWhatsNew(w: number): string[] {
		const news: Record<number, string[]> = {
			1: ['Welcome to Week 1! Building daily habits \u2014 morning visualization + basic prehab', 'Micro-workouts A (lower body) and B (shoulder) throughout the day'],
			2: ['Settling into the routine \u2014 focus on rally depth in all sessions'],
			3: ['NEW: Adding Micro C (wrist/forearm) to your daily micro-workouts', 'NEW: Hip openers and thoracic spine mobility added to morning routines', 'NEW: Wednesday evening flexibility routine (10 min)'],
			4: ['Consolidation week \u2014 same structure, focus on owning the basics'],
			5: ['NEW: Morning footwork drills added (10 min shadow split steps)', 'NEW: Micro D (core) joins the rotation', 'NEW: Wall drills extended to 25 min with reflex volleys', 'NEW: Gym now alternates Week A and B rotations', 'NEW: Forehand modernization drills in evening sessions'],
			6: ['NEW: Pre-match tactical planning \u2014 bring 2 priorities to each match', 'Forehand focus continues \u2014 topspin development'],
			7: ['NEW: Full micro-workout rotation (A through E cycling daily)', 'Backhand topspin and slice development begins'],
			8: ['Integration week \u2014 combining all new skills in match play', 'NEW: Tournament play starts on Saturdays'],
			9: ['NEW: Extended visualization (10 min) + prehab rotation in mornings', 'NEW: Serve+1 pattern practice in matches', 'NEW: Full wall drill circuit + serve practice (30 min)', 'NEW: Gym adds Week C (Power & Agility) to rotation'],
			10: ['Approach shot + volley combinations in training', 'Net game development focus'],
			11: ['Full court movement mastery \u2014 recovery steps and transitions'],
			12: ['Pattern consolidation under pressure \u2014 match situation drills'],
			13: ['NEW: Full morning routine with mental rehearsal of specific patterns', 'NEW: Full game plan for matches \u2014 opponent reading + mid-match adjustments', 'NEW: Control-Hurt-Finish point construction begins', 'NEW: Progressive overload noted in gym descriptions'],
			14: ['Opponent reading skills \u2014 watching for patterns and tells'],
			15: ['Rally building \u2014 constructing points with purpose'],
			16: ['Decision making \u2014 knowing when to go for it'],
			17: ['NEW: Inside-out forehand progression begins', 'Pressure play and advanced doubles tactics'],
			18: ['Deuce and tiebreak mental routines \u2014 pressure simulation'],
			19: ['Advanced doubles formations and poaching patterns'],
			20: ['Aggressive return positioning and early attack patterns'],
			21: ['NEW: Competition focus \u2014 full match simulation in training', 'Mental toughness training under match pressure'],
			22: ['Mental fortress building \u2014 composure drills and recovery routines'],
			23: ['Peak performance week \u2014 trust your training'],
			24: ['Strategic variety \u2014 developing Plan B when Plan A fails'],
			25: ['Championship mindset \u2014 playing each point to win'],
			26: ['Half-year assessment \u2014 review progress and set new targets'],
		};
		if (w <= 26) return news[w] ?? [`Week ${w} \u2014 continuing progressive development`];
		const cycleW = ((w - 27) % 26) + 1;
		return [`Mastery cycle: revisiting ${getPhase(cycleW)} themes at higher intensity`, ...(news[cycleW] ?? [])];
	}

	// --- Morning Routine Builder ---
	function getMorningRoutine(w: number, dayName: string): ScheduleItem {
		let title = 'Morning Routine';
		let description = '';
		let items: string[] = [];
		let duration = '10 min';
		let durationMinutes = 10;
		let isNew = false;

		if (w <= 4) {
			title = 'Visualization + Prehab';
			description = '5-minute match visualization followed by basic prehab exercises. Build the morning habit.';
			duration = '10 min';
			durationMinutes = 10;
			items = [
				'Close eyes, visualize court \u2014 see yourself executing rally patterns (5 min)',
				'Standing calf raises 3x15',
				'Shoulder band pull-aparts 2x15',
				'Ankle circles 2x10 each direction'
			];
			if (w >= 3) {
				items.push('Hip opener stretch 2x30s each side');
				items.push('Thoracic spine rotation 2x8 each side');
				duration = '15 min';
				durationMinutes = 15;
				if (w === 3) isNew = true;
			}
		} else if (w <= 8) {
			title = 'Visualization + Footwork + Prehab';
			description = 'Extended morning routine with shadow footwork drills. Building movement patterns into muscle memory.';
			duration = '20 min';
			durationMinutes = 20;
			items = [
				'Visualization: see yourself hitting winners (5 min)',
				'Shadow split steps \u2014 react to imaginary shots (10 sets)',
				'Lateral shuffle + crossover step practice (2 min)',
				'Calf raises 3x15 + shoulder band work 2x15',
				'Hip openers + thoracic spine mobility (3 min)'
			];
			if (w === 5) isNew = true;
		} else if (w <= 12) {
			title = 'Extended Morning Routine';
			description = 'Full 25-min morning session: deep visualization, footwork patterns, and rotating prehab focus.';
			duration = '25 min';
			durationMinutes = 25;
			const prehabRotation = ['calf + ankle', 'shoulder + rotator cuff', 'hip + groin', 'wrist + forearm'];
			const todayPrehab = prehabRotation[['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].indexOf(dayName) % prehabRotation.length];
			items = [
				'Extended visualization: rehearse 3 specific match scenarios (10 min)',
				'Shadow footwork: split step + recovery + approach (5 min)',
				'Dynamic movement patterns: lateral, forward, backward (3 min)',
				`Prehab focus: ${todayPrehab} exercises (5 min)`,
				'Thoracic spine + hip mobility flow (2 min)'
			];
			if (w === 9) isNew = true;
		} else {
			title = 'Full Morning Routine';
			description = 'Complete morning session including mental rehearsal of specific tactical patterns for today.';
			duration = '25 min';
			durationMinutes = 25;
			const patterns = [
				'serve wide + inside-out FH',
				'deep cross-court rally + DTL attack',
				'approach shot + split step + volley',
				'return of serve + aggressive rally position',
				'drop shot setup + lob counter',
				'serve+1 to open court',
				'defensive slice + reset rally'
			];
			const todayPattern = patterns[(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].indexOf(dayName) + w) % patterns.length];
			const prehabRotation = ['calf + ankle', 'shoulder + rotator cuff', 'hip + groin', 'wrist + forearm'];
			const todayPrehab = prehabRotation[['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].indexOf(dayName) % prehabRotation.length];
			items = [
				`Mental rehearsal: visualize executing "${todayPattern}" pattern (10 min)`,
				'Shadow footwork: match-specific movement sequences (5 min)',
				`Prehab rotation: ${todayPrehab} (5 min)`,
				'Full mobility flow: thoracic spine, hips, shoulders (5 min)'
			];
			if (w === 13) isNew = true;
		}

		return {
			id: `${dayName.toLowerCase().slice(0, 3)}-morning`,
			time: '7:00',
			title,
			description,
			duration,
			durationMinutes,
			type: 'mental',
			items,
			isNew
		};
	}

	// --- Micro-Workout Builder ---
	function getMicroWorkouts(w: number, dayName: string): ScheduleItem {
		const dayIndex = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].indexOf(dayName);
		let items: string[] = [];
		let description = '';
		let isNew = false;

		const microA = '10:00 \u2014 Micro A (Lower): Wall sits 3x30s + bodyweight squats 2x15 + calf raises 2x15';
		const microB = '12:00 \u2014 Micro B (Shoulder): Band pull-aparts 2x15 + external rotations 2x12 + scapular push-ups 2x10';
		const microC = '14:00 \u2014 Micro C (Wrist/Forearm): Wrist curls 2x15 + extensions 2x15 + finger band spreads 2x20 + forearm pronation/supination';
		const microD = '14:00 \u2014 Micro D (Core): Dead bugs 2x10 + bird-dogs 2x10 + side plank 2x20s each + Pallof press 2x10';
		const microE = '16:00 \u2014 Micro E (Mobility): Hip circles + thoracic rotation + hamstring stretches + ankle mobility (5 min flow)';

		if (w <= 2) {
			description = 'Build the micro-workout habit with lower body and shoulder sessions. Set a timer every 2 hours.';
			items = [microA, microB];
		} else if (w <= 4) {
			description = 'Three micro-workouts throughout the day. Wrist/forearm work is key for tennis arm health.';
			items = [microA, microB, microC];
			if (w === 3) isNew = true;
		} else if (w <= 6) {
			description = 'Four micro-workouts cycling through lower body, shoulder, wrist, and core.';
			items = [microA, microB, microC, microD];
			if (w === 5) isNew = true;
		} else {
			description = 'Full rotation of all 5 micro-workouts. Today cycles based on the day of the week.';
			const allMicros = [microA, microB, microC, microD, microE];
			const startIdx = (dayIndex + w) % 5;
			items = [
				allMicros[startIdx % 5],
				allMicros[(startIdx + 1) % 5],
				allMicros[(startIdx + 2) % 5]
			];
			if (dayIndex < 5) {
				items.push(allMicros[(startIdx + 3) % 5]);
			}
			if (w === 7) isNew = true;
		}

		if (dayName === 'Friday') {
			description = 'Lighter micro-workouts today \u2014 emphasis on mobility and blood flow before Saturday.';
			items = items.map(item => item.replace(/3x30s|3x15|2x15|2x12|2x20|2x10/g, (match) => {
				const lighter: Record<string, string> = { '3x30s': '2x20s', '3x15': '2x10', '2x15': '2x10', '2x12': '2x8', '2x20': '2x12', '2x10': '2x8' };
				return lighter[match] ?? match;
			}));
		}

		return {
			id: `${dayName.toLowerCase().slice(0, 3)}-micro`,
			time: '10:00-16:00',
			title: 'Micro-Workouts',
			description,
			duration: `5 min x${items.length}`,
			durationMinutes: items.length * 5,
			type: 'micro_workout',
			items,
			isNew
		};
	}

	// --- Evening Singles Match (Mon/Thu) ---
	function getSinglesMatch(w: number, dayName: string): ScheduleItem[] {
		const prefix = dayName.toLowerCase().slice(0, 3);
		let matchDesc = '';
		let matchItems: string[] = [];
		let warmupItems = [
			'Jog + high knees 2 min',
			'Dynamic leg swings 10 each',
			'Lateral shuffles 4x court width',
			'Shadow swings: forehand, backhand 20 each',
			'Split-step practice 10 reps',
			'Light sprint + deceleration 4 reps'
		];
		let matchIsNew = false;

		if (w <= 4) {
			const patterns = ['cross-court rally depth', 'first serve placement', 'keeping the ball in play', 'recovery position after each shot'];
			const focus = patterns[(w - 1 + (dayName === 'Thursday' ? 2 : 0)) % patterns.length];
			matchDesc = `Competitive singles focused on consistency. This week's single focus: ${focus}. Don't try too much \u2014 build the habit of solid, reliable play.`;
			matchItems = [
				`ONE focus for today: ${focus}`,
				'Use cross-court rally as default pattern',
				'Target 65%+ first serve percentage',
				'16-second routine between points',
				'Count unforced errors mentally',
				'Post-match: note what worked and what to improve'
			];
		} else if (w <= 8) {
			const priorities = [
				['deep cross-court to backhand', 'approach on short balls'],
				['serve wide + open court forehand', 'net approach after deep slice'],
				['aggressive return position', 'attack second serves'],
				['vary serve placement', 'use drop shot as surprise'],
				['inside-out forehand setup', 'volley behind approach'],
				['high topspin to backhand', 'move opponent side to side'],
				['serve + 1 pattern', 'change pace with slice'],
				['deep return + control rally', 'approach on midcourt balls']
			];
			const idx = ((w - 5) * 2 + (dayName === 'Thursday' ? 1 : 0)) % priorities.length;
			const todayPriorities = priorities[idx];
			matchDesc = `Pre-game plan with 2 tactical priorities. Write them down before you start. Post-match journal required.`;
			matchItems = [
				`Priority 1: ${todayPriorities[0]}`,
				`Priority 2: ${todayPriorities[1]}`,
				'Warm-up: test both priorities in rally',
				'Track success rate of each priority mentally',
				'16-second routine + breathing between points',
				'Post-match journal: rate each priority 1-10, note adjustments'
			];
			if (w === 5 && dayName === 'Monday') matchIsNew = true;
		} else if (w <= 12) {
			const patterns = [
				{ name: 'Serve+1 to open court', steps: ['Serve wide, recover, hit open court', 'Serve T, step around for forehand', 'Serve body, control return, attack'] },
				{ name: 'Approach shot sequences', steps: ['Deep rally, short ball attack, split step at net', 'Slice approach down the line, volley cross-court', 'Drive approach middle, put away volley'] },
				{ name: 'Return + rally control', steps: ['Block return deep cross-court', 'Chip return and approach', 'Aggressive topspin return on second serve'] },
				{ name: 'Rally then attack', steps: ['3 cross-court balls then DTL attack', 'Build with depth, punish short ball', 'Change direction on a high ball'] }
			];
			const patternIdx = ((w - 9) + (dayName === 'Thursday' ? 2 : 0)) % patterns.length;
			const pattern = patterns[patternIdx];
			matchDesc = `Pattern practice match: "${pattern.name}". Try to execute this pattern at least 5 times during the match.`;
			matchItems = [
				`PATTERN: ${pattern.name}`,
				...pattern.steps.map(s => `  - ${s}`),
				'Goal: execute pattern at least 5 times',
				'Track: how many attempts, how many successful',
				'Also maintain consistency as base',
				'Post-match: pattern success journal entry'
			];
			if (w === 9 && dayName === 'Monday') matchIsNew = true;
		} else {
			const tactics = [
				{ plan: 'Control-Hurt-Finish', read: 'Watch opponent grip changes', adjust: 'If opponent stays back, increase net approaches' },
				{ plan: 'Serve pressure + forehand weapon', read: 'Track opponent return position', adjust: 'If returns are deep, serve wider' },
				{ plan: 'Deep rally control + patience', read: 'Note opponent errors under pressure', adjust: 'If opponent rushes, slow pace down' },
				{ plan: 'Attack second serves + approach', read: 'Watch opponent toss for serve direction', adjust: 'If they improve first serve, adjust return position' },
				{ plan: 'Variety and disruption', read: 'Identify opponent weakest shot', adjust: 'Redirect more balls to weakness as match progresses' },
				{ plan: 'Net pressure + volleys', read: 'Watch if opponent lobs or passes', adjust: 'If lobs increase, back up approach position' }
			];
			const idx = ((w - 13) + (dayName === 'Thursday' ? 3 : 0)) % tactics.length;
			const tactic = tactics[idx];
			matchDesc = `Full game plan match. Go in with a strategy, read the opponent, and make mid-match adjustments.`;
			matchItems = [
				`GAME PLAN: ${tactic.plan}`,
				`OPPONENT READ: ${tactic.read}`,
				`MID-MATCH ADJUST: ${tactic.adjust}`,
				'First 3 games: establish your patterns',
				'Games 4-6: read and adjust',
				'Late in set: execute your best patterns under pressure',
				'Post-match: detailed tactical journal entry'
			];
			if (w === 13 && dayName === 'Monday') matchIsNew = true;
		}

		return [
			{
				id: `${prefix}-warmup`,
				time: '18:30',
				title: 'Pre-Match Warm-Up',
				description: 'Dynamic warm-up to prepare for match play.',
				duration: '10 min',
				durationMinutes: 10,
				type: 'warmup',
				items: warmupItems
			},
			{
				id: `${prefix}-match`,
				time: '19:00',
				title: 'Singles Match Play',
				description: matchDesc,
				duration: '90 min',
				durationMinutes: 90,
				type: 'tennis_match',
				items: matchItems,
				isNew: matchIsNew
			}
		];
	}

	// --- Evening Coached Training (Tuesday) ---
	function getCoachedTraining(w: number): ScheduleItem {
		let description = '';
		let items: string[] = [];
		let isNew = false;

		if (w <= 4) {
			description = 'Foundation training: consistency, rally depth, basic patterns (cross-court + DTL).';
			items = [
				'Warm-up rallying: cross-court consistency (10 min)',
				'Rally depth drill: all balls past service line',
				'Pattern: 3 cross-court then DTL',
				'First serve placement practice',
				'Point play: consistency focus',
				'Cool-down stretch'
			];
		} else if (w <= 8) {
			description = 'Technique phase: forehand modernization and backhand topspin development.';
			items = [
				'Warm-up with topspin focus (10 min)',
				w <= 6 ? 'Forehand: modern takeback + lag + windshield wiper' : 'Backhand: two-handed topspin development',
				w <= 6 ? 'Forehand cross-court rally: heavy topspin target' : 'Backhand cross-court rally: consistent topspin',
				'Pattern drill: FH inside-out from ad court',
				'Point play with technique constraints',
				'Cool-down + technique reflection'
			];
			if (w === 5) isNew = true;
		} else if (w <= 12) {
			description = 'Pattern phase: serve+1 patterns, approach shot + volley combos, transition game.';
			items = [
				'Warm-up rallying with approach shots (10 min)',
				'Serve+1 drill: serve wide, hit open court',
				'Approach shot + split step + volley sequence',
				'Ground-to-net transition patterns',
				'Match situations: deuce point, break point',
				'Tiebreak simulation'
			];
			if (w === 9) isNew = true;
		} else if (w <= 16) {
			description = 'Tactical phase: full point construction (Control-Hurt-Finish), opponent reading.';
			items = [
				'Warm-up: rally with purpose \u2014 no aimless balls (10 min)',
				'Control phase: deep cross-court rally to pin opponent',
				'Hurt phase: angle or pace change to create opening',
				'Finish phase: winner or forced error execution',
				'Full point construction drills',
				'Live points: read opponent + adapt strategy'
			];
			if (w === 13) isNew = true;
		} else if (w <= 20) {
			description = 'Advanced phase: inside-out FH, pressure play, advanced doubles tactics.';
			items = [
				'Warm-up: movement + shot quality focus (10 min)',
				'Inside-out forehand progression: setup + execution',
				'Pressure point simulation (30-40, deuce, ad)',
				w % 2 === 0 ? 'Doubles: I-formation + poaching patterns' : 'Singles: aggressive return + rally takeover',
				'Match tiebreak simulation under fatigue',
				'Mental reset routine practice between points'
			];
			if (w === 17) isNew = true;
		} else {
			description = 'Peak phase: competition focus, match simulation, mental toughness under pressure.';
			items = [
				'Warm-up: match intensity from ball 1 (10 min)',
				'Full match simulation: best of 3 set tiebreak',
				'Tactical flexibility: switch between Plan A and B',
				'Pressure: play with scoreboard handicap',
				'Recovery between sets: mental reset routine',
				'Post-session: tactical debrief with coach'
			];
			if (w === 21) isNew = true;
		}

		return {
			id: 'tue-train',
			time: '19:00',
			title: 'Coached Training Session',
			description,
			duration: '90 min',
			durationMinutes: 90,
			type: 'tennis_training',
			items,
			isNew
		};
	}

	// --- Wednesday Evening (Home Training + Flexibility) ---
	function getWednesdayEvening(w: number): ScheduleItem[] {
		const activities: ScheduleItem[] = [];
		let wallTitle = 'Wall Drills';
		let wallDesc = '';
		let wallItems: string[] = [];
		let wallDuration = '15 min';
		let wallMinutes = 15;
		let wallIsNew = false;

		if (w <= 2) {
			wallDesc = 'Basic wall drills to develop feel and consistency. Keep it simple \u2014 build the habit.';
			wallDuration = '15 min';
			wallMinutes = 15;
			wallItems = [
				'Ball bounce on racket: 50 forehand, 50 backhand',
				'Mini court volleys against wall: 3x20',
				'Gentle forehand rally vs wall: 30 continuous',
				'Gentle backhand rally vs wall: 30 continuous'
			];
		} else if (w <= 4) {
			wallTitle = 'Wall Drills + Transitions';
			wallDesc = 'Adding net game elements to wall practice. Ground stroke to volley transitions.';
			wallDuration = '20 min';
			wallMinutes = 20;
			wallItems = [
				'Forehand rally vs wall: 40 continuous',
				'Backhand rally vs wall: 40 continuous',
				'First volley drill: hit ground stroke then close for volley',
				'Ground-to-volley transition: rally 3 then volley 3',
				'Alternating FH/BH: 30 rallies'
			];
			if (w === 3) wallIsNew = true;
		} else if (w <= 8) {
			wallTitle = 'Extended Wall Drills';
			wallDesc = 'Comprehensive wall session with reflex volleys, continuous rallies, and slice practice.';
			wallDuration = '25 min';
			wallMinutes = 25;
			wallItems = [
				'Continuous forehand rally: 50+ without break',
				'Continuous backhand rally: 50+ without break',
				'Reflex volleys: stand 2m from wall, rapid fire (3x30s)',
				'Backhand slice: low, controlled, 30 reps',
				'FH/BH alternating rally: 40 continuous',
				'First volley + put-away sequence: 20 reps'
			];
			if (w === 5) wallIsNew = true;
		} else {
			wallTitle = 'Full Wall Circuit + Serve Practice';
			wallDesc = 'Complete wall drill circuit followed by serve practice. Building all aspects of the game.';
			wallDuration = '30 min';
			wallMinutes = 30;
			wallItems = [
				'Continuous rally: FH 60, BH 60, alternating 40',
				'Reflex volleys: 3x45s at close range',
				'Slice backhand rally: 40 reps with targets',
				'Ground-to-volley transitions: 20 sequences',
				'Serve practice: 20 first serves (placement focus)',
				'Serve practice: 10 second serves (spin + consistency)',
				'Serve+1 shadow: serve then shadow approach'
			];
			if (w === 9) wallIsNew = true;
		}

		activities.push({
			id: 'wed-wall',
			time: '18:30',
			title: wallTitle,
			description: wallDesc,
			duration: wallDuration,
			durationMinutes: wallMinutes,
			type: 'wall_drills',
			items: wallItems,
			isNew: wallIsNew
		});

		if (w >= 3) {
			activities.push({
				id: 'wed-flex',
				time: '19:15',
				title: 'Evening Flexibility Routine',
				description: 'Essential for desk workers. Focus on hip flexors, hamstrings, thoracic spine, and shoulders.',
				duration: '10 min',
				durationMinutes: 10,
				type: 'prehab',
				items: [
					'Hip flexor stretch: 2x30s each side (couch stretch)',
					'Hamstring stretch: 2x30s each side',
					'Pigeon pose: 2x30s each side',
					'Thoracic spine rotation on floor: 2x8 each side',
					'Shoulder cross-body stretch + sleeper stretch: 30s each',
					'Cat-cow flow: 10 reps slow and controlled'
				],
				isNew: w === 3
			});
		}

		return activities;
	}

	// --- Friday Evening (Optional Wall/Home) ---
	function getFridayEvening(w: number): ScheduleItem {
		let description = '';
		let items: string[] = [];
		let duration = '15 min';
		let durationMinutes = 15;

		if (w <= 2) {
			description = 'Optional light wall drills or rest. Listen to your body \u2014 save energy for Saturday competition.';
			items = [
				'Option A \u2014 Light wall drills (15 min):',
				'  Forehand focus: 40 controlled rallies',
				'  Backhand focus: 40 controlled rallies',
				'Option B \u2014 Rest:',
				'  Light walk + full body stretching',
				'  Foam rolling: calves, quads, IT band'
			];
		} else if (w <= 8) {
			description = 'Optional: light technique work or active recovery. Do NOT go hard before Saturday.';
			duration = '20 min';
			durationMinutes = 20;
			items = [
				'Option A \u2014 Technique touch (20 min):',
				'  Wall volley practice: 3x20 (light touch)',
				'  Serve placement: 10 serves to targets (easy pace)',
				'  Shadow footwork: split steps (2 min)',
				'Option B \u2014 Active recovery:',
				'  20 min walk + foam rolling',
				'  Full body stretching routine'
			];
		} else {
			description = 'Optional light practice or recovery. Prioritize freshness for Saturday.';
			duration = '20 min';
			durationMinutes = 20;
			items = [
				'Option A \u2014 Light practice (20 min):',
				'  Serve practice: 15 serves at 70% pace',
				'  Wall volley touch: 3x20',
				'  Shadow footwork patterns (3 min)',
				'Option B \u2014 Recovery & preparation:',
				'  Foam rolling + stretching (15 min)',
				'  Mental prep: visualize tomorrow\'s competition',
				'  Review game plan for Saturday opponent'
			];
		}

		return {
			id: 'fri-evening',
			time: '18:00',
			title: 'Optional Practice / Rest',
			description,
			duration,
			durationMinutes,
			type: 'wall_drills',
			items
		};
	}

	// --- Saturday (Competition/Practice) ---
	function getSaturday(w: number): ScheduleItem[] {
		const activities: ScheduleItem[] = [];

		activities.push({
			id: 'sat-routine',
			time: '8:00',
			title: 'Pre-Match Routine',
			description: 'Full competition day preparation. Light breakfast, mental prep, and physical warm-up.',
			duration: '45 min',
			durationMinutes: 45,
			type: 'warmup',
			items: [
				'Light breakfast: banana + toast + water',
				w <= 4 ? 'Review simple game plan: one focus point' : 'Review detailed game plan and opponent scouting',
				'5 min visualization: see yourself succeeding',
				'Dynamic warm-up: 10 min full body',
				'Shadow swings and split-step practice',
				w <= 7 ? 'Communicate strategy with doubles partner' : 'Mental centering: breathe and focus'
			]
		});

		if (w <= 7) {
			activities.push({
				id: 'sat-comp',
				time: '10:00',
				title: 'Competition: Mix Doubles',
				description: 'Spring competition match. Focus on teamwork, communication, and smart doubles play.',
				duration: '2-3 hrs',
				durationMinutes: 150,
				type: 'competition',
				items: [
					'Pre-match: agree on starting formation with partner',
					w <= 4 ? 'Focus: keep the ball in play, be reliable' : 'Focus: attack the middle, create confusion',
					'Net play: close when partner has advantage',
					'Communication: call every ball, encourage partner',
					w >= 5 ? 'Try I-formation on key service games' : 'Standard formation: server side volleyer',
					'Between games: quick tactical adjustments',
					'Post-match: fill in match journal immediately'
				]
			});
		} else if (w <= 12) {
			activities.push({
				id: 'sat-comp',
				time: '10:00',
				title: 'Tournament / Practice Match',
				description: 'Competitive match play. Treat this like a tournament \u2014 full warm-up, game plan, and post-match review.',
				duration: '2-3 hrs',
				durationMinutes: 150,
				type: 'competition',
				items: [
					'Full warm-up with opponent (5 min each side)',
					'Execute pre-planned tactical approach',
					'Track patterns: which ones work, which don\'t',
					'Mid-match adjustment: change one thing if losing',
					'Mental routine between every point',
					'Post-match: detailed journal entry with pattern analysis'
				],
				isNew: w === 8
			});
		} else {
			const isCompWeek = w % 3 !== 0;
			if (isCompWeek) {
				activities.push({
					id: 'sat-comp',
					time: '10:00',
					title: 'Competition Match',
					description: 'Full competition with comprehensive game plan. Play to win while working on specific improvements.',
					duration: '2-3 hrs',
					durationMinutes: 150,
					type: 'competition',
					items: [
						'Comprehensive game plan with Plan A and Plan B',
						'First 3 games: establish patterns, read opponent',
						'Track opponent weaknesses and tendencies',
						'Execute mid-match adjustments based on reading',
						'Mental toughness: win the pressure points',
						'Post-match: rate performance, tactical effectiveness'
					]
				});
			} else {
				activities.push({
					id: 'sat-practice',
					time: '10:00',
					title: 'Focused Practice Session',
					description: 'Dedicated practice day \u2014 work on specific weaknesses identified in recent matches.',
					duration: '2 hrs',
					durationMinutes: 120,
					type: 'tennis_training',
					items: [
						'Serve practice: 50 serves with placement targets',
						'Return of serve drills (if partner available)',
						'Weakness focus: drill your most needed improvement',
						'Point play: practice specific game situations',
						'Tiebreak simulation: best of 5 tiebreaks',
						'Cool-down + stretch + reflection'
					]
				});
			}
		}

		return activities;
	}

	// --- Sunday Gym ---
	function getSundayGym(w: number): ScheduleItem {
		let rotation: string;
		let desc: string;
		let items: string[] = [];
		let isNew = false;

		if (w <= 4) {
			rotation = 'A';
			desc = 'Lower Body + Core focus. Learning the exercises with lighter weights. Form over load.';
			items = [
				'5 min cardio warm-up (bike or rowing)',
				'Goblet Squats 3x12 (light weight, perfect form)',
				'Walking Lunges 3x10/leg',
				'Romanian Deadlift 3x10 (learn the hinge)',
				'Calf Raises 3x15',
				'Plank Hold 3x30s',
				'Pallof Press 3x10',
				'5 min cool-down stretching',
				'Foam rolling: quads, calves, glutes'
			];
		} else if (w <= 8) {
			rotation = w % 2 === 1 ? 'A' : 'B';
			if (rotation === 'A') {
				desc = 'Lower Body + Core \u2014 increasing weights from foundation phase.';
				items = [
					'5 min cardio warm-up (bike or rowing)',
					'Goblet Squats 3x12 (moderate weight)',
					'Walking Lunges 3x10/leg (add dumbbells)',
					'Romanian Deadlift 3x10 (progressive load)',
					'Calf Raises 3x20 (weighted)',
					'Plank Hold 3x45s',
					'Pallof Press 3x12',
					'5 min cool-down stretching + foam rolling'
				];
			} else {
				desc = 'Upper Body + Rotational Power \u2014 new exercises for balanced development.';
				items = [
					'5 min cardio warm-up',
					'Dumbbell Bench Press 3x12',
					'Cable Rows 3x12',
					'Overhead Press 3x10',
					'Lateral Raises 3x12',
					'Medicine Ball Rotational Throws 3x8 each side',
					'Bicep Curls 2x12 + Tricep Dips 2x10',
					'5 min cool-down stretching + foam rolling'
				];
			}
			if (w === 5) isNew = true;
		} else if (w <= 12) {
			const rotations = ['A', 'B', 'C'];
			rotation = rotations[(w - 9) % 3];
			if (rotation === 'A') {
				desc = 'Lower Body + Core \u2014 solid weights, focus on tennis-specific leg strength.';
				items = [
					'5 min cardio warm-up',
					'Goblet Squats 4x10 (challenging weight)',
					'Bulgarian Split Squats 3x10/leg',
					'Romanian Deadlift 3x10 (solid load)',
					'Weighted Calf Raises 4x15',
					'Plank Hold 3x60s',
					'Pallof Press 3x12 (increase resistance)',
					'Cool-down + foam rolling'
				];
			} else if (rotation === 'B') {
				desc = 'Upper Body + Rotational Power \u2014 building pushing and pulling strength.';
				items = [
					'5 min cardio warm-up',
					'Dumbbell Bench Press 3x12 (progress weight)',
					'Cable Rows 3x12 (progress weight)',
					'Overhead Press 3x10',
					'Medicine Ball Rotational Throws 3x10 each side',
					'Face Pulls 3x15',
					'Bicep Curls 3x12 + Tricep Extensions 3x12',
					'Cool-down + foam rolling'
				];
			} else {
				desc = 'Power + Agility \u2014 explosive movements for on-court speed.';
				items = [
					'5 min cardio warm-up',
					'Box Jumps 4x6 (focus on soft landing)',
					'Medicine Ball Slams 3x10',
					'Speed Ladder 4 different patterns',
					'Lateral Bounds 3x8/side',
					'Single-Leg Hops 3x8/leg',
					'Plyo Push-ups 3x6',
					'Cool-down + extensive stretching'
				];
			}
			if (w === 9) isNew = true;
		} else {
			const rotations = ['A', 'B', 'C'];
			rotation = rotations[(w - 13) % 3];
			const overloadNote = w >= 17 ? ' (progressive overload: add 2-5% weight from last cycle)' : '';
			if (rotation === 'A') {
				desc = `Lower Body + Core${overloadNote}. Tennis-specific power from the ground up.`;
				items = [
					'5 min cardio warm-up',
					`Barbell Squats 4x8${overloadNote}`,
					'Bulgarian Split Squats 3x10/leg (weighted)',
					`Romanian Deadlift 4x8${overloadNote}`,
					'Weighted Calf Raises 4x15',
					'Ab Wheel 3x10 + Pallof Press 3x12',
					'Single-Leg Balance Reaches 2x10/leg',
					'Cool-down + foam rolling'
				];
			} else if (rotation === 'B') {
				desc = `Upper Body + Rotational Power${overloadNote}. Shoulder health + arm strength.`;
				items = [
					'5 min cardio warm-up',
					`Dumbbell Bench Press 4x10${overloadNote}`,
					`Cable Rows 4x10${overloadNote}`,
					'Overhead Press 3x10',
					'Medicine Ball Rotational Throws 4x10 each',
					'Face Pulls 3x15 + Band Pull-Aparts 3x15',
					'Arm circuit: curls, dips, extensions 3x10',
					'Cool-down + foam rolling'
				];
			} else {
				desc = `Power + Agility${overloadNote}. Match-day explosiveness.`;
				items = [
					'5 min cardio warm-up',
					'Box Jumps 4x8 (increase height progressively)',
					'Medicine Ball Slams 4x10 (heavier ball)',
					'Speed Ladder: 6 patterns, 2 reps each',
					'Lateral Bounds 4x8/side (increase distance)',
					'Depth Jumps 3x6 + Sprint 5m',
					'Agility T-drill 4 reps (time yourself)',
					'Cool-down + extensive stretching'
				];
			}
			if (w === 13) isNew = true;
		}

		return {
			id: 'sun-gym',
			time: '10:00',
			title: `Gym Session (Rotation ${rotation})`,
			description: desc,
			duration: '75 min',
			durationMinutes: 75,
			type: 'gym',
			items,
			isNew
		};
	}

	// =====================================================================
	// BUILD FULL WEEK SCHEDULE
	// =====================================================================
	function getWeekSchedule(weekNum: number): ScheduleItem[][] {
		const w = weekNum;

		const monday: ScheduleItem[] = [
			getMorningRoutine(w, 'Monday'),
			getMicroWorkouts(w, 'Monday'),
			...getSinglesMatch(w, 'Monday')
		];

		const tuesday: ScheduleItem[] = [
			getMorningRoutine(w, 'Tuesday'),
			getMicroWorkouts(w, 'Tuesday'),
			getCoachedTraining(w)
		];

		const wednesday: ScheduleItem[] = [
			getMorningRoutine(w, 'Wednesday'),
			getMicroWorkouts(w, 'Wednesday'),
			...getWednesdayEvening(w)
		];

		const thursday: ScheduleItem[] = [
			getMorningRoutine(w, 'Thursday'),
			getMicroWorkouts(w, 'Thursday'),
			...getSinglesMatch(w, 'Thursday')
		];

		const friday: ScheduleItem[] = [
			getMorningRoutine(w, 'Friday'),
			getMicroWorkouts(w, 'Friday'),
			getFridayEvening(w)
		];

		const saturday: ScheduleItem[] = getSaturday(w);

		const sunday: ScheduleItem[] = [getSundayGym(w)];

		return [monday, tuesday, wednesday, thursday, friday, saturday, sunday];
	}

	let schedule = $derived(getWeekSchedule(displayWeek));
	let activeDayActivities = $derived(schedule[activeDayIndex]);

	// --- What's new data ---
	let whatsNew = $derived(getWhatsNew(displayWeek));
	let weekTheme = $derived(getWeekTheme(displayWeek));
	let phase = $derived(getPhase(displayWeek));

	// --- Check if any items are new this week ---
	let hasNewItems = $derived(schedule.some(day => day.some(act => act.isNew)));

	// --- Weekly Summary ---
	let totalMinutes = $derived(
		schedule.reduce((total, day) => total + day.reduce((sum, act) => sum + act.durationMinutes, 0), 0)
	);

	// --- Day-level computed values ---
	let dayTotalMinutes = $derived(
		activeDayActivities.reduce((sum: number, act: ScheduleItem) => sum + act.durationMinutes, 0)
	);

	let dayCompletedCount = $derived(
		activeDayActivities.filter((act: ScheduleItem) => progressStore.isCompleted(activeDateKey, act.id)).length
	);

	let dayTotalCount = $derived(activeDayActivities.length);

	let dayCompletionPct = $derived(
		dayTotalCount > 0 ? Math.round((dayCompletedCount / dayTotalCount) * 100) : 0
	);

	// Key activity for today (longest or most notable)
	let keyActivity = $derived.by(() => {
		const important = activeDayActivities.filter((a: ScheduleItem) =>
			['tennis_match', 'tennis_training', 'competition', 'gym'].includes(a.type)
		);
		if (important.length > 0) return important[0];
		if (activeDayActivities.length > 0) {
			return activeDayActivities.reduce((best: ScheduleItem, act: ScheduleItem) =>
				act.durationMinutes > best.durationMinutes ? act : best
			);
		}
		return null;
	});

	// --- Toggle expand ---
	function toggleExpand(id: string): void {
		expandedActivity = expandedActivity === id ? null : id;
		if (expandedActivity !== id) {
			showTimer = null;
			showWorkoutCoach = null;
			showVisualization = null;
		}
	}

	function toggleTimer(id: string): void {
		showTimer = showTimer === id ? null : id;
	}

	// --- Complete activity ---
	function completeActivity(dateKey: string, activityId: string): void {
		progressStore.toggleActivity(dateKey, activityId);
	}

	function isCompleted(dateKey: string, activityId: string): boolean {
		return progressStore.isCompleted(dateKey, activityId);
	}

	// --- Week overview helpers ---
	function getWeekDayCompletion(dayIndex: number): number {
		const dateKey = formatDateKey(weekDates[dayIndex]);
		const dayActs = schedule[dayIndex];
		if (dayActs.length === 0) return 0;
		const completed = dayActs.filter((a: ScheduleItem) => progressStore.isCompleted(dateKey, a.id)).length;
		return Math.round((completed / dayActs.length) * 100);
	}

	function getDayKeyIcon(dayIndex: number): string {
		const dayActs = schedule[dayIndex];
		for (const act of dayActs) {
			if (act.type === 'competition') return '\u{1F3C6}';
			if (act.type === 'tennis_match') return '\u{1F3BE}';
			if (act.type === 'tennis_training') return '\u{1F3BE}';
			if (act.type === 'gym') return '\u{1F4AA}';
		}
		if (dayActs.some((a: ScheduleItem) => a.type === 'wall_drills')) return '\u{1F9F1}';
		if (dayActs.length === 0) return '\u{1F319}';
		return '\u{26A1}';
	}

	// Build workout coach exercises from schedule item
	function buildWorkoutExercises(activity: ScheduleItem): { name: string; instruction: string; type: 'reps' | 'timed'; reps?: number; seconds?: number }[] {
		return activity.items.map(item => {
			const hasSeconds = item.match(/(\d+)s\b/);
			const hasReps = item.match(/(\d+)\s*reps?/i) || item.match(/x(\d+)/);
			if (hasSeconds) {
				return { name: item.split(':')[0] || item, instruction: item, type: 'timed' as const, seconds: parseInt(hasSeconds[1]) };
			}
			if (hasReps) {
				return { name: item.split(':')[0] || item, instruction: item, type: 'reps' as const, reps: parseInt(hasReps[1]) };
			}
			return { name: item.split(':')[0] || item, instruction: item, type: 'timed' as const, seconds: 60 };
		});
	}
</script>

<svelte:head>
	<title>TennisEdge - Week {displayWeek} Schedule</title>
</svelte:head>

<div class="space-y-5 animate-slide-up">
	<!-- ===== HEADER: Week info + Navigation ===== -->
	<header class="space-y-4">
		<div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
			<div>
				<h1 class="text-2xl sm:text-3xl font-extrabold text-text-primary tracking-tight">
					Week {displayWeek} Schedule
				</h1>
				<p class="text-text-secondary text-sm mt-1">
					{weekRangeLabel} &middot; {phase} Phase
				</p>
			</div>

			<!-- Week Navigation -->
			<div class="flex items-center gap-2">
				<button
					onclick={prevWeek}
					disabled={displayWeek <= 1}
					class="w-9 h-9 rounded-lg bg-surface-light flex items-center justify-center text-text-muted hover:text-text-primary hover:bg-surface-lighter transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
					aria-label="Previous week"
				>
					<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
						<polyline points="15 18 9 12 15 6"/>
					</svg>
				</button>

				{#if !isCurrentWeek}
					<button
						onclick={goToCurrent}
						class="px-3 py-1.5 rounded-lg text-xs font-semibold bg-accent-blue/10 text-accent-blue border border-accent-blue/20 hover:bg-accent-blue/20 transition-all"
					>
						Go to Today
					</button>
				{/if}

				<button
					onclick={nextWeek}
					disabled={displayWeek >= 52}
					class="w-9 h-9 rounded-lg bg-surface-light flex items-center justify-center text-text-muted hover:text-text-primary hover:bg-surface-lighter transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
					aria-label="Next week"
				>
					<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
						<polyline points="9 18 15 12 9 6"/>
					</svg>
				</button>
			</div>
		</div>

		<!-- Week Theme Banner -->
		<div class="glass-card p-4 border-l-4 border-ball-yellow">
			<div class="flex items-start gap-3">
				<div class="flex-shrink-0 w-10 h-10 rounded-xl bg-ball-yellow/10 flex items-center justify-center">
					<span class="text-lg font-black text-ball-yellow">{displayWeek}</span>
				</div>
				<div class="flex-1 min-w-0">
					<div class="text-xs uppercase tracking-wider text-ball-yellow font-semibold mb-0.5">
						Theme
					</div>
					<div class="text-sm font-semibold text-text-primary">
						{weekTheme}
					</div>
					<div class="mt-1 flex items-center gap-2">
						<span class="badge bg-surface-lighter text-text-secondary text-[10px]">
							{phase} Phase
						</span>
						{#if displayWeek <= 4}
							<span class="badge bg-court-green/10 text-court-green text-[10px]">Weeks 1-4</span>
						{:else if displayWeek <= 8}
							<span class="badge bg-accent-blue/10 text-accent-blue text-[10px]">Weeks 5-8</span>
						{:else if displayWeek <= 12}
							<span class="badge bg-accent-purple/10 text-accent-purple text-[10px]">Weeks 9-12</span>
						{:else if displayWeek <= 16}
							<span class="badge bg-accent-orange/10 text-accent-orange text-[10px]">Weeks 13-16</span>
						{:else if displayWeek <= 20}
							<span class="badge bg-accent-red/10 text-accent-red text-[10px]">Weeks 17-20</span>
						{:else}
							<span class="badge bg-ball-yellow/10 text-ball-yellow text-[10px]">Weeks 21+</span>
						{/if}
						<span class="badge bg-surface-lighter text-text-muted text-[10px]">
							{Math.floor(totalMinutes / 60)}h {totalMinutes % 60}m total
						</span>
					</div>
				</div>
			</div>
		</div>
	</header>

	<!-- ===== WHAT'S NEW BANNER ===== -->
	{#if whatsNew.length > 0}
		<div class="glass-card p-4 border-l-4 border-accent-blue">
			<div class="flex items-start gap-3">
				<div class="flex-shrink-0 w-8 h-8 rounded-lg bg-accent-blue/10 flex items-center justify-center">
					<svg class="w-4 h-4 text-accent-blue" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
						<path d="M12 2L2 7l10 5 10-5-10-5z"/>
						<path d="M2 17l10 5 10-5"/>
						<path d="M2 12l10 5 10-5"/>
					</svg>
				</div>
				<div class="flex-1">
					<div class="text-xs uppercase tracking-wider text-accent-blue font-semibold mb-1.5">
						What's New This Week
					</div>
					<div class="space-y-1">
						{#each whatsNew as item}
							<div class="text-sm text-text-secondary flex items-start gap-2">
								{#if item.startsWith('NEW:')}
									<span class="inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-bold bg-accent-blue/15 text-accent-blue flex-shrink-0 mt-0.5">NEW</span>
									<span>{item.slice(5)}</span>
								{:else}
									<span class="text-accent-blue mt-0.5 flex-shrink-0">&#8226;</span>
									<span>{item}</span>
								{/if}
							</div>
						{/each}
					</div>
				</div>
			</div>
		</div>
	{/if}

	<!-- ===== DAY SELECTOR PILLS ===== -->
	<div class="flex gap-1.5 overflow-x-auto pb-1 scrollbar-hide">
		{#each weekDates as date, dayIndex}
			{@const today = isToday(date)}
			{@const isActive = dayIndex === activeDayIndex}
			{@const dayActs = schedule[dayIndex]}
			{@const dateKey = formatDateKey(date)}
			{@const completedCount = dayActs.filter((a: ScheduleItem) => progressStore.isCompleted(dateKey, a.id)).length}
			{@const allDone = dayActs.length > 0 && completedCount === dayActs.length}
			<button
				onclick={() => selectDay(dayIndex)}
				class="flex-1 min-w-[4.5rem] px-2 py-2.5 rounded-xl text-center transition-all duration-200 border-2
					{isActive
						? today
							? 'bg-ball-yellow/15 border-ball-yellow text-ball-yellow glow-yellow'
							: 'bg-accent-blue/15 border-accent-blue text-accent-blue'
						: today
							? 'bg-ball-yellow/5 border-ball-yellow/30 text-ball-yellow hover:bg-ball-yellow/10'
							: allDone
								? 'bg-success/5 border-success/20 text-success hover:bg-success/10'
								: 'bg-surface-card/50 border-transparent text-text-muted hover:bg-surface-light/50 hover:border-white/10'}"
			>
				<div class="text-[10px] uppercase tracking-wider font-bold">{dayLabels[dayIndex]}</div>
				<div class="text-lg font-bold mt-0.5">{date.getDate()}</div>
				{#if today}
					<div class="w-1.5 h-1.5 rounded-full bg-ball-yellow mx-auto mt-1 pulse-dot"></div>
				{:else if allDone}
					<svg class="w-3.5 h-3.5 text-success mx-auto mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round">
						<polyline points="20 6 9 17 4 12"/>
					</svg>
				{:else if completedCount > 0}
					<div class="text-[9px] mt-0.5 opacity-70">{completedCount}/{dayActs.length}</div>
				{:else}
					<div class="w-1.5 h-1.5 mx-auto mt-1"></div>
				{/if}
			</button>
		{/each}
	</div>

	<!-- ===== DAY SUMMARY CARD ===== -->
	<div class="glass-card p-4 space-y-3">
		<div class="flex items-center justify-between">
			<div>
				<h2 class="text-xl font-bold text-text-primary">
					{dayFullLabels[activeDayIndex]}
					<span class="text-text-muted font-normal text-base ml-1">
						{monthNames[activeDate.getMonth()]} {activeDate.getDate()}
					</span>
				</h2>
				{#if isToday(activeDate)}
					<span class="inline-flex items-center gap-1.5 mt-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-ball-yellow/15 text-ball-yellow">
						<span class="w-1.5 h-1.5 rounded-full bg-ball-yellow pulse-dot"></span>
						TODAY
					</span>
				{/if}
			</div>
			<div class="text-right">
				<div class="text-2xl font-black text-text-primary">
					{dayCompletedCount}<span class="text-text-muted font-normal text-base">/{dayTotalCount}</span>
				</div>
				<div class="text-xs text-text-muted">completed</div>
			</div>
		</div>

		<!-- Progress bar -->
		{#if dayTotalCount > 0}
			<div class="progress-bar">
				<div
					class="progress-bar-fill"
					style="width: {dayCompletionPct}%; background: {dayCompletionPct === 100 ? 'var(--color-success)' : dayCompletionPct > 50 ? 'var(--color-ball-yellow)' : 'var(--color-accent-blue)'};"
				></div>
			</div>
		{/if}

		<!-- Stats row -->
		<div class="flex items-center gap-4 text-xs text-text-muted">
			<div class="flex items-center gap-1.5">
				<svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
					<circle cx="12" cy="12" r="10"/>
					<polyline points="12 6 12 12 16 14"/>
				</svg>
				{Math.floor(dayTotalMinutes / 60)}h {dayTotalMinutes % 60}m
			</div>
			<div class="flex items-center gap-1.5">
				<svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
					<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
				</svg>
				{dayTotalCount} {dayTotalCount === 1 ? 'activity' : 'activities'}
			</div>
			{#if keyActivity}
				<div class="flex items-center gap-1.5 ml-auto text-text-secondary font-medium">
					<span>{typeEmoji(keyActivity.type)}</span>
					{keyActivity.title} at {keyActivity.time}
				</div>
			{/if}
		</div>
	</div>

	<!-- ===== ACTIVITY CARDS (Full-width, vertical) ===== -->
	<div class="space-y-3">
		{#each activeDayActivities as activity, actIndex (activity.id)}
			{@const color = typeColor(activity.type)}
			{@const completed = isCompleted(activeDateKey, activity.id)}
			{@const isExpanded = expandedActivity === activity.id}
			{@const status = getActivityStatus(activity, activeDateKey)}

			<div
				class="relative rounded-xl overflow-hidden transition-all duration-300 animate-slide-up
					{status === 'completed'
						? 'bg-success/5 border border-success/20'
						: status === 'current'
							? 'border-2 border-ball-yellow/50 bg-surface-card/80 glow-yellow'
							: status === 'overdue'
								? 'bg-accent-red/5 border border-accent-red/20'
								: 'glass-card'}"
				style="animation-delay: {actIndex * 50}ms"
			>
				<!-- Left color stripe -->
				<div class="absolute left-0 top-0 bottom-0 w-1.5 bg-{color}"></div>

				<!-- Main clickable area -->
				<button
					onclick={() => toggleExpand(activity.id)}
					class="w-full text-left p-4 pl-5 transition-colors duration-200
						{!completed ? 'hover:bg-surface-light/20' : ''}"
				>
					<div class="flex items-start gap-4">
						<!-- Checkbox -->
						<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions -->
						<div
							onclick={(e: MouseEvent) => { e.stopPropagation(); completeActivity(activeDateKey, activity.id); }}
							class="flex-shrink-0 w-7 h-7 rounded-lg border-2 flex items-center justify-center mt-0.5 cursor-pointer transition-all duration-200
								{completed
									? 'bg-success border-success'
									: `border-${color}/40 hover:border-${color} hover:bg-${color}/10`}"
						>
							{#if completed}
								<svg class="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round">
									<polyline points="20 6 9 17 4 12"/>
								</svg>
							{/if}
						</div>

						<!-- Content -->
						<div class="flex-1 min-w-0">
							<div class="flex items-center gap-2 flex-wrap">
								<!-- Time badge -->
								<span class="text-sm font-bold {completed ? 'text-text-muted' : `text-${color}`}">
									{activity.time}
								</span>

								<!-- Title -->
								<span class="text-base font-semibold {completed ? 'line-through text-text-muted' : 'text-text-primary'}">
									{activity.title}
								</span>

								<!-- Status badges -->
								{#if status === 'current'}
									<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-ball-yellow/20 text-ball-yellow">
										<span class="w-1.5 h-1.5 rounded-full bg-ball-yellow pulse-dot"></span>
										NOW
									</span>
								{:else if status === 'overdue' && !completed}
									<span class="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-accent-red/15 text-accent-red">
										MISSED
									</span>
								{:else if completed}
									<svg class="w-4 h-4 text-success flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
										<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
									</svg>
								{/if}

								{#if activity.isNew}
									<span class="inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-bold bg-accent-blue/15 text-accent-blue flex-shrink-0">NEW</span>
								{/if}
							</div>

							<!-- Description + duration row -->
							<div class="mt-1.5 flex items-center gap-3 flex-wrap">
								<span class="badge bg-{color}/10 text-{color} text-[10px]">
									{activity.duration}
								</span>
								<span class="badge bg-surface-lighter text-text-muted text-[10px]">
									{activity.type.replace('_', ' ')}
								</span>
								<p class="text-sm text-text-secondary leading-relaxed line-clamp-1">
									{activity.description}
								</p>
							</div>
						</div>

						<!-- Expand chevron -->
						<svg
							class="w-5 h-5 text-text-muted flex-shrink-0 mt-1 transition-transform duration-200 {isExpanded ? 'rotate-180' : ''}"
							viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
						>
							<polyline points="6 9 12 15 18 9"/>
						</svg>
					</div>
				</button>

				<!-- ===== Expanded Detail ===== -->
				{#if isExpanded}
					<div class="px-5 pb-5 space-y-4 animate-slide-up border-t border-white/5 pt-4 ml-5">
						<!-- Full description -->
						<p class="text-sm text-text-secondary leading-relaxed">
							{activity.description}
						</p>

						<!-- Items list -->
						{#if activity.items.length > 0}
							<div class="space-y-2">
								<div class="text-xs uppercase tracking-wider text-text-muted font-semibold">
									Exercises / Details
								</div>
								<div class="space-y-1.5 pl-1">
									{#each activity.items as item, i}
										<div class="text-sm text-text-secondary flex items-start gap-2.5">
											<span class="flex-shrink-0 w-5 h-5 rounded-full bg-{color}/10 text-{color} text-[10px] font-bold flex items-center justify-center mt-0.5">
												{i + 1}
											</span>
											<span class="leading-relaxed">{item}</span>
										</div>
									{/each}
								</div>
							</div>
						{/if}

						<!-- Action buttons -->
						<div class="flex items-center gap-3 pt-2 flex-wrap">
							<!-- Mark complete -->
							<button
								onclick={(e) => { e.stopPropagation(); completeActivity(activeDateKey, activity.id); }}
								class="flex-1 min-w-[140px] py-2.5 rounded-lg text-sm font-semibold transition-all duration-200
									{completed
										? 'bg-success/10 text-success border border-success/20'
										: 'bg-ball-yellow/10 text-ball-yellow border border-ball-yellow/20 hover:bg-ball-yellow/20'}"
							>
								{#if completed}
									<span class="flex items-center justify-center gap-2">
										<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
											<polyline points="20 6 9 17 4 12"/>
										</svg>
										Completed
									</span>
								{:else}
									Mark as Complete
								{/if}
							</button>

							<!-- Timer button (for short activities) -->
							{#if activity.durationMinutes <= 30}
								<button
									onclick={(e) => { e.stopPropagation(); toggleTimer(activity.id); }}
									class="py-2.5 px-4 rounded-lg text-sm font-semibold transition-all duration-200
										{showTimer === activity.id
											? 'bg-accent-blue/10 text-accent-blue border border-accent-blue/20'
											: 'bg-surface-lighter text-text-secondary hover:bg-accent-blue/10 hover:text-accent-blue border border-white/5'}"
								>
									<span class="flex items-center gap-1.5">
										<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
											<circle cx="12" cy="12" r="10"/>
											<polyline points="12 6 12 12 16 14"/>
										</svg>
										Timer
									</span>
								</button>
							{/if}

							<!-- Guided Workout button (for physical activities) -->
							{#if ['micro_workout', 'prehab', 'warmup', 'gym', 'strength', 'footwork'].includes(activity.type) && activity.items.length > 0}
								<button
									onclick={(e) => { e.stopPropagation(); showWorkoutCoach = showWorkoutCoach === activity.id ? null : activity.id; }}
									class="py-2.5 px-4 rounded-lg text-sm font-semibold transition-all duration-200
										{showWorkoutCoach === activity.id
											? 'bg-court-green/10 text-court-green border border-court-green/20'
											: 'bg-surface-lighter text-text-secondary hover:bg-court-green/10 hover:text-court-green border border-white/5'}"
								>
									<span class="flex items-center gap-1.5">
										<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
											<polygon points="5 3 19 12 5 21 5 3"/>
										</svg>
										Guided Workout
									</span>
								</button>
							{/if}

							<!-- Visualization button (for mental activities) -->
							{#if activity.type === 'mental'}
								<button
									onclick={(e) => { e.stopPropagation(); showVisualization = showVisualization === activity.id ? null : activity.id; }}
									class="py-2.5 px-4 rounded-lg text-sm font-semibold transition-all duration-200
										{showVisualization === activity.id
											? 'bg-accent-purple/10 text-accent-purple border border-accent-purple/20'
											: 'bg-surface-lighter text-text-secondary hover:bg-accent-purple/10 hover:text-accent-purple border border-white/5'}"
								>
									<span class="flex items-center gap-1.5">
										<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
											<path d="M12 2a5 5 0 015 5c0 1.1-.4 2.1-1 2.9a5 5 0 011 3.1 5 5 0 01-3 4.6V20a2 2 0 01-2 2h0a2 2 0 01-2-2v-2.4A5 5 0 017 13a5 5 0 011-3.1A5 5 0 017 7a5 5 0 015-5z"/>
											<path d="M12 2v20"/>
										</svg>
										Guided Session
									</span>
								</button>
							{/if}
						</div>

						<!-- Timer component -->
						{#if showTimer === activity.id}
							<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions -->
							<div class="pt-2" onclick={(e) => e.stopPropagation()}>
								<div class="glass-card p-4">
									<Timer duration={activity.durationMinutes * 60} label={activity.title} />
								</div>
							</div>
						{/if}

						<!-- Workout Coach component -->
						{#if showWorkoutCoach === activity.id}
							<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions -->
							<div class="pt-2" onclick={(e) => e.stopPropagation()}>
								<WorkoutCoach
									title={activity.title}
									exercises={buildWorkoutExercises(activity)}
									totalDuration={activity.durationMinutes * 60}
								/>
							</div>
						{/if}

						<!-- Visualization component -->
						{#if showVisualization === activity.id}
							<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions -->
							<div class="pt-2" onclick={(e) => e.stopPropagation()}>
								<GuidedVisualization
									type="daily"
									duration={Math.max(5, Math.floor(activity.durationMinutes / 2))}
									onclose={() => { showVisualization = null; }}
								/>
							</div>
						{/if}
					</div>
				{/if}
			</div>
		{/each}

		<!-- Empty state -->
		{#if activeDayActivities.length === 0}
			<div class="glass-card p-10 text-center">
				<div class="text-4xl mb-3">{'\u{1F319}'}</div>
				<div class="text-lg font-semibold text-text-primary mb-1">Rest Day</div>
				<div class="text-sm text-text-muted">No activities scheduled. Recover and recharge.</div>
			</div>
		{/if}
	</div>

	<!-- ===== WEEK OVERVIEW STRIP ===== -->
	<div class="glass-card p-4">
		<div class="text-xs uppercase tracking-wider text-text-muted font-semibold mb-3">Week Overview</div>
		<div class="grid grid-cols-7 gap-2">
			{#each weekDates as date, dayIndex}
				{@const today = isToday(date)}
				{@const isActive = dayIndex === activeDayIndex}
				{@const pct = getWeekDayCompletion(dayIndex)}
				{@const icon = getDayKeyIcon(dayIndex)}
				<button
					onclick={() => selectDay(dayIndex)}
					class="flex flex-col items-center gap-1.5 p-2 rounded-lg transition-all duration-200
						{isActive
							? 'bg-accent-blue/10 border border-accent-blue/30'
							: 'hover:bg-surface-light/30 border border-transparent'}"
				>
					<div class="text-[10px] uppercase tracking-wider font-semibold
						{today ? 'text-ball-yellow' : isActive ? 'text-accent-blue' : 'text-text-muted'}">
						{dayLabels[dayIndex]}
					</div>

					<!-- Completion ring -->
					<div class="relative w-10 h-10">
						<svg class="w-10 h-10 -rotate-90" viewBox="0 0 36 36">
							<circle
								cx="18" cy="18" r="15"
								fill="none"
								stroke="currentColor"
								stroke-width="3"
								class="text-surface-light"
							/>
							{#if pct > 0}
								<circle
									cx="18" cy="18" r="15"
									fill="none"
									stroke="currentColor"
									stroke-width="3"
									stroke-dasharray="{pct * 0.9425} 94.25"
									stroke-linecap="round"
									class="{pct === 100 ? 'text-success' : 'text-accent-blue'}"
								/>
							{/if}
						</svg>
						<div class="absolute inset-0 flex items-center justify-center text-sm">
							{icon}
						</div>
					</div>

					<!-- Percentage or today marker -->
					{#if today}
						<div class="w-1.5 h-1.5 rounded-full bg-ball-yellow pulse-dot"></div>
					{:else if pct > 0}
						<div class="text-[9px] font-bold {pct === 100 ? 'text-success' : 'text-text-muted'}">
							{pct}%
						</div>
					{:else}
						<div class="h-[13px]"></div>
					{/if}
				</button>
			{/each}
		</div>
	</div>

	<!-- ===== PROGRESSION ROADMAP ===== -->
	<div class="glass-card p-4">
		<div class="text-xs uppercase tracking-wider text-text-muted font-semibold mb-3">52-Week Progression</div>
		<div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
			{#each [
				{ label: 'Foundation', weeks: '1-4', active: displayWeek >= 1 && displayWeek <= 4, color: 'court-green' },
				{ label: 'Technique', weeks: '5-8', active: displayWeek >= 5 && displayWeek <= 8, color: 'accent-blue' },
				{ label: 'Patterns', weeks: '9-12', active: displayWeek >= 9 && displayWeek <= 12, color: 'accent-purple' },
				{ label: 'Tactics', weeks: '13-16', active: displayWeek >= 13 && displayWeek <= 16, color: 'accent-orange' },
				{ label: 'Advanced', weeks: '17-20', active: displayWeek >= 17 && displayWeek <= 20, color: 'accent-red' },
				{ label: 'Peak', weeks: '21-26', active: displayWeek >= 21 && displayWeek <= 26, color: 'ball-yellow' }
			] as phaseItem}
				<div class="rounded-lg p-2.5 text-center border transition-all duration-200
					{phaseItem.active
						? `bg-${phaseItem.color}/10 border-${phaseItem.color}/30`
						: displayWeek > parseInt(phaseItem.weeks.split('-')[1])
							? 'bg-success/5 border-success/10'
							: 'bg-surface-light/30 border-white/5'}"
				>
					<div class="text-[10px] font-bold uppercase tracking-wider
						{phaseItem.active ? `text-${phaseItem.color}` : displayWeek > parseInt(phaseItem.weeks.split('-')[1]) ? 'text-success' : 'text-text-muted'}">
						{phaseItem.label}
					</div>
					<div class="text-[10px] text-text-muted mt-0.5">
						Wk {phaseItem.weeks}
					</div>
					{#if phaseItem.active}
						<div class="w-1 h-1 rounded-full bg-{phaseItem.color} mx-auto mt-1"></div>
					{:else if displayWeek > parseInt(phaseItem.weeks.split('-')[1])}
						<svg class="w-3 h-3 text-success mx-auto mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round">
							<polyline points="20 6 9 17 4 12"/>
						</svg>
					{/if}
				</div>
			{/each}
		</div>
	</div>
</div>

<style>
	.pulse-dot {
		animation: pulse-dot 2s ease-in-out infinite;
	}

	@keyframes pulse-dot {
		0%, 100% { opacity: 1; transform: scale(1); }
		50% { opacity: 0.5; transform: scale(1.5); }
	}

	.line-clamp-1 {
		display: -webkit-box;
		-webkit-line-clamp: 1;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.scrollbar-hide {
		-ms-overflow-style: none;
		scrollbar-width: none;
	}
	.scrollbar-hide::-webkit-scrollbar {
		display: none;
	}
</style>
