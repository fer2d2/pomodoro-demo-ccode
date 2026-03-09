# Tabs Component Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Implement Tab and TabBar components for the design system (issue #3).

**Architecture:** Two components in one file following the Button pattern — variant-driven Tailwind classes, accessible roles, controlled selection via `value`/`onChange`. Add showcase section to the existing `/design-system` page.

**Tech Stack:** React 19, Next.js 16, Tailwind CSS v4, Vitest + Testing Library, lucide-react icons.

---

### Task 1: Write TabBar tests

**Files:**
- Create: `src/components/__tests__/TabBar.test.tsx`

**Step 1: Write the test file**

```tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { Clock, Coffee, Settings } from "lucide-react";
import { TabBar } from "@/components/TabBar";

const items = [
  { value: "focus", label: "Focus", icon: Clock },
  { value: "break", label: "Break", icon: Coffee },
  { value: "settings", label: "Settings", icon: Settings },
];

describe("TabBar", () => {
  it("renders a tablist", () => {
    render(<TabBar items={items} value="focus" onChange={() => {}} />);
    expect(screen.getByRole("tablist")).toBeInTheDocument();
  });

  it("renders all tabs", () => {
    render(<TabBar items={items} value="focus" onChange={() => {}} />);
    expect(screen.getAllByRole("tab")).toHaveLength(3);
  });

  it("marks the active tab with aria-selected", () => {
    render(<TabBar items={items} value="break" onChange={() => {}} />);
    const tabs = screen.getAllByRole("tab");
    expect(tabs[0]).toHaveAttribute("aria-selected", "false");
    expect(tabs[1]).toHaveAttribute("aria-selected", "true");
    expect(tabs[2]).toHaveAttribute("aria-selected", "false");
  });

  it("applies active styling to the selected tab", () => {
    render(<TabBar items={items} value="focus" onChange={() => {}} />);
    const activeTab = screen.getByRole("tab", { name: "Focus" });
    expect(activeTab.className).toContain("bg-bg-card");
    expect(activeTab.className).toContain("border");
  });

  it("applies inactive styling to unselected tabs", () => {
    render(<TabBar items={items} value="focus" onChange={() => {}} />);
    const inactiveTab = screen.getByRole("tab", { name: "Break" });
    expect(inactiveTab.className).not.toContain("bg-bg-card");
    expect(inactiveTab.className).not.toContain("border");
  });

  it("calls onChange with the tab value on click", async () => {
    const handleChange = vi.fn();
    render(<TabBar items={items} value="focus" onChange={handleChange} />);
    await userEvent.click(screen.getByRole("tab", { name: "Break" }));
    expect(handleChange).toHaveBeenCalledWith("break");
  });

  it("renders icons in each tab", () => {
    render(<TabBar items={items} value="focus" onChange={() => {}} />);
    const tabs = screen.getAllByRole("tab");
    tabs.forEach((tab) => {
      expect(tab.querySelector("svg")).toBeInTheDocument();
    });
  });

  it("renders labels in each tab", () => {
    render(<TabBar items={items} value="focus" onChange={() => {}} />);
    expect(screen.getByText("Focus")).toBeInTheDocument();
    expect(screen.getByText("Break")).toBeInTheDocument();
    expect(screen.getByText("Settings")).toBeInTheDocument();
  });
});
```

**Step 2: Run tests to verify they fail**

Run: `npx vitest run src/components/__tests__/TabBar.test.tsx`
Expected: FAIL — cannot find module `@/components/TabBar`

**Step 3: Commit**

```bash
git add src/components/__tests__/TabBar.test.tsx
git commit -m "test: add TabBar component tests"
```

---

### Task 2: Implement TabBar component

**Files:**
- Create: `src/components/TabBar.tsx`

**Step 1: Write the component**

