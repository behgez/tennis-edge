<script lang="ts">
	import { base } from '$app/paths';
	import { browser } from '$app/environment';
	import { progressStore } from '$lib/stores/progress.svelte';
	import { settingsStore } from '$lib/stores/settings.svelte';
	import { weekSchedule } from '$lib/data/schedule';
	import type { ScheduleActivity, ScheduleActivityType } from '$lib/data/types';
	import AudioGuide from '$lib/components/AudioGuide.svelte';
	import GuidedVisualization from '$lib/components/GuidedVisualization.svelte';
	import Timer from '$lib/components/Timer.svelte';
	import WorkoutCoach from '$lib/components/WorkoutCoach.svelte';

	// --- Active audio/timer state for inline activities ---
	let activeAudioId = $state<string | null>(null);
	let activeTimerId = $state<string | null>(null);
	let activeCoachId = $state<string | null>(null);
	let activeVizType = $state<'pre-match' | 'daily' | null>(null);

	function startAudio(activityId: string): void {
		activeAudioId = activeAudioId === activityId ? null : activityId;
		activeTimerId = null;
	}
	function startTimer(activityId: string): void {
		activeTimerId = activeTimerId === activityId ? null : activityId;
		activeAudioId = null;
	}
	function startViz(type: 'pre-match' | 'daily'): void {
		activeVizType = type;
	}

	function getAudioSteps(activity: ScheduleActivity): string[] {
		return activity.items.filter(i => i !== '' && !i.endsWith(':')).map(i => i);
	}

	function getTimerDuration(activity: ScheduleActivity): number {
		const m = activity.duration.match(/(\d+)\s*min/);
		if (m) return parseInt(m[1]) * 60;
		const h = activity.duration.match(/(\d+)\s*h/);
		if (h) return parseInt(h[1]) * 3600;
		return 300;
	}

	function isVisualization(activity: ScheduleActivity): boolean {
		return activity.type === 'mental' || activity.title.toLowerCase().includes('visualization') || activity.title.toLowerCase().includes('visuali');
	}
	function isTimeable(activity: ScheduleActivity): boolean {
		const mins = getTimerDuration(activity) / 60;
		return mins > 0 && mins <= 60;
	}
	function hasAudioContent(activity: ScheduleActivity): boolean {
		return activity.items.length > 2;
	}
	function isWorkout(activity: ScheduleActivity): boolean {
		return activity.type === 'micro_workout' || activity.type === 'strength' || activity.type === 'prehab' || activity.type === 'footwork' || activity.type === 'warmup' || activity.type === 'gym';
	}
	function toCoachExercises(activity: ScheduleActivity): { name: string; instruction: string; type: 'reps' | 'timed'; reps?: number; seconds?: number }[] {
		return activity.items.filter(i => i.trim() && !i.endsWith(':')).map(item => {
			// Parse "Exercise name: X reps" or "Exercise name: X sec" or "Exercise: X-Y sec"
			const secMatch = item.match(/(\d+)[\s-]*(?:\d+)?\s*sec/i);
			const repMatch = item.match(/(\d+)\s*reps/i);
			const name = item.split(':')[0]?.trim() || item.split('(')[0]?.trim() || item;
			const instruction = item;
			if (secMatch) {
				return { name, instruction, type: 'timed' as const, seconds: parseInt(secMatch[1]) };
			} else if (repMatch) {
				return { name, instruction, type: 'reps' as const, reps: parseInt(repMatch[1]) };
			} else {
				// Default: 20 reps for rep-like items, 30 sec for others
				return { name, instruction, type: 'reps' as const, reps: 15 };
			}
		});
	}
	function startCoach(activityId: string): void {
		activeCoachId = activeCoachId === activityId ? null : activityId;
		activeAudioId = null;
		activeTimerId = null;
	}

	// --- Reactive clock (updates every 30 seconds) ---
	let now = $state(new Date());
	$effect(() => {
		const id = setInterval(() => { now = new Date(); }, 30_000);
		return () => clearInterval(id);
	});

	// --- Derived date/time values ---
	let hour = $derived(now.getHours());
	let minute = $derived(now.getMinutes());
	let currentMinutes = $derived(hour * 60 + minute);
	let today = $derived(now.toISOString().slice(0, 10));
	let dayOfWeek = $derived(now.getDay()); // 0=Sun, 1=Mon ... 6=Sat
	const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
	const dayNamesShort = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
	const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

	// --- Map schedule day names to JS day numbers ---
	const dayNameToNum: Record<string, number> = {
		sunday: 0, monday: 1, tuesday: 2, wednesday: 3,
		thursday: 4, friday: 5, saturday: 6
	};

	// --- Get activities for a given JS day number (0-6) ---
	function getActivitiesForDay(jsDay: number): ScheduleActivity[] {
		const dayEntry = weekSchedule.find(
			(d) => dayNameToNum[d.day] === jsDay
		);
		return dayEntry?.activities ?? [];
	}

	let todayActivities = $derived(getActivitiesForDay(dayOfWeek));

	// --- Parse time string "HH:MM" to minutes since midnight ---
	function parseTime(t: string): number {
		const parts = t.split(':');
		return parseInt(parts[0]) * 60 + parseInt(parts[1]);
	}

	// --- Parse duration string to minutes ---
	function parseDuration(d: string): number {
		const m = d.match(/(\d+)\s*min/);
		if (m) return parseInt(m[1]);
		const h = d.match(/(\d+)\s*h/);
		if (h) return parseInt(h[1]) * 60;
		return 30; // default
	}

	// --- Timeline item with computed status ---
	interface TimelineItem {
		activity: ScheduleActivity;
		startMinutes: number;
		endMinutes: number;
		status: 'done' | 'current' | 'upcoming' | 'overdue';
		completed: boolean;
	}

	let timeline = $derived.by(() => {
		const items: TimelineItem[] = [];
		for (const act of todayActivities) {
			const startMin = parseTime(act.time);
			const dur = parseDuration(act.duration);
			const endMin = startMin + dur;
			const completed = progressStore.isCompleted(today, act.id);
			let status: TimelineItem['status'];

			if (completed) {
				status = 'done';
			} else if (currentMinutes >= startMin && currentMinutes < endMin) {
				status = 'current';
			} else if (currentMinutes >= endMin) {
				status = 'overdue';
			} else {
				status = 'upcoming';
			}

			items.push({ activity: act, startMinutes: startMin, endMinutes: endMin, status, completed });
		}
		return items;
	});

	// --- Current activity (the one happening right now or the next upcoming if between activities) ---
	let currentItem = $derived.by(() => {
		// First: find an activity that is currently active (status=current)
		const active = timeline.find((t) => t.status === 'current');
		if (active) return active;
		// Second: find the most recent overdue item that isn't done
		const overdue = timeline.filter((t) => t.status === 'overdue');
		if (overdue.length > 0) return overdue[overdue.length - 1];
		// Third: find the next upcoming item
		const upcoming = timeline.find((t) => t.status === 'upcoming');
		if (upcoming) return upcoming;
		return null;
	});

	// --- Next upcoming activity (the one after current) ---
	let nextItem = $derived.by(() => {
		if (!currentItem) return null;
		const idx = timeline.indexOf(currentItem);
		for (let i = idx + 1; i < timeline.length; i++) {
			if (!timeline[i].completed) return timeline[i];
		}
		return null;
	});

	// --- Overdue items ---
	let overdueItems = $derived(timeline.filter((t) => t.status === 'overdue'));

	// --- Time formatting ---
	function formatTimeFromMinutes(mins: number): string {
		const h = Math.floor(mins / 60);
		const m = mins % 60;
		return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
	}

	function formatCountdown(mins: number): string {
		if (mins <= 0) return 'now';
		if (mins < 60) return `${mins}m`;
		const h = Math.floor(mins / 60);
		const m = mins % 60;
		return m > 0 ? `${h}h ${m}m` : `${h}h`;
	}

	// --- Completion stats ---
	let completedCount = $derived(timeline.filter((t) => t.completed).length);
	let totalCount = $derived(timeline.length);
	let completionPct = $derived(totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0);

	// --- Toggle activity completion ---
	function toggleActivity(activityId: string): void {
		progressStore.toggleActivity(today, activityId);
	}

	// --- Streak info ---
	let streakInfo = $derived(progressStore.getStreakInfo());

	// --- Week dates for scorecard ---
	function getWeekDates(): { date: string; jsDay: number; dateObj: Date }[] {
		const dates: { date: string; jsDay: number; dateObj: Date }[] = [];
		const d = new Date(now);
		const dayIdx = d.getDay();
		const mondayOffset = dayIdx === 0 ? -6 : 1 - dayIdx;
		d.setDate(d.getDate() + mondayOffset);
		d.setHours(0, 0, 0, 0);
		for (let i = 0; i < 7; i++) {
			const dateObj = new Date(d);
			dates.push({
				date: dateObj.toISOString().slice(0, 10),
				jsDay: dateObj.getDay(),
				dateObj
			});
			d.setDate(d.getDate() + 1);
		}
		return dates;
	}

	let weekDates = $derived(getWeekDates());

	function getDayCompletionPct(dateStr: string, jsDay: number): number {
		const acts = getActivitiesForDay(jsDay);
		if (acts.length === 0) return 0;
		const done = progressStore.getCompletedForDate(dateStr);
		return Math.round((done.length / acts.length) * 100);
	}

	// --- Upcoming days preview ---
	let upcomingDays = $derived.by(() => {
		const days: { dayName: string; date: string; summary: string; jsDay: number }[] = [];
		for (let offset = 1; offset <= 4; offset++) {
			const d = new Date(now);
			d.setDate(d.getDate() + offset);
			const jsDay = d.getDay();
			const acts = getActivitiesForDay(jsDay);
			const mainAct = acts.find(
				(a) => a.type === 'tennis_match' || a.type === 'tennis_training' || a.type === 'competition' || a.type === 'gym' || a.type === 'strength' || a.type === 'wall_drills'
			);
			const summary = mainAct ? mainAct.title : acts.length > 0 ? `${acts.length} activities scheduled` : 'Rest day';
			days.push({
				dayName: dayNames[jsDay],
				date: d.toISOString().slice(0, 10),
				summary,
				jsDay
			});
		}
		return days;
	});

	// --- Day type icons ---
	const dayKeyActivity: Record<number, { icon: string; label: string }> = {
		0: { icon: 'dumbbell', label: 'Gym' },
		1: { icon: 'racket', label: 'Singles' },
		2: { icon: 'racket', label: 'Training' },
		3: { icon: 'home', label: 'Home' },
		4: { icon: 'racket', label: 'Singles' },
		5: { icon: 'wall', label: 'Wall/Rest' },
		6: { icon: 'trophy', label: 'Competition' }
	};

	// --- Type to color ---
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

	// --- Week focus data ---
	const weekFocusData: Record<number, { theme: string; focus: string[]; newThisWeek: string; mentalFocus: string }> = {
		1: {
			theme: 'Building the Foundation',
			focus: [
				'Build the habit of morning routine (visualization + prehab every day)',
				'Practice basic rally consistency -- aim to rally 10+ balls without error',
				'Start your match journal after every singles session'
			],
			newThisWeek: 'Everything is new! Focus on learning the system.',
			mentalFocus: 'Breathing -- deep belly breaths between every point'
		},
		2: {
			theme: 'Rally Depth & Consistency',
			focus: [
				'Focus on rally depth -- aim every ball for the back third of the court',
				'Try the serve+1 pattern: wide serve then attack the open court',
				'Complete all 5 micro-workouts on at least 4 days'
			],
			newThisWeek: 'Introduce serve+1 patterns in match play.',
			mentalFocus: 'Cue words -- pick 3 words (e.g., "calm, compete, move") for matches'
		},
		3: {
			theme: 'Forehand Transformation Begins',
			focus: [
				'Start the forehand grip change -- semi-western grip on all forehands',
				'Add extra wrist/forearm micro-workouts (band work at desk)',
				'Practice the between-point routine: relax, breathe, plan, ritual'
			],
			newThisWeek: 'Forehand grip change -- expect some errors, that is normal.',
			mentalFocus: 'Body language -- walk tall between points, project confidence'
		},
		4: {
			theme: 'Approach Shot Development',
			focus: [
				'Approach on every ball inside the service line -- no exceptions',
				'Approach shot target: deep down-the-line, then close the net',
				'Forehand update: focus on the unit turn and topspin brush'
			],
			newThisWeek: 'Dedicated approach shot practice in coached training.',
			mentalFocus: 'Routine -- same steps before every serve and return'
		},
		5: {
			theme: 'Net Play & Volleys',
			focus: [
				'After approach, split-step and close to the net aggressively',
				'Volley technique: punch, do not swing. Continental grip.',
				'Practice 2 doubles formations (I-formation, standard) for Saturday'
			],
			newThisWeek: 'Net play focus -- more time at the net in all sessions.',
			mentalFocus: 'Visualization -- 5 min before each session visualizing the game plan'
		},
		6: {
			theme: 'Pattern Play & Shot Selection',
			focus: [
				'Run the 3-1 pattern: 3 cross-court balls then 1 down-the-line',
				'Read the opponent: identify their weaker side within the first 3 games',
				'Reduce unforced errors by 20% vs last week (check journal stats)'
			],
			newThisWeek: 'Pattern play drills in coached training.',
			mentalFocus: 'Pressure handling -- embrace tight scores as growth opportunities'
		},
		7: {
			theme: 'Competition Sharpening',
			focus: [
				'First serve percentage over 60% -- placement over power',
				'Return of serve deep and cross-court as default play',
				'Energy management: pace yourself across the full competition day'
			],
			newThisWeek: 'Competition-specific mental rehearsal added to morning routine.',
			mentalFocus: 'One point at a time -- reset after every point regardless of outcome'
		},
		8: {
			theme: 'Tactical Intelligence',
			focus: [
				'Identify 3 opponent patterns in the warm-up (where they like to serve, backhand preference, net comfort)',
				'Adjust your game plan mid-match based on what you observe',
				'Use the "yellow light" strategy at deuce and in tiebreaks'
			],
			newThisWeek: 'Mid-match tactical adjustment protocol.',
			mentalFocus: 'Green/Yellow/Red light system -- match aggression to the score'
		},
		9: {
			theme: 'Serve Development',
			focus: [
				'Add kick serve to your second serve repertoire',
				'Wide serve to deuce court as primary serve+1 setup',
				'Practice serve targets: aim at specific cones or marks on the court'
			],
			newThisWeek: 'Kick serve technique in coached training.',
			mentalFocus: 'Confidence -- trust your training, commit to every shot'
		},
		10: {
			theme: 'Defensive Skills',
			focus: [
				'Practice the defensive lob under pressure -- buy time when pushed wide',
				'Slice backhand as a change-of-pace and approach tool',
				'Recovery footwork: get back to center after every shot'
			],
			newThisWeek: 'Defensive pattern drills in coached sessions.',
			mentalFocus: 'Resilience -- come back from 0-3 down, practice mental reset'
		},
		11: {
			theme: 'Doubles Excellence',
			focus: [
				'Poach aggressively -- commit to 3+ poach attempts per set',
				'Communication: call every ball in the middle',
				'Work on your return position in doubles -- stand closer'
			],
			newThisWeek: 'Doubles-specific tactical drills.',
			mentalFocus: 'Partnership -- positive body language toward your partner always'
		},
		12: {
			theme: 'Peak Performance',
			focus: [
				'Combine all skills: serve+1, approach, net play, pattern play',
				'Play point-by-point -- no scoreboard watching',
				'Review your journal: celebrate how far you have come in 12 weeks'
			],
			newThisWeek: 'Full integration -- play your complete game.',
			mentalFocus: 'Flow state -- let go of mechanics and trust your body'
		}
	};

	let currentWeek = $derived(settingsStore.settings.currentWeek);

	// Self-assessment tracking
	let lastAssessment = $derived(progressStore.getRecentAssessments(1)[0] ?? null);
	let daysSinceAssessment = $derived(lastAssessment ? Math.floor((Date.now() - new Date(lastAssessment.date).getTime()) / 86400000) : 999);
	let assessmentDue = $derived(daysSinceAssessment >= 28);
	let assessmentAvgScore = $derived(lastAssessment ? Math.round(Object.values(lastAssessment.skills).reduce((a: number, b: number) => a + b, 0) / Object.values(lastAssessment.skills).length * 10) / 10 : 0);
	let currentPhase = $derived(settingsStore.settings.currentPhase);
	let gymRotation = $derived(settingsStore.settings.gymWeekRotation);

	let weekFocus = $derived(weekFocusData[currentWeek] ?? weekFocusData[1]);

	// --- First-time tour ---
	const TOUR_KEY = 'tennisedge-tour-completed';
	let showTour = $state(false);
	let tourWeek = $state(1);
	let tourGymRotation = $state<'A' | 'B' | 'C'>('A');

	$effect(() => {
		if (browser) {
			const completed = localStorage.getItem(TOUR_KEY);
			if (!completed) {
				showTour = true;
			}
		}
	});

	function completeTour(): void {
		settingsStore.setWeek(tourWeek);
		settingsStore.setGymRotation(tourGymRotation);
		if (browser) {
			localStorage.setItem(TOUR_KEY, 'true');
		}
		showTour = false;
	}

	function dismissTour(): void {
		if (browser) {
			localStorage.setItem(TOUR_KEY, 'true');
		}
		showTour = false;
	}

	// --- Expanded timeline items ---
	let expandedItems = $state<Set<string>>(new Set());

	function toggleExpand(id: string): void {
		const next = new Set(expandedItems);
		if (next.has(id)) {
			next.delete(id);
		} else {
			next.add(id);
		}
		expandedItems = next;
	}

	// --- Greeting based on time ---
	let greeting = $derived(
		hour < 6 ? 'Rest up' :
		hour < 12 ? 'Good morning' :
		hour < 17 ? 'Good afternoon' :
		hour < 22 ? 'Good evening' :
		'Wind down'
	);

	// --- "Right now" banner logic ---
	let rightNowMessage = $derived.by(() => {
		if (!currentItem) {
			if (hour >= 22) {
				const tmrwActs = getActivitiesForDay((dayOfWeek + 1) % 7);
				const mainTmrw = tmrwActs.find(
					(a) => a.type === 'tennis_match' || a.type === 'tennis_training' || a.type === 'competition' || a.type === 'gym'
				);
				return {
					title: 'Rest. You are done for today.',
					subtitle: mainTmrw ? `Tomorrow's focus: ${mainTmrw.title}` : 'Tomorrow: check back in the morning.',
					type: 'rest' as const
				};
			}
			if (hour < 6) {
				return {
					title: 'Rest & Recovery',
					subtitle: 'Get some sleep. Your morning routine starts at 7:00.',
					type: 'rest' as const
				};
			}
			return {
				title: 'All done for now!',
				subtitle: 'Check back later for your next activity.',
				type: 'rest' as const
			};
		}

		if (currentItem.status === 'overdue') {
			return {
				title: currentItem.activity.title,
				subtitle: `This was scheduled for ${currentItem.activity.time}. Do it now or skip it.`,
				type: 'overdue' as const
			};
		}

		if (currentItem.status === 'current') {
			const remaining = currentItem.endMinutes - currentMinutes;
			return {
				title: currentItem.activity.title,
				subtitle: `${formatCountdown(remaining)} remaining`,
				type: 'current' as const
			};
		}

		// upcoming
		const startsIn = currentItem.startMinutes - currentMinutes;
		return {
			title: currentItem.activity.title,
			subtitle: `Starts in ${formatCountdown(startsIn)}`,
			type: 'upcoming' as const
		};
	});

	let bannerColorClass = $derived(
		rightNowMessage.type === 'overdue' ? 'border-accent-red/50 bg-accent-red/5' :
		rightNowMessage.type === 'current' ? 'border-ball-yellow/50 bg-ball-yellow/5 glow-yellow' :
		rightNowMessage.type === 'upcoming' ? 'border-accent-blue/30 bg-accent-blue/5' :
		'border-court-green/30 bg-court-green/5'
	);

	let bannerIconColor = $derived(
		rightNowMessage.type === 'overdue' ? 'text-accent-red' :
		rightNowMessage.type === 'current' ? 'text-ball-yellow' :
		rightNowMessage.type === 'upcoming' ? 'text-accent-blue' :
		'text-court-green'
	);
