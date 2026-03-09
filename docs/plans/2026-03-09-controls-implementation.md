# Controls Components Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Implement IconButton, Divider, and SessionDot components and add them to the /design-system page (issue #4).

**Architecture:** Three atomic components following existing Button.tsx conventions — Tailwind classes using design tokens from globals.css, Lucide icons, TDD with Vitest + Testing Library.

**Tech Stack:** Next.js, React 19, TypeScript, Tailwind CSS v4, lucide-react, Vitest

---

### Task 1: IconButton — Tests

**Files:**
- Create: `src/components/__tests__/IconButton.test.tsx`

**Step 1: Write the tests**

```tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { Minus, Plus } from "lucide-react";
import { IconButton } from "@/components/IconButton";

describe("IconButton", () => {
  it("renders a button with an icon", () => {
    render(<IconButton icon={Minus} aria-label="Decrease" />);
    const btn = screen.getByRole("button", { name: "Decrease" });
    expect(btn).toBeInTheDocument();
    expect(btn.querySelector("svg")).toBeInTheDocument();
  });

  it("applies surface background and border classes", () => {
    render(<IconButton icon={Minus} aria-label="Decrease" />);
    const btn = screen.getByRole("button");
    expect(btn.className).toContain("bg-bg-surface");
    expect(btn.className).toContain("border-border");
  });

  it("is circular (rounded-full)", () => {
    render(<IconButton icon={Minus} aria-label="Decrease" />);
    expect(screen.getByRole("button").className).toContain("rounded-full");
  });

  it("forwards onClick handler", async () => {
    const handleClick = vi.fn();
    render(<IconButton icon={Plus} aria-label="Increase" onClick={handleClick} />);
    await userEvent.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledOnce();
  });

  it("forwards disabled prop", () => {
    render(<IconButton icon={Minus} aria-label="Decrease" disabled />);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("has focus-visible outline classes", () => {
    render(<IconButton icon={Minus} aria-label="Decrease" />);
    expect(screen.getByRole("button").className).toContain("focus-visible:outline-2");
  });

  it("defaults to type button", () => {
    render(<IconButton icon={Minus} aria-label="Decrease" />);
    expect(screen.getByRole("button")).toHaveAttribute("type", "button");
  });
});
```

**Step 2: Run tests to verify they fail**

Run: `npx vitest run src/components/__tests__/IconButton.test.tsx`
Expected: FAIL — module not found

---

### Task 2: IconButton — Implementation

**Files:**
- Create: `src/components/IconButton.tsx`

**Step 1: Write the implementation**

```tsx
import type { ButtonHTMLAttributes } from "react";
import type { LucideIcon } from "lucide-react";

type IconButtonProps = {
  icon: LucideIcon;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function IconButton({
  icon: Icon,
  className = "",
  type = "button",
  ...rest
}: IconButtonProps) {
  return (
    <button
      type={type}
      className={`inline-flex h-[32px] w-[32px] items-center justify-center rounded-full border border-border bg-bg-surface text-text-secondary transition-colors duration-150 hover:bg-surface-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:opacity-50 disabled:pointer-events-none ${className}`}
      {...rest}
    >
      <Icon size={14} />
    </button>
  );
}
```

**Step 2: Run tests to verify they pass**

Run: `npx vitest run src/components/__tests__/IconButton.test.tsx`
Expected: All 7 tests PASS

**Step 3: Commit**

```bash
git add src/components/IconButton.tsx src/components/__tests__/IconButton.test.tsx
git commit -m "feat: add IconButton component with tests"
```

---

### Task 3: Divider — Tests

**Files:**
- Create: `src/components/__tests__/Divider.test.tsx`

**Step 1: Write the tests**

```tsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Divider } from "@/components/Divider";

describe("Divider", () => {
  it("renders an hr element", () => {
    render(<Divider />);
    expect(screen.getByRole("separator")).toBeInTheDocument();
  });

  it("applies border color class", () => {
    render(<Divider />);
    expect(screen.getByRole("separator").className).toContain("border-border");
  });

  it("is full width", () => {
    render(<Divider />);
    expect(screen.getByRole("separator").className).toContain("w-full");
  });

  it("merges custom className", () => {
    render(<Divider className="my-spacing-lg" />);
    const hr = screen.getByRole("separator");
    expect(hr.className).toContain("my-spacing-lg");
  });
});
```

**Step 2: Run tests to verify they fail**

Run: `npx vitest run src/components/__tests__/Divider.test.tsx`
Expected: FAIL — module not found

---

### Task 4: Divider — Implementation

**Files:**
- Create: `src/components/Divider.tsx`

**Step 1: Write the implementation**

```tsx
import type { HTMLAttributes } from "react";

type DividerProps = HTMLAttributes<HTMLHRElement>;

export function Divider({ className = "", ...rest }: DividerProps) {
  return (
    <hr
      className={`w-full border-0 border-t border-border ${className}`}
      {...rest}
    />
  );
}
```

**Step 2: Run tests to verify they pass**