```tsx
import type { LucideIcon } from "lucide-react";

type TabItem = {
  value: string;
  label: string;
  icon: LucideIcon;
};

type TabBarProps = {
  items: TabItem[];
  value: string;
  onChange: (value: string) => void;
};

function Tab({
  icon: Icon,
  label,
  active,
  onClick,
}: {
  icon: LucideIcon;
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      role="tab"
      type="button"
      aria-selected={active}
      onClick={onClick}
      className={`flex flex-1 items-center justify-center gap-[6px] rounded-pill px-[20px] py-[8px] text-[13px] transition-colors duration-150 cursor-pointer ${
        active
          ? "bg-bg-card border border-border font-medium text-text-primary"
          : "text-text-secondary"
      }`}
    >
      <Icon
        size={14}
        className={active ? "text-accent" : "text-text-muted"}
      />
      {label}
    </button>
  );
}

export function TabBar({ items, value, onChange }: TabBarProps) {
  return (
    <div
      role="tablist"
      className="flex w-[340px] gap-[2px] rounded-pill bg-bg-surface p-[4px]"
    >
      {items.map((item) => (
        <Tab
          key={item.value}
          icon={item.icon}
          label={item.label}
          active={item.value === value}
          onClick={() => onChange(item.value)}
        />
      ))}
    </div>
  );
}
```

**Step 2: Run tests to verify they pass**

Run: `npx vitest run src/components/__tests__/TabBar.test.tsx`
Expected: All 8 tests PASS

**Step 3: Also run Button tests to check for regressions**

Run: `npx vitest run src/components/__tests__/`
Expected: All tests PASS

**Step 4: Commit**

```bash
git add src/components/TabBar.tsx
git commit -m "feat: add TabBar component with active/inactive states"
```

---

### Task 3: Add Tabs section to design-system page

**Files:**
- Modify: `src/app/design-system/page.tsx`

**Step 1: Update the page**

Add imports at the top:
```tsx
import { TabBar } from "@/components/TabBar";
import { Clock, Coffee } from "lucide-react";
import { useState } from "react";
```

Note: `Settings` is already imported. Add `Clock` and `Coffee` to the existing import from `lucide-react`. Add `useState` to the React import (file uses `"use client"`).

Add state inside the component:
```tsx
const [activeTab, setActiveTab] = useState("focus");
```

Add a new `<section>` after the Buttons section:
```tsx
<section className="mt-spacing-3xl">
  <h2 className="mb-spacing-sm font-display text-xl text-text-primary">
    Tabs
  </h2>
  <p className="mb-spacing-lg text-md text-text-secondary">
    Tab bar with active and inactive states
  </p>

  <TabBar
    items={[
      { value: "focus", label: "Focus", icon: Clock },
      { value: "break", label: "Break", icon: Coffee },
      { value: "settings", label: "Settings", icon: Settings },
    ]}
    value={activeTab}
    onChange={setActiveTab}
  />
</section>
```

**Step 2: Run all tests**

Run: `npx vitest run`
Expected: All tests PASS

**Step 3: Verify dev server renders correctly**

Run: `npx next build`
Expected: Build succeeds with no errors

**Step 4: Commit**

```bash
git add src/app/design-system/page.tsx
git commit -m "feat: add Tabs showcase to /design-system page"
```

---

### Task 4: Push branch and create PR

**Step 1: Push branch**

```bash
git push -u origin feat/design-system-tabs
```

**Step 2: Create PR**

```bash
gh pr create --title "feat: add Tabs component to design system" --body "$(cat <<'EOF'
## Summary
- Adds `TabBar` component with active/inactive tab states
- Follows existing Button component pattern (variant-driven Tailwind classes)
- Accessible: `role="tablist"`, `role="tab"`, `aria-selected`
- Added Tabs showcase section to `/design-system` page

Closes #3

## Test plan
- [x] Unit tests for TabBar (8 tests covering rendering, selection, clicks, a11y)
- [ ] Visual check on `/design-system` page (light + dark mode)

🤖 Generated with [Claude Code](https://claude.com/claude-code)
EOF
)"
```
