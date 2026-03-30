<script lang="ts">
	import YouTubeSearch from "$lib/components/YouTubeSearch.svelte";
	import { base } from '$app/paths';

	type Category = 'technique' | 'tactics' | 'strategy' | 'analysis';

	interface Article {
		id: number;
		title: string;
		subtitle: string;
		readTime: string;
		category: Category;
	}

	let activeCategory: Category = $state('technique');
	let expandedArticle: number | null = $state(null);
	let isSpeaking = $state(false);

	const categories: { id: Category; label: string; color: string; icon: string; count: number }[] = [
		{ id: 'technique', label: 'Technique', color: 'accent-blue', icon: '&#9881;', count: 5 },
		{ id: 'tactics', label: 'Tactics', color: 'court-green', icon: '&#9812;', count: 5 },
		{ id: 'strategy', label: 'Strategy', color: 'accent-purple', icon: '&#9733;', count: 3 },
		{ id: 'analysis', label: 'Analysis', color: 'accent-orange', icon: '&#128202;', count: 3 }
	];

	const articles: Article[] = [
		{ id: 1, title: 'Modern Forehand Transformation', subtitle: '5-step process from classic to modern forehand', readTime: '12 min', category: 'technique' },
		{ id: 2, title: 'One-Handed Backhand Mastery', subtitle: 'The coil-drop-extend sequence for a world-class backhand', readTime: '10 min', category: 'technique' },
		{ id: 3, title: 'Serve Placement & Spin', subtitle: 'Kick, slice, and placement patterns for effective serving', readTime: '8 min', category: 'technique' },
		{ id: 4, title: 'Volley Technique', subtitle: 'Continental grip, split step timing, and 10 progressive drills', readTime: '9 min', category: 'technique' },
		{ id: 5, title: 'Approach Shot Fundamentals', subtitle: '5 triggers, direction rules, and footwork sequences', readTime: '7 min', category: 'technique' },
		{ id: 6, title: 'Control-Hurt-Finish Framework', subtitle: 'The 3-phase point construction method', readTime: '8 min', category: 'tactics' },
		{ id: 7, title: 'Clay Court Attacking Patterns', subtitle: '5 devastating patterns for clay court dominance', readTime: '9 min', category: 'tactics' },
		{ id: 8, title: 'Serve+1 Patterns', subtitle: 'The most important pattern in tennis — plan before you serve', readTime: '10 min', category: 'tactics' },
		{ id: 9, title: 'Doubles & Mixed Strategy', subtitle: 'Formations, signals, and winning doubles tactics', readTime: '11 min', category: 'tactics' },
		{ id: 10, title: "Reading Your Opponent", subtitle: "O'Shannessy methodology for tactical observation", readTime: '9 min', category: 'tactics' },
		{ id: 11, title: 'KNLTB 7 to 5 Skill Gap', subtitle: 'Full 11-dimension comparison and development roadmap', readTime: '12 min', category: 'strategy' },
		{ id: 12, title: 'When to Approach the Net', subtitle: '5 triggers and decision framework for net play', readTime: '7 min', category: 'strategy' },
		{ id: 13, title: 'Handling Pressure Points', subtitle: 'Tiebreaks, break points, and match point management', readTime: '8 min', category: 'strategy' },
		{ id: 14, title: 'Using SwingVision', subtitle: 'Key metrics, post-session analysis, and weekly review', readTime: '8 min', category: 'analysis' },
		{ id: 15, title: 'Match Stats That Matter', subtitle: 'Tiered priority system for meaningful tennis statistics', readTime: '9 min', category: 'analysis' },
		{ id: 16, title: 'Keeping a Tennis Journal', subtitle: 'Complete journaling framework for improvement', readTime: '7 min', category: 'analysis' }
	];

	const keyPoints: Record<number, string[]> = {
		1: [
			'Switch to a Semi-Western grip with your base knuckle on bevel 4 for the best topspin and power balance.',
			'Use a unit turn where shoulders, hips, and arms rotate together as one coiled spring.',
			'Drop the racquet below the ball and brush upward through contact for a low-to-high swing path.',
			'Let the windshield wiper finish happen naturally as the forearm pronates after contact.',
			'Use open stance to generate rotational power from your legs and core.'
		],
		2: [
			'Use the Eastern backhand grip for topspin, with your base knuckle on bevel 1.',
			'The body stops rotating at contact to keep the racquet on target — the hitting shoulder stays back.',
			'Contact point is slightly in front of the front hip — not too far back or forward.',
			'Follow through fully so the butt cap faces the opponent at the end of the swing.',
			'Power comes from legs and core, not the arm — prepare early with a full shoulder turn.'
		],
		3: [
			'Kick serve brushes up at 7-to-1 o-clock, creating high bounce to the backhand side.',
			'Slice serve brushes across at 3 o-clock, curving the ball away from the receiver.',
			'Wide serve works 70% of the time on clay due to extra slide distance.',
			'Commit to your serve plus one plan before you toss — indecision leads to tentative play.'
		],
		4: [
			'Use continental grip for both forehand and backhand volleys — one grip for everything at net.',
			'Split step timing is critical — hop just as your opponent contacts the ball.',
			'Keep soft hands to absorb pace and redirect with touch.',
			'Racket head must stay above the wrist on every volley, with a short punch motion.',
			'Progress through 10 drills from feel and touch to reflex volleys and serve-and-volley sequences.'
		],
		5: [
			'The 5 triggers to approach are: short ball, opponent wide, opponent off-balance, after a deep heavy shot, and drop shot follow-up.',
			'Hit your approach shot down the line 90% of the time to reduce passing angles.',
			'Use heavy topspin on clay — the ball kicks up high and gives you time to close.',
			'Follow the sequence: hit, 3-4 steps forward, split step as opponent contacts, then react.',
			'Do not approach when you are off-balance or your opponent has hit a clean deep shot.'
		],
		6: [
			'The Control phase builds pressure with safe targets, cross-court rallying, and heavy topspin deep.',
			'The Hurt phase starts when a mid-court ball appears — increase aggression with inside-out forehands and harder angles.',
			'The Finish phase triggers on short balls — go for aggressive forehands, approach plus volley, or clean winners.',
			'Never skip phases. Each phase builds on the previous one. Trying to finish too early causes unforced errors.'
		],
		7: [
			'Wide serve plus open court forehand is devastating on clay due to the extra slide distance.',
			'Build with heavy topspin cross-court, then drive down the line when you get a shorter ball.',
			'Send high loopy topspin to the backhand — on clay it bounces shoulder-height and is very difficult to attack.',
			'Once the opponent starts anticipating direction, hit behind them to wrong-foot them — on clay they cannot change direction mid-slide.',
			'Heavy topspin is your primary weapon on clay because the bounce amplifies spin.'
		],
		8: [
			'Commit to your serve plus one plan before you toss the ball — decide where to serve and where to hit the plus one.',
			'Slice wide in the deuce court opens up the court for a forehand to the open side.',
			'Flat serve to the T jams the opponent and produces a weak return to attack.',
			'Kick serve to the backhand forces a defensive return, setting up your inside-out forehand.',
			'On return, deep cross-court is the safest and highest-margin option.'
		],
		9: [
			'Standard formation with one up and one back is the most flexible — the back player builds, the net player finishes.',
			'I-Formation with the net player crouching at center creates confusion and uses hand signals.',
			'Attack the middle in doubles to create confusion and reduce passing angles.',
			'Hit at the opponent feet to force them to hit up, giving your team easy volleys.',
			'Communication is everything in mixed doubles — call mine, yours, or switch clearly and early.'
		],
		10: [
			'During warm-up, observe which side is stronger, movement speed, serve patterns, and net comfort.',
			'Watch physical cues: open stance usually means cross-court, closed stance usually means down the line.',
			'Track emotional responses and recovery speed — frustrated opponents make more errors under pressure.',
			'Test different shots in the first few games and note what causes them trouble.',
			'Modify your serve placement and spin based on their return tendencies as the match progresses.'
		],
		11: [
			'KNLTB 7 equals NTRP 3.0 to 3.5 — intermediate level with moderate consistency.',
			'KNLTB 5 equals NTRP 4.0 to 4.5 — advanced level with consistent power and intentional patterns.',
			'Key gaps to close: rally consistency from 6-10 balls to 15-25 plus, and adding heavy topspin on both wings.',
			'Serve must evolve from flat with limited placement to spin variety with reliable kick and slice.',
			'Mental game must shift from emotional and reactive to composed and process-focused.'
		],
		12: [
			'The 5 triggers: short ball, opponent 8 meters or more wide, opponent off-balance, after a deep heavy shot, and drop shot follow-up.',
			'Hit your approach down the line 90% of the time to minimize the passing angle.',
			'Use heavy topspin on clay approaches — the ball kicks up and buys you transition time.',
			'Split-step as your opponent contacts the ball after your approach — react, do not guess.',
			'Do not approach when the opponent hits a clean deep groundstroke or you are off-balance.'
		],
		13: [
			'In tiebreaks, focus beats talent — execute your process and play percentage tennis.',
			'On break points when serving, go to your best serve and commit fully — hesitation is the enemy.',
			'On match points, recall past successes and redouble your between-point routine.',
			'Accept nerves as engagement — they mean you care. Reframe anxiety as readiness.',
			'The 16-Second Cure becomes more important under pressure, not less — the routine is your anchor.'
		],
		14: [
			'Track shot speed, depth, placement maps, rally length, spin rate, and serve stats with SwingVision.',
			'Post-session, watch highlights under 10 minutes and filter by stroke type for focused review.',
			'Check heat maps to see where your shots are landing — are you consistently hitting deep enough.',
			'Weekly, track speed trends, first serve percentage, and longest rally patterns.',
			'Priority focus: shot depth consistency first, then first serve percentage, then unforced error patterns.'
		],
		15: [
			'The player with fewer unforced errors wins approximately 73% of matches — this is the most predictive stat.',
			'Target 60-70% first serve percentage — below 50% means constant second-serve vulnerability.',
			'Track your winners-to-unforced-errors ratio and target 1 to 1 or better.',
			'Rally length versus outcome tells you if you win or lose extended points.',
			'After every match, record first serve percentage, double faults, errors by shot type, and mental state rating.'
		],
		16: [
			'Before each match, write down your game plan, primary tactics, and mental state rating from 1 to 10.',
			'Record what worked, what did not, and what adjustments you made during the match.',
			'Review your mental game: focus lapses, pressure handling, routine compliance, and energy management.',
			'Create 2-3 specific, actionable practice items based on each match review.',
			'Track opponent patterns and tendencies for future matchups.'
		]
	};

	let filteredArticles = $derived(articles.filter(a => a.category === activeCategory));

	function toggleArticle(id: number) {
		expandedArticle = expandedArticle === id ? null : id;
	}

	function getCategoryColor(cat: Category): string {
		const map: Record<Category, string> = {
			technique: 'accent-blue',
			tactics: 'court-green',
			strategy: 'accent-purple',
			analysis: 'accent-orange'
		};
		return map[cat];
	}

	function getCategoryBorder(cat: Category): string {
		const map: Record<Category, string> = {
			technique: 'border-accent-blue/30',
			tactics: 'border-court-green/30',
			strategy: 'border-accent-purple/30',
			analysis: 'border-accent-orange/30'
		};
		return map[cat];
	}

	function speakArticle(points: string[]): void {
		if (!window.speechSynthesis) return;
		if (isSpeaking) {
			window.speechSynthesis.cancel();
			isSpeaking = false;
			return;
		}
		window.speechSynthesis.cancel();
		const text = points.join('. ');
		const utterance = new SpeechSynthesisUtterance(text);
		utterance.rate = 0.9;
		utterance.lang = 'en-US';
		const voices = window.speechSynthesis.getVoices();
		const voice = voices.find(v => v.lang.startsWith('en') && v.name.includes('Google'))
			?? voices.find(v => v.lang.startsWith('en'));
		if (voice) utterance.voice = voice;
		isSpeaking = true;
		utterance.onend = () => { isSpeaking = false; };
		utterance.onerror = () => { isSpeaking = false; };
		window.speechSynthesis.speak(utterance);
	}