Run: `npx vitest run src/components/__tests__/Divider.test.tsx`
Expected: All 4 tests PASS

**Step 3: Commit**

```bash
git add src/components/Divider.tsx src/components/__tests__/Divider.test.tsx
git commit -m "feat: add Divider component with tests"
```

---

### Task 5: SessionDot — Tests

**Files:**
- Create: `src/components/__tests__/SessionDot.test.tsx`

**Step 1: Write the tests**

```tsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { SessionDot } from "@/components/SessionDot";

describe("SessionDot", () => {
  it("renders with inactive styling by default", () => {
    render(<SessionDot />);
    const dot = screen.getByRole("img", { hidden: true });
    expect(dot.className).toContain("bg-bg-surface");
    expect(dot.className).toContain("border-border");
  });

  it("renders with active styling when active", () => {
    render(<SessionDot active />);
    const dot = screen.getByRole("img", { hidden: true });
    expect(dot.className).toContain("bg-accent");
    expect(dot.className).not.toContain("border-border");
  });

  it("is 8x8 pixels", () => {
    render(<SessionDot />);
    const dot = screen.getByRole("img", { hidden: true });
    expect(dot.className).toContain("h-[8px]");
    expect(dot.className).toContain("w-[8px]");
  });

  it("is circular", () => {
    render(<SessionDot />);
    const dot = screen.getByRole("img", { hidden: true });
    expect(dot.className).toContain("rounded-full");
  });

  it("has accessible aria-label", () => {
    render(<SessionDot aria-label="Session 1 complete" />);
    expect(screen.getByLabelText("Session 1 complete")).toBeInTheDocument();
  });
});
```

**Step 2: Run tests to verify they fail**

Run: `npx vitest run src/components/__tests__/SessionDot.test.tsx`
Expected: FAIL — module not found

---

### Task 6: SessionDot — Implementation

**Files:**
- Create: `src/components/SessionDot.tsx`

**Step 1: Write the implementation**

```tsx
import type { HTMLAttributes } from "react";

type SessionDotProps = {
  active?: boolean;
} & HTMLAttributes<HTMLSpanElement>;

export function SessionDot({
  active = false,
  className = "",
  ...rest
}: SessionDotProps) {
  return (
    <span
      role="img"
      className={`inline-block h-[8px] w-[8px] rounded-full ${
        active
          ? "bg-accent"
          : "border border-border bg-bg-surface"
      } ${className}`}
      {...rest}
    />
  );
}
```

**Step 2: Run tests to verify they pass**

Run: `npx vitest run src/components/__tests__/SessionDot.test.tsx`
Expected: All 5 tests PASS

**Step 3: Commit**

```bash
git add src/components/SessionDot.tsx src/components/__tests__/SessionDot.test.tsx
git commit -m "feat: add SessionDot component with tests"
```

---

### Task 7: Update /design-system Page

**Files:**
- Modify: `src/app/design-system/page.tsx`

**Step 1: Add Controls section after the Buttons section**

Add imports at top:
```tsx
import { IconButton } from "@/components/IconButton";
import { Divider } from "@/components/Divider";
import { SessionDot } from "@/components/SessionDot";
import { Minus, Plus } from "lucide-react";
```

Add new section after the `</section>` that closes Buttons:
```tsx
<section className="mt-spacing-3xl">
  <h2 className="mb-spacing-sm font-display text-xl text-text-primary">
    Controls
  </h2>
  <p className="mb-spacing-lg text-md text-text-secondary">
    Icon buttons, steppers, dividers, and session indicators
  </p>

  <div className="flex items-center gap-spacing-2xl">
    <IconButton icon={Minus} aria-label="Decrease" />
    <IconButton icon={Plus} aria-label="Increase" />
    <Divider className="flex-1" />
    <SessionDot active aria-label="Session 1 complete" />
    <SessionDot aria-label="Session 2 pending" />
    <SessionDot aria-label="Session 3 pending" />
    <SessionDot aria-label="Session 4 pending" />
  </div>
</section>
```

**Step 2: Run all tests**

Run: `npx vitest run`
Expected: All tests PASS

**Step 3: Start dev server and verify visually**

Run: `npm run dev`
Visit: `http://localhost:3000/design-system`
Verify: Controls section renders correctly with all variants

**Step 4: Commit**

```bash
git add src/app/design-system/page.tsx
git commit -m "feat: add Controls section to /design-system page"
```

---

### Task 8: Push and Create PR

**Step 1: Push branch**

```bash
git push -u origin feat/design-system-controls
```

**Step 2: Create PR**

```bash
gh pr create --title "feat: design system controls" --body "$(cat <<'EOF'
## Summary
- Add `IconButton` component (32x32 circular stepper button)
- Add `Divider` component (1px horizontal rule)
- Add `SessionDot` component (active/inactive indicator)
- Add Controls section to /design-system showcase page

Closes #4

## Test plan
- [ ] All unit tests pass (`npx vitest run`)
- [ ] Visual check on /design-system page (light + dark themes)

🤖 Generated with [Claude Code](https://claude.com/claude-code)
EOF
)"
```
