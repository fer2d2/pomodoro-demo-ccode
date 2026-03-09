# Design: Tabs Component

**Issue:** #3 — feat: design system — Tabs

## Components

### TabBar (public)

Container managing tab selection.

```tsx
interface TabBarProps {
  items: { value: string; label: string; icon: LucideIcon }[];
  value: string;
  onChange: (value: string) => void;
}
```

- `bg-bg-surface`, `rounded-pill`, `p-[4px]`, `w-[340px]`, flex row
- Children fill equally

### Tab (internal)

Individual tab rendered by TabBar.

- **Active:** `bg-bg-card`, `border`, `rounded-pill`, `px-5 py-2`, icon `text-accent`, text `font-medium text-text-primary`
- **Inactive:** no bg/border, `rounded-pill`, `px-5 py-2`, icon `text-text-muted`, text `text-text-secondary`
- Icon: 14px (`icon-sm`), text: 13px Inter

## File Structure

- `src/components/TabBar.tsx` — TabBar + Tab components
- Update `src/app/design-system/page.tsx` — add Tabs showcase section

## Accessibility

- `role="tablist"` on TabBar
- `role="tab"`, `aria-selected` on each Tab
