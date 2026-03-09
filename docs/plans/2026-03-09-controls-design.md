# Design: Controls Components

Issue: #4

## Components

### IconButton (`src/components/IconButton.tsx`)
- 32x32 circular frame, `bg-surface`, 1px `border`, corner-radius 16 (circular)
- Centered Lucide icon at 14px, `text-secondary` color
- Props: `icon: LucideIcon`, extends `ButtonHTMLAttributes<HTMLButtonElement>`
- States: hover (`surface-hover`), focus-visible (outline-accent), disabled (opacity-50)

### Divider (`src/components/Divider.tsx`)
- Semantic `<hr>`, 1px height, `border` color, full container width
- Optional `className` prop

### SessionDot (`src/components/SessionDot.tsx`)
- 8x8 circle (`<span>`)
- Active: filled `accent`
- Inactive: `bg-surface` fill, 1px `border` stroke
- Props: `active?: boolean` (default false), `aria-label`

## Design System Page
- New "Controls" section after Buttons
- Shows: IconButton variants, Divider, SessionDot active + inactive
- Matches Pencil reference section `cNTkX`

## Tests
- Unit tests per component following Button.test.tsx patterns
- Cover: rendering, active/inactive states, accessibility, click handlers, disabled states

## Design References
- IconButton/Stepper: `Z1lZZ`
- Divider: `okyyf`
- SessionDot/Active: `zlTck`
- SessionDot/Inactive: `0wnYi`
- Controls section: `cNTkX`
