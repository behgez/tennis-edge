<script lang="ts">
	import { browser } from '$app/environment';
	import { progressStore } from '$lib/stores/progress.svelte';
	import { journalStore } from '$lib/stores/journal.svelte';

	// Assessment form state
	let showAssessmentForm = $state(false);

	// Skill dimensions
	const skillDimensions = [
		'Rally Consistency',
		'Groundstroke Depth',
		'Topspin Production',
		'Serve Placement & Spin',
		'Volley Confidence',
		'Footwork & Movement',
		'Tactical Awareness',
		'Shot Variety',
		'Handling Pace',
		'Game Plan Adaptation',
		'Mental Toughness'
	];

	const sliderLabels: Record<number, string> = {
		1: 'Level 9',
		3: 'Level 8',
		5: 'Level 7 (Start)',
		7: 'Level 6',
		9: 'Level 5 (Goal)',
		10: 'Level 4+'
	};

	// Assessment form values
	let assessmentSkills = $state<Record<string, number>>(
		Object.fromEntries(skillDimensions.map(s => [s, 5]))
	);

	// Equipment checklist state
	const equipmentItems = [
		{ id: 'resistance-bands', name: 'Resistance bands', price: '$15' },
		{ id: 'flexbar', name: 'TheraBand FlexBar green', price: '$20' },
		{ id: 'agility-ladder', name: 'Agility ladder + cones', price: '$20' },
		{ id: 'jump-rope', name: 'Jump rope', price: '$12' },
		{ id: 'medicine-ball', name: 'Medicine ball 3kg', price: '$30' },
		{ id: 'rebounder', name: 'Tennis rebounder', price: '$100-250' }
	];

	let equipmentChecked = $state<Record<string, boolean>>({});

	// Load equipment from localStorage
	$effect(() => {
		if (browser) {
			try {
				const stored = localStorage.getItem('tennisedge-equipment');
				if (stored) {
					equipmentChecked = JSON.parse(stored);
				}
			} catch { /* ignore */ }
		}
	});

	function toggleEquipment(id: string) {
		equipmentChecked[id] = !equipmentChecked[id];
		if (browser) {
			localStorage.setItem('tennisedge-equipment', JSON.stringify(equipmentChecked));
		}
	}

	// Derived data
	let streakInfo = $derived(progressStore.getStreakInfo());
	let journalEntries = $derived(journalStore.getEntries());
	let assessments = $derived(progressStore.getRecentAssessments(50));

	let totalTrainingDays = $derived(
		Object.keys(progressStore.data.completedActivities).length
	);

	let weeksActive = $derived.by(() => {
		const dates = Object.keys(progressStore.data.completedActivities);
		if (dates.length === 0) return 0;
		const sorted = dates.sort();
		const earliest = new Date(sorted[0]);
		const now = new Date();
		const diffMs = now.getTime() - earliest.getTime();
		return Math.max(1, Math.ceil(diffMs / (7 * 24 * 60 * 60 * 1000)));
	});

	// Heatmap data: last 90 days
	let heatmapData = $derived.by(() => {
		const days: Array<{ date: string; count: number; dayOfWeek: number }> = [];
		const now = new Date();
		for (let i = 89; i >= 0; i--) {
			const d = new Date(now);
			d.setDate(d.getDate() - i);
			const dateStr = d.toISOString().split('T')[0];
			const count = progressStore.getCompletedForDate(dateStr).length;
			days.push({ date: dateStr, count, dayOfWeek: d.getDay() });
		}
		return days;
	});

	// Group heatmap into weeks (columns)
	let heatmapWeeks = $derived.by(() => {
		const weeks: Array<Array<{ date: string; count: number; dayOfWeek: number } | null>> = [];
		let currentWeek: Array<{ date: string; count: number; dayOfWeek: number } | null> = [];

		// Start with padding for the first week
		if (heatmapData.length > 0) {
			const firstDay = heatmapData[0].dayOfWeek;
			// Monday = 1, Sunday = 0 -> shift: Monday=0, Tue=1, ..., Sun=6
			const mondayOffset = firstDay === 0 ? 6 : firstDay - 1;
			for (let i = 0; i < mondayOffset; i++) {
				currentWeek.push(null);
			}
		}

		for (const day of heatmapData) {
			const mondayIdx = day.dayOfWeek === 0 ? 6 : day.dayOfWeek - 1;
			if (mondayIdx === 0 && currentWeek.length > 0) {
				// Pad remaining days
				while (currentWeek.length < 7) currentWeek.push(null);
				weeks.push(currentWeek);
				currentWeek = [];
			}
			currentWeek.push(day);
		}
		// Pad last week
		while (currentWeek.length < 7) currentWeek.push(null);
		if (currentWeek.length > 0) weeks.push(currentWeek);

		return weeks;
	});

	function heatmapColor(count: number): string {
		if (count === 0) return 'bg-surface-card';
		if (count <= 2) return 'bg-court-green-dark';
		if (count <= 5) return 'bg-court-green';
		return 'bg-ball-yellow';
	}

	// Radar chart
	let radarCanvas: HTMLCanvasElement | undefined = $state();

	let firstAssessment = $derived(assessments.length > 0 ? assessments[assessments.length - 1] : null);
	let latestAssessment = $derived(assessments.length > 0 ? assessments[0] : null);

	$effect(() => {
		if (!radarCanvas || !latestAssessment) return;
		drawRadarChart(radarCanvas);
	});

	function drawRadarChart(canvas: HTMLCanvasElement) {
		const ctx = canvas.getContext('2d');
		if (!ctx || !latestAssessment) return;

		const dpr = browser ? window.devicePixelRatio || 1 : 1;
		const size = Math.min(canvas.parentElement?.clientWidth ?? 400, 400);
		canvas.width = size * dpr;
		canvas.height = size * dpr;
		canvas.style.width = size + 'px';
		canvas.style.height = size + 'px';
		ctx.scale(dpr, dpr);

		const cx = size / 2;
		const cy = size / 2;
		const radius = size * 0.38;
		const n = skillDimensions.length;
		const angleStep = (2 * Math.PI) / n;
		const startAngle = -Math.PI / 2;

		ctx.clearRect(0, 0, size, size);

		// Grid
		for (const level of [2, 4, 6, 8, 10]) {
			const r = (level / 10) * radius;
			ctx.beginPath();
			for (let i = 0; i <= n; i++) {
				const angle = startAngle + i * angleStep;
				const x = cx + r * Math.cos(angle);
				const y = cy + r * Math.sin(angle);
				if (i === 0) ctx.moveTo(x, y);
				else ctx.lineTo(x, y);
			}
			ctx.closePath();
			ctx.strokeStyle = 'rgba(148, 163, 184, 0.15)';
			ctx.lineWidth = 1;
			ctx.stroke();

			// Level number
			ctx.fillStyle = 'rgba(148, 163, 184, 0.4)';
			ctx.font = '10px Inter, sans-serif';
			ctx.textAlign = 'center';
			ctx.fillText(level.toString(), cx, cy - r - 4);
		}

		// Axis lines + labels
		for (let i = 0; i < n; i++) {
			const angle = startAngle + i * angleStep;
			const x = cx + radius * Math.cos(angle);
			const y = cy + radius * Math.sin(angle);
			ctx.beginPath();
			ctx.moveTo(cx, cy);
			ctx.lineTo(x, y);
			ctx.strokeStyle = 'rgba(148, 163, 184, 0.1)';
			ctx.lineWidth = 1;
			ctx.stroke();

			// Label
			const labelR = radius + 18;
			const lx = cx + labelR * Math.cos(angle);
			const ly = cy + labelR * Math.sin(angle);
			ctx.fillStyle = 'rgba(241, 245, 249, 0.7)';
			ctx.font = '9px Inter, sans-serif';
			ctx.textAlign = angle > Math.PI / 2 - 0.1 && angle < (3 * Math.PI) / 2 + 0.1 ? 'right' : angle < -Math.PI / 2 + 0.1 && angle > -Math.PI / 2 - 0.1 ? 'center' : 'left';
			if (Math.abs(angle - (-Math.PI / 2)) < 0.1 || Math.abs(angle - (Math.PI / 2)) < 0.1) {
				ctx.textAlign = 'center';
			}
			// Shorten labels for display
			const shortName = skillDimensions[i].length > 14 ? skillDimensions[i].substring(0, 13) + '...' : skillDimensions[i];
			ctx.fillText(shortName, lx, ly + 3);
		}

		// Plot function
		function plotData(c: CanvasRenderingContext2D, skills: Record<string, number>, color: string, lw: number, dash: number[]) {
			c.beginPath();
			c.setLineDash(dash);
			for (let i = 0; i <= n; i++) {
				const idx = i % n;
				const dim = skillDimensions[idx];
				const val = skills[dim] ?? 5;
				const r = (val / 10) * radius;
				const angle = startAngle + idx * angleStep;
				const x = cx + r * Math.cos(angle);
				const y = cy + r * Math.sin(angle);
				if (i === 0) c.moveTo(x, y);
				else c.lineTo(x, y);
			}
			c.closePath();
			c.strokeStyle = color;
			c.lineWidth = lw;
			c.stroke();

			// Fill with transparency
			const fillColor = color.replace(')', ', 0.08)').replace('rgb', 'rgba');
			c.fillStyle = fillColor;
			c.fill();
			c.setLineDash([]);
		}

		// Target (all 9s) - dotted green
		const targetSkills = Object.fromEntries(skillDimensions.map(s => [s, 9]));
		plotData(ctx, targetSkills, 'rgb(45, 138, 78)', 1.5, [4, 4]);

		// First assessment - dashed blue
		if (firstAssessment && firstAssessment.id !== latestAssessment.id) {
			plotData(ctx, firstAssessment.skills, 'rgb(56, 189, 248)', 1.5, [6, 3]);
		}

		// Latest assessment - solid yellow
		plotData(ctx, latestAssessment.skills, 'rgb(204, 255, 0)', 2, []);

		// Points for latest
		for (let i = 0; i < n; i++) {
			const dim = skillDimensions[i];
			const val = latestAssessment.skills[dim] ?? 5;
			const r = (val / 10) * radius;
			const angle = startAngle + i * angleStep;
			const x = cx + r * Math.cos(angle);
			const y = cy + r * Math.sin(angle);
			ctx.beginPath();
			ctx.arc(x, y, 3, 0, 2 * Math.PI);
			ctx.fillStyle = 'rgb(204, 255, 0)';
			ctx.fill();
		}
	}

	// Mental rating line chart
	let mentalCanvas: HTMLCanvasElement | undefined = $state();

	$effect(() => {
		if (!mentalCanvas || journalEntries.length === 0) return;
		drawMentalChart(mentalCanvas);
	});

	function drawMentalChart(canvas: HTMLCanvasElement) {
		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		const entries = [...journalEntries].reverse(); // oldest first
		if (entries.length === 0) return;

		const dpr = browser ? window.devicePixelRatio || 1 : 1;
		const w = canvas.parentElement?.clientWidth ?? 500;
		const h = 200;
		canvas.width = w * dpr;
		canvas.height = h * dpr;
		canvas.style.width = w + 'px';
		canvas.style.height = h + 'px';
		ctx.scale(dpr, dpr);
		ctx.clearRect(0, 0, w, h);

		const padL = 35;
		const padR = 15;
		const padT = 15;
		const padB = 30;
		const chartW = w - padL - padR;
		const chartH = h - padT - padB;

		// Grid lines
		for (let v = 0; v <= 10; v += 2) {
			const y = padT + chartH - (v / 10) * chartH;
			ctx.beginPath();
			ctx.moveTo(padL, y);
			ctx.lineTo(padL + chartW, y);
			ctx.strokeStyle = 'rgba(148, 163, 184, 0.1)';
			ctx.lineWidth = 1;
			ctx.stroke();

			ctx.fillStyle = 'rgba(148, 163, 184, 0.5)';
			ctx.font = '10px Inter, sans-serif';
			ctx.textAlign = 'right';
			ctx.fillText(v.toString(), padL - 6, y + 3);
		}

		// Plot line
		const points: Array<{ x: number; y: number }> = [];
		for (let i = 0; i < entries.length; i++) {
			const x = padL + (entries.length === 1 ? chartW / 2 : (i / (entries.length - 1)) * chartW);
			const y = padT + chartH - (entries[i].mentalRating / 10) * chartH;
			points.push({ x, y });
		}

		// Area fill
		if (points.length > 1) {
			ctx.beginPath();
			ctx.moveTo(points[0].x, padT + chartH);
			for (const p of points) ctx.lineTo(p.x, p.y);
			ctx.lineTo(points[points.length - 1].x, padT + chartH);
			ctx.closePath();
			const gradient = ctx.createLinearGradient(0, padT, 0, padT + chartH);
			gradient.addColorStop(0, 'rgba(204, 255, 0, 0.15)');
			gradient.addColorStop(1, 'rgba(204, 255, 0, 0)');
			ctx.fillStyle = gradient;
			ctx.fill();
		}

		// Line
		ctx.beginPath();
		for (let i = 0; i < points.length; i++) {
			if (i === 0) ctx.moveTo(points[i].x, points[i].y);
			else ctx.lineTo(points[i].x, points[i].y);
		}
		ctx.strokeStyle = 'rgb(204, 255, 0)';
		ctx.lineWidth = 2;
		ctx.stroke();

		// Dots
		for (const p of points) {
			ctx.beginPath();
			ctx.arc(p.x, p.y, 4, 0, 2 * Math.PI);
			ctx.fillStyle = 'rgb(204, 255, 0)';
			ctx.fill();
			ctx.beginPath();
			ctx.arc(p.x, p.y, 2, 0, 2 * Math.PI);
			ctx.fillStyle = '#1a1f2e';
			ctx.fill();
		}

		// X-axis labels
		ctx.fillStyle = 'rgba(148, 163, 184, 0.5)';
		ctx.font = '9px Inter, sans-serif';
		ctx.textAlign = 'center';
		const step = Math.max(1, Math.floor(entries.length / 6));
		for (let i = 0; i < entries.length; i += step) {
			const date = new Date(entries[i].date + 'T12:00:00');
			const label = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
			ctx.fillText(label, points[i].x, h - 6);
		}
	}

	// UE bar chart
	let ueCanvas: HTMLCanvasElement | undefined = $state();

	$effect(() => {
		if (!ueCanvas || journalEntries.length === 0) return;
		drawUEChart(ueCanvas);
	});

	function drawUEChart(canvas: HTMLCanvasElement) {
		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		const entries = [...journalEntries].reverse(); // oldest first
		if (entries.length === 0) return;

		const dpr = browser ? window.devicePixelRatio || 1 : 1;
		const w = canvas.parentElement?.clientWidth ?? 500;
		const h = 180;
		canvas.width = w * dpr;
		canvas.height = h * dpr;
		canvas.style.width = w + 'px';
		canvas.style.height = h + 'px';
		ctx.scale(dpr, dpr);
		ctx.clearRect(0, 0, w, h);

		const padL = 35;
		const padR = 15;
		const padT = 15;
		const padB = 30;
		const chartW = w - padL - padR;
		const chartH = h - padT - padB;

		const maxUE = Math.max(...entries.map(e => e.unforcedErrors), 10);

		// Grid
		for (let v = 0; v <= maxUE; v += Math.max(1, Math.ceil(maxUE / 5))) {
			const y = padT + chartH - (v / maxUE) * chartH;
			ctx.beginPath();
			ctx.moveTo(padL, y);
			ctx.lineTo(padL + chartW, y);
			ctx.strokeStyle = 'rgba(148, 163, 184, 0.1)';
			ctx.lineWidth = 1;
			ctx.stroke();
			ctx.fillStyle = 'rgba(148, 163, 184, 0.5)';
			ctx.font = '10px Inter, sans-serif';
			ctx.textAlign = 'right';
			ctx.fillText(v.toString(), padL - 6, y + 3);
		}

		// Bars
		const barGap = 4;
		const totalBarSpace = chartW - (entries.length - 1) * barGap;
		const barWidth = Math.min(30, Math.max(6, totalBarSpace / entries.length));
		const totalWidth = entries.length * barWidth + (entries.length - 1) * barGap;
		const offsetX = padL + (chartW - totalWidth) / 2;

		for (let i = 0; i < entries.length; i++) {
			const ue = entries[i].unforcedErrors;
			const barH = (ue / maxUE) * chartH;
			const x = offsetX + i * (barWidth + barGap);
			const y = padT + chartH - barH;

			// Gradient bar
			const gradient = ctx.createLinearGradient(x, y, x, padT + chartH);
			gradient.addColorStop(0, 'rgba(248, 113, 113, 0.9)');
			gradient.addColorStop(1, 'rgba(248, 113, 113, 0.3)');
			ctx.fillStyle = gradient;

			ctx.beginPath();
			const cornerR = Math.min(3, barWidth / 2);
			ctx.roundRect(x, y, barWidth, barH, [cornerR, cornerR, 0, 0]);
			ctx.fill();

			// X labels
			if (entries.length <= 12 || i % Math.ceil(entries.length / 8) === 0) {
				const date = new Date(entries[i].date + 'T12:00:00');
				const label = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
				ctx.fillStyle = 'rgba(148, 163, 184, 0.5)';
				ctx.font = '9px Inter, sans-serif';
				ctx.textAlign = 'center';
				ctx.fillText(label, x + barWidth / 2, h - 6);
			}
		}
	}

	// Win/loss from journal
	let winLoss = $derived.by(() => {
		let wins = 0, losses = 0;
		for (const e of journalEntries) {
			const sets = e.score.trim().split(/[,\s]+/).filter((s: string) => /^\d+-\d+$/.test(s));
			let pw = 0, ow = 0;
			for (const set of sets) {
				const [a, b] = set.split('-').map(Number);
				if (a > b) pw++;
				else if (b > a) ow++;
			}
			if (pw > ow) wins++;
			else if (ow > pw) losses++;
		}
		return { wins, losses };
	});

	// Save assessment
	function handleSaveAssessment() {
		progressStore.addSkillAssessment({
			id: Date.now().toString(),
			date: new Date().toISOString().split('T')[0],
			skills: { ...assessmentSkills }
		});
		showAssessmentForm = false;
		// Reset
		assessmentSkills = Object.fromEntries(skillDimensions.map(s => [s, 5]));
	}

	function formatDateShort(dateStr: string): string {
		try {
			return new Date(dateStr + 'T12:00:00').toLocaleDateString('en-US', {
				month: 'short',
				day: 'numeric',
				year: 'numeric'
			});
		} catch {
			return dateStr;
		}
	}

	function assessmentAvg(skills: Record<string, number>): string {
		const vals = Object.values(skills);
		if (vals.length === 0) return '0';
		return (vals.reduce((a, b) => a + b, 0) / vals.length).toFixed(1);
	}

	let checkedCount = $derived(equipmentItems.filter(i => equipmentChecked[i.id]).length);

	const dayLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

	// === Data Backup & Restore ===
	let fileInput: HTMLInputElement | undefined = $state();
	let importPreview = $state<{
		exportDate: string;
		journalCount: number;
		activityCount: number;
		assessmentCount: number;
		raw: any;
	} | null>(null);
	let importError = $state('');
	let exportSuccess = $state(false);

	let lastBackupDate = $derived.by(() => {
		if (!browser) return null;
		const stored = localStorage.getItem('tennisedge-last-backup');
		return stored ? stored : null;
	});

	let backupOverdue = $derived.by(() => {
		if (!lastBackupDate) return true;
		const last = new Date(lastBackupDate);
		const now = new Date();
		const diffDays = (now.getTime() - last.getTime()) / (1000 * 60 * 60 * 24);
		return diffDays > 7;
	});

	function exportData() {
		const data = {
			progress: JSON.parse(localStorage.getItem('tennisedge-progress') || '{}'),
			journal: JSON.parse(localStorage.getItem('tennisedge-journal') || '[]'),
			settings: JSON.parse(localStorage.getItem('tennisedge-settings') || '{}'),
			exportDate: new Date().toISOString(),
			version: '1.0'
		};
		const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = `tennisedge-backup-${new Date().toISOString().slice(0, 10)}.json`;
		a.click();
		URL.revokeObjectURL(url);

		// Record backup date
		localStorage.setItem('tennisedge-last-backup', new Date().toISOString());
		exportSuccess = true;
		setTimeout(() => { exportSuccess = false; }, 3000);
	}

	function handleFileSelect(event: Event) {
		const target = event.target as HTMLInputElement;
		const file = target.files?.[0];
		if (!file) return;

		importError = '';
		importPreview = null;

		const reader = new FileReader();
		reader.onload = (e) => {
			try {
				const data = JSON.parse(e.target?.result as string);

				// Validate structure
				if (!data || typeof data !== 'object') {
					throw new Error('Invalid file format');
				}
				if (!('progress' in data) || !('journal' in data) || !('settings' in data)) {
					throw new Error('Missing required data keys (progress, journal, settings)');
				}

				const journalCount = Array.isArray(data.journal) ? data.journal.length : 0;
				const activityCount = data.progress?.completedActivities
					? Object.keys(data.progress.completedActivities).length
					: 0;
				const assessmentCount = Array.isArray(data.progress?.assessments)
					? data.progress.assessments.length
					: 0;

				importPreview = {
					exportDate: data.exportDate || 'Unknown',
					journalCount,
					activityCount,
					assessmentCount,
					raw: data
				};
			} catch (err) {
				importError = err instanceof Error ? err.message : 'Failed to parse backup file';
			}
		};
		reader.onerror = () => {
			importError = 'Failed to read file';
		};
		reader.readAsText(file);
	}

	function confirmImport() {
		if (!importPreview?.raw) return;

		try {
			const data = importPreview.raw;
			localStorage.setItem('tennisedge-progress', JSON.stringify(data.progress));
			localStorage.setItem('tennisedge-journal', JSON.stringify(data.journal));
			localStorage.setItem('tennisedge-settings', JSON.stringify(data.settings));

			// Reload to apply
			window.location.reload();
		} catch (err) {
			importError = 'Failed to restore data. Please try again.';
		}
	}

	function cancelImport() {
		importPreview = null;
		importError = '';
		if (fileInput) fileInput.value = '';
	}

	function formatBackupDate(isoStr: string): string {
		try {
			return new Date(isoStr).toLocaleDateString('en-US', {
				month: 'short',
				day: 'numeric',
				year: 'numeric',
				hour: 'numeric',
				minute: '2-digit'
			});
		} catch {
			return isoStr;
		}
	}
