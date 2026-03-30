<script lang="ts">
	interface Highlight {
		x: number;
		y: number;
		label?: string;
		color?: string;
	}

	interface Arrow {
		fromX: number;
		fromY: number;
		toX: number;
		toY: number;
		color?: string;
		dashed?: boolean;
	}

	interface Position {
		x: number;
		y: number;
	}

	let {
		highlights = [],
		arrows = [],
		playerPosition,
		opponentPosition
	}: {
		highlights?: Highlight[];
		arrows?: Arrow[];
		playerPosition?: Position;
		opponentPosition?: Position;
	} = $props();

	// Court dimensions (viewBox: 300x600)
	// Full court: 300 wide, 600 tall
	// Singles sidelines: 37.5 from each side (inner lines at x=37.5 and x=262.5)
	// Doubles sidelines: at x=0 and x=300
	// Baseline: y=0 (far) and y=600 (near)
	// Net: y=300
	// Service line: y=168 (far) and y=432 (near)
	// Center service line: x=150, from y=168 to y=432
	// Center mark: small mark at x=150 on each baseline

	const courtColor = 'var(--color-court-green)';
	const courtDarkColor = 'var(--color-court-green-dark)';
	const lineColor = '#ffffff';
	const lineWidth = 2;
</script>

<div class="w-full max-w-sm mx-auto">
	<svg
		viewBox="0 0 300 600"
		class="w-full h-auto rounded-xl overflow-hidden"
		style="filter: drop-shadow(0 4px 20px rgba(0, 0, 0, 0.3));"
	>
		<defs>
			<!-- Arrow marker -->
			<marker
				id="arrowhead"
				markerWidth="8"
				markerHeight="6"
				refX="7"
				refY="3"
				orient="auto"
			>
				<polygon points="0 0, 8 3, 0 6" fill="var(--color-ball-yellow)" />
			</marker>
			<marker
				id="arrowhead-blue"
				markerWidth="8"
				markerHeight="6"
				refX="7"
				refY="3"
				orient="auto"
			>
				<polygon points="0 0, 8 3, 0 6" fill="var(--color-accent-blue)" />
			</marker>
			<marker
				id="arrowhead-red"
				markerWidth="8"
				markerHeight="6"
				refX="7"
				refY="3"
				orient="auto"
			>
				<polygon points="0 0, 8 3, 0 6" fill="var(--color-accent-red)" />
			</marker>
		</defs>

		<!-- Court surface -->
		<rect x="0" y="0" width="300" height="600" fill={courtDarkColor} rx="4" />
		<!-- Playing area -->
		<rect x="10" y="10" width="280" height="580" fill={courtColor} />

		<!-- Doubles sidelines -->
		<line x1="10" y1="10" x2="10" y2="590" stroke={lineColor} stroke-width={lineWidth} />
		<line x1="290" y1="10" x2="290" y2="590" stroke={lineColor} stroke-width={lineWidth} />

		<!-- Singles sidelines -->
		<line x1="42.5" y1="10" x2="42.5" y2="590" stroke={lineColor} stroke-width={lineWidth} opacity="0.8" />
		<line x1="257.5" y1="10" x2="257.5" y2="590" stroke={lineColor} stroke-width={lineWidth} opacity="0.8" />

		<!-- Baselines -->
		<line x1="10" y1="10" x2="290" y2="10" stroke={lineColor} stroke-width={lineWidth + 1} />
		<line x1="10" y1="590" x2="290" y2="590" stroke={lineColor} stroke-width={lineWidth + 1} />

		<!-- Net -->
		<line x1="0" y1="300" x2="300" y2="300" stroke="#e2e8f0" stroke-width="3" />
		<!-- Net posts -->
		<circle cx="5" cy="300" r="4" fill="#94a3b8" />
		<circle cx="295" cy="300" r="4" fill="#94a3b8" />

		<!-- Service lines -->
		<line x1="42.5" y1="168" x2="257.5" y2="168" stroke={lineColor} stroke-width={lineWidth} />
		<line x1="42.5" y1="432" x2="257.5" y2="432" stroke={lineColor} stroke-width={lineWidth} />

		<!-- Center service line -->
		<line x1="150" y1="168" x2="150" y2="432" stroke={lineColor} stroke-width={lineWidth} />

		<!-- Center marks on baselines -->
		<line x1="150" y1="10" x2="150" y2="22" stroke={lineColor} stroke-width={lineWidth} />
		<line x1="150" y1="578" x2="150" y2="590" stroke={lineColor} stroke-width={lineWidth} />

		<!-- Highlighted zones -->
		{#each highlights as hl}
			<g>
				<circle
					cx={hl.x}
					cy={hl.y}
					r="20"
					fill={hl.color ?? 'var(--color-ball-yellow)'}
					opacity="0.25"
				/>
				<circle
					cx={hl.x}
					cy={hl.y}
					r="5"
					fill={hl.color ?? 'var(--color-ball-yellow)'}
					opacity="0.8"
				/>
				{#if hl.label}
					<text
						x={hl.x}
						y={hl.y - 26}
						text-anchor="middle"
						fill={hl.color ?? 'var(--color-ball-yellow)'}
						font-size="11"
						font-weight="600"
						font-family="Inter, sans-serif"
					>
						{hl.label}
					</text>
				{/if}
			</g>
		{/each}

		<!-- Arrows -->
		{#each arrows as arrow}
			{@const arrowColor = arrow.color ?? 'var(--color-ball-yellow)'}
			<line
				x1={arrow.fromX}
				y1={arrow.fromY}
				x2={arrow.toX}
				y2={arrow.toY}
				stroke={arrowColor}
				stroke-width="2.5"
				stroke-linecap="round"
				stroke-dasharray={arrow.dashed ? '8 4' : 'none'}
				marker-end={
					arrowColor.includes('blue') ? 'url(#arrowhead-blue)' :
					arrowColor.includes('red') ? 'url(#arrowhead-red)' :
					'url(#arrowhead)'
				}
				opacity="0.85"
			/>
		{/each}

		<!-- Player position (near side / bottom) -->
		{#if playerPosition}
			<g>
				<circle
					cx={playerPosition.x}
					cy={playerPosition.y}
					r="14"
					fill="var(--color-accent-blue)"
					opacity="0.2"
				/>
				<circle
					cx={playerPosition.x}
					cy={playerPosition.y}
					r="8"
					fill="var(--color-accent-blue)"
					stroke="#ffffff"
					stroke-width="2"
				/>
				<text
					x={playerPosition.x}
					y={playerPosition.y + 4}
					text-anchor="middle"
					fill="white"
					font-size="8"
					font-weight="700"
					font-family="Inter, sans-serif"
				>P</text>
			</g>
		{/if}

		<!-- Opponent position (far side / top) -->
		{#if opponentPosition}
			<g>
				<circle
					cx={opponentPosition.x}
					cy={opponentPosition.y}
					r="14"
					fill="var(--color-accent-red)"
					opacity="0.2"
				/>
				<circle
					cx={opponentPosition.x}
					cy={opponentPosition.y}
					r="8"
					fill="var(--color-accent-red)"
					stroke="#ffffff"
					stroke-width="2"
				/>
				<text
					x={opponentPosition.x}
					y={opponentPosition.y + 4}
					text-anchor="middle"
					fill="white"
					font-size="8"
					font-weight="700"
					font-family="Inter, sans-serif"
				>O</text>
			</g>
		{/if}
	</svg>
</div>
