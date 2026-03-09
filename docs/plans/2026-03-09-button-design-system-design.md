# Button Component — Design Spec

**Issue:** #2 — feat: design system — Buttons
**Branch:** `feat/button-component`
**Delivery:** PR against `main` (no merge)

## Component: `Button`

**File:** `src/components/Button.tsx`

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `variant` | `"primary" \| "secondary" \| "ghost"` | `"primary"` | Visual variant |
| `icon` | `LucideIcon` | — | Optional icon rendered left of text, 18px |
| `children` | `ReactNode` | — | Button label |
| ...rest | `ButtonHTMLAttributes<HTMLButtonElement>` | — | Native button props |

### Styles (all variants)

- Border-radius: pill (9999px)
- Padding: 12px vertical, 24px horizontal
- Gap: 8px between icon and text
- Font: Inter, 14px, weight 500
- Transition: `transition-colors duration-150`
- Icon size: 18px

### Variants

| Variant | Fill | Text | Border | Hover |
|---|---|---|---|---|
| Primary | `accent` (#7C9082) | white | — | accent darkened ~10% (#6B7D71) |
| Secondary | `bg-surface` (#F5F3EF) | `text-primary` | `border` 1px | surface darkened ~5% (#EBE8E2) |
| Ghost | transparent | `text-primary` | — | `bg-surface` |

Icon colors: Primary = white, Secondary/Ghost = `text-secondary`.

## Dark Theme

### Palette

| Token | Light | Dark |
|---|---|---|
| `accent` | `#7C9082` | `#8FA89A` |
| `bg-page` | `#FAF8F5` | `#1A1A1A` |
| `bg-card` | `#FFFFFF` | `#242424` |
| `bg-surface` | `#F5F3EF` | `#2A2A2A` |
| `bg-muted` | `#F0EDE8` | `#333333` |
| `border` | `#E8E4DF` | `#3D3D3D` |
| `text-primary` | `#2D2D2D` | `#E8E8E8` |
| `text-secondary` | `#8A8A8A` | `#9A9A9A` |
| `text-muted` | `#ADADAD` | `#666666` |
| `danger` | `#D4544E` | `#E06B65` |

### Hover colors (dark)

| Variant | Dark hover |
|---|---|
| Primary | accent lightened ~10% |
| Secondary | surface lightened ~5% |
| Ghost | `bg-surface` (dark value) |

### Mechanism

- Toggle manual + system default (option 2)
- Hook `useTheme` in `src/hooks/useTheme.ts`
- Reads `localStorage("theme")` first; falls back to `prefers-color-scheme`
- Applies/removes `.dark` class on `<html>`
- Dark tokens applied via `.dark` selector overriding CSS custom properties

### CSS approach

- Light tokens remain in `@theme inline` (existing)
- Dark overrides in `.dark` selector on `:root`, redefining the same custom properties

## Page: `/design-system`

**File:** `src/app/design-system/page.tsx`

- Simple showcase page
- Displays all 3 button variants, each with and without icon
- Theme toggle button visible to switch between light/dark
- No expandable structure or navigation

## Tests

**File:** `src/components/__tests__/Button.test.tsx`

- Renders each variant correctly
- Renders with and without icon
- Passes native button props (onClick, disabled, type)
- Applies correct CSS classes per variant

## Pencil References

- Primary: `S3vdp`
- Secondary: `rEVSC`
- Ghost: `lcxyY`
- Section: `BUmsr`