</script>

<!-- Page Header -->
<div class="mb-8 animate-slide-up">
	<div class="flex items-center gap-3 mb-2">
		<div class="w-10 h-10 rounded-xl bg-ball-yellow/10 flex items-center justify-center">
			<svg class="w-6 h-6 text-ball-yellow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
				<path d="M4 19.5A2.5 2.5 0 016.5 17H20"/>
				<path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/>
			</svg>
		</div>
		<div>
			<h1 class="text-2xl lg:text-3xl font-bold text-text-primary">Knowledge Base</h1>
			<p class="text-text-secondary text-sm">Your comprehensive tennis library — {articles.length} articles</p>
		</div>
	</div>
</div>

<!-- Category Tabs -->
<div class="flex gap-2 mb-6 overflow-x-auto pb-2">
	{#each categories as cat}
		<button
			onclick={() => { activeCategory = cat.id; expandedArticle = null; }}
			class="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-all duration-200
				{activeCategory === cat.id
					? `bg-${cat.color}/15 text-${cat.color} border border-${cat.color}/30 shadow-lg`
					: 'bg-surface-light text-text-secondary border border-white/5 hover:bg-surface-lighter hover:text-text-primary'}"
		>
			<span>{@html cat.icon}</span>
			{cat.label}
			<span class="badge bg-white/10 text-xs">{cat.count}</span>
		</button>
	{/each}
</div>

<!-- Articles Grid -->
<div class="space-y-4">
	{#each filteredArticles as article (article.id)}
		<div class="glass-card overflow-hidden transition-all duration-300 {getCategoryBorder(article.category)} animate-slide-up">
			<!-- Article Header (clickable) -->
			<button
				onclick={() => toggleArticle(article.id)}
				class="w-full text-left p-5 flex items-start gap-4 hover:bg-white/[0.02] transition-colors"
			>
				<div class="w-10 h-10 rounded-lg bg-{getCategoryColor(article.category)}/15 flex items-center justify-center shrink-0 mt-0.5">
					<span class="text-{getCategoryColor(article.category)} font-bold text-sm">{String(article.id).padStart(2, '0')}</span>
				</div>
				<div class="flex-1 min-w-0">
					<h3 class="text-lg font-bold text-text-primary mb-1">{article.title}</h3>
					<p class="text-text-secondary text-sm">{article.subtitle}</p>
				</div>
				<div class="flex items-center gap-3 shrink-0">
					<span class="text-text-muted text-xs">{article.readTime}</span>
					<svg
						class="w-5 h-5 text-text-muted transition-transform duration-200 {expandedArticle === article.id ? 'rotate-180' : ''}"
						viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
					>
						<polyline points="6 9 12 15 18 9"/>
					</svg>
				</div>
			</button>

			<!-- Expanded Content -->
			{#if expandedArticle === article.id}
				<div class="px-5 pb-6 pt-0 border-t border-white/5 animate-slide-up">
					<div class="pl-14 article-content">
						{#if article.id === 1}
							<!-- Modern Forehand Transformation -->
							<button
								onclick={() => speakArticle(keyPoints[article.id])}
								class="mb-4 mt-2 flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 {isSpeaking ? 'bg-accent-red/20 text-accent-red' : 'bg-surface-light text-text-secondary hover:bg-surface-lighter hover:text-text-primary'}"
							>
								<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
									<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
									<path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
									<path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
								</svg>
								{isSpeaking ? 'Stop Reading' : 'Read Key Points Aloud'}
							</button>
							<h3 class="text-accent-blue font-bold text-base mb-3 mt-4">5-Step Process: Classic to Modern Forehand</h3>

							<div class="space-y-4">
								<div class="glass-card p-4 border-l-2 border-accent-blue/50">
									<h4 class="font-bold text-text-primary mb-2">Step 1: Grip Change</h4>
									<p class="text-text-secondary text-sm leading-relaxed">
										<strong class="text-text-primary">Eastern to Semi-Western.</strong> The Semi-Western grip provides the best balance of power and topspin. Place your base knuckle on bevel 4 (bottom-right pad for right-handers). This grip naturally promotes a low-to-high swing path and allows you to generate heavy topspin while maintaining flat-hitting capability.
									</p>
								</div>

								<div class="glass-card p-4 border-l-2 border-accent-blue/50">
									<h4 class="font-bold text-text-primary mb-2">Step 2: Unit Turn</h4>
									<p class="text-text-secondary text-sm leading-relaxed">
										Shoulders, hips, and arms rotate together as one unit. <strong class="text-text-primary">NOT the arm pulling back separately.</strong> Think of your torso as a coiled spring. The racquet goes back because your body turns, not because your arm moves independently. This creates a connected, powerful kinetic chain.
									</p>
								</div>

								<div class="glass-card p-4 border-l-2 border-accent-blue/50">
									<h4 class="font-bold text-text-primary mb-2">Step 3: Low-to-High Swing Path</h4>
									<p class="text-text-secondary text-sm leading-relaxed">The racquet drops below the ball and brushes upward through contact. Practice drills:</p>
									<ul class="text-text-secondary text-sm mt-2 space-y-1 list-disc list-inside">
										<li><strong class="text-text-primary">Reverse forehand drill</strong> — swing from low to high in slow motion</li>
										<li><strong class="text-text-primary">Service box drill</strong> — heavy topspin, short court rallies</li>
										<li><strong class="text-text-primary">3/4 court drill</strong> — gradually extend distance while maintaining path</li>
									</ul>
								</div>

								<div class="glass-card p-4 border-l-2 border-accent-blue/50">
									<h4 class="font-bold text-text-primary mb-2">Step 4: Windshield Wiper Finish</h4>
									<p class="text-text-secondary text-sm leading-relaxed">
										The follow-through becomes more vertical. The racquet rolls over the ball after contact, like a windshield wiper motion. This is what generates heavy topspin. <strong class="text-text-primary">The racquet face closes naturally as the forearm pronates.</strong> Don't force it — let the swing path and grip do the work.
									</p>
								</div>

								<div class="glass-card p-4 border-l-2 border-accent-blue/50">
									<h4 class="font-bold text-text-primary mb-2">Step 5: Open Stance Power</h4>
									<p class="text-text-secondary text-sm leading-relaxed">
										<strong class="text-text-primary">Coil and uncoil with legs and core.</strong> Open stance allows faster recovery and greater rotational power. Load weight on the outside (back) foot, push off through the legs, and rotate the core to generate power. The legs and core do the work — the arm is just the delivery system.
									</p>
								</div>
							</div>

							<h3 class="text-accent-blue font-bold text-base mb-3 mt-6">Transformation Timeline</h3>
							<div class="glass-card p-4">
								<div class="space-y-3">
									<div class="flex items-center gap-3">
										<span class="badge bg-accent-blue/20 text-accent-blue">Wk 1-2</span>
										<span class="text-text-secondary text-sm">Grip change + unit turn</span>
									</div>
									<div class="flex items-center gap-3">
										<span class="badge bg-accent-blue/20 text-accent-blue">Wk 3-4</span>
										<span class="text-text-secondary text-sm">Low-to-high swing path drills</span>
									</div>
									<div class="flex items-center gap-3">
										<span class="badge bg-accent-blue/20 text-accent-blue">Wk 5-8</span>
										<span class="text-text-secondary text-sm">Windshield wiper finish + open stance</span>
									</div>
									<div class="flex items-center gap-3">
										<span class="badge bg-accent-blue/20 text-accent-blue">Wk 9-12</span>
										<span class="text-text-secondary text-sm">Consistency building under various conditions</span>
									</div>
									<div class="flex items-center gap-3">
										<span class="badge bg-accent-blue/20 text-accent-blue">Wk 13+</span>
										<span class="text-text-secondary text-sm">Match integration and pressure testing</span>
									</div>
								</div>
								<p class="text-text-muted text-xs mt-4 italic">Expect 3-6 months for full transformation. Be patient — regression during matches is normal in early stages.</p>
							</div>

							<div class="mt-4 space-y-3">
								<h4 class="text-sm font-semibold text-text-primary flex items-center gap-2">
									<svg class="w-4 h-4 text-accent-red" viewBox="0 0 24 24" fill="currentColor"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
									Watch & Learn
								</h4>
								<YouTubeSearch query="Feel Tennis modern forehand technique 8 steps" title="Modern Forehand Technique" channel="Feel Tennis" />
								<YouTubeSearch query="Top Tennis Training forehand technique lesson" title="Forehand Technique Lesson" channel="Top Tennis Training" />
							</div>

						{:else if article.id === 2}
							<!-- One-Handed Backhand Mastery -->
							<button
								onclick={() => speakArticle(keyPoints[article.id])}
								class="mb-4 mt-2 flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 {isSpeaking ? 'bg-accent-red/20 text-accent-red' : 'bg-surface-light text-text-secondary hover:bg-surface-lighter hover:text-text-primary'}"
							>
								<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
									<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
									<path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
									<path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
								</svg>
								{isSpeaking ? 'Stop Reading' : 'Read Key Points Aloud'}
							</button>
							<h3 class="text-accent-blue font-bold text-base mb-3 mt-4">The Coil-Drop-Extend Sequence</h3>

							<div class="glass-card p-4 mb-4">
								<h4 class="font-bold text-text-primary mb-2">Grip Selection</h4>
								<div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
									<div class="bg-surface-light rounded-lg p-3">
										<p class="text-accent-blue font-semibold text-sm mb-1">Eastern BH Grip</p>
										<p class="text-text-secondary text-xs">Best for topspin. Base knuckle on bevel 1. Allows heavy rotation and lift.</p>
									</div>
									<div class="bg-surface-light rounded-lg p-3">
										<p class="text-accent-blue font-semibold text-sm mb-1">Continental Grip</p>
										<p class="text-text-secondary text-xs">For slice backhand. Natural underspin. Effective for defensive and approach shots.</p>
									</div>
								</div>
							</div>

							<div class="space-y-3 mb-4">
								<div class="glass-card p-4 border-l-2 border-accent-blue/50">
									<h4 class="font-bold text-text-primary mb-1">Body Rotation</h4>
									<p class="text-text-secondary text-sm">The body <strong class="text-text-primary">stops rotating at contact</strong> to keep the racquet on the target line. Unlike the forehand, the hitting shoulder stays back through the shot. This creates stability and control through the hitting zone.</p>
								</div>
								<div class="glass-card p-4 border-l-2 border-accent-blue/50">
									<h4 class="font-bold text-text-primary mb-1">Contact Point</h4>
									<p class="text-text-secondary text-sm"><strong class="text-text-primary">Slightly in front of the front hip.</strong> Too far back = no power. Too far forward = loss of control. The ideal zone is a few inches ahead of the lead hip.</p>
								</div>
								<div class="glass-card p-4 border-l-2 border-accent-blue/50">
									<h4 class="font-bold text-text-primary mb-1">Follow-Through</h4>
									<p class="text-text-secondary text-sm">Racquet bottom (butt cap) <strong class="text-text-primary">faces the opponent</strong> at the end of the swing. Full extension with the arm reaching toward the target.</p>
								</div>
							</div>

							<h3 class="text-accent-blue font-bold text-base mb-3 mt-5">8-Drill Progression (4 Stages)</h3>
							<div class="glass-card p-4">
								<div class="space-y-4">
									<div>
										<p class="text-accent-blue font-semibold text-sm mb-2">Stage 1 — Foundation (Weeks 1-3)</p>
										<ul class="text-text-secondary text-sm space-y-1 list-disc list-inside">
											<li>Drill 1: Shadow swing with focus on coil position</li>
											<li>Drill 2: Drop-feed contact point drill</li>
										</ul>
									</div>
									<div>
										<p class="text-accent-blue font-semibold text-sm mb-2">Stage 2 — Direction (Weeks 4-6)</p>
										<ul class="text-text-secondary text-sm space-y-1 list-disc list-inside">
											<li>Drill 3: Cross-court consistency rally</li>
											<li>Drill 4: Down-the-line target drill</li>
										</ul>
									</div>
									<div>
										<p class="text-accent-blue font-semibold text-sm mb-2">Stage 3 — Topspin (Weeks 7-10)</p>
										<ul class="text-text-secondary text-sm space-y-1 list-disc list-inside">
											<li>Drill 5: Low-to-high brush drill with foam balls</li>
											<li>Drill 6: Heavy topspin cross-court rally</li>
										</ul>
									</div>
									<div>
										<p class="text-accent-blue font-semibold text-sm mb-2">Stage 4 — Power (Weeks 11+)</p>
										<ul class="text-text-secondary text-sm space-y-1 list-disc list-inside">
											<li>Drill 7: Drive backhand off short balls</li>
											<li>Drill 8: Full-court rally with direction changes</li>
										</ul>
									</div>
								</div>
							</div>

							<h3 class="text-accent-blue font-bold text-base mb-3 mt-5">Common Mistakes</h3>
							<div class="glass-card p-4">
								<ul class="text-text-secondary text-sm space-y-2">
									<li class="flex items-start gap-2"><span class="text-accent-red mt-0.5">&#10007;</span> <span><strong class="text-text-primary">Late preparation</strong> — racquet must be back before the ball bounces on your side</span></li>
									<li class="flex items-start gap-2"><span class="text-accent-red mt-0.5">&#10007;</span> <span><strong class="text-text-primary">No shoulder turn</strong> — failing to rotate the shoulders fully limits power</span></li>
									<li class="flex items-start gap-2"><span class="text-accent-red mt-0.5">&#10007;</span> <span><strong class="text-text-primary">Hitting behind the body</strong> — late contact robs you of control and direction</span></li>
									<li class="flex items-start gap-2"><span class="text-accent-red mt-0.5">&#10007;</span> <span><strong class="text-text-primary">Scooping under the ball</strong> — dropping the racquet too low creates floaty shots</span></li>
									<li class="flex items-start gap-2"><span class="text-accent-red mt-0.5">&#10007;</span> <span><strong class="text-text-primary">Arm-only swing</strong> — power comes from legs and core, not the arm alone</span></li>
								</ul>
							</div>

							<div class="mt-4 space-y-3">
								<h4 class="text-sm font-semibold text-text-primary flex items-center gap-2">
									<svg class="w-4 h-4 text-accent-red" viewBox="0 0 24 24" fill="currentColor"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
									Watch & Learn
								</h4>
								<YouTubeSearch query="Feel Tennis one handed backhand technique 6 steps" title="One-Handed Backhand Technique" channel="Feel Tennis" />
								<YouTubeSearch query="Top Tennis Training one handed backhand topspin" title="One-Handed Backhand Topspin" channel="Top Tennis Training" />
							</div>

						{:else if article.id === 3}
							<!-- Serve Placement & Spin -->
							<button
								onclick={() => speakArticle(keyPoints[article.id])}
								class="mb-4 mt-2 flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 {isSpeaking ? 'bg-accent-red/20 text-accent-red' : 'bg-surface-light text-text-secondary hover:bg-surface-lighter hover:text-text-primary'}"
							>
								<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
									<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
									<path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
									<path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
								</svg>
								{isSpeaking ? 'Stop Reading' : 'Read Key Points Aloud'}
							</button>
							<h3 class="text-accent-blue font-bold text-base mb-3 mt-4">Spin Types</h3>
							<div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
								<div class="glass-card p-4 border-l-2 border-accent-blue/50">
									<h4 class="font-bold text-text-primary mb-1">Kick Serve</h4>
									<p class="text-text-secondary text-sm">Brush up at <strong class="text-text-primary">7-to-1 o'clock</strong> position. Ball bounces high, kicking up and to the left (for right-handers). Primary second serve. Effective when targeting the backhand.</p>
								</div>
								<div class="glass-card p-4 border-l-2 border-accent-blue/50">
									<h4 class="font-bold text-text-primary mb-1">Slice Serve</h4>
									<p class="text-text-secondary text-sm">Brush across at <strong class="text-text-primary">3 o'clock</strong> position. Ball curves away from the receiver (right-hander to right-hander). Great for pulling opponents wide, especially in the deuce court.</p>
								</div>
							</div>

							<h3 class="text-accent-blue font-bold text-base mb-3">Serve+1 Integration</h3>
							<p class="text-text-secondary text-sm mb-3">Wide serve works <strong class="text-text-primary">70% of the time on clay</strong> due to the extra slide distance the receiver must cover.</p>

							<h4 class="font-semibold text-text-primary text-sm mb-2">Deuce Court Patterns</h4>
							<div class="glass-card p-4 mb-4">
								<div class="space-y-2">
									<div class="flex items-start gap-3">
										<span class="badge bg-accent-blue/20 text-accent-blue shrink-0">1</span>
										<p class="text-text-secondary text-sm"><strong class="text-text-primary">Slice wide</strong> &#8594; Forehand to open court</p>
									</div>
									<div class="flex items-start gap-3">
										<span class="badge bg-accent-blue/20 text-accent-blue shrink-0">2</span>
										<p class="text-text-secondary text-sm"><strong class="text-text-primary">Flat T</strong> &#8594; Forehand down the line</p>
									</div>
									<div class="flex items-start gap-3">
										<span class="badge bg-accent-blue/20 text-accent-blue shrink-0">3</span>
										<p class="text-text-secondary text-sm"><strong class="text-text-primary">Body serve</strong> &#8594; Attack short reply</p>
									</div>
								</div>
							</div>

							<h4 class="font-semibold text-text-primary text-sm mb-2">Ad Court Patterns</h4>
							<div class="glass-card p-4">
								<div class="space-y-2">
									<div class="flex items-start gap-3">
										<span class="badge bg-accent-purple/20 text-accent-purple shrink-0">1</span>
										<p class="text-text-secondary text-sm"><strong class="text-text-primary">Slice T</strong> &#8594; Forehand to deuce court side</p>
									</div>
									<div class="flex items-start gap-3">
										<span class="badge bg-accent-purple/20 text-accent-purple shrink-0">2</span>
										<p class="text-text-secondary text-sm"><strong class="text-text-primary">Wide serve</strong> &#8594; Cross-court or down the line</p>
									</div>
									<div class="flex items-start gap-3">
										<span class="badge bg-accent-purple/20 text-accent-purple shrink-0">3</span>
										<p class="text-text-secondary text-sm"><strong class="text-text-primary">Kick to backhand</strong> &#8594; Aggressive forehand</p>
									</div>
								</div>
							</div>

							<div class="mt-4 space-y-3">
								<h4 class="text-sm font-semibold text-text-primary flex items-center gap-2">
									<svg class="w-4 h-4 text-accent-red" viewBox="0 0 24 24" fill="currentColor"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
									Watch & Learn
								</h4>
								<YouTubeSearch query="Essential Tennis serve technique placement lesson" title="Serve Technique & Placement" channel="Essential Tennis" />
								<YouTubeSearch query="Feel Tennis serve technique 7 steps correct serve" title="7 Steps to Correct Serve" channel="Feel Tennis" />
							</div>

						{:else if article.id === 4}
							<!-- Volley Technique -->
							<button
								onclick={() => speakArticle(keyPoints[article.id])}
								class="mb-4 mt-2 flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 {isSpeaking ? 'bg-accent-red/20 text-accent-red' : 'bg-surface-light text-text-secondary hover:bg-surface-lighter hover:text-text-primary'}"
							>
								<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
									<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
									<path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
									<path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
								</svg>
								{isSpeaking ? 'Stop Reading' : 'Read Key Points Aloud'}
							</button>
							<h3 class="text-accent-blue font-bold text-base mb-3 mt-4">Core Principles</h3>
							<div class="glass-card p-4 mb-4">
								<ul class="text-text-secondary text-sm space-y-2">
									<li class="flex items-start gap-2"><span class="text-accent-blue">&#9679;</span> <strong class="text-text-primary">Continental grip</strong> — one grip for both forehand and backhand volleys</li>
									<li class="flex items-start gap-2"><span class="text-accent-blue">&#9679;</span> <strong class="text-text-primary">Split step timing</strong> — hop just as opponent contacts the ball</li>
									<li class="flex items-start gap-2"><span class="text-accent-blue">&#9679;</span> <strong class="text-text-primary">Soft hands</strong> — absorb pace, redirect with touch</li>
									<li class="flex items-start gap-2"><span class="text-accent-blue">&#9679;</span> <strong class="text-text-primary">Racket head above wrist</strong> — always, on every volley</li>
									<li class="flex items-start gap-2"><span class="text-accent-blue">&#9679;</span> <strong class="text-text-primary">Short "punch" motion</strong> — not a full swing, compact and controlled</li>
								</ul>
							</div>

							<h3 class="text-accent-blue font-bold text-base mb-3">10 Progressive Wall & Court Drills</h3>
							<div class="glass-card p-4">
								<div class="space-y-3">
									{#each [
										{ num: 1, name: 'Ball Bounce', desc: 'Bounce ball on racquet face — develop soft hands and feel' },
										{ num: 2, name: 'Mini Court Volleys', desc: 'Both players at service line — control and touch rally' },
										{ num: 3, name: 'Hand Toss', desc: 'Partner tosses, you volley to target — contact point focus' },
										{ num: 4, name: 'First Volley Wall', desc: 'Approach shot then first volley against the wall' },
										{ num: 5, name: 'Ground-to-Volley Transition', desc: 'Rally from baseline, approach, finish at net' },
										{ num: 6, name: 'BH Slice Wall', desc: 'Continuous backhand slice volleys against wall' },
										{ num: 7, name: 'Reflex Volley', desc: 'Close-range rapid-fire exchanges — reaction speed' },
										{ num: 8, name: 'Continuous Rally', desc: 'Both at net, sustain volley rally for 20+ shots' },
										{ num: 9, name: 'Serve + Second Ball', desc: 'Serve, split step, first volley — full sequence' },
										{ num: 10, name: 'Shadow Footwork', desc: 'Net position movement patterns without the ball' }
									] as drill}
										<div class="flex items-start gap-3">
											<span class="w-6 h-6 rounded-full bg-accent-blue/20 text-accent-blue text-xs font-bold flex items-center justify-center shrink-0">{drill.num}</span>
											<div>
												<p class="text-text-primary text-sm font-semibold">{drill.name}</p>
												<p class="text-text-secondary text-xs">{drill.desc}</p>
											</div>
										</div>
									{/each}
								</div>
							</div>

							<h3 class="text-accent-blue font-bold text-base mb-3 mt-5">Progression Schedule</h3>
							<div class="glass-card p-4">
								<div class="space-y-2">
									<div class="flex items-center gap-3">
										<span class="badge bg-accent-blue/20 text-accent-blue">Wk 1-2</span>
										<span class="text-text-secondary text-sm">Drills 1-3: Feel, touch, and contact point</span>
									</div>
									<div class="flex items-center gap-3">
										<span class="badge bg-accent-blue/20 text-accent-blue">Wk 3-4</span>
										<span class="text-text-secondary text-sm">Add drills 4-6: Transition and backhand</span>
									</div>
									<div class="flex items-center gap-3">
										<span class="badge bg-accent-blue/20 text-accent-blue">Wk 5+</span>
										<span class="text-text-secondary text-sm">Add drills 7-10: Reflex, rally, serve+volley, footwork</span>
									</div>
								</div>
							</div>

							<div class="mt-4 space-y-3">
								<h4 class="text-sm font-semibold text-text-primary flex items-center gap-2">
									<svg class="w-4 h-4 text-accent-red" viewBox="0 0 24 24" fill="currentColor"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
									Watch & Learn
								</h4>
								<YouTubeSearch query="Essential Tennis volley technique lesson beginner" title="Volley Technique Lesson" channel="Essential Tennis" />
								<YouTubeSearch query="Feel Tennis volley technique tips" title="Volley Technique" channel="Feel Tennis" />
							</div>

						{:else if article.id === 5}
							<!-- Approach Shot Fundamentals -->
							<button
								onclick={() => speakArticle(keyPoints[article.id])}
								class="mb-4 mt-2 flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 {isSpeaking ? 'bg-accent-red/20 text-accent-red' : 'bg-surface-light text-text-secondary hover:bg-surface-lighter hover:text-text-primary'}"
							>
								<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
									<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
									<path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
									<path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
								</svg>
								{isSpeaking ? 'Stop Reading' : 'Read Key Points Aloud'}
							</button>
							<h3 class="text-accent-blue font-bold text-base mb-3 mt-4">5 Triggers to Approach</h3>
							<div class="glass-card p-4 mb-4">
								<div class="space-y-3">
									{#each [
										{ trigger: 'Short ball', desc: 'Primary trigger. Ball landing inside the service line.', pct: 'Most common' },
										{ trigger: 'Opponent wide', desc: 'They are 8m+ from center — huge open court to exploit.', pct: 'High success' },
										{ trigger: 'Opponent off-balance', desc: 'They are stretched, recovering, or wrong-footed.', pct: 'Tactical' },
										{ trigger: 'After deep heavy shot', desc: 'Your deep ball pushes them back — come in behind it.', pct: 'Proactive' },
										{ trigger: 'Drop shot follow-up', desc: 'Play a drop shot and follow it to the net.', pct: 'Surprise' }
									] as item}
										<div class="flex items-start gap-3">
											<span class="text-success text-sm mt-0.5">&#10003;</span>
											<div>
												<p class="text-text-primary text-sm font-semibold">{item.trigger} <span class="badge bg-accent-blue/15 text-accent-blue ml-2">{item.pct}</span></p>
												<p class="text-text-secondary text-xs">{item.desc}</p>
											</div>
										</div>
									{/each}
								</div>
							</div>

							<h3 class="text-accent-blue font-bold text-base mb-3">Direction & Execution</h3>
							<div class="glass-card p-4 mb-4">
								<ul class="text-text-secondary text-sm space-y-2">
									<li class="flex items-start gap-2"><span class="text-accent-blue">&#9679;</span> <strong class="text-text-primary">Direction: Down the line 90% of the time.</strong> Reduces the passing angle for your opponent.</li>
									<li class="flex items-start gap-2"><span class="text-accent-blue">&#9679;</span> <strong class="text-text-primary">Heavy topspin on clay.</strong> The ball kicks up high, giving you more time to close.</li>
									<li class="flex items-start gap-2"><span class="text-accent-blue">&#9679;</span> <strong class="text-text-primary">Target zone: 2m / 6ft wide corridor</strong> down the line. Precision over power.</li>
								</ul>
							</div>

							<h3 class="text-accent-blue font-bold text-base mb-3">Footwork Sequence</h3>
							<div class="glass-card p-4 mb-4">
								<div class="flex flex-wrap items-center gap-2 text-sm">
									<span class="badge bg-accent-blue/20 text-accent-blue">Hit</span>
									<span class="text-text-muted">&#8594;</span>
									<span class="badge bg-accent-blue/20 text-accent-blue">3-4 steps forward</span>
									<span class="text-text-muted">&#8594;</span>
									<span class="badge bg-accent-blue/20 text-accent-blue">Split step</span>
									<span class="text-text-muted text-xs">(as opponent contacts)</span>
									<span class="text-text-muted">&#8594;</span>
									<span class="badge bg-accent-blue/20 text-accent-blue">React</span>
								</div>
							</div>

							<h3 class="text-accent-blue font-bold text-base mb-3">When NOT to Approach</h3>
							<div class="glass-card p-4">
								<ul class="text-text-secondary text-sm space-y-2">
									<li class="flex items-start gap-2"><span class="text-accent-red mt-0.5">&#10007;</span> Opponent hits a clean, deep groundstroke</li>
									<li class="flex items-start gap-2"><span class="text-accent-red mt-0.5">&#10007;</span> You are off-balance or stretched yourself</li>
									<li class="flex items-start gap-2"><span class="text-accent-red mt-0.5">&#10007;</span> You can't transition to the net quickly enough</li>
								</ul>
							</div>

							<div class="mt-4 space-y-3">
								<h4 class="text-sm font-semibold text-text-primary flex items-center gap-2">
									<svg class="w-4 h-4 text-accent-red" viewBox="0 0 24 24" fill="currentColor"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
									Watch & Learn
								</h4>
								<YouTubeSearch query="Feel Tennis approach shot when to come to net" title="Approach Shot Mastery" channel="Feel Tennis" />
							</div>

						{:else if article.id === 6}
							<!-- Control-Hurt-Finish Framework -->
							<button
								onclick={() => speakArticle(keyPoints[article.id])}
								class="mb-4 mt-2 flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 {isSpeaking ? 'bg-accent-red/20 text-accent-red' : 'bg-surface-light text-text-secondary hover:bg-surface-lighter hover:text-text-primary'}"
							>
								<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
									<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
									<path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
									<path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
								</svg>
								{isSpeaking ? 'Stop Reading' : 'Read Key Points Aloud'}
							</button>
							<h3 class="text-court-green font-bold text-base mb-3 mt-4">The 3 Phases of Point Construction</h3>
							<p class="text-text-secondary text-sm mb-4">Never skip phases. Each phase builds on the previous one. Trying to finish too early leads to unforced errors.</p>

							<div class="space-y-4">
								<div class="glass-card p-5 border-l-2 border-court-green/50">
									<div class="flex items-center gap-2 mb-2">
										<span class="w-8 h-8 rounded-full bg-court-green/20 text-court-green font-bold text-sm flex items-center justify-center">1</span>
										<h4 class="font-bold text-text-primary text-base">CONTROL Phase</h4>
									</div>
									<p class="text-text-secondary text-sm leading-relaxed mb-3">
										<strong class="text-text-primary">"Not trying to win yet — building pressure."</strong>
									</p>
									<ul class="text-text-secondary text-sm space-y-1 list-disc list-inside">
										<li>Big, safe targets — aim for the middle of the court quadrants</li>
										<li>Cross-court rallying — higher net clearance, more court to work with</li>
										<li>Heavy topspin — keep the ball deep with margin</li>
										<li>Deep corners — push your opponent behind the baseline</li>
									</ul>
								</div>

								<div class="glass-card p-5 border-l-2 border-warning/50">
									<div class="flex items-center gap-2 mb-2">
										<span class="w-8 h-8 rounded-full bg-warning/20 text-warning font-bold text-sm flex items-center justify-center">2</span>
										<h4 class="font-bold text-text-primary text-base">HURT Phase</h4>
									</div>
									<p class="text-text-secondary text-sm leading-relaxed mb-3">
										<strong class="text-text-primary">Trigger: Mid-court ball appears. Increase aggression.</strong>
									</p>
									<ul class="text-text-secondary text-sm space-y-1 list-disc list-inside">
										<li>Inside-out forehand — your biggest weapon</li>
										<li>Harder angles — stretch your opponent off court</li>
										<li>Attack the weak wing — force defensive replies</li>
										<li>Change direction — wrong-foot or go behind</li>
									</ul>
								</div>

								<div class="glass-card p-5 border-l-2 border-accent-red/50">
									<div class="flex items-center gap-2 mb-2">
										<span class="w-8 h-8 rounded-full bg-accent-red/20 text-accent-red font-bold text-sm flex items-center justify-center">3</span>
										<h4 class="font-bold text-text-primary text-base">FINISH Phase</h4>
									</div>
									<p class="text-text-secondary text-sm leading-relaxed mb-3">
										<strong class="text-text-primary">Trigger: Short ball. Go for it.</strong>
									</p>
									<ul class="text-text-secondary text-sm space-y-1 list-disc list-inside">
										<li>Aggressive forehand — step inside the baseline and drive</li>
										<li>Approach + volley — follow your shot to the net</li>
										<li>Clean winner — when the court is wide open</li>
										<li>Drop shot — when opponent is pinned deep</li>
									</ul>
								</div>
							</div>

							<div class="mt-4 space-y-3">
								<h4 class="text-sm font-semibold text-text-primary flex items-center gap-2">
									<svg class="w-4 h-4 text-accent-red" viewBox="0 0 24 24" fill="currentColor"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
									Watch & Learn
								</h4>
								<YouTubeSearch query="Essential Tennis point construction patterns of play" title="Point Construction Patterns" channel="Essential Tennis" />
							</div>

							<div class="mt-4 glass-card p-3 border-l-2 border-court-green/40">
								<p class="text-text-secondary text-sm">This is practiced in your daily schedule. <a href="{base}/" class="text-court-green font-semibold hover:underline">Check Mission Control</a> for today's focus.</p>
							</div>

						{:else if article.id === 7}
							<!-- Clay Court Attacking Patterns -->
							<button
								onclick={() => speakArticle(keyPoints[article.id])}
								class="mb-4 mt-2 flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 {isSpeaking ? 'bg-accent-red/20 text-accent-red' : 'bg-surface-light text-text-secondary hover:bg-surface-lighter hover:text-text-primary'}"
							>
								<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
									<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
									<path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
									<path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
								</svg>
								{isSpeaking ? 'Stop Reading' : 'Read Key Points Aloud'}
							</button>
							<h3 class="text-court-green font-bold text-base mb-3 mt-4">5 Devastating Clay Court Patterns</h3>

							<div class="space-y-4">
								{#each [
									{ num: 1, name: 'Wide Serve + Open Court Forehand', desc: 'Serve wide (especially deuce court), opponent pushed off court. Attack the open court with a forehand. On clay, the wide serve pulls them even further due to the slide.' },
									{ num: 2, name: 'Heavy Topspin Cross-Court + DTL Finish', desc: 'Build with heavy topspin cross-court rallying. The ball bounces high and deep on clay. When the opponent gives you a shorter ball or you sense them leaning, drive down the line for the winner.' },
									{ num: 3, name: 'Loopy Topspin to BH + Net Rush', desc: 'Send a high, looping topspin ball to the opponent\'s backhand. On clay it bounces shoulder-height. As they struggle with the high ball, approach the net behind the next shot.' },
									{ num: 4, name: 'Side-to-Side + Wrong-Foot', desc: 'Move your opponent laterally with angles. Once they start anticipating the direction, hit behind them (wrong-foot). On clay, once they commit to a slide, they cannot change direction.' },
									{ num: 5, name: 'High Deep Return + Neutralize', desc: 'On return of serve, hit a high, deep, heavy ball to buy time and neutralize the server\'s advantage. Especially effective against big servers on clay — takes away their serve+1.' }
								] as pattern}
									<div class="glass-card p-4 border-l-2 border-court-green/50">
										<h4 class="font-bold text-text-primary mb-2">Pattern {pattern.num}: {pattern.name}</h4>
										<p class="text-text-secondary text-sm">{pattern.desc}</p>
									</div>
								{/each}
							</div>

							<h3 class="text-court-green font-bold text-base mb-3 mt-5">Clay-Specific Notes</h3>
							<div class="glass-card p-4">
								<ul class="text-text-secondary text-sm space-y-2">
									<li class="flex items-start gap-2"><span class="text-clay">&#9679;</span> <strong class="text-text-primary">Heavy topspin is your primary weapon</strong> — the bounce amplifies spin on clay</li>
									<li class="flex items-start gap-2"><span class="text-clay">&#9679;</span> <strong class="text-text-primary">Slice sits up</strong> — use sparingly, it loses bite on clay</li>
									<li class="flex items-start gap-2"><span class="text-clay">&#9679;</span> <strong class="text-text-primary">Drop shots are very effective</strong> — the ball dies on soft surface</li>
									<li class="flex items-start gap-2"><span class="text-clay">&#9679;</span> <strong class="text-text-primary">Angles are your friend</strong> — the court plays wider on clay</li>
									<li class="flex items-start gap-2"><span class="text-clay">&#9679;</span> <strong class="text-text-primary">Sliding is essential</strong> — learn to slide into shots on both wings</li>
								</ul>
							</div>

							<div class="mt-4 space-y-3">
								<h4 class="text-sm font-semibold text-text-primary flex items-center gap-2">
									<svg class="w-4 h-4 text-accent-red" viewBox="0 0 24 24" fill="currentColor"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
									Watch & Learn
								</h4>
								<YouTubeSearch query="tennis clay court strategy tactics winning" title="Clay Court Strategy & Tactics" channel="Top Tennis Training" />
							</div>

							<div class="mt-4 glass-card p-3 border-l-2 border-court-green/40">
								<p class="text-text-secondary text-sm">This is practiced in your daily schedule. <a href="{base}/" class="text-court-green font-semibold hover:underline">Check Mission Control</a> for today's focus.</p>
							</div>

						{:else if article.id === 8}
							<!-- Serve+1 Patterns -->
							<button
								onclick={() => speakArticle(keyPoints[article.id])}
								class="mb-4 mt-2 flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 {isSpeaking ? 'bg-accent-red/20 text-accent-red' : 'bg-surface-light text-text-secondary hover:bg-surface-lighter hover:text-text-primary'}"
							>
								<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
									<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
									<path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
									<path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
								</svg>
								{isSpeaking ? 'Stop Reading' : 'Read Key Points Aloud'}
							</button>
							<h3 class="text-court-green font-bold text-base mb-3 mt-4">The Most Important Pattern in Tennis</h3>
							<div class="glass-card p-4 mb-4 border-l-2 border-warning/50">
								<p class="text-warning font-semibold text-sm mb-1">Key Principle</p>
								<p class="text-text-secondary text-sm"><strong class="text-text-primary">Commit to your plan BEFORE serving.</strong> Decide where you will serve and where you will hit the +1 ball. Indecision after the serve leads to tentative, defensive play.</p>
							</div>

							<h4 class="font-semibold text-text-primary text-sm mb-2">Deuce Court Serve+1 Combinations</h4>
							<div class="overflow-x-auto mb-4">
								<table class="w-full text-sm">
									<thead>
										<tr class="border-b border-white/10">
											<th class="text-left py-2 px-3 text-text-muted font-medium">Serve</th>
											<th class="text-left py-2 px-3 text-text-muted font-medium">+1 Ball</th>
											<th class="text-left py-2 px-3 text-text-muted font-medium">Why</th>
										</tr>
									</thead>
									<tbody class="text-text-secondary">
										<tr class="border-b border-white/5">
											<td class="py-2 px-3 font-medium text-text-primary">Slice wide</td>
											<td class="py-2 px-3">FH to open court</td>
											<td class="py-2 px-3">Opponent pulled wide, huge gap</td>
										</tr>
										<tr class="border-b border-white/5">
											<td class="py-2 px-3 font-medium text-text-primary">Flat T</td>
											<td class="py-2 px-3">FH DTL or inside-out</td>
											<td class="py-2 px-3">Jams opponent, weak return likely</td>
										</tr>
										<tr class="border-b border-white/5">
											<td class="py-2 px-3 font-medium text-text-primary">Body serve</td>
											<td class="py-2 px-3">Attack short reply</td>
											<td class="py-2 px-3">No room to swing, ball comes back weak</td>
										</tr>
										<tr>
											<td class="py-2 px-3 font-medium text-text-primary">Kick BH</td>
											<td class="py-2 px-3">Inside-out FH</td>
											<td class="py-2 px-3">High bounce forces defensive return</td>
										</tr>
									</tbody>
								</table>
							</div>

							<h4 class="font-semibold text-text-primary text-sm mb-2">Ad Court Serve+1 Combinations</h4>
							<div class="overflow-x-auto mb-4">
								<table class="w-full text-sm">
									<thead>
										<tr class="border-b border-white/10">
											<th class="text-left py-2 px-3 text-text-muted font-medium">Serve</th>
											<th class="text-left py-2 px-3 text-text-muted font-medium">+1 Ball</th>
											<th class="text-left py-2 px-3 text-text-muted font-medium">Why</th>
										</tr>
									</thead>
									<tbody class="text-text-secondary">
										<tr class="border-b border-white/5">
											<td class="py-2 px-3 font-medium text-text-primary">Slice T</td>
											<td class="py-2 px-3">FH to deuce court</td>
											<td class="py-2 px-3">Wrong-foots opponent</td>
										</tr>
										<tr class="border-b border-white/5">
											<td class="py-2 px-3 font-medium text-text-primary">Wide FH</td>
											<td class="py-2 px-3">Cross or DTL</td>
											<td class="py-2 px-3">Pulls them off court, you dictate</td>
										</tr>
										<tr>
											<td class="py-2 px-3 font-medium text-text-primary">Kick BH</td>
											<td class="py-2 px-3">Aggressive FH</td>
											<td class="py-2 px-3">High bounce = defensive return</td>
										</tr>
									</tbody>
								</table>
							</div>

							<h4 class="font-semibold text-text-primary text-sm mb-2">Return Patterns</h4>
							<div class="glass-card p-4">
								<ul class="text-text-secondary text-sm space-y-2">
									<li class="flex items-start gap-2"><span class="text-court-green">&#9679;</span> <strong class="text-text-primary">Deep cross-court</strong> — safest option, high margin, neutralizes server</li>
									<li class="flex items-start gap-2"><span class="text-court-green">&#9679;</span> <strong class="text-text-primary">Down the line</strong> — surprise weapon off second serve</li>
									<li class="flex items-start gap-2"><span class="text-court-green">&#9679;</span> <strong class="text-text-primary">Chip and charge</strong> — slice return + approach the net</li>
									<li class="flex items-start gap-2"><span class="text-court-green">&#9679;</span> <strong class="text-text-primary">Heavy dip to feet</strong> — heavy topspin return that lands at server's feet</li>
								</ul>
							</div>

							<div class="mt-4 space-y-3">
								<h4 class="text-sm font-semibold text-text-primary flex items-center gap-2">
									<svg class="w-4 h-4 text-accent-red" viewBox="0 0 24 24" fill="currentColor"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
									Watch & Learn
								</h4>
								<YouTubeSearch query="Essential Tennis serve plus one pattern tactics" title="Serve Plus One Patterns" channel="Essential Tennis" />
							</div>

							<div class="mt-4 glass-card p-3 border-l-2 border-court-green/40">
								<p class="text-text-secondary text-sm">This is practiced in your daily schedule. <a href="{base}/" class="text-court-green font-semibold hover:underline">Check Mission Control</a> for today's focus.</p>
							</div>

						{:else if article.id === 9}
							<!-- Doubles & Mixed Strategy -->
							<button
								onclick={() => speakArticle(keyPoints[article.id])}
								class="mb-4 mt-2 flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 {isSpeaking ? 'bg-accent-red/20 text-accent-red' : 'bg-surface-light text-text-secondary hover:bg-surface-lighter hover:text-text-primary'}"
							>
								<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
									<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
									<path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
									<path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
								</svg>
								{isSpeaking ? 'Stop Reading' : 'Read Key Points Aloud'}
							</button>
							<h3 class="text-court-green font-bold text-base mb-3 mt-4">Formations</h3>
							<div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
								<div class="glass-card p-4">
									<h4 class="font-bold text-text-primary mb-1 text-sm">Standard</h4>
									<p class="text-text-secondary text-xs">One up, one back. Most common. Safe and flexible. Back player builds, net player finishes.</p>
								</div>
								<div class="glass-card p-4">
									<h4 class="font-bold text-text-primary mb-1 text-sm">I-Formation</h4>
									<p class="text-text-secondary text-xs">Net player crouches at center. Uses signals. Creates confusion and pressure on returner.</p>
								</div>
								<div class="glass-card p-4">
									<h4 class="font-bold text-text-primary mb-1 text-sm">Australian</h4>
									<p class="text-text-secondary text-xs">Net player on same side as server. Forces returner to hit down the line. Disrupts rhythm.</p>
								</div>
								<div class="glass-card p-4">
									<h4 class="font-bold text-text-primary mb-1 text-sm">Two-Back</h4>
									<p class="text-text-secondary text-xs">Both players at baseline. Defensive but safe. Good against teams that attack net player.</p>
								</div>
							</div>

							<h3 class="text-court-green font-bold text-base mb-3">6 Core Doubles Tactics</h3>
							<div class="glass-card p-4 mb-5">
								<div class="space-y-3">
									{#each [
										{ num: 1, tactic: 'Attack the middle', detail: 'Creates confusion about who takes the ball, reduces angles for opponents' },
										{ num: 2, tactic: 'Hit at feet', detail: 'Force opponents to hit up — gives you easy volleys' },
										{ num: 3, tactic: 'Keep deep when both back', detail: 'If both opponents are at baseline, heavy depth is king' },
										{ num: 4, tactic: 'Avoid the net player', detail: 'Don\'t give them easy volleys — go cross-court or lob' },
										{ num: 5, tactic: 'Target weaknesses', detail: 'Identify weaker player or weaker shot — exploit relentlessly' },
										{ num: 6, tactic: 'Lob aggressive net player', detail: 'If they crowd the net, lob over them to reset the point' }
									] as item}
										<div class="flex items-start gap-3">
											<span class="w-6 h-6 rounded-full bg-court-green/20 text-court-green text-xs font-bold flex items-center justify-center shrink-0">{item.num}</span>
											<div>
												<p class="text-text-primary text-sm font-semibold">{item.tactic}</p>
												<p class="text-text-secondary text-xs">{item.detail}</p>
											</div>
										</div>
									{/each}
								</div>
							</div>

							<h3 class="text-court-green font-bold text-base mb-3">Net Play Moves</h3>
							<div class="glass-card p-4 mb-4">
								<div class="flex flex-wrap gap-2">
									<span class="badge bg-court-green/20 text-court-green">Poach</span>
									<span class="text-text-secondary text-xs pt-1">Cross to intercept return</span>
								</div>
								<div class="flex flex-wrap gap-2 mt-2">
									<span class="badge bg-court-green/20 text-court-green">Pinch</span>
									<span class="text-text-secondary text-xs pt-1">Move closer to center, cut off angles</span>
								</div>
								<div class="flex flex-wrap gap-2 mt-2">
									<span class="badge bg-court-green/20 text-court-green">Fake</span>
									<span class="text-text-secondary text-xs pt-1">Feint movement to distract returner</span>
								</div>
							</div>

							<h3 class="text-court-green font-bold text-base mb-3">Hand Signals</h3>
							<div class="glass-card p-4 mb-4">
								<div class="space-y-2">
									<div class="flex items-center gap-3">
										<span class="text-xl">&#9994;</span>
										<span class="text-text-primary text-sm font-semibold">Fist = Stay</span>
										<span class="text-text-secondary text-xs">Net player holds position</span>
									</div>
									<div class="flex items-center gap-3">
										<span class="text-xl">&#9995;</span>
										<span class="text-text-primary text-sm font-semibold">Open hand = Poach</span>
										<span class="text-text-secondary text-xs">Net player crosses after serve</span>
									</div>
									<div class="flex items-center gap-3">
										<span class="text-xl">&#9757;</span>
										<span class="text-text-primary text-sm font-semibold">Point = Switch</span>
										<span class="text-text-secondary text-xs">Both players switch sides after serve</span>
									</div>
								</div>
							</div>

							<h3 class="text-court-green font-bold text-base mb-3">Mixed Doubles</h3>
							<div class="glass-card p-4">
								<p class="text-text-secondary text-sm"><strong class="text-text-primary">Position based on strengths, not gender.</strong> Put the player with the better net game at the net, regardless of who they are. <strong class="text-text-primary">Communication is everything</strong> — call "mine", "yours", "switch" clearly and early.</p>
							</div>

							<div class="mt-4 space-y-3">
								<h4 class="text-sm font-semibold text-text-primary flex items-center gap-2">
									<svg class="w-4 h-4 text-accent-red" viewBox="0 0 24 24" fill="currentColor"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
									Watch & Learn
								</h4>
								<YouTubeSearch query="Essential Tennis doubles strategy positioning tactics" title="Doubles Strategy & Positioning" channel="Essential Tennis" />
							</div>

							<div class="mt-4 glass-card p-3 border-l-2 border-court-green/40">
								<p class="text-text-secondary text-sm">This is practiced in your daily schedule. <a href="{base}/" class="text-court-green font-semibold hover:underline">Check Mission Control</a> for today's focus.</p>
							</div>

						{:else if article.id === 10}
							<!-- Reading Your Opponent -->
							<button
								onclick={() => speakArticle(keyPoints[article.id])}
								class="mb-4 mt-2 flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 {isSpeaking ? 'bg-accent-red/20 text-accent-red' : 'bg-surface-light text-text-secondary hover:bg-surface-lighter hover:text-text-primary'}"
							>
								<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
									<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
									<path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
									<path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
								</svg>
								{isSpeaking ? 'Stop Reading' : 'Read Key Points Aloud'}
							</button>
							<h3 class="text-court-green font-bold text-base mb-3 mt-4">O'Shannessy Methodology</h3>

							<h4 class="font-semibold text-text-primary text-sm mb-2">Warm-Up Observation Checklist</h4>
							<div class="glass-card p-4 mb-4">
								<ul class="text-text-secondary text-sm space-y-2">
									<li class="flex items-start gap-2"><span class="text-court-green">&#9679;</span> Which side is stronger? Forehand or backhand?</li>
									<li class="flex items-start gap-2"><span class="text-court-green">&#9679;</span> Does the backhand use slice or topspin? Both?</li>
									<li class="flex items-start gap-2"><span class="text-court-green">&#9679;</span> How fast do they move? Lateral vs. forward/back?</li>
									<li class="flex items-start gap-2"><span class="text-court-green">&#9679;</span> Serve patterns — flat, kick, slice? Preferred placement?</li>
									<li class="flex items-start gap-2"><span class="text-court-green">&#9679;</span> Net comfort level — do they volley in warm-up? Confident or awkward?</li>
									<li class="flex items-start gap-2"><span class="text-court-green">&#9679;</span> Temperament — calm, nervous, aggressive, casual?</li>
								</ul>
							</div>

							<h4 class="font-semibold text-text-primary text-sm mb-2">Physical Cues (Shot Prediction)</h4>
							<div class="glass-card p-4 mb-4">
								<div class="space-y-3">
									<div>
										<p class="text-text-primary text-sm font-semibold">Wrist & Shoulder</p>
										<p class="text-text-secondary text-xs">Indicate direction — watch for early tells in preparation</p>
									</div>
									<div>
										<p class="text-text-primary text-sm font-semibold">Trunk & Hips</p>
										<p class="text-text-secondary text-xs">Indicate power level — more rotation = harder shot</p>
									</div>
									<div>
										<p class="text-text-primary text-sm font-semibold">Grip Changes</p>
										<p class="text-text-secondary text-xs">Visible grip shift often signals slice, drop shot, or lob</p>
									</div>
									<div>
										<p class="text-text-primary text-sm font-semibold">Stance</p>
										<p class="text-text-secondary text-xs"><strong class="text-text-primary">Open stance = cross-court likely. Closed stance = down the line likely.</strong></p>
									</div>
								</div>
							</div>

							<h4 class="font-semibold text-text-primary text-sm mb-2">Behavioral Patterns</h4>
							<div class="glass-card p-4 mb-4">
								<ul class="text-text-secondary text-sm space-y-2">
									<li class="flex items-start gap-2"><span class="text-court-green">&#9679;</span> <strong class="text-text-primary">Emotional responses</strong> — do they get frustrated? How do they react to errors?</li>
									<li class="flex items-start gap-2"><span class="text-court-green">&#9679;</span> <strong class="text-text-primary">Recovery speed</strong> — how quickly do they reset after a bad point?</li>
									<li class="flex items-start gap-2"><span class="text-court-green">&#9679;</span> <strong class="text-text-primary">Serve under pressure</strong> — do they go big or play safe on big points?</li>
									<li class="flex items-start gap-2"><span class="text-court-green">&#9679;</span> <strong class="text-text-primary">Pattern avoidance</strong> — what shots do they avoid? (This reveals weakness)</li>
								</ul>
							</div>

							<h4 class="font-semibold text-text-primary text-sm mb-2">Making Adjustments</h4>
							<div class="glass-card p-4">
								<ul class="text-text-secondary text-sm space-y-2">
									<li class="flex items-start gap-2"><span class="text-success">&#10003;</span> <strong class="text-text-primary">Test early</strong> — probe different shots in the first few games</li>
									<li class="flex items-start gap-2"><span class="text-success">&#10003;</span> <strong class="text-text-primary">Change tempo</strong> — mix fast and slow to disrupt timing</li>
									<li class="flex items-start gap-2"><span class="text-success">&#10003;</span> <strong class="text-text-primary">Alter direction</strong> — break predictable patterns</li>
									<li class="flex items-start gap-2"><span class="text-success">&#10003;</span> <strong class="text-text-primary">Modify serves</strong> — adjust placement/spin based on return tendencies</li>
									<li class="flex items-start gap-2"><span class="text-success">&#10003;</span> <strong class="text-text-primary">Exploit fatigue</strong> — increase physical demands as match progresses</li>
								</ul>
							</div>

							<div class="mt-4 space-y-3">
								<h4 class="text-sm font-semibold text-text-primary flex items-center gap-2">
									<svg class="w-4 h-4 text-accent-red" viewBox="0 0 24 24" fill="currentColor"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
									Watch & Learn
								</h4>
								<YouTubeSearch query="Essential Tennis reading opponent tennis tactics" title="Reading Your Opponent" channel="Essential Tennis" />
							</div>

							<div class="mt-4 glass-card p-3 border-l-2 border-court-green/40">
								<p class="text-text-secondary text-sm">This is practiced in your daily schedule. <a href="{base}/" class="text-court-green font-semibold hover:underline">Check Mission Control</a> for today's focus.</p>
							</div>

						{:else if article.id === 11}
							<!-- KNLTB 7 → 5 Skill Gap -->
							<button
								onclick={() => speakArticle(keyPoints[article.id])}
								class="mb-4 mt-2 flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 {isSpeaking ? 'bg-accent-red/20 text-accent-red' : 'bg-surface-light text-text-secondary hover:bg-surface-lighter hover:text-text-primary'}"
							>
								<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
									<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
									<path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
									<path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
								</svg>
								{isSpeaking ? 'Stop Reading' : 'Read Key Points Aloud'}
							</button>
							<h3 class="text-accent-purple font-bold text-base mb-3 mt-4">International Equivalence</h3>
							<div class="glass-card p-4 mb-5">
								<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
									<div class="bg-surface-light rounded-lg p-3">
										<p class="text-accent-purple font-semibold text-sm mb-1">KNLTB 7</p>
										<p class="text-text-secondary text-xs">NTRP 3.0-3.5 / UTR 4-6</p>
										<p class="text-text-muted text-xs mt-1">Intermediate — can rally with consistency on moderate pace</p>
									</div>
									<div class="bg-surface-light rounded-lg p-3">
										<p class="text-accent-purple font-semibold text-sm mb-1">KNLTB 5</p>
										<p class="text-text-secondary text-xs">NTRP 4.0-4.5 / UTR 8-10</p>
										<p class="text-text-muted text-xs mt-1">Advanced — consistent power, patterns, and match play</p>
									</div>
								</div>
							</div>

							<h3 class="text-accent-purple font-bold text-base mb-3">11-Dimension Skill Comparison</h3>
							<div class="overflow-x-auto">
								<table class="w-full text-sm mb-4">
									<thead>
										<tr class="border-b border-white/10">
											<th class="text-left py-2 px-3 text-text-muted font-medium">Dimension</th>
											<th class="text-left py-2 px-3 text-text-muted font-medium">KNLTB 7</th>
											<th class="text-left py-2 px-3 text-text-muted font-medium">KNLTB 5</th>
										</tr>
									</thead>
									<tbody class="text-text-secondary">
										<tr class="border-b border-white/5">
											<td class="py-2 px-3 font-medium text-text-primary">Rally Consistency</td>
											<td class="py-2 px-3">6-10 ball rallies</td>
											<td class="py-2 px-3">15-25+ ball rallies</td>
										</tr>
										<tr class="border-b border-white/5">
											<td class="py-2 px-3 font-medium text-text-primary">GS Depth</td>
											<td class="py-2 px-3">Inconsistent depth</td>
											<td class="py-2 px-3">Consistently deep</td>
										</tr>
										<tr class="border-b border-white/5">
											<td class="py-2 px-3 font-medium text-text-primary">Topspin</td>
											<td class="py-2 px-3">Minimal/inconsistent</td>
											<td class="py-2 px-3">Heavy on both wings</td>
										</tr>
										<tr class="border-b border-white/5">
											<td class="py-2 px-3 font-medium text-text-primary">Serve</td>
											<td class="py-2 px-3">Flat, limited placement</td>
											<td class="py-2 px-3">Placement + kick/slice</td>
										</tr>
										<tr class="border-b border-white/5">
											<td class="py-2 px-3 font-medium text-text-primary">Volley</td>
											<td class="py-2 px-3">Uncomfortable</td>
											<td class="py-2 px-3">Confident and effective</td>
										</tr>
										<tr class="border-b border-white/5">
											<td class="py-2 px-3 font-medium text-text-primary">Footwork</td>
											<td class="py-2 px-3">Reactive, late</td>
											<td class="py-2 px-3">Proactive, split-stepping</td>
										</tr>
										<tr class="border-b border-white/5">
											<td class="py-2 px-3 font-medium text-text-primary">Point Construction</td>
											<td class="py-2 px-3">Hit and hope</td>
											<td class="py-2 px-3">Intentional patterns</td>
										</tr>
										<tr class="border-b border-white/5">
											<td class="py-2 px-3 font-medium text-text-primary">Shot Variety</td>
											<td class="py-2 px-3">2-3 basic shots</td>
											<td class="py-2 px-3">Full toolkit (slice, drop, lob, etc.)</td>
										</tr>
										<tr class="border-b border-white/5">
											<td class="py-2 px-3 font-medium text-text-primary">Handling Pace</td>
											<td class="py-2 px-3">Struggles with power</td>
											<td class="py-2 px-3">Absorbs and redirects</td>
										</tr>
										<tr class="border-b border-white/5">
											<td class="py-2 px-3 font-medium text-text-primary">Game Plan Adaptation</td>
											<td class="py-2 px-3">Plays one way</td>
											<td class="py-2 px-3">Adjusts mid-match</td>
										</tr>
										<tr>
											<td class="py-2 px-3 font-medium text-text-primary">Mental Management</td>
											<td class="py-2 px-3">Emotional, reactive</td>
											<td class="py-2 px-3">Composed, process-focused</td>
										</tr>
									</tbody>
								</table>
							</div>

							<div class="mt-4 glass-card p-3 border-l-2 border-accent-purple/40">
								<p class="text-text-secondary text-sm">This is practiced in your daily schedule. <a href="{base}/" class="text-accent-purple font-semibold hover:underline">Check Mission Control</a> for today's focus.</p>
							</div>

						{:else if article.id === 12}
							<!-- When to Approach the Net -->
							<button
								onclick={() => speakArticle(keyPoints[article.id])}
								class="mb-4 mt-2 flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 {isSpeaking ? 'bg-accent-red/20 text-accent-red' : 'bg-surface-light text-text-secondary hover:bg-surface-lighter hover:text-text-primary'}"
							>
								<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
									<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
									<path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
									<path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
								</svg>
								{isSpeaking ? 'Stop Reading' : 'Read Key Points Aloud'}
							</button>
							<h3 class="text-accent-purple font-bold text-base mb-3 mt-4">5 Triggers (Detailed)</h3>
							<div class="space-y-3 mb-5">
								{#each [
									{ trigger: 'Short Ball', detail: 'Primary trigger. Any ball landing inside the service line. Step in, take it on the rise, and follow to net.', icon: '1' },
									{ trigger: 'Opponent Wide (8m+ to cover)', detail: 'When your shot pulls the opponent far wide, they have a huge court to cover. Come in and cut off the passing angle.', icon: '2' },
									{ trigger: 'Opponent Off-Balance', detail: 'When they are stretched, wrong-footed, or recovering from a slide. They cannot produce a quality passing shot.', icon: '3' },
									{ trigger: 'After Deep Heavy Shot', detail: 'A deep, heavy topspin ball pushes them behind the baseline. Come in behind the next ball as they struggle to recover.', icon: '4' },
									{ trigger: 'Drop Shot Follow-Up', detail: 'Play a drop shot and follow it to the net. Even if they get it, you are already at net for the easy volley.', icon: '5' }
								] as item}
									<div class="glass-card p-4 border-l-2 border-accent-purple/50">
										<div class="flex items-center gap-2 mb-1">
											<span class="w-6 h-6 rounded-full bg-accent-purple/20 text-accent-purple text-xs font-bold flex items-center justify-center">{item.icon}</span>
											<h4 class="font-bold text-text-primary text-sm">{item.trigger}</h4>
										</div>
										<p class="text-text-secondary text-sm pl-8">{item.detail}</p>
									</div>
								{/each}
							</div>

							<h3 class="text-accent-purple font-bold text-base mb-3">When NOT to Approach</h3>
							<div class="glass-card p-4 mb-4">
								<ul class="text-text-secondary text-sm space-y-2">
									<li class="flex items-start gap-2"><span class="text-accent-red">&#10007;</span> Opponent hits a clean, deep groundstroke — you'll be passed</li>
									<li class="flex items-start gap-2"><span class="text-accent-red">&#10007;</span> You are off-balance or stretched — can't transition properly</li>
									<li class="flex items-start gap-2"><span class="text-accent-red">&#10007;</span> You can't get close enough to the net quickly — stuck in no-man's land</li>
								</ul>
							</div>

							<h3 class="text-accent-purple font-bold text-base mb-3">Execution Keys</h3>
							<div class="glass-card p-4">
								<ul class="text-text-secondary text-sm space-y-2">
									<li class="flex items-start gap-2"><span class="text-accent-purple">&#9679;</span> <strong class="text-text-primary">DTL 90% of the time</strong> — minimizes passing angle</li>
									<li class="flex items-start gap-2"><span class="text-accent-purple">&#9679;</span> <strong class="text-text-primary">Heavy topspin approach on clay</strong> — ball kicks up, buys transition time</li>
									<li class="flex items-start gap-2"><span class="text-accent-purple">&#9679;</span> <strong class="text-text-primary">Split-step as opponent contacts the ball</strong> — react, don't guess</li>
								</ul>
							</div>

							<div class="mt-4 glass-card p-3 border-l-2 border-accent-purple/40">
								<p class="text-text-secondary text-sm">This is practiced in your daily schedule. <a href="{base}/" class="text-accent-purple font-semibold hover:underline">Check Mission Control</a> for today's focus.</p>
							</div>

						{:else if article.id === 13}
							<!-- Handling Pressure Points -->
							<button
								onclick={() => speakArticle(keyPoints[article.id])}
								class="mb-4 mt-2 flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 {isSpeaking ? 'bg-accent-red/20 text-accent-red' : 'bg-surface-light text-text-secondary hover:bg-surface-lighter hover:text-text-primary'}"
							>
								<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
									<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
									<path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
									<path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
								</svg>
								{isSpeaking ? 'Stop Reading' : 'Read Key Points Aloud'}
							</button>
							<h3 class="text-accent-purple font-bold text-base mb-3 mt-4">Tiebreaks</h3>
							<div class="glass-card p-4 mb-4 border-l-2 border-accent-purple/50">
								<p class="text-text-secondary text-sm mb-3"><strong class="text-text-primary">Focus beats talent in tiebreaks.</strong> The player who executes the process wins.</p>
								<ul class="text-text-secondary text-sm space-y-2">
									<li class="flex items-start gap-2"><span class="text-accent-purple">&#9679;</span> <strong class="text-text-primary">Stress management plan</strong> — have a routine and stick to it</li>
									<li class="flex items-start gap-2"><span class="text-accent-purple">&#9679;</span> <strong class="text-text-primary">Point-by-point mentality</strong> — forget the score, focus on this point</li>
									<li class="flex items-start gap-2"><span class="text-accent-purple">&#9679;</span> <strong class="text-text-primary">Percentage tennis</strong> — play your highest-percentage shots</li>
									<li class="flex items-start gap-2"><span class="text-accent-purple">&#9679;</span> <strong class="text-text-primary">Stick to patterns</strong> — don't try new things under pressure</li>
								</ul>
							</div>

							<h3 class="text-accent-purple font-bold text-base mb-3">Break Points (When Serving)</h3>
							<div class="glass-card p-4 mb-4 border-l-2 border-warning/50">
								<ul class="text-text-secondary text-sm space-y-2">
									<li class="flex items-start gap-2"><span class="text-warning">&#9679;</span> <strong class="text-text-primary">Go to your best serve</strong> — this is not the time to experiment</li>
									<li class="flex items-start gap-2"><span class="text-warning">&#9679;</span> <strong class="text-text-primary">Commit fully</strong> — hesitation is the biggest enemy</li>
									<li class="flex items-start gap-2"><span class="text-warning">&#9679;</span> <strong class="text-text-primary">Lockdown mode</strong> — extra focus on between-point routine</li>
								</ul>
							</div>

							<h3 class="text-accent-purple font-bold text-base mb-3">Match Points</h3>
							<div class="glass-card p-4 mb-4 border-l-2 border-accent-red/50">
								<ul class="text-text-secondary text-sm space-y-2">
									<li class="flex items-start gap-2"><span class="text-accent-red">&#9679;</span> <strong class="text-text-primary">Recall past successes</strong> — remember times you closed out matches</li>
									<li class="flex items-start gap-2"><span class="text-accent-red">&#9679;</span> <strong class="text-text-primary">Redouble rituals</strong> — be even MORE deliberate with your routine</li>
									<li class="flex items-start gap-2"><span class="text-accent-red">&#9679;</span> <strong class="text-text-primary">Control the controllable</strong> — effort, attitude, process</li>
									<li class="flex items-start gap-2"><span class="text-accent-red">&#9679;</span> <strong class="text-text-primary">Accept nerves as engagement</strong> — nerves mean you care, reframe them</li>
								</ul>
							</div>

							<div class="glass-card p-4 bg-accent-purple/5">
								<p class="text-accent-purple font-semibold text-sm mb-1">Remember</p>
								<p class="text-text-secondary text-sm">The 16-Second Cure becomes <strong class="text-text-primary">MORE important</strong> under pressure, not less. When the stakes are highest, the routine is your anchor.</p>
							</div>

							<div class="mt-4 space-y-3">
								<h4 class="text-sm font-semibold text-text-primary flex items-center gap-2">
									<svg class="w-4 h-4 text-accent-red" viewBox="0 0 24 24" fill="currentColor"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
									Watch & Learn
								</h4>
								<YouTubeSearch query="Essential Tennis mental toughness pressure handling" title="Mental Toughness in Tennis" channel="Essential Tennis" />
							</div>

							<div class="mt-4 glass-card p-3 border-l-2 border-accent-purple/40">
								<p class="text-text-secondary text-sm">This is practiced in your daily schedule. <a href="{base}/" class="text-accent-purple font-semibold hover:underline">Check Mission Control</a> for today's focus.</p>
							</div>

						{:else if article.id === 14}
							<!-- Using SwingVision -->
							<button
								onclick={() => speakArticle(keyPoints[article.id])}
								class="mb-4 mt-2 flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 {isSpeaking ? 'bg-accent-red/20 text-accent-red' : 'bg-surface-light text-text-secondary hover:bg-surface-lighter hover:text-text-primary'}"
							>
								<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
									<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
									<path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
									<path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
								</svg>
								{isSpeaking ? 'Stop Reading' : 'Read Key Points Aloud'}
							</button>
							<h3 class="text-accent-orange font-bold text-base mb-3 mt-4">Key Metrics to Track</h3>
							<div class="glass-card p-4 mb-4">
								<div class="grid grid-cols-2 sm:grid-cols-3 gap-3">
									{#each ['Shot Speed', 'Shot Depth', 'Placement Maps', 'Rally Length', 'Spin Rate', 'Serve Stats', 'Court Position'] as metric}
										<div class="bg-surface-light rounded-lg p-2 text-center">
											<p class="text-text-primary text-xs font-semibold">{metric}</p>
										</div>
									{/each}
								</div>
							</div>

							<h3 class="text-accent-orange font-bold text-base mb-3">Post-Session Review (Immediate)</h3>
							<div class="glass-card p-4 mb-4">
								<ul class="text-text-secondary text-sm space-y-2">
									<li class="flex items-start gap-2"><span class="text-accent-orange">&#9679;</span> <strong class="text-text-primary">Watch highlights</strong> — keep under 10 minutes, focus on patterns not individual shots</li>
									<li class="flex items-start gap-2"><span class="text-accent-orange">&#9679;</span> <strong class="text-text-primary">Filter by stroke</strong> — review forehand, backhand, serve separately</li>
									<li class="flex items-start gap-2"><span class="text-accent-orange">&#9679;</span> <strong class="text-text-primary">Check heat maps</strong> — where are your shots landing? Are you hitting deep enough?</li>
									<li class="flex items-start gap-2"><span class="text-accent-orange">&#9679;</span> <strong class="text-text-primary">Serve placement review</strong> — are you hitting your targets?</li>
								</ul>
							</div>

							<h3 class="text-accent-orange font-bold text-base mb-3">Weekly Analysis</h3>
							<div class="glass-card p-4 mb-4">
								<ul class="text-text-secondary text-sm space-y-2">
									<li class="flex items-start gap-2"><span class="text-accent-orange">&#9679;</span> <strong class="text-text-primary">Speed trends</strong> — are your groundstroke speeds increasing?</li>
									<li class="flex items-start gap-2"><span class="text-accent-orange">&#9679;</span> <strong class="text-text-primary">First serve percentage</strong> — tracking week over week</li>
									<li class="flex items-start gap-2"><span class="text-accent-orange">&#9679;</span> <strong class="text-text-primary">Longest rally patterns</strong> — what happens in extended rallies?</li>
									<li class="flex items-start gap-2"><span class="text-accent-orange">&#9679;</span> <strong class="text-text-primary">Challenge feature</strong> — use to compare against previous sessions</li>
								</ul>
							</div>

							<h3 class="text-accent-orange font-bold text-base mb-3">Priority Focus Areas</h3>
							<div class="glass-card p-4">
								<div class="space-y-3">
									<div class="flex items-center gap-3">
										<span class="badge bg-accent-red/20 text-accent-red">#1</span>
										<span class="text-text-primary text-sm font-semibold">Shot depth consistency</span>
									</div>
									<div class="flex items-center gap-3">
										<span class="badge bg-accent-orange/20 text-accent-orange">#2</span>
										<span class="text-text-primary text-sm font-semibold">First serve percentage</span>
									</div>
									<div class="flex items-center gap-3">
										<span class="badge bg-warning/20 text-warning">#3</span>
										<span class="text-text-primary text-sm font-semibold">Unforced error patterns</span>
									</div>
									<div class="flex items-center gap-3">
										<span class="badge bg-court-green/20 text-court-green">#4</span>
										<span class="text-text-primary text-sm font-semibold">Rally length vs outcome</span>
									</div>
								</div>
							</div>

							<div class="mt-4 space-y-3">
								<h4 class="text-sm font-semibold text-text-primary flex items-center gap-2">
									<svg class="w-4 h-4 text-accent-red" viewBox="0 0 24 24" fill="currentColor"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
									Watch & Learn
								</h4>
								<YouTubeSearch query="SwingVision tennis app review demo how to use" title="SwingVision App Demo & Review" channel="SwingVision" />
							</div>

						{:else if article.id === 15}
							<!-- Match Stats That Matter -->
							<button
								onclick={() => speakArticle(keyPoints[article.id])}
								class="mb-4 mt-2 flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 {isSpeaking ? 'bg-accent-red/20 text-accent-red' : 'bg-surface-light text-text-secondary hover:bg-surface-lighter hover:text-text-primary'}"
							>
								<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
									<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
									<path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
									<path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
								</svg>
								{isSpeaking ? 'Stop Reading' : 'Read Key Points Aloud'}
							</button>
							<h3 class="text-accent-orange font-bold text-base mb-3 mt-4">Tier 1 — Highest Impact</h3>
							<div class="glass-card p-4 mb-4 border-l-2 border-accent-red/50">
								<h4 class="font-bold text-text-primary mb-2">Unforced Errors</h4>
								<p class="text-text-secondary text-sm mb-2">
									<strong class="text-text-primary">The player with fewer unforced errors wins approximately 73% of matches.</strong> This is the single most predictive statistic in recreational and intermediate tennis.
								</p>
								<div class="bg-surface-light rounded-lg p-3 mt-3">
									<p class="text-accent-red font-semibold text-sm">Key Insight</p>
									<p class="text-text-secondary text-xs mt-1">Decreasing errors has a greater impact on results than increasing winners. Focus on error reduction first.</p>
								</div>
							</div>

							<h3 class="text-accent-orange font-bold text-base mb-3">Tier 2 — Serve Performance</h3>
							<div class="glass-card p-4 mb-4 border-l-2 border-accent-orange/50">
								<ul class="text-text-secondary text-sm space-y-2">
									<li class="flex items-start gap-2"><span class="text-accent-orange">&#9679;</span> <strong class="text-text-primary">First serve %</strong> — target 60-70%. Below 50% means constant second-serve vulnerability.</li>
									<li class="flex items-start gap-2"><span class="text-accent-orange">&#9679;</span> <strong class="text-text-primary">First serve points won</strong> — measure effectiveness, not just getting it in</li>
									<li class="flex items-start gap-2"><span class="text-accent-orange">&#9679;</span> <strong class="text-text-primary">Second serve performance</strong> — double faults, points won on 2nd serve</li>
								</ul>
							</div>

							<h3 class="text-accent-orange font-bold text-base mb-3">Tier 3 — Offensive Output</h3>
							<div class="glass-card p-4 mb-4 border-l-2 border-warning/50">
								<ul class="text-text-secondary text-sm space-y-2">
									<li class="flex items-start gap-2"><span class="text-warning">&#9679;</span> <strong class="text-text-primary">Rally length vs outcome</strong> — do you win or lose long rallies?</li>
									<li class="flex items-start gap-2"><span class="text-warning">&#9679;</span> <strong class="text-text-primary">Winners count</strong> — how many points do you actively win?</li>
									<li class="flex items-start gap-2"><span class="text-warning">&#9679;</span> <strong class="text-text-primary">W/UE ratio</strong> — target 1:1 or better (winners to unforced errors)</li>
								</ul>
							</div>

							<h3 class="text-accent-orange font-bold text-base mb-3">What to Track After Every Match</h3>
							<div class="glass-card p-4">
								<div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
									{#each [
										'1st serve %',
										'Double faults',
										'UE by shot type',
										'Winners count',
										'Break points (saved/faced)',
										'Mental state rating'
									] as stat}
										<div class="flex items-center gap-2 text-text-secondary text-sm">
											<span class="text-accent-orange text-xs">&#9632;</span>
											{stat}
										</div>
									{/each}
								</div>
							</div>

						{:else if article.id === 16}
							<!-- Keeping a Tennis Journal -->
							<button
								onclick={() => speakArticle(keyPoints[article.id])}
								class="mb-4 mt-2 flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 {isSpeaking ? 'bg-accent-red/20 text-accent-red' : 'bg-surface-light text-text-secondary hover:bg-surface-lighter hover:text-text-primary'}"
							>
								<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
									<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
									<path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
									<path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
								</svg>
								{isSpeaking ? 'Stop Reading' : 'Read Key Points Aloud'}
							</button>
							<h3 class="text-accent-orange font-bold text-base mb-3 mt-4">Pre-Match Section</h3>
							<div class="glass-card p-4 mb-4">
								<div class="space-y-2">
									{#each [
										{ label: 'Date & Time', desc: 'When and where' },
										{ label: 'Opponent', desc: 'Name, level, known tendencies' },
										{ label: 'Conditions', desc: 'Surface, weather, wind, balls' },
										{ label: 'Game Plan', desc: 'Primary tactics, serve patterns, target weaknesses' },
										{ label: 'Mental State', desc: 'How are you feeling? Energy, motivation, confidence (1-10)' }
									] as field}
										<div class="flex items-start gap-3">
											<span class="text-accent-orange font-bold text-sm shrink-0 w-28">{field.label}</span>
											<span class="text-text-secondary text-sm">{field.desc}</span>
										</div>
									{/each}
								</div>
							</div>

							<h3 class="text-accent-orange font-bold text-base mb-3">Match Results</h3>
							<div class="glass-card p-4 mb-4">
								<ul class="text-text-secondary text-sm space-y-1 list-disc list-inside">
									<li>Score (all sets)</li>
									<li>Key statistics (serves, errors, winners)</li>
									<li>Key break points — how did you perform on the big points?</li>
								</ul>
							</div>

							<h3 class="text-accent-orange font-bold text-base mb-3">Tactical Review</h3>
							<div class="glass-card p-4 mb-4">
								<div class="space-y-2">
									{#each [
										{ q: 'What worked?', color: 'text-success' },
										{ q: "What didn't work?", color: 'text-accent-red' },
										{ q: 'What adjustments did you make?', color: 'text-accent-blue' },
										{ q: "What patterns did the opponent use?", color: 'text-accent-purple' },
										{ q: 'How well did you execute the game plan?', color: 'text-accent-orange' }
									] as item}
										<p class="{item.color} text-sm font-semibold">{item.q}</p>
									{/each}
								</div>
							</div>

							<h3 class="text-accent-orange font-bold text-base mb-3">Mental Review</h3>
							<div class="glass-card p-4 mb-4">
								<ul class="text-text-secondary text-sm space-y-2">
									<li class="flex items-start gap-2"><span class="text-accent-orange">&#9679;</span> <strong class="text-text-primary">Focus lapses</strong> — when did you lose concentration? What triggered it?</li>
									<li class="flex items-start gap-2"><span class="text-accent-orange">&#9679;</span> <strong class="text-text-primary">Pressure handling</strong> — how did you perform on big points?</li>
									<li class="flex items-start gap-2"><span class="text-accent-orange">&#9679;</span> <strong class="text-text-primary">Routine compliance</strong> — did you follow between-point routine?</li>
									<li class="flex items-start gap-2"><span class="text-accent-orange">&#9679;</span> <strong class="text-text-primary">Energy management</strong> — physical and mental energy throughout</li>
									<li class="flex items-start gap-2"><span class="text-accent-orange">&#9679;</span> <strong class="text-text-primary">Rate overall mental game</strong> — 1-10 scale</li>
								</ul>
							</div>

							<h3 class="text-accent-orange font-bold text-base mb-3">Action Items</h3>
							<div class="glass-card p-4">
								<ul class="text-text-secondary text-sm space-y-2">
									<li class="flex items-start gap-2"><span class="text-success">&#10003;</span> <strong class="text-text-primary">2-3 things to practice</strong> — specific, actionable items for next training</li>
									<li class="flex items-start gap-2"><span class="text-success">&#10003;</span> <strong class="text-text-primary">Tactical insights</strong> — notes for future matches against this opponent</li>
								</ul>
							</div>

							<div class="mt-4 space-y-3">
								<h4 class="text-sm font-semibold text-text-primary flex items-center gap-2">
									<svg class="w-4 h-4 text-accent-red" viewBox="0 0 24 24" fill="currentColor"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
									Watch & Learn
								</h4>
								<YouTubeSearch query="Functional Tennis match journal review matches" title="Match Journal & Review" channel="Functional Tennis" />
							</div>
						{/if}
					</div>
				</div>
			{/if}
		</div>
	{/each}
</div>

<!-- Bottom spacer for mobile nav -->
<div class="h-4"></div>
