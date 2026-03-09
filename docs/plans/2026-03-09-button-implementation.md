# Button Component Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Implement the Button component with 3 variants, dark theme support, and a /design-system showcase page (Issue #2).

**Architecture:** A single `Button` React component with variant prop, styled via Tailwind utility classes referencing CSS custom properties. Dark theme via `.dark` class on `<html>` toggled by a `useTheme` hook persisting to localStorage. Showcase page at `/design-system`.

**Tech Stack:** Next.js 16, React 19, Tailwind CSS v4, lucide-react, Vitest + Testing Library.

---

### Task 1: Create branch

**Step 1: Create and switch to feature branch**

Run: `git checkout -b feat/button-component`

**Step 2: Verify branch**

Run: `git branch --show-current`
Expected: `feat/button-component`

---

### Task 2: Add dark theme CSS tokens

**Files:**
- Modify: `src/app/globals.css`

**Step 1: Add dark theme overrides and hover colors**

Add after the existing `:root` block at the end of `src/app/globals.css`:

```css
/* Dark theme overrides */
.dark {
  --color-accent: #8FA89A;
  --color-bg-page: #1A1A1A;
  --color-bg-card: #242424;
  --color-bg-surface: #2A2A2A;
  --color-bg-muted: #333333;
  --color-border: #3D3D3D;
  --color-text-primary: #E8E8E8;
  --color-text-secondary: #9A9A9A;
  --color-text-muted: #666666;
  --color-danger: #E06B65;
}

/* Button hover colors — light */
:root {
  --color-accent-hover: #6B7D71;
  --color-surface-hover: #EBE8E2;
}

/* Button hover colors — dark */
.dark {
  --color-accent-hover: #A3BCAD;
  --color-surface-hover: #353535;
}
```

Also register the hover colors in the `@theme inline` block so Tailwind recognizes them. Add these two lines inside `@theme inline`, after `--color-danger`:

```css
  --color-accent-hover: #6B7D71;
  --color-surface-hover: #EBE8E2;
```

**Step 2: Verify the CSS is valid**

Run: `pnpm build`
Expected: Build succeeds with no errors.

**Step 3: Commit**

```bash
git add src/app/globals.css
git commit -m "feat: add dark theme tokens and button hover colors"
```

---

### Task 3: Configure Vitest path alias

**Files:**
- Modify: `vitest.config.mts`

The project uses `@/*` → `./src/*` path alias in tsconfig but vitest doesn't resolve it. Fix this so test imports work.

**Step 1: Add resolve alias to vitest config**

Replace `vitest.config.mts` content with:

```ts
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    environment: "happy-dom",
    setupFiles: ["./vitest.setup.mts"],
  },
});
```

**Step 2: Verify existing tests still pass**

Run: `pnpm test`
Expected: All tests pass.

**Step 3: Commit**

```bash
git add vitest.config.mts
git commit -m "chore: add @ path alias to vitest config"
```

---

### Task 4: Button component — write failing tests

**Files:**
- Create: `src/components/__tests__/Button.test.tsx`

**Step 1: Write the test file**

```tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { Play } from "lucide-react";
import { Button } from "@/components/Button";

describe("Button", () => {
  it("renders children as label", () => {
    render(<Button>Start</Button>);
    expect(screen.getByRole("button", { name: "Start" })).toBeInTheDocument();
  });

  it("defaults to primary variant", () => {
    render(<Button>Start</Button>);
    const btn = screen.getByRole("button");
    expect(btn.className).toContain("bg-accent");
  });

  it("applies secondary variant classes", () => {
    render(<Button variant="secondary">Reset</Button>);
    const btn = screen.getByRole("button");
    expect(btn.className).toContain("bg-bg-surface");
    expect(btn.className).toContain("border");
  });

  it("applies ghost variant classes", () => {
    render(<Button variant="ghost">Settings</Button>);
    const btn = screen.getByRole("button");
    expect(btn.className).toContain("bg-transparent");
  });

  it("renders an icon when provided", () => {
    render(<Button icon={Play}>Start</Button>);
    // lucide-react renders SVGs with the icon name as a data attribute or class
    const svg = screen.getByRole("button").querySelector("svg");
    expect(svg).toBeInTheDocument();
  });

  it("does not render an icon when not provided", () => {
    render(<Button>Start</Button>);
    const svg = screen.getByRole("button").querySelector("svg");
    expect(svg).not.toBeInTheDocument();
  });

  it("forwards onClick handler", async () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    await userEvent.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledOnce();
  });

  it("forwards disabled prop", () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("forwards type prop", () => {
    render(<Button type="submit">Submit</Button>);
    expect(screen.getByRole("button")).toHaveAttribute("type", "submit");
  });
});
```