</script>

<svelte:head>
	<title>TennisEdge - Mission Control</title>
</svelte:head>

<!-- ============================== -->
<!-- FIRST-TIME TOUR OVERLAY        -->
<!-- ============================== -->
{#if showTour}
	<div class="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
		<div class="glass-card max-w-lg w-full p-8 space-y-6 animate-slide-up">
			<div class="text-center space-y-2">
				<div class="w-16 h-16 mx-auto rounded-2xl bg-ball-yellow/10 flex items-center justify-center mb-4">
					<svg class="w-8 h-8 text-ball-yellow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<circle cx="12" cy="12" r="10"/>
						<path d="M2.5 12c3 0 5.5-2.5 5.5-5.5M16 21.5c0-3-2.5-5.5-5.5-5.5M21.5 12c-3 0-5.5 2.5-5.5 5.5M8 2.5c0 3 2.5 5.5 5.5 5.5"/>
					</svg>
				</div>
				<h2 class="text-2xl font-extrabold text-text-primary">Welcome to TennisEdge</h2>
				<p class="text-text-secondary">Your journey from KNLTB 7 to 5 starts here.</p>
			</div>

			<div class="space-y-3 text-sm text-text-secondary">
				<div class="flex gap-3 items-start">
					<span class="flex-shrink-0 w-6 h-6 rounded-full bg-ball-yellow/10 flex items-center justify-center text-ball-yellow font-bold text-xs">1</span>
					<p>This is your <strong class="text-text-primary">Mission Control</strong>. It tells you exactly what to do and when. No guessing.</p>
				</div>
				<div class="flex gap-3 items-start">
					<span class="flex-shrink-0 w-6 h-6 rounded-full bg-ball-yellow/10 flex items-center justify-center text-ball-yellow font-bold text-xs">2</span>
					<p>Every morning, open this page. The <strong class="text-text-primary">top banner</strong> shows what to do right now. The <strong class="text-text-primary">timeline</strong> shows your full day.</p>
				</div>
				<div class="flex gap-3 items-start">
					<span class="flex-shrink-0 w-6 h-6 rounded-full bg-ball-yellow/10 flex items-center justify-center text-ball-yellow font-bold text-xs">3</span>
					<p>Mark activities done as you go. Your schedule adapts to the day of the week and progresses week by week.</p>
				</div>
			</div>

			<div class="space-y-4 pt-2">
				<div>
					<span class="block text-xs font-semibold text-text-muted uppercase tracking-wide mb-2">Which week are you starting?</span>
					<div class="flex gap-2 flex-wrap">
						{#each [1, 2, 3, 4, 5, 6, 7, 8] as w}
							<button
								onclick={() => tourWeek = w}
								class="px-3 py-1.5 rounded-lg text-sm font-medium transition-all
									{tourWeek === w ? 'bg-ball-yellow text-surface font-bold' : 'bg-surface-light text-text-secondary hover:bg-surface-lighter'}"
							>
								Week {w}
							</button>
						{/each}
					</div>
				</div>
				<div>
					<span class="block text-xs font-semibold text-text-muted uppercase tracking-wide mb-2">Sunday gym rotation</span>
					<div class="flex gap-2">
						{#each ['A', 'B', 'C'] as r}
							<button
								onclick={() => tourGymRotation = r as 'A' | 'B' | 'C'}
								class="px-4 py-1.5 rounded-lg text-sm font-medium transition-all
									{tourGymRotation === r ? 'bg-court-green text-white font-bold' : 'bg-surface-light text-text-secondary hover:bg-surface-lighter'}"
							>
								{r === 'A' ? 'A: Lower Body' : r === 'B' ? 'B: Upper Body' : 'C: Power'}
							</button>
						{/each}
					</div>
				</div>
			</div>

			<div class="flex gap-3 pt-2">
				<button
					onclick={completeTour}
					class="flex-1 py-3 rounded-xl bg-ball-yellow text-surface font-bold text-sm hover:bg-ball-yellow-dim transition-all"
				>
					Start My First Morning Routine
				</button>
				<button
					onclick={dismissTour}
					class="px-4 py-3 rounded-xl bg-surface-light text-text-muted text-sm hover:bg-surface-lighter transition-all"
				>
					Skip
				</button>
			</div>
		</div>
	</div>
{/if}

<!-- ============================== -->
<!-- MISSION CONTROL                -->
<!-- ============================== -->
<div class="space-y-6 animate-slide-up">

	<!-- Header -->
	<header class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
		<div>
			<h1 class="text-2xl sm:text-3xl font-extrabold text-text-primary tracking-tight">
				{greeting}<span class="text-ball-yellow">.</span>
			</h1>
			<p class="text-text-muted text-sm mt-0.5">
				{dayNames[dayOfWeek]}, {monthNames[now.getMonth()]} {now.getDate()} &middot; Week {currentWeek}: {weekFocus.theme}
			</p>
		</div>
		<div class="flex items-center gap-2">
			{#if streakInfo.current > 0}
				<span class="badge bg-ball-yellow/15 text-ball-yellow">
					{streakInfo.current} day streak
				</span>
			{/if}
			<span class="badge bg-surface-lighter text-text-muted">
				{completedCount}/{totalCount} done
			</span>
		</div>
	</header>


	<!-- ============================== -->
	<!-- 1. RIGHT NOW BANNER            -->
	<!-- ============================== -->
	<section class="glass-card p-5 sm:p-6 border-2 {bannerColorClass} transition-all duration-500">
		<div class="flex items-start gap-4">
			<!-- Pulsing indicator -->
			<div class="flex-shrink-0 mt-1">
				{#if rightNowMessage.type === 'current'}
					<div class="relative">
						<div class="w-4 h-4 rounded-full bg-ball-yellow"></div>
						<div class="absolute inset-0 w-4 h-4 rounded-full bg-ball-yellow animate-ping opacity-50"></div>
					</div>
				{:else if rightNowMessage.type === 'overdue'}
					<div class="w-4 h-4 rounded-full bg-accent-red"></div>
				{:else if rightNowMessage.type === 'upcoming'}
					<div class="w-4 h-4 rounded-full bg-accent-blue/60"></div>
				{:else}
					<div class="w-4 h-4 rounded-full bg-court-green"></div>
				{/if}
			</div>

			<div class="flex-1 min-w-0">
				<div class="flex items-center gap-2 flex-wrap">
					<span class="text-xs font-semibold uppercase tracking-wider {bannerIconColor}">
						{rightNowMessage.type === 'current' ? 'RIGHT NOW' :
						 rightNowMessage.type === 'overdue' ? 'OVERDUE' :
						 rightNowMessage.type === 'upcoming' ? 'UP NEXT' :
						 'ALL CLEAR'}
					</span>
					{#if currentItem}
						<span class="text-xs text-text-muted">
							{currentItem.activity.time} &middot; {currentItem.activity.duration}
						</span>
					{/if}
				</div>

				<h2 class="text-xl sm:text-2xl font-extrabold text-text-primary mt-1">
					{rightNowMessage.title}
				</h2>
				<p class="text-sm text-text-secondary mt-1">
					{rightNowMessage.subtitle}
				</p>

				<!-- Show exercises for current activity -->
				{#if currentItem && (currentItem.status === 'current' || currentItem.status === 'overdue')}
					<div class="mt-4 space-y-1.5">
						{#each currentItem.activity.items as item}
							{#if item === ''}
								<div class="h-2"></div>
							{:else if item.endsWith(':') || item.startsWith('IF ') || item.startsWith('GAME PLAN') || item.startsWith('SERVE+1') || item.startsWith('APPROACH') || item.startsWith('MENTAL') || item.startsWith('TRACK') || item.startsWith('READ') || item.startsWith('TACTICAL') || item.startsWith('FOCUS') || item.startsWith('WARM-UP') || item.startsWith('LOWER') || item.startsWith('CORE') || item.startsWith('POWER') || item.startsWith('COOL') || item.startsWith('PHYSICAL') || item.startsWith('VISUALIZATION') || item.startsWith('DOUBLES') || item.startsWith('COMMUNICATION') || item.startsWith('MIXED') || item.startsWith('CIRCUIT') || item.startsWith('REVIEW') || item.startsWith('ADJUSTMENT') || item.startsWith('COMPETE') || item.startsWith('ASK') || item.startsWith('DRILLS') || item.startsWith('POINT')}
								<p class="text-xs font-semibold text-text-primary mt-2 uppercase tracking-wide">{item}</p>
							{:else}
								<div class="flex items-start gap-2">
									<span class="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-text-muted mt-1.5"></span>
									<p class="text-xs text-text-secondary leading-relaxed">{item}</p>
								</div>
							{/if}
						{/each}
					</div>
				{/if}

				<!-- Action buttons -->
				{#if currentItem && !currentItem.completed}
					<div class="flex flex-wrap gap-2 mt-4">
						<button
							onclick={() => toggleActivity(currentItem!.activity.id)}
							class="px-5 py-2 rounded-lg bg-ball-yellow text-surface font-bold text-sm hover:bg-ball-yellow-dim transition-all"
						>
							Mark Complete
						</button>
						{#if isVisualization(currentItem.activity)}
							<button
								onclick={() => startViz(currentItem!.activity.title.toLowerCase().includes('pre-match') ? 'pre-match' : 'daily')}
								class="px-4 py-2 rounded-lg bg-accent-purple/20 text-accent-purple font-semibold text-sm hover:bg-accent-purple/30 transition-all flex items-center gap-2"
							>
								<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>
								Start Guided Session
							</button>
						{:else if isWorkout(currentItem.activity)}
							<button
								onclick={() => startCoach(currentItem!.activity.id)}
								class="px-4 py-2 rounded-lg bg-accent-orange/20 text-accent-orange font-semibold text-sm hover:bg-accent-orange/30 transition-all flex items-center gap-2"
							>
								<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>
								{activeCoachId === currentItem.activity.id ? 'Stop Workout' : 'Start Guided Workout'}
							</button>
						{:else if hasAudioContent(currentItem.activity)}
							<button
								onclick={() => startAudio(currentItem!.activity.id)}
								class="px-4 py-2 rounded-lg bg-accent-blue/20 text-accent-blue font-semibold text-sm hover:bg-accent-blue/30 transition-all flex items-center gap-2"
							>
								<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>
								{activeAudioId === currentItem.activity.id ? 'Stop Audio' : 'Read Aloud'}
							</button>
						{/if}
						{#if currentItem.activity.type === 'tennis_match' || currentItem.activity.type === 'tennis_training' || currentItem.activity.type === 'competition'}
							<a
								href="{base}/journal"
								class="px-4 py-2 rounded-lg bg-surface-lighter text-text-secondary text-sm font-medium hover:bg-surface-light transition-all"
							>
								Open Journal
							</a>
						{/if}
					</div>
					<!-- Inline Workout Coach for banner -->
					{#if activeCoachId === currentItem.activity.id}
						<div class="mt-4">
							<WorkoutCoach
								exercises={toCoachExercises(currentItem.activity)}
								title={currentItem.activity.title}
								totalDuration={getTimerDuration(currentItem.activity)}
							/>
						</div>
					{/if}
					<!-- Inline Audio Guide for banner -->
					{#if activeAudioId === currentItem.activity.id}
						<div class="mt-4">
							<AudioGuide steps={getAudioSteps(currentItem.activity)} title={currentItem.activity.title} pauseBetweenSteps={2} />
						</div>
					{/if}
				{:else if currentItem?.completed}
					<div class="flex items-center gap-3 mt-4">
						<div class="flex items-center gap-2 text-success">
							<svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="20 6 9 17 4 12"/></svg>
							<span class="font-semibold text-sm">Done!</span>
						</div>
						{#if nextItem}
							<span class="text-sm text-text-muted">
								Next up at {nextItem.activity.time}: {nextItem.activity.title}
							</span>
						{/if}
					</div>
				{/if}
			</div>
		</div>
	</section>


	<!-- ============================== -->
	<!-- 6. OVERDUE / MISSED            -->
	<!-- ============================== -->
	{#if overdueItems.length > 0}
		<section class="glass-card p-4 border border-accent-red/30 bg-accent-red/5">
			<div class="flex items-center gap-2 mb-3">
				<svg class="w-4 h-4 text-accent-red" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
					<circle cx="12" cy="12" r="10"/>
					<line x1="12" y1="8" x2="12" y2="12"/>
					<line x1="12" y1="16" x2="12.01" y2="16"/>
				</svg>
				<span class="text-sm font-bold text-accent-red">Missed Today</span>
				<span class="text-xs text-text-muted ml-auto">{overdueItems.length} {overdueItems.length === 1 ? 'activity' : 'activities'}</span>
			</div>
			<div class="space-y-2">
				{#each overdueItems as item}
					{@const isExp = expandedItems.has(item.activity.id)}
					<div class="rounded-lg bg-surface-card/50 border border-accent-red/10 overflow-hidden">
						<div class="flex items-center gap-3 p-3 cursor-pointer" role="button" tabindex="0"
							onclick={() => toggleExpand(item.activity.id)}
							onkeydown={(e) => e.key === 'Enter' && toggleExpand(item.activity.id)}>
							<span class="text-xs text-text-muted w-12 flex-shrink-0">{item.activity.time}</span>
							<span class="text-sm text-text-secondary flex-1 truncate">{item.activity.title}</span>
							<span class="text-xs text-text-muted">{item.activity.duration}</span>
							<div class="flex items-center gap-1.5 flex-shrink-0">
								<button
									onclick={(e) => { e.stopPropagation(); toggleActivity(item.activity.id); }}
									class="px-3 py-1 rounded-md bg-success/15 text-success text-xs font-medium hover:bg-success/25 transition-all"
								>
									Done
								</button>
								<button
									onclick={(e) => { e.stopPropagation(); toggleActivity(item.activity.id); }}
									class="px-3 py-1 rounded-md bg-accent-red/10 text-accent-red text-xs font-medium hover:bg-accent-red/20 transition-all"
								>
									Skip
								</button>
								<svg class="w-4 h-4 text-text-muted transition-transform {isExp ? 'rotate-180' : ''}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
							</div>
						</div>
						{#if isExp}
							<div class="px-3 pb-3 border-t border-white/5 pt-2">
								<p class="text-xs text-text-muted mb-2">{item.activity.description}</p>
								<!-- Action buttons -->
								<div class="flex flex-wrap gap-2 mb-2">
									{#if isVisualization(item.activity)}
										<button onclick={() => startViz(item.activity.title.toLowerCase().includes('pre-match') ? 'pre-match' : 'daily')}
											class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-accent-purple/15 text-accent-purple text-xs font-semibold hover:bg-accent-purple/25 transition-all">
											<svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>
											Start Guided Session
										</button>
									{:else if isWorkout(item.activity)}
										<button onclick={() => startCoach(item.activity.id)}
											class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-accent-orange/15 text-accent-orange text-xs font-semibold hover:bg-accent-orange/25 transition-all">
											<svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>
											{activeCoachId === item.activity.id ? 'Stop Workout' : 'Start Guided Workout'}
										</button>
									{:else if hasAudioContent(item.activity)}
										<button onclick={() => startAudio(item.activity.id)}
											class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-accent-blue/15 text-accent-blue text-xs font-semibold hover:bg-accent-blue/25 transition-all">
											<svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>
											{activeAudioId === item.activity.id ? 'Stop' : 'Read Aloud'}
										</button>
									{/if}
								</div>
								{#if activeCoachId === item.activity.id}
									<WorkoutCoach exercises={toCoachExercises(item.activity)} title={item.activity.title} totalDuration={getTimerDuration(item.activity)} />
								{/if}
								{#if activeAudioId === item.activity.id}
									<AudioGuide steps={getAudioSteps(item.activity)} title={item.activity.title} pauseBetweenSteps={2} />
								{/if}
								<!-- Exercise steps -->
								<div class="space-y-1">
									{#each item.activity.items as exercise}
										{#if exercise !== ''}
											<div class="flex items-start gap-2">
												<span class="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-text-muted mt-1.5"></span>
												<p class="text-xs text-text-secondary leading-relaxed">{exercise}</p>
											</div>
										{/if}
									{/each}
								</div>
							</div>
						{/if}
					</div>
				{/each}
			</div>
		</section>
	{/if}


	<!-- ============================== -->
	<!-- 2. TODAY'S TIMELINE            -->
	<!-- ============================== -->
	<section>
		<div class="flex items-center justify-between mb-4">
			<h2 class="text-lg font-bold text-text-primary flex items-center gap-2">
				Today's Timeline
				<span class="badge bg-surface-lighter text-text-muted text-xs">{dayNames[dayOfWeek]}</span>
			</h2>
			<div class="text-xs text-text-muted">
				{formatTimeFromMinutes(currentMinutes)}
			</div>
		</div>

		<!-- Progress bar -->
		<div class="progress-bar mb-5">
			<div
				class="progress-bar-fill bg-ball-yellow"
				style="width: {completionPct}%"
			></div>
		</div>

		<!-- Timeline -->
		{#if timeline.length > 0}
			<div class="relative">
				<!-- Vertical line -->
				<div class="absolute left-[23px] top-0 bottom-0 w-px bg-surface-lighter"></div>

				<div class="space-y-1">
					{#each timeline as item (item.activity.id)}
						{@const color = typeColor(item.activity.type)}
						{@const isExpanded = expandedItems.has(item.activity.id)}
						{@const isCurrent = item === currentItem && !item.completed}

						<div class="relative pl-12 {item.completed ? 'opacity-50' : ''}">
							<!-- Timeline dot -->
							<div class="absolute left-[16px] top-3 z-10">
								{#if item.completed}
									<div class="w-[15px] h-[15px] rounded-full bg-success flex items-center justify-center">
										<svg class="w-2.5 h-2.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><polyline points="20 6 9 17 4 12"/></svg>
									</div>
								{:else if item.status === 'current'}
									<div class="relative">
										<div class="w-[15px] h-[15px] rounded-full bg-ball-yellow"></div>
										<div class="absolute inset-0 w-[15px] h-[15px] rounded-full bg-ball-yellow animate-ping opacity-40"></div>
									</div>
								{:else if item.status === 'overdue'}
									<div class="w-[15px] h-[15px] rounded-full bg-accent-red"></div>
								{:else}
									<div class="w-[15px] h-[15px] rounded-full border-2 border-surface-lighter bg-surface"></div>
								{/if}
							</div>

							<!-- Activity card — click anywhere to expand -->
							<div
								class="glass-card transition-all duration-200 cursor-pointer
									{isCurrent ? 'border-ball-yellow/30 glow-yellow' : ''}
									{item.status === 'overdue' ? 'border-accent-red/20' : ''}"
								onclick={() => toggleExpand(item.activity.id)}
								role="button"
								tabindex="0"
								onkeydown={(e) => e.key === 'Enter' && toggleExpand(item.activity.id)}
							>
								<div class="p-3 sm:p-4">
								<div class="flex items-start gap-3">
									<div class="flex-1 min-w-0">
										<!-- Top row: time + title -->
										<div class="flex items-center gap-2 flex-wrap">
											<span class="text-xs font-mono text-text-muted">{item.activity.time}</span>
											<span class="text-xs text-text-muted">&middot;</span>
											<span class="text-xs text-text-muted">{item.activity.duration}</span>
											{#if isCurrent}
												<span class="badge bg-ball-yellow/15 text-ball-yellow text-[10px]">NOW</span>
											{/if}
											{#if item.status === 'overdue'}
												<span class="badge bg-accent-red/15 text-accent-red text-[10px]">OVERDUE</span>
											{/if}
										</div>

										<h3 class="font-semibold text-sm text-text-primary mt-1 {item.completed ? 'line-through' : ''}">
											{item.activity.title}
										</h3>
										<p class="text-xs text-text-muted mt-0.5 {item.completed ? 'line-through' : ''}">
											{item.activity.description}
										</p>

										<!-- Quick action button visible even when collapsed -->
										{#if !isExpanded && !item.completed}
											<div class="mt-2" onclick={(e) => e.stopPropagation()}>
												{#if isVisualization(item.activity)}
													<button
														onclick={() => startViz(item.activity.title.toLowerCase().includes('pre-match') ? 'pre-match' : 'daily')}
														class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-accent-purple/15 text-accent-purple text-xs font-semibold hover:bg-accent-purple/25 transition-all"
													>
														<svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>
														Start Guided Session
													</button>
												{:else if isWorkout(item.activity)}
													<button
														onclick={() => { if (!isExpanded) toggleExpand(item.activity.id); startCoach(item.activity.id); }}
														class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-accent-orange/15 text-accent-orange text-xs font-semibold hover:bg-accent-orange/25 transition-all"
													>
														<svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>
														Start Guided Workout
													</button>
												{/if}
											</div>
										{/if}

										<!-- Expanded exercise list -->
										{#if isExpanded}
											<!-- Action toolbar -->
											<div class="mt-3 flex flex-wrap gap-2 border-t border-white/5 pt-3">
												{#if isVisualization(item.activity)}
													<button
														onclick={() => startViz(item.activity.title.toLowerCase().includes('pre-match') ? 'pre-match' : 'daily')}
														class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-accent-purple/15 text-accent-purple text-xs font-semibold hover:bg-accent-purple/25 transition-all"
													>
														<svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>
														Guided Session
													</button>
												{:else if isWorkout(item.activity)}
													<button
														onclick={() => startCoach(item.activity.id)}
														class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-accent-orange/15 text-accent-orange text-xs font-semibold hover:bg-accent-orange/25 transition-all"
													>
														<svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>
														{activeCoachId === item.activity.id ? 'Stop Coach' : 'Start Guided Workout'}
													</button>
												{:else if hasAudioContent(item.activity)}
													<button
														onclick={() => startAudio(item.activity.id)}
														class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-accent-blue/15 text-accent-blue text-xs font-semibold hover:bg-accent-blue/25 transition-all"
													>
														<svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>
														{activeAudioId === item.activity.id ? 'Stop Audio' : 'Read Aloud'}
													</button>
												{/if}
												<a
													href="{base}/exercises"
													class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-lighter text-text-secondary text-xs font-medium hover:bg-surface-light transition-all"
												>
													<svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/></svg>
													Exercise Library
												</a>
											</div>

											<!-- Inline Workout Coach -->
											{#if activeCoachId === item.activity.id}
												<div class="mt-3">
													<WorkoutCoach
														exercises={toCoachExercises(item.activity)}
														title={item.activity.title}
														totalDuration={getTimerDuration(item.activity)}
													/>
												</div>
											{/if}

											<!-- Inline Audio Guide -->
											{#if activeAudioId === item.activity.id}
												<div class="mt-3">
													<AudioGuide
														steps={getAudioSteps(item.activity)}
														title={item.activity.title}
														pauseBetweenSteps={2}
													/>
												</div>
											{/if}

											<!-- Inline Timer -->
											{#if activeTimerId === item.activity.id}
												<div class="mt-3">
													<Timer
														duration={getTimerDuration(item.activity)}
														label={item.activity.title}
													/>
												</div>
											{/if}

											<!-- Exercise steps list -->
											<div class="mt-3 space-y-1.5">
												{#each item.activity.items as exercise}
													{#if exercise === ''}
														<div class="h-2"></div>
													{:else if exercise.endsWith(':') || exercise.startsWith('IF ') || exercise.startsWith('GAME') || exercise.startsWith('SERVE') || exercise.startsWith('APPROACH') || exercise.startsWith('MENTAL') || exercise.startsWith('TRACK') || exercise.startsWith('READ') || exercise.startsWith('TACTICAL') || exercise.startsWith('FOCUS') || exercise.startsWith('WARM') || exercise.startsWith('LOWER') || exercise.startsWith('CORE') || exercise.startsWith('POWER') || exercise.startsWith('COOL') || exercise.startsWith('PHYSICAL') || exercise.startsWith('VISUALIZATION') || exercise.startsWith('DOUBLES') || exercise.startsWith('COMMUNICATION') || exercise.startsWith('MIXED') || exercise.startsWith('CIRCUIT') || exercise.startsWith('REVIEW') || exercise.startsWith('ADJUSTMENT') || exercise.startsWith('COMPETE') || exercise.startsWith('ASK') || exercise.startsWith('DRILLS') || exercise.startsWith('POINT') || exercise.startsWith('PREHAB')}
														<p class="text-xs font-semibold text-text-primary mt-1.5 uppercase tracking-wide">{exercise}</p>
													{:else}
														<div class="flex items-start gap-2">
															<span class="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-text-muted mt-1.5"></span>
															<p class="text-xs text-text-secondary leading-relaxed">{exercise}</p>
														</div>
													{/if}
												{/each}
											</div>
										{/if}
									</div>

									<!-- Action buttons (stop propagation so card click doesn't interfere) -->
									<div class="flex items-center gap-1.5 flex-shrink-0" onclick={(e) => e.stopPropagation()}>
										<svg class="w-4 h-4 text-text-muted transition-transform {isExpanded ? 'rotate-180' : ''}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
											<polyline points="6 9 12 15 18 9"/>
										</svg>
										<button
											onclick={() => toggleActivity(item.activity.id)}
											class="w-8 h-8 rounded-lg flex items-center justify-center transition-all
												{item.completed
													? 'bg-success/10 text-success'
													: 'text-text-muted hover:text-success hover:bg-success/10'}"
											title={item.completed ? 'Mark incomplete' : 'Mark complete'}
										>
											{#if item.completed}
												<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="20 6 9 17 4 12"/></svg>
											{:else}
												<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
													<circle cx="12" cy="12" r="10"/>
												</svg>
											{/if}
										</button>
									</div>
								</div>
								</div>
							</div>
						</div>
					{/each}
				</div>
			</div>
		{:else}
			<div class="glass-card p-8 text-center">
				<p class="text-text-muted">No activities scheduled for today. Enjoy your rest!</p>
			</div>
		{/if}
	</section>


	<!-- ============================== -->
	<!-- 3. THIS WEEK'S SCORECARD       -->
	<!-- ============================== -->
	<section>
		<h2 class="text-lg font-bold text-text-primary mb-4">This Week</h2>
		<div class="grid grid-cols-7 gap-2">
			{#each weekDates as wd, i}
				{@const pct = getDayCompletionPct(wd.date, wd.jsDay)}
				{@const isToday = wd.date === today}
				{@const dayKey = dayKeyActivity[wd.jsDay]}
				{@const isPast = wd.dateObj < new Date(today)}
				<div
					class="glass-card p-2 sm:p-3 text-center transition-all
						{isToday ? 'border-ball-yellow/40 glow-yellow' : ''}
						{isPast && pct === 0 ? 'opacity-40' : ''}"
				>
					<div class="text-[10px] font-semibold uppercase tracking-wider {isToday ? 'text-ball-yellow' : 'text-text-muted'}">
						{dayNamesShort[wd.jsDay]}
					</div>

					<!-- Completion ring -->
					<div class="relative w-10 h-10 sm:w-12 sm:h-12 mx-auto my-1.5">
						<svg class="w-full h-full -rotate-90" viewBox="0 0 36 36">
							<circle cx="18" cy="18" r="15.5" fill="none" stroke="#242b3d" stroke-width="3"/>
							<circle
								cx="18" cy="18" r="15.5" fill="none"
								stroke={isToday ? '#ccff00' : pct >= 80 ? '#4ade80' : pct >= 40 ? '#fbbf24' : '#64748b'}
								stroke-width="3"
								stroke-dasharray="{pct * 0.974} 97.4"
								stroke-linecap="round"
							/>
						</svg>
						<div class="absolute inset-0 flex items-center justify-center">
							<span class="text-[10px] font-bold {isToday ? 'text-ball-yellow' : 'text-text-secondary'}">
								{pct}%
							</span>
						</div>
					</div>

					<div class="text-[9px] text-text-muted truncate">{dayKey?.label ?? ''}</div>
				</div>
			{/each}
		</div>
	</section>


	<!-- ============================== -->
	<!-- 4. WHAT'S COMING UP            -->
	<!-- ============================== -->
	<section>
		<h2 class="text-lg font-bold text-text-primary mb-4">Coming Up</h2>
		<div class="space-y-2">
			{#each upcomingDays as day}
				{@const acts = getActivitiesForDay(day.jsDay)}
				{@const keyAct = dayKeyActivity[day.jsDay]}
				<div class="glass-card p-3 sm:p-4 flex items-center gap-4">
					<div class="flex-shrink-0 w-10 h-10 rounded-lg bg-surface-lighter flex items-center justify-center">
						{#if keyAct?.icon === 'racket'}
							<svg class="w-5 h-5 text-court-green" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
								<circle cx="12" cy="10" r="7"/>
								<line x1="12" y1="17" x2="12" y2="22"/>
								<line x1="8" y1="6" x2="16" y2="6"/>
								<line x1="8" y1="10" x2="16" y2="10"/>
								<line x1="8" y1="14" x2="16" y2="14"/>
								<line x1="10" y1="3" x2="10" y2="17"/>
								<line x1="14" y1="3" x2="14" y2="17"/>
							</svg>
						{:else if keyAct?.icon === 'dumbbell'}
							<svg class="w-5 h-5 text-clay" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
								<path d="M6.5 6.5h11M6 3h1v18H6a1 1 0 01-1-1V4a1 1 0 011-1zM17 3h1a1 1 0 011 1v16a1 1 0 01-1 1h-1V3zM3 7h2v10H3a1 1 0 01-1-1V8a1 1 0 011-1zM19 7h2a1 1 0 011 1v8a1 1 0 01-1 1h-2V7z"/>
							</svg>
						{:else if keyAct?.icon === 'trophy'}
							<svg class="w-5 h-5 text-accent-red" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
								<path d="M6 9H4.5a2.5 2.5 0 010-5H6"/>
								<path d="M18 9h1.5a2.5 2.5 0 000-5H18"/>
								<path d="M4 22h16"/>
								<path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20 7 22"/>
								<path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20 17 22"/>
								<path d="M18 2H6v7a6 6 0 0012 0V2z"/>
							</svg>
						{:else if keyAct?.icon === 'home'}
							<svg class="w-5 h-5 text-accent-purple" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
								<path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/>
								<polyline points="9 22 9 12 15 12 15 22"/>
							</svg>
						{:else if keyAct?.icon === 'wall'}
							<svg class="w-5 h-5 text-ball-yellow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
								<rect x="3" y="3" width="18" height="18" rx="2"/>
								<line x1="3" y1="9" x2="21" y2="9"/>
								<line x1="3" y1="15" x2="21" y2="15"/>
								<line x1="12" y1="3" x2="12" y2="9"/>
								<line x1="12" y1="15" x2="12" y2="21"/>
							</svg>
						{:else}
							<svg class="w-5 h-5 text-text-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
								<circle cx="12" cy="12" r="10"/>
							</svg>
						{/if}
					</div>
					<div class="flex-1 min-w-0">
						<div class="flex items-center gap-2">
							<span class="text-sm font-semibold text-text-primary">{day.dayName}</span>
							<span class="text-xs text-text-muted">&middot; {acts.length} activities</span>
						</div>
						<p class="text-xs text-text-secondary mt-0.5 truncate">{day.summary}</p>
					</div>
				</div>
			{/each}
		</div>
	</section>


	<!-- ============================== -->
	<!-- 5. THIS WEEK'S FOCUS           -->
	<!-- ============================== -->
	<section class="glass-card p-5 border-l-4 border-court-green">
		<div class="flex items-center gap-2 mb-3">
			<svg class="w-5 h-5 text-court-green" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
				<circle cx="12" cy="12" r="10"/>
				<circle cx="12" cy="12" r="6"/>
				<circle cx="12" cy="12" r="2"/>
			</svg>
			<h2 class="text-lg font-bold text-text-primary">Week {currentWeek}: {weekFocus.theme}</h2>
		</div>

		<!-- Focus points -->
		<div class="space-y-2.5 mb-4">
			{#each weekFocus.focus as focusItem, i}
				<div class="flex items-start gap-2.5">
					<span class="flex-shrink-0 w-5 h-5 rounded-full bg-court-green/10 flex items-center justify-center mt-0.5">
						<span class="text-xs font-bold text-court-green">{i + 1}</span>
					</span>
					<p class="text-sm text-text-secondary">{focusItem}</p>
				</div>
			{/each}
		</div>

		<!-- New this week callout -->
		{#if weekFocus.newThisWeek}
			<div class="bg-ball-yellow/5 border border-ball-yellow/20 rounded-lg p-3 mb-3">
				<div class="flex items-center gap-2">
					<svg class="w-4 h-4 text-ball-yellow flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
						<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
					</svg>
					<p class="text-xs text-text-secondary">
						<span class="font-semibold text-ball-yellow">New this week:</span>
						{weekFocus.newThisWeek}
					</p>
				</div>
			</div>
		{/if}

		<!-- Mental focus -->
		<div class="bg-accent-purple/5 border border-accent-purple/20 rounded-lg p-3">
			<div class="flex items-center gap-2">
				<svg class="w-4 h-4 text-accent-purple flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
					<path d="M12 2a5 5 0 015 5c0 1.1-.4 2.1-1 2.9a5 5 0 011 3.1 5 5 0 01-3 4.6V20a2 2 0 01-2 2h0a2 2 0 01-2-2v-2.4A5 5 0 017 13a5 5 0 011-3.1A5 5 0 017 7a5 5 0 015-5z"/>
					<path d="M12 2v20"/>
				</svg>
				<p class="text-xs text-text-secondary">
					<span class="font-semibold text-accent-purple">Mental focus:</span>
					{weekFocus.mentalFocus}
				</p>
			</div>
		</div>

		<!-- Week selector -->
		<div class="flex items-center gap-3 mt-4 pt-3 border-t border-white/5">
			<button
				onclick={() => settingsStore.setWeek(Math.max(1, currentWeek - 1))}
				aria-label="Previous week"
				class="w-8 h-8 rounded-lg bg-surface-lighter flex items-center justify-center text-text-muted hover:text-text-primary hover:bg-surface-light transition-all"
				disabled={currentWeek <= 1}
			>
				<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="15 18 9 12 15 6"/></svg>
			</button>
			<span class="text-xs text-text-muted">Week {currentWeek} of 12</span>
			<button
				onclick={() => settingsStore.setWeek(Math.min(12, currentWeek + 1))}
				aria-label="Next week"
				class="w-8 h-8 rounded-lg bg-surface-lighter flex items-center justify-center text-text-muted hover:text-text-primary hover:bg-surface-light transition-all"
				disabled={currentWeek >= 12}
			>
				<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="9 18 15 12 9 6"/></svg>
			</button>
			<span class="text-xs text-text-muted ml-auto">Gym: Rotation {gymRotation}</span>
		</div>
	</section>


	<!-- ============================== -->
	<!-- 7. SKILL ASSESSMENT REMINDER   -->
	<!-- ============================== -->
	<section class="glass-card p-4 {assessmentDue ? 'border-warning/30 bg-warning/5' : ''}">
		<div class="flex items-center justify-between">
			<div class="flex items-center gap-3">
				<div class="w-9 h-9 rounded-lg {assessmentDue ? 'bg-warning/15' : 'bg-accent-blue/15'} flex items-center justify-center">
					<svg class="w-5 h-5 {assessmentDue ? 'text-warning' : 'text-accent-blue'}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
					</svg>
				</div>
				<div>
					<h3 class="text-sm font-semibold text-text-primary">Skill Assessment</h3>
					{#if lastAssessment}
						<p class="text-xs text-text-muted">
							Last: {daysSinceAssessment} days ago &middot; Avg: {assessmentAvgScore}/10
							{#if assessmentDue}
								<span class="text-warning font-semibold ml-1">— Due for update!</span>
							{/if}
						</p>
					{:else}
						<p class="text-xs text-warning">No assessment yet — take your first one to track progress!</p>
					{/if}
				</div>
			</div>
			<a href="{base}/program" class="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all
				{assessmentDue ? 'bg-warning/15 text-warning hover:bg-warning/25' : 'bg-surface-lighter text-text-secondary hover:bg-surface-light'}">
				{lastAssessment ? (assessmentDue ? 'Update Now' : 'View') : 'Take Assessment'}
			</a>
		</div>
		{#if lastAssessment}
			<!-- Mini skill bars -->
			<div class="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-1.5 mt-3">
				{#each Object.entries(lastAssessment.skills) as [skill, value]}
					<div class="flex items-center gap-2">
						<span class="text-[10px] text-text-muted truncate w-20">{skill.replace(/([A-Z])/g, ' $1').trim()}</span>
						<div class="flex-1 h-1.5 rounded-full bg-surface-lighter">
							<div class="h-full rounded-full transition-all {value >= 7 ? 'bg-success' : value >= 5 ? 'bg-ball-yellow' : 'bg-accent-orange'}"
								style="width: {value * 10}%"></div>
						</div>
						<span class="text-[10px] text-text-muted w-4 text-right">{value}</span>
					</div>
				{/each}
			</div>
		{/if}
	</section>

</div>

<!-- Guided Visualization Overlay -->
{#if activeVizType}
	<GuidedVisualization type={activeVizType} duration={10} autoOpen={true} onclose={() => activeVizType = null} />
{/if}
