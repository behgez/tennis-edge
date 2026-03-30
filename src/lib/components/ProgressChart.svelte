<script lang="ts">
	import { browser } from '$app/environment';
	import {
		Chart,
		CategoryScale,
		LinearScale,
		RadialLinearScale,
		PointElement,
		LineElement,
		BarElement,
		ArcElement,
		Filler,
		Tooltip,
		Legend,
		type ChartType,
		type ChartData,
		type ChartOptions
	} from 'chart.js';

	// Register all needed Chart.js components
	Chart.register(
		CategoryScale,
		LinearScale,
		RadialLinearScale,
		PointElement,
		LineElement,
		BarElement,
		ArcElement,
		Filler,
		Tooltip,
		Legend
	);

	let {
		type = 'line',
		data,
		options = {},
		height = 300
	}: {
		type?: 'line' | 'bar' | 'radar';
		data: ChartData;
		options?: ChartOptions;
		height?: number;
	} = $props();

	let canvas: HTMLCanvasElement;
	let chart: Chart | null = null;

	// Dark theme defaults - derived so it reacts to type changes
	let darkDefaults = $derived<ChartOptions>({
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
			legend: {
				labels: {
					color: '#94a3b8',
					font: { family: 'Inter, sans-serif', size: 12 },
					padding: 16,
					usePointStyle: true,
					pointStyleWidth: 8
				}
			},
			tooltip: {
				backgroundColor: '#1e2538',
				titleColor: '#f1f5f9',
				bodyColor: '#94a3b8',
				borderColor: 'rgba(148, 163, 184, 0.15)',
				borderWidth: 1,
				padding: 12,
				cornerRadius: 8,
				titleFont: { family: 'Inter, sans-serif', weight: 600 as const },
				bodyFont: { family: 'Inter, sans-serif' },
				displayColors: true,
				boxPadding: 4
			}
		},
		scales: type === 'radar'
			? {
				r: {
					angleLines: { color: 'rgba(148, 163, 184, 0.1)' },
					grid: { color: 'rgba(148, 163, 184, 0.1)' },
					pointLabels: {
						color: '#94a3b8',
						font: { family: 'Inter, sans-serif', size: 11 }
					},
					ticks: {
						color: '#64748b',
						backdropColor: 'transparent',
						font: { size: 10 }
					}
				}
			}
			: {
				x: {
					ticks: {
						color: '#64748b',
						font: { family: 'Inter, sans-serif', size: 11 }
					},
					grid: { color: 'rgba(148, 163, 184, 0.06)' },
					border: { color: 'rgba(148, 163, 184, 0.1)' }
				},
				y: {
					ticks: {
						color: '#64748b',
						font: { family: 'Inter, sans-serif', size: 11 }
					},
					grid: { color: 'rgba(148, 163, 184, 0.06)' },
					border: { color: 'rgba(148, 163, 184, 0.1)' }
				}
			}
	});

	function mergeOptions(defaults: ChartOptions, overrides: ChartOptions): ChartOptions {
		return JSON.parse(JSON.stringify({ ...defaults, ...overrides }));
	}

	$effect(() => {
		if (!browser || !canvas) return;

		// Destroy existing chart
		if (chart) {
			chart.destroy();
			chart = null;
		}

		const mergedOptions = mergeOptions(darkDefaults, options);

		chart = new Chart(canvas, {
			type: type as ChartType,
			data: JSON.parse(JSON.stringify(data)),
			options: mergedOptions
		});

		return () => {
			if (chart) {
				chart.destroy();
				chart = null;
			}
		};
	});
</script>

<div class="w-full rounded-xl bg-surface-card/50 p-4 border border-white/5" style="height: {height}px;">
	<canvas bind:this={canvas}></canvas>
</div>