**Step 2: Install @testing-library/user-event (needed for click test)**

Run: `pnpm add -D @testing-library/user-event`

**Step 3: Run tests to verify they fail**

Run: `pnpm test`
Expected: FAIL — module `@/components/Button` not found.

**Step 4: Commit**

```bash
git add src/components/__tests__/Button.test.tsx package.json pnpm-lock.yaml
git commit -m "test: add Button component tests (red phase)"
```

---

### Task 5: Button component — implement

**Files:**
- Create: `src/components/Button.tsx`

**Step 1: Write the Button component**

```tsx
import type { ButtonHTMLAttributes, ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

const variantClasses = {
  primary:
    "bg-accent text-white hover:bg-accent-hover",
  secondary:
    "bg-bg-surface text-text-primary border border-border hover:bg-surface-hover",
  ghost:
    "bg-transparent text-text-primary hover:bg-bg-surface",
} as const;

const iconVariantClasses = {
  primary: "text-white",
  secondary: "text-text-secondary",
  ghost: "text-text-secondary",
} as const;

type ButtonProps = {
  variant?: "primary" | "secondary" | "ghost";
  icon?: LucideIcon;
  children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({
  variant = "primary",
  icon: Icon,
  children,
  className = "",
  ...rest
}: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-[8px] rounded-full px-[24px] py-[12px] text-[14px] font-medium transition-colors duration-150 ${variantClasses[variant]} ${className}`}
      {...rest}
    >
      {Icon && <Icon size={18} className={iconVariantClasses[variant]} />}
      {children}
    </button>
  );
}
```

**Step 2: Run tests to verify they pass**

Run: `pnpm test`
Expected: All 9 tests pass.

**Step 3: Commit**

```bash
git add src/components/Button.tsx
git commit -m "feat: implement Button component with primary, secondary, ghost variants"
```

---

### Task 6: useTheme hook — write failing test

**Files:**
- Create: `src/hooks/__tests__/useTheme.test.ts`

**Step 1: Write the test file**

```ts
import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, beforeEach } from "vitest";
import { useTheme } from "@/hooks/useTheme";

describe("useTheme", () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove("dark");
  });

  it("defaults to light when no preference is stored and system is light", () => {
    const { result } = renderHook(() => useTheme());
    expect(result.current.theme).toBe("light");
    expect(document.documentElement.classList.contains("dark")).toBe(false);
  });

  it("toggles to dark", () => {
    const { result } = renderHook(() => useTheme());
    act(() => result.current.toggle());
    expect(result.current.theme).toBe("dark");
    expect(document.documentElement.classList.contains("dark")).toBe(true);
  });

  it("toggles back to light", () => {
    const { result } = renderHook(() => useTheme());
    act(() => result.current.toggle());
    act(() => result.current.toggle());
    expect(result.current.theme).toBe("light");
    expect(document.documentElement.classList.contains("dark")).toBe(false);
  });

  it("persists preference to localStorage", () => {
    const { result } = renderHook(() => useTheme());
    act(() => result.current.toggle());
    expect(localStorage.getItem("theme")).toBe("dark");
  });

  it("reads stored preference on mount", () => {
    localStorage.setItem("theme", "dark");
    const { result } = renderHook(() => useTheme());
    expect(result.current.theme).toBe("dark");
    expect(document.documentElement.classList.contains("dark")).toBe(true);
  });
});
```

**Step 2: Run tests to verify they fail**

Run: `pnpm test`
Expected: FAIL — module `@/hooks/useTheme` not found.

**Step 3: Commit**

```bash
git add src/hooks/__tests__/useTheme.test.ts
git commit -m "test: add useTheme hook tests (red phase)"
```

---

### Task 7: useTheme hook — implement

**Files:**
- Create: `src/hooks/useTheme.ts`

**Step 1: Write the hook**

```ts
"use client";

