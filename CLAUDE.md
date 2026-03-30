# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

TennisEdge is a comprehensive tennis training Progressive Web App for a 54-year-old KNLTB 7 player aiming to reach KNLTB 5 within a year. It includes training programs, exercise libraries, match journaling, mental training, tactical knowledge, and progress tracking.

## Commands

```bash
npm run dev          # Start dev server (http://localhost:5173)
npm run build        # Production build to ./build
npm run preview      # Preview production build
```

No tests, linting, or CI configured yet.

## Tech Stack

- **Framework**: SvelteKit 2 with Svelte 5 (runes syntax)
- **Styling**: Tailwind CSS 4 via `@tailwindcss/vite`
- **Charts**: Chart.js 4 (also manual SVG/Canvas charts in some components)
- **Deployment**: Static adapter (`@sveltejs/adapter-static`) - output to `./build`
- **State**: localStorage-backed Svelte 5 `$state` stores (no backend)

## Architecture

### Svelte 5 Runes (IMPORTANT)
This project uses **Svelte 5 runes** exclusively. Never use old Svelte 4 syntax:
- Use `$state()` not `let x = ...` with reactivity
- Use `$derived()` not `$:`
- Use `$effect()` not `$:` for side effects
- Use `$props()` not `export let`
- Use `onclick` not `on:click`

### Custom Theme Colors (defined in `src/app.css` @theme)
court-green, ball-yellow, clay, surface, surface-light, surface-card, text-primary, text-secondary, text-muted, accent-blue, accent-purple, accent-red, accent-orange, success, warning, danger

### Custom CSS Classes
glass-card, glow-green, glow-yellow, badge, progress-bar, progress-bar-fill, animate-slide-up

### Data Layer (`src/lib/data/`)
- `types.ts` - All TypeScript interfaces
- `exercises.ts` - 100+ exercises (gym, home, prehab, footwork, micro-workouts)
- `drills.ts` - Tennis drills (wall, partner, pattern, serve+1, conditioning)
- `schedule.ts` - Weekly schedule templates and gym rotations

### Stores (`src/lib/stores/`)
All stores use localStorage persistence with Svelte 5 `$state` runes:
- `progress.ts` - Activity completion tracking, streaks, skill assessments
- `journal.ts` - Match journal entries (CRUD)
- `settings.ts` - User preferences (week, phase, gym rotation)

### Components (`src/lib/components/`)
Reusable UI: Nav, ExerciseCard, Timer, Checklist, VideoEmbed, CourtDiagram, ProgressChart

### Routes (`src/routes/`)
8 main pages: Dashboard (/), Schedule, Exercises, Program, Knowledge, Mental, Journal, Progress

## Player Context
- KNLTB 7 → targeting KNLTB 5 (NTRP 3.0-3.5 → 4.0-4.5)
- Plays Monday (singles), Tuesday (coached), Thursday (singles), Saturday (competition)
- Gym Sunday (2 hours, A/B/C rotation)
- Works from home 3-4 days/week - micro-workouts during day
- Right-handed, one-handed backhand, prefers clay, aggressive baseliner
- Injury-prone (muscle injuries from explosive movements)
- Spring competition: Saturdays, mix doubles, started March 29, 2026

## Research Documents
Comprehensive research files are in `./research/`:
- `training-programs-methodology-research.md`
- `tennis-fitness-50plus.md`
- `mental-training-strategy-analysis.md`
