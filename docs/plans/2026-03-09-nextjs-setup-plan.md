# Next.js Setup + Design Tokens — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Scaffold a Next.js project with Tailwind CSS v4 design tokens matching the Pencil design system.

**Architecture:** Next.js App Router with `src/app` directory. Tailwind v4 `@theme inline` in `globals.css` maps all design tokens. Google Fonts loaded via `next/font/google` as CSS variables.

**Tech Stack:** Next.js (App Router, TypeScript), pnpm, Tailwind CSS v4, Lucide React

---

### Task 1: Initialize Next.js project

**Step 1: Create Next.js app with pnpm**

Run:
```bash
cd /Users/fernando/Development/pomodoro-demo-ccode
pnpm create next-app@latest . --typescript --eslint --tailwind --app --src-dir --no-import-alias --turbopack
```

Select defaults when prompted. This creates the project with Tailwind CSS v4 pre-configured.

**Step 2: Verify it runs**

Run:
```bash
pnpm dev
```

Visit http://localhost:3000 — confirm Next.js welcome page loads. Stop the server.

**Step 3: Install Lucide React**

Run:
```bash
pnpm add lucide-react
```

**Step 4: Commit**

```bash
git add -A
git commit -m "feat: initialize Next.js project with App Router and Tailwind v4"
```

---

### Task 2: Configure Google Fonts

**Files:**
- Modify: `src/app/layout.tsx`

**Step 1: Update layout.tsx with fonts**

Replace the contents of `src/app/layout.tsx` with:

```tsx
import type { Metadata } from "next";
import { Fraunces, Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Pomodoro",
  description: "A minimal Pomodoro timer app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} ${ibmPlexMono.variable} antialiased`}
    >
      <body className="min-h-screen bg-bg-page font-body">{children}</body>
    </html>
  );
}
```

**Step 2: Commit**

```bash
git add src/app/layout.tsx
git commit -m "feat: configure Google Fonts (Fraunces, Inter, IBM Plex Mono)"
```

---

### Task 3: Define design tokens in globals.css

**Files:**
- Modify: `src/app/globals.css`

**Step 1: Replace globals.css with design tokens**

Replace the entire contents of `src/app/globals.css` with:

```css
@import "tailwindcss";

@theme inline {
  /* Fonts */
  --font-display: var(--font-display);
  --font-body: var(--font-body);
  --font-mono: var(--font-mono);

  /* Colors */
  --color-accent: #7C9082;
  --color-bg-page: #FAF8F5;
  --color-bg-card: #FFFFFF;
  --color-bg-surface: #F5F3EF;
  --color-bg-muted: #F0EDE8;
  --color-border: #E8E4DF;
  --color-text-primary: #2D2D2D;
  --color-text-secondary: #8A8A8A;
  --color-text-muted: #ADADAD;
  --color-danger: #D4544E;

  /* Font sizes */
  --text-xs: 11px;
  --text-sm: 12px;
  --text-md: 13px;
  --text-lg: 14px;
  --text-xl: 16px;
  --text-2xl: 20px;
  --text-3xl: 28px;
  --text-4xl: 32px;
  --text-timer: 48px;

  /* Spacing */
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 12px;
  --spacing-lg: 16px;
  --spacing-xl: 24px;
  --spacing-2xl: 32px;
  --spacing-3xl: 40px;

  /* Border radii */
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-xl: 20px;
  --radius-pill: 9999px;
}

/* Icon size custom properties (not Tailwind theme) */
:root {
  --icon-sm: 14px;
  --icon-md: 18px;
  --icon-lg: 24px;
}
```

**Step 2: Commit**

```bash
git add src/app/globals.css
git commit -m "feat: add design tokens as Tailwind v4 theme variables"
```

---

### Task 4: Create placeholder page

**Files:**
- Modify: `src/app/page.tsx`

**Step 1: Replace page.tsx with minimal placeholder**

Replace the contents of `src/app/page.tsx` with:

```tsx
export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <h1 className="font-display text-4xl text-text-primary">Pomodoro</h1>
    </main>
  );
}
```

**Step 2: Verify the app runs and tokens work**

Run:
```bash
pnpm dev
```

Visit http://localhost:3000 — confirm:
- Background is cream/warm white (#FAF8F5)
- "Pomodoro" text renders in Fraunces font at 32px
- Text color is dark (#2D2D2D)

Stop the server.

**Step 3: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: add placeholder page with design token verification"
```

---

### Task 5: Clean up and verify

**Step 1: Remove unused default assets**

Delete any default Next.js SVG files that are no longer referenced:

```bash
rm -f public/next.svg public/vercel.svg public/file.svg public/globe.svg public/window.svg
```

**Step 2: Final verification**

Run:
```bash
pnpm build
```

Expected: Build succeeds with no errors.

**Step 3: Commit**

```bash
git add -A
git commit -m "chore: remove unused default Next.js assets"
```
