# TimerRing Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Implement a presentational TimerRing component with SVG progress ring and countdown display.

**Architecture:** Single React component with SVG circles for the ring and absolute-positioned HTML for the countdown text. Progress is controlled via `stroke-dashoffset` with CSS transition for smooth animation.

**Tech Stack:** React, TypeScript, Tailwind CSS, Vitest + Testing Library

---

### Task 1: Write TimerRing Tests (Red Phase)

**Files:**
- Create: `src/components/__tests__/TimerRing.test.tsx`

**Step 1: Write the failing tests**

```tsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { TimerRing } from "@/components/TimerRing";

describe("TimerRing", () => {
  it("renders the time display", () => {
    render(<TimerRing timeDisplay="25:00" label="minutes remaining" progress={0.75} />);
    expect(screen.getByText("25:00")).toBeInTheDocument();
  });

  it("renders the label", () => {
    render(<TimerRing timeDisplay="25:00" label="minutes remaining" progress={0.75} />);
    expect(screen.getByText("minutes remaining")).toBeInTheDocument();
  });

  it("renders two SVG circles (background + progress)", () => {
    const { container } = render(
      <TimerRing timeDisplay="25:00" label="minutes remaining" progress={0.75} />
    );
    const circles = container.querySelectorAll("circle");
    expect(circles).toHaveLength(2);
  });

  it("sets stroke-dashoffset based on progress", () => {
    const { container } = render(
      <TimerRing timeDisplay="25:00" label="minutes remaining" progress={0.75} />
    );
    const circles = container.querySelectorAll("circle");
    const progressCircle = circles[1];
    // radius=107, circumference=2*PI*107≈672.26
    const circumference = 2 * Math.PI * 107;
    const expectedOffset = circumference * (1 - 0.75);
    expect(progressCircle.style.strokeDashoffset).toBe(`${expectedOffset}`);
  });

  it("shows full ring when progress is 1", () => {
    const { container } = render(
      <TimerRing timeDisplay="25:00" label="minutes remaining" progress={1} />
    );
    const progressCircle = container.querySelectorAll("circle")[1];
    expect(progressCircle.style.strokeDashoffset).toBe("0");
  });

  it("shows empty ring when progress is 0", () => {
    const { container } = render(
      <TimerRing timeDisplay="0:00" label="minutes remaining" progress={0} />
    );
    const progressCircle = container.querySelectorAll("circle")[1];
    const circumference = 2 * Math.PI * 107;
    expect(progressCircle.style.strokeDashoffset).toBe(`${circumference}`);
  });

  it("has accessible timer role", () => {
    render(<TimerRing timeDisplay="25:00" label="minutes remaining" progress={0.75} />);
    expect(screen.getByRole("timer")).toBeInTheDocument();
  });
});
```

**Step 2: Run tests to verify they fail**

Run: `npx vitest run src/components/__tests__/TimerRing.test.tsx`
Expected: FAIL — cannot find module `@/components/TimerRing`

**Step 3: Commit**

```bash
git add src/components/__tests__/TimerRing.test.tsx
git commit -m "test: add TimerRing component tests (red phase)"
```

---

### Task 2: Implement TimerRing Component (Green Phase)

**Files:**
- Create: `src/components/TimerRing.tsx`

**Step 1: Implement the component**

```tsx
type TimerRingProps = {
  timeDisplay: string;
  label: string;
  progress: number;
};

const SIZE = 220;
const STROKE = 6;
const RADIUS = (SIZE - STROKE) / 2; // 107
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export function TimerRing({ timeDisplay, label, progress }: TimerRingProps) {
  const offset = CIRCUMFERENCE * (1 - progress);

  return (
    <div role="timer" className="relative" style={{ width: SIZE, height: SIZE }}>
      <svg width={SIZE} height={SIZE} className="-rotate-90">
        <circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS}
          fill="transparent"
          stroke="var(--color-bg-surface)"
          strokeWidth={STROKE}
        />
        <circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS}
          fill="transparent"
          stroke="var(--color-accent)"
          strokeWidth={STROKE}
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          style={{
            strokeDashoffset: `${offset}`,
            transition: "stroke-dashoffset 0.3s ease",
          }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-[4px]">
        <span className="font-mono text-timer font-medium tracking-[-1px] text-text-primary">
          {timeDisplay}
        </span>
        <span className="font-body text-sm font-normal text-text-secondary">
          {label}
        </span>
      </div>
    </div>
  );
}
```

**Step 2: Run tests to verify they pass**

Run: `npx vitest run src/components/__tests__/TimerRing.test.tsx`
Expected: All 7 tests PASS

**Step 3: Commit**

```bash
git add src/components/TimerRing.tsx src/components/__tests__/TimerRing.test.tsx
git commit -m "feat: implement TimerRing component with SVG progress ring"
```

---

### Task 3: Add TimerRing to Design System Page

**Files:**
- Modify: `src/app/design-system/page.tsx`

**Step 1: Add TimerRing section after the Buttons section**

Add import at top:
```tsx
import { TimerRing } from "@/components/TimerRing";
```

Add section after the closing `</section>` of Buttons:
```tsx
<section className="mt-spacing-3xl">
  <h2 className="mb-spacing-sm font-display text-xl text-text-primary">
    Timer
  </h2>
  <p className="mb-spacing-lg text-md text-text-secondary">
    Circular timer with progress ring and countdown display
  </p>

  <div className="flex flex-wrap items-center gap-spacing-3xl">
    <TimerRing timeDisplay="25:00" label="minutes remaining" progress={0.75} />
  </div>
</section>
```

**Step 2: Run full test suite**

Run: `npx vitest run`
Expected: All tests PASS

**Step 3: Commit**

```bash
git add src/app/design-system/page.tsx
git commit -m "feat: add TimerRing to /design-system showcase page"
```

---

### Task 4: Visual Verification & PR

**Step 1: Start dev server and verify visually**

Run: `npm run dev`
Open: `http://localhost:3000/design-system`
Verify: TimerRing renders with sage green progress arc (75%), "25:00" centered, "minutes remaining" label below

**Step 2: Push branch and create PR**

```bash
git push -u origin feat/design-system-timer
gh pr create --title "feat: design system — Timer" --body "..."
```

PR body should reference issue #6 with `Closes #6`.
