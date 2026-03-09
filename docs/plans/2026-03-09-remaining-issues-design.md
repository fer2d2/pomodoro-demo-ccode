# Design: Remaining Issues (#5, #7, #8, #9)

## Issue #5 — TimeInput Component

**Component:** `TimeInput` with stepper controls using existing `IconButton`.

Props: `label`, `value`, `onChange`, `min` (default 1), `max` (default 60), `step` (default 1).

- Label: uppercase, Inter 12px, weight 500, letter-spacing 0.5, color `text-secondary`
- Row: IconButton(minus) + value display (64px, mono, "NN min") + IconButton(plus)
- Gap 8px between elements, vertical layout gap 8px

## Issue #7 — Layout Components

### SoundToggle
Props: `enabled`, `onToggle`.
- Row: Lucide volume-2/volume-x (14px, accent) + label "Sound" (Inter 12px, text-secondary)
- Gap 6px, clickable

### SessionCounter
Props: `current` (0-4), `total` (default 4).
- Row: SessionDots (active up to current) + label "n/4" (Inter 12px, 500, text-secondary)
- Gap 6px

### Card
Props: `children`, standard div attributes.
- bg-card, rounded-xl (20px), p-[40px], border border-border
- Vertical layout, gap-[32px], w-[420px]

## Issue #8 — Complete /design-system Page

Add sections for Inputs (TimeInput) and Layout (SoundToggle, SessionCounter, Card).

## Issue #9 — Main Pomodoro App

### Timer Logic (usePomodoro hook)
- States: idle, running, paused
- Modes: focus (default 25min), break (default 5min)
- 4-session cycle, auto-switch focus→break→focus
- Start/pause toggle, reset to current mode duration
- Sound toggle (stored in state, no actual audio needed yet)

### Page Composition
Root `/` page with Card containing:
1. Header: "Pomodoro" Fraunces 32px + "stay focused, stay fresh" Inter 13px
2. TabBar: Focus (Brain) / Break (Coffee)
3. TimerRing: countdown display
4. Actions: Start/Pause (primary, 140px) + Reset (secondary, 140px)
5. Divider
6. Settings: TimeInput "Focus Time" + TimeInput "Break Time"
7. Footer: SoundToggle (left) + SessionCounter (right)