import { useState, useEffect, useCallback } from "react";

type Theme = "light" | "dark";

function getInitialTheme(): Theme {
  if (typeof window === "undefined") return "light";
  const stored = localStorage.getItem("theme") as Theme | null;
  if (stored === "light" || stored === "dark") return stored;
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggle = useCallback(() => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  }, []);

  return { theme, toggle } as const;
}
```

**Step 2: Run tests to verify they pass**

Run: `pnpm test`
Expected: All tests pass (Button + useTheme).

**Step 3: Commit**

```bash
git add src/hooks/useTheme.ts
git commit -m "feat: implement useTheme hook with localStorage persistence"
```

---

### Task 8: Design system showcase page

**Files:**
- Create: `src/app/design-system/page.tsx`

**Step 1: Write the showcase page**

```tsx
"use client";

import { Button } from "@/components/Button";
import { useTheme } from "@/hooks/useTheme";
import { Play, RotateCcw, Settings, Moon, Sun } from "lucide-react";

export default function DesignSystemPage() {
  const { theme, toggle } = useTheme();

  return (
    <main className="min-h-screen bg-bg-page px-spacing-xl py-spacing-3xl font-body">
      <div className="mx-auto max-w-2xl">
        <div className="mb-spacing-3xl flex items-center justify-between">
          <h1 className="font-display text-3xl text-text-primary">
            Design System
          </h1>
          <Button variant="ghost" icon={theme === "dark" ? Sun : Moon} onClick={toggle}>
            {theme === "dark" ? "Light" : "Dark"}
          </Button>
        </div>

        <section>
          <h2 className="mb-spacing-sm font-display text-xl text-text-primary">
            Buttons
          </h2>
          <p className="mb-spacing-lg text-md text-text-secondary">
            Primary, Secondary, and Ghost button variants
          </p>

          <div className="flex flex-wrap gap-spacing-lg">
            <Button icon={Play}>Start</Button>
            <Button>Primary</Button>
            <Button variant="secondary" icon={RotateCcw}>Reset</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost" icon={Settings}>Settings</Button>
            <Button variant="ghost">Ghost</Button>
          </div>
        </section>
      </div>
    </main>
  );
}
```

**Step 2: Verify the page builds**

Run: `pnpm build`
Expected: Build succeeds.

**Step 3: Commit**

```bash
git add src/app/design-system/page.tsx
git commit -m "feat: add /design-system showcase page with button variants"
```

---

### Task 9: Final verification

**Step 1: Run all tests**

Run: `pnpm test`
Expected: All tests pass.

**Step 2: Run linter**

Run: `pnpm lint`
Expected: No errors.

**Step 3: Run build**

Run: `pnpm build`
Expected: Build succeeds.

---

### Task 10: Open PR

**Step 1: Push branch**

Run: `git push -u origin feat/button-component`

**Step 2: Create PR**

```bash
gh pr create --title "feat: design system — Buttons" --body "$(cat <<'EOF'
## Summary

- Add `Button` component with primary, secondary, and ghost variants
- Add dark theme support with CSS custom property overrides and `useTheme` hook
- Add `/design-system` showcase page with theme toggle

Closes #2

## Test plan

- [ ] `pnpm test` — all unit tests pass
- [ ] Visit `/design-system` — verify all 3 button variants render correctly
- [ ] Toggle dark mode — verify colors switch properly
- [ ] Check responsive layout on mobile viewport

🤖 Generated with [Claude Code](https://claude.com/claude-code)
EOF
)"
```

**Step 3: Verify PR was created**

Run: `gh pr view --web`
