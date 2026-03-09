# TimerRing Component Design

## Overview

Presentational SVG progress ring with countdown display. No timer logic — receives state via props.

## Props

```ts
type TimerRingProps = {
  timeDisplay: string;   // e.g. "25:00"
  label: string;         // e.g. "minutes remaining"
  progress: number;      // 0–1, where 1 = full ring
};
```

## Implementation

- 220x220 SVG with two `<circle>` elements (background + progress)
- Background ring: stroke `bg-surface`, thickness 6
- Progress ring: stroke `accent`, thickness 6, round linecap
- Progress via `stroke-dasharray` / `stroke-dashoffset`, rotated -90° (starts from top)
- CSS `transition` on `stroke-dashoffset` for smooth animation
- Centered text overlay: absolute positioned flexbox
  - Time: font-mono, 48px, weight 500, letter-spacing -1px, color text-primary
  - Label: font-body, 12px, normal weight, color text-secondary

## Files

- `src/components/TimerRing.tsx` — component
- `src/components/__tests__/TimerRing.test.tsx` — tests
- `src/app/design-system/page.tsx` — showcase section

## Design tokens used

- `--text-timer: 48px`, `--color-accent`, `--color-bg-surface`
- `--color-text-primary`, `--color-text-secondary`
- `--font-mono`, `--font-body`

## Pencil reference

- TimerRing: `ekX0h`, Section: `8ucPg`