</script>

<svelte:head>
	<title>Progress | TennisEdge</title>
</svelte:head>

<div class="space-y-6 animate-slide-up">
	<!-- Header -->
	<div>
		<h1 class="text-3xl font-bold text-text-primary tracking-tight">Your Progress</h1>
		<p class="text-text-secondary mt-1">
			{#if streakInfo.current > 0}
				{streakInfo.current}-day streak and counting. Keep pushing.
			{:else}
				Every champion started at day one. Let's build momentum.
			{/if}
		</p>
	</div>

	<!-- Data Info Banner -->
	<div class="flex items-start gap-3 rounded-xl bg-accent-blue/10 border border-accent-blue/20 px-4 py-3">
		<svg class="w-5 h-5 text-accent-blue shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
			<circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>
		</svg>
		<p class="text-sm text-text-secondary">
			Your training data is stored locally on this device. Use the <a href="#data-backup" class="text-accent-blue hover:underline font-medium">backup feature</a> below to save your progress and transfer it between devices.
		</p>
	</div>

	<!-- Quick Stats Row -->
	<div class="grid grid-cols-2 md:grid-cols-4 gap-3">
		<div class="glass-card p-4 text-center">
			<div class="flex items-center justify-center gap-1.5 mb-1">
				<svg class="w-5 h-5 text-accent-orange" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
				</svg>
			</div>
			<p class="text-2xl font-bold text-accent-orange">{streakInfo.current}</p>
			<p class="text-xs text-text-muted mt-0.5">Current Streak</p>
		</div>
		<div class="glass-card p-4 text-center">
			<div class="flex items-center justify-center gap-1.5 mb-1">
				<svg class="w-5 h-5 text-court-green" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
				</svg>
			</div>
			<p class="text-2xl font-bold text-court-green">{totalTrainingDays}</p>
			<p class="text-xs text-text-muted mt-0.5">Training Days</p>
		</div>
		<div class="glass-card p-4 text-center">
			<div class="flex items-center justify-center gap-1.5 mb-1">
				<svg class="w-5 h-5 text-accent-blue" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
				</svg>
			</div>
			<p class="text-2xl font-bold text-accent-blue">{journalEntries.length}</p>
			<p class="text-xs text-text-muted mt-0.5">Journal Entries</p>
		</div>
		<div class="glass-card p-4 text-center">
			<div class="flex items-center justify-center gap-1.5 mb-1">
				<svg class="w-5 h-5 text-accent-purple" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
				</svg>
			</div>
			<p class="text-2xl font-bold text-accent-purple">{weeksActive}</p>
			<p class="text-xs text-text-muted mt-0.5">Weeks Active</p>
		</div>
	</div>

	<!-- Skill Assessment Section -->
	<section class="space-y-4">
		<div class="flex items-center justify-between flex-wrap gap-3">
			<h2 class="text-xl font-bold text-text-primary flex items-center gap-2">
				<svg class="w-5 h-5 text-ball-yellow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<path d="M22 11.08V12a10 10 0 11-5.93-9.14"/>
					<polyline points="22 4 12 14.01 9 11.01"/>
				</svg>
				Skill Assessment
			</h2>
			<button
				onclick={() => { showAssessmentForm = !showAssessmentForm; }}
				class="flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-sm transition-all duration-200
					{showAssessmentForm
						? 'bg-surface-light text-text-secondary hover:bg-surface-lighter'
						: 'bg-ball-yellow text-surface-card shadow-lg shadow-ball-yellow/20 hover:shadow-ball-yellow/40'}"
			>
				{#if showAssessmentForm}
					<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
					</svg>
					Cancel
				{:else}
					<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
					</svg>
					Take Assessment
				{/if}
			</button>
		</div>

		<!-- Assessment Form -->
		{#if showAssessmentForm}
			<div class="glass-card glow-yellow p-6 space-y-5 animate-slide-up">
				<h3 class="text-lg font-bold text-text-primary">Rate Your Current Level</h3>
				<p class="text-xs text-text-muted -mt-3">KNLTB skill dimensions - rate yourself honestly from 1-10</p>

				<div class="space-y-4">
					{#each skillDimensions as dim}
						<div>
							<div class="flex items-center justify-between mb-1">
								<label class="text-sm font-medium text-text-secondary" for="skill-{dim.replace(/\s+/g, '-').toLowerCase()}">{dim}</label>
								<span class="text-sm font-bold text-ball-yellow">{assessmentSkills[dim]}</span>
							</div>
							<input
								type="range"
								id="skill-{dim.replace(/\s+/g, '-').toLowerCase()}"
								bind:value={assessmentSkills[dim]}
								min="1"
								max="10"
								step="1"
								class="w-full h-2 rounded-full appearance-none cursor-pointer bg-surface-lighter accent-ball-yellow"
							/>
							<div class="flex justify-between text-[9px] text-text-muted mt-0.5">
								<span>1 (Level 9)</span>
								<span>3 (Level 8)</span>
								<span>5 (Level 7)</span>
								<span>7 (Level 6)</span>
								<span>9 (Goal)</span>
								<span>10 (4+)</span>
							</div>
						</div>
					{/each}
				</div>

				<div class="flex items-center gap-3 pt-2">
					<button
						onclick={handleSaveAssessment}
						class="px-6 py-2.5 rounded-xl bg-ball-yellow text-surface-card font-semibold text-sm shadow-lg shadow-ball-yellow/20 hover:shadow-ball-yellow/40 transition-all duration-200"
					>
						Save Assessment
					</button>
					<button
						onclick={() => (showAssessmentForm = false)}
						class="px-6 py-2.5 rounded-xl bg-surface-light text-text-secondary font-semibold text-sm hover:bg-surface-lighter transition-colors"
					>
						Cancel
					</button>
				</div>
			</div>
		{/if}

		<!-- Assessment History -->
		{#if assessments.length > 0}
			<!-- Radar Chart -->
			<div class="glass-card p-6 space-y-4">
				<h3 class="text-sm font-bold text-text-primary uppercase tracking-wider">Skill Radar</h3>

				<!-- Legend -->
				<div class="flex flex-wrap gap-4 text-xs">
					<div class="flex items-center gap-1.5">
						<span class="w-5 h-0.5 bg-ball-yellow rounded"></span>
						<span class="text-text-secondary">Latest</span>
					</div>
					{#if firstAssessment && latestAssessment && firstAssessment.id !== latestAssessment.id}
						<div class="flex items-center gap-1.5">
							<span class="w-5 h-0.5 bg-accent-blue rounded border-dashed border-b border-accent-blue"></span>
							<span class="text-text-secondary">First</span>
						</div>
					{/if}
					<div class="flex items-center gap-1.5">
						<span class="w-5 h-0.5 bg-court-green rounded opacity-60" style="border-bottom: 1px dotted rgb(45, 138, 78);"></span>
						<span class="text-text-secondary">Target (9)</span>
					</div>
				</div>

				<div class="flex justify-center">
					<canvas bind:this={radarCanvas} class="max-w-[400px] w-full"></canvas>
				</div>
			</div>

			<!-- Assessment Table -->
			<div class="glass-card p-5">
				<h3 class="text-sm font-bold text-text-primary uppercase tracking-wider mb-3">Assessment History</h3>
				<div class="overflow-x-auto">
					<table class="w-full text-sm">
						<thead>
							<tr class="border-b border-white/10">
								<th class="text-left py-2 px-2 text-xs font-semibold text-text-muted">Date</th>
								<th class="text-center py-2 px-2 text-xs font-semibold text-text-muted">Avg Score</th>
								<th class="text-right py-2 px-2 text-xs font-semibold text-text-muted">Strongest</th>
								<th class="text-right py-2 px-2 text-xs font-semibold text-text-muted">Weakest</th>
							</tr>
						</thead>
						<tbody>
							{#each assessments as a (a.id)}
								{@const entries_arr = Object.entries(a.skills)}
								{@const sorted = entries_arr.slice().sort((x, y) => y[1] - x[1])}
								{@const strongest = sorted[0]}
								{@const weakest = sorted[sorted.length - 1]}
								<tr class="border-b border-white/5 hover:bg-white/[0.02]">
									<td class="py-2 px-2 text-text-secondary">{formatDateShort(a.date)}</td>
									<td class="py-2 px-2 text-center">
										<span class="font-bold text-ball-yellow">{assessmentAvg(a.skills)}</span>
									</td>
									<td class="py-2 px-2 text-right text-text-muted text-xs">
										{#if strongest}
											<span class="text-success">{strongest[0]}</span> <span class="font-mono text-success">({strongest[1]})</span>
										{/if}
									</td>
									<td class="py-2 px-2 text-right text-text-muted text-xs">
										{#if weakest}
											<span class="text-accent-red">{weakest[0]}</span> <span class="font-mono text-accent-red">({weakest[1]})</span>
										{/if}
									</td>
								</tr>
							{/each}
						</tbody>
					</table>
				</div>
			</div>
		{:else}
			<div class="glass-card p-8 text-center">
				<svg class="w-12 h-12 mx-auto text-text-muted mb-3 opacity-40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
					<path d="M22 11.08V12a10 10 0 11-5.93-9.14"/>
					<polyline points="22 4 12 14.01 9 11.01"/>
				</svg>
				<p class="text-text-secondary font-medium">No assessments yet</p>
				<p class="text-text-muted text-sm mt-1">Take your first assessment to start tracking skill development</p>
			</div>
		{/if}
	</section>

	<!-- Training Log (Heatmap) -->
	<section class="space-y-4">
		<h2 class="text-xl font-bold text-text-primary flex items-center gap-2">
			<svg class="w-5 h-5 text-court-green" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
				<rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/>
				<line x1="9" y1="3" x2="9" y2="21"/>
			</svg>
			Training Log
		</h2>
		<p class="text-xs text-text-muted -mt-2">Activity heatmap - last 90 days</p>

		<div class="glass-card p-5">
			<div class="flex gap-1">
				<!-- Day labels -->
				<div class="flex flex-col gap-1 pr-2 shrink-0">
					{#each dayLabels as label, i}
						<div class="h-3 flex items-center">
							{#if i % 2 === 0}
								<span class="text-[9px] text-text-muted leading-none">{label}</span>
							{/if}
						</div>
					{/each}
				</div>

				<!-- Week columns -->
				<div class="flex gap-1 flex-1 overflow-x-auto">
					{#each heatmapWeeks as week}
						<div class="flex flex-col gap-1">
							{#each week as day}
								{#if day}
									<div
										class="w-3 h-3 rounded-sm {heatmapColor(day.count)} transition-colors"
										title="{day.date}: {day.count} activities"
									></div>
								{:else}
									<div class="w-3 h-3"></div>
								{/if}
							{/each}
						</div>
					{/each}
				</div>
			</div>

			<!-- Legend -->
			<div class="flex items-center gap-2 mt-3 justify-end text-[10px] text-text-muted">
				<span>Less</span>
				<div class="w-3 h-3 rounded-sm bg-surface-card"></div>
				<div class="w-3 h-3 rounded-sm bg-court-green-dark"></div>
				<div class="w-3 h-3 rounded-sm bg-court-green"></div>
				<div class="w-3 h-3 rounded-sm bg-ball-yellow"></div>
				<span>More</span>
			</div>
		</div>
	</section>

	<!-- Match Performance -->
	{#if journalEntries.length > 0}
		<section class="space-y-4">
			<h2 class="text-xl font-bold text-text-primary flex items-center gap-2">
				<svg class="w-5 h-5 text-accent-purple" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
				</svg>
				Match Performance
			</h2>

			<!-- Win/Loss Summary -->
			<div class="grid grid-cols-3 gap-3">
				<div class="glass-card p-4 text-center">
					<p class="text-2xl font-bold text-success">{winLoss.wins}</p>
					<p class="text-xs text-text-muted mt-0.5">Wins</p>
				</div>
				<div class="glass-card p-4 text-center">
					<p class="text-2xl font-bold text-accent-red">{winLoss.losses}</p>
					<p class="text-xs text-text-muted mt-0.5">Losses</p>
				</div>
				<div class="glass-card p-4 text-center">
					<p class="text-2xl font-bold text-text-secondary">
						{winLoss.wins + winLoss.losses > 0
							? Math.round((winLoss.wins / (winLoss.wins + winLoss.losses)) * 100)
							: 0}%
					</p>
					<p class="text-xs text-text-muted mt-0.5">Win Rate</p>
				</div>
			</div>

			<!-- Mental Rating Line Chart -->
			<div class="glass-card p-5 space-y-3">
				<h3 class="text-sm font-bold text-text-primary uppercase tracking-wider">Mental Rating Trend</h3>
				<div>
					<canvas bind:this={mentalCanvas}></canvas>
				</div>
			</div>

			<!-- UE Bar Chart -->
			<div class="glass-card p-5 space-y-3">
				<h3 class="text-sm font-bold text-text-primary uppercase tracking-wider">Unforced Errors Trend</h3>
				<div>
					<canvas bind:this={ueCanvas}></canvas>
				</div>
			</div>
		</section>
	{/if}

	<!-- Equipment Checklist -->
	<section class="space-y-4">
		<h2 class="text-xl font-bold text-text-primary flex items-center gap-2">
			<svg class="w-5 h-5 text-accent-orange" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
				<path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/>
				<polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/>
			</svg>
			Equipment Checklist
		</h2>
		<p class="text-xs text-text-muted -mt-2">Recommended purchases for your training setup</p>

		<div class="glass-card p-5">
			<div class="space-y-2">
				{#each equipmentItems as item}
					{@const checked = equipmentChecked[item.id] ?? false}
					<button
						onclick={() => toggleEquipment(item.id)}
						class="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-white/[0.03] transition-colors text-left cursor-pointer"
					>
						<div class="w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 transition-all duration-200
							{checked ? 'bg-court-green border-court-green' : 'border-white/20'}">
							{#if checked}
								<svg class="w-3 h-3 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
									<polyline points="20 6 9 17 4 12"/>
								</svg>
							{/if}
						</div>
						<span class="flex-1 text-sm {checked ? 'text-text-muted line-through' : 'text-text-primary'}">
							{item.name}
						</span>
						<span class="text-xs font-mono {checked ? 'text-text-muted' : 'text-text-secondary'}">
							{item.price}
						</span>
					</button>
				{/each}
			</div>

			<div class="mt-4 pt-3 border-t border-white/5">
				<div class="progress-bar">
					<div
						class="progress-bar-fill bg-court-green"
						style="width: {(checkedCount / equipmentItems.length) * 100}%"
					></div>
				</div>
				<p class="text-xs text-text-muted mt-2 text-center">
					{checkedCount} of {equipmentItems.length} items acquired
				</p>
			</div>
		</div>
	</section>

	<!-- Data Backup Section -->
	<section id="data-backup" class="space-y-4">
		<h2 class="text-xl font-bold text-text-primary flex items-center gap-2">
			<svg class="w-5 h-5 text-accent-blue" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
				<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
			</svg>
			Data Backup
		</h2>
		<p class="text-xs text-text-muted -mt-2">Export and import your training data to keep it safe</p>

		<!-- Auto-backup reminder -->
		{#if backupOverdue}
			<div class="flex items-start gap-3 rounded-xl bg-warning/10 border border-warning/20 px-4 py-3">
				<svg class="w-5 h-5 text-warning shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
					<line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
				</svg>
				<div>
					<p class="text-sm font-medium text-warning">
						{#if !lastBackupDate}
							You have never backed up your data
						{:else}
							Your last backup was more than 7 days ago
						{/if}
					</p>
					<p class="text-xs text-text-muted mt-0.5">Export a backup to keep your training data safe.</p>
				</div>
			</div>
		{/if}

		<div class="glass-card p-6 space-y-5">
			<!-- Last backup status -->
			<div class="flex items-center gap-3">
				<div class="w-2.5 h-2.5 rounded-full {lastBackupDate ? 'bg-success' : 'bg-warning'} shrink-0"></div>
				<p class="text-sm text-text-secondary">
					{#if lastBackupDate}
						Last backup: <span class="font-medium text-text-primary">{formatBackupDate(lastBackupDate)}</span>
					{:else}
						<span class="text-warning font-medium">No backup on record</span>
					{/if}
				</p>
			</div>

			<!-- Export / Import buttons -->
			<div class="flex flex-wrap gap-3">
				<button
					onclick={exportData}
					class="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-court-green text-white font-semibold text-sm shadow-lg shadow-court-green/20 hover:shadow-court-green/40 transition-all duration-200"
				>
					<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
					</svg>
					Export Backup
				</button>

				<button
					onclick={() => fileInput?.click()}
					class="flex items-center gap-2 px-5 py-2.5 rounded-xl border-2 border-white/15 text-text-secondary font-semibold text-sm hover:bg-white/[0.04] transition-all duration-200"
				>
					<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
					</svg>
					Import Backup
				</button>

				<input
					bind:this={fileInput}
					type="file"
					accept=".json"
					onchange={handleFileSelect}
					class="hidden"
				/>
			</div>

			<!-- Export success message -->
			{#if exportSuccess}
				<div class="flex items-center gap-2 text-sm text-success animate-slide-up">
					<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
					</svg>
					Backup exported successfully!
				</div>
			{/if}

			<!-- Import error -->
			{#if importError}
				<div class="flex items-start gap-2 rounded-lg bg-danger/10 border border-danger/20 px-4 py-3 animate-slide-up">
					<svg class="w-4 h-4 text-danger shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>
					</svg>
					<div>
						<p class="text-sm font-medium text-danger">Import failed</p>
						<p class="text-xs text-text-muted mt-0.5">{importError}</p>
					</div>
				</div>
			{/if}

			<!-- Import preview -->
			{#if importPreview}
				<div class="rounded-xl bg-surface-light/50 border border-white/10 p-5 space-y-4 animate-slide-up">
					<h4 class="text-sm font-bold text-text-primary flex items-center gap-2">
						<svg class="w-4 h-4 text-accent-blue" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
						</svg>
						Backup Preview
					</h4>

					<div class="text-sm text-text-secondary space-y-1.5">
						<p>Backup from: <span class="font-medium text-text-primary">
							{importPreview.exportDate !== 'Unknown' ? formatBackupDate(importPreview.exportDate) : 'Unknown date'}
						</span></p>
						<div class="flex flex-wrap gap-3 mt-2">
							<span class="badge bg-accent-blue/20 text-accent-blue">{importPreview.journalCount} journal entries</span>
							<span class="badge bg-court-green/20 text-court-green">{importPreview.activityCount} training days</span>
							<span class="badge bg-ball-yellow/20 text-ball-yellow">{importPreview.assessmentCount} skill assessments</span>
						</div>
					</div>

					<div class="flex items-start gap-2 rounded-lg bg-warning/10 border border-warning/20 px-3 py-2">
						<svg class="w-4 h-4 text-warning shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
							<line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
						</svg>
						<p class="text-xs text-text-muted">This will replace all current data. The page will reload after import.</p>
					</div>

					<div class="flex gap-3">
						<button
							onclick={confirmImport}
							class="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-court-green text-white font-semibold text-sm shadow-lg shadow-court-green/20 hover:shadow-court-green/40 transition-all duration-200"
						>
							<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
								<polyline points="20 6 9 17 4 12"/>
							</svg>
							Confirm Import
						</button>
						<button
							onclick={cancelImport}
							class="px-5 py-2.5 rounded-xl bg-surface-light text-text-secondary font-semibold text-sm hover:bg-surface-lighter transition-colors"
						>
							Cancel
						</button>
					</div>
				</div>
			{/if}
		</div>
	</section>
</div>
