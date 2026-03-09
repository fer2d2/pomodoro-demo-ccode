# Setup Next.js + Design Tokens — Design

## Overview

Scaffold del proyecto Next.js con App Router, Tailwind CSS v4, fuentes Google y design tokens como CSS custom properties.

## Stack

- **Next.js** con App Router + TypeScript
- **pnpm** como package manager
- **Tailwind CSS v4** con `@theme` para design tokens
- **Lucide React** para iconos

## Estructura

```
src/
  app/
    layout.tsx      ← fonts + base layout
    page.tsx        ← placeholder
    globals.css     ← @theme con design tokens
```

## Fonts (next/font/google)

- `Fraunces` → `--font-display`
- `Inter` → `--font-body`
- `IBM Plex Mono` → `--font-mono`

Se aplican como CSS variables en `<html>` y se referencian en `@theme`.

## Design Tokens en globals.css

Tailwind v4 `@theme` para todos los tokens:

### Colores

| Token | Valor |
|-------|-------|
| accent | #7C9082 |
| bg-page | #FAF8F5 |
| bg-card | #FFFFFF |
| bg-surface | #F5F3EF |
| bg-muted | #F0EDE8 |
| border | #E8E4DF |
| text-primary | #2D2D2D |
| text-secondary | #8A8A8A |
| text-muted | #ADADAD |
| danger | #D4544E |

### Font sizes

xs=11, sm=12, md=13, lg=14, xl=16, 2xl=20, 3xl=28, 4xl=32, timer=48

### Spacing

xs=4, sm=8, md=12, lg=16, xl=24, 2xl=32, 3xl=40

### Border radii

sm=8, md=12, lg=16, xl=20, pill=9999

### Icon sizes (custom properties, no theme)

sm=14, md=18, lg=24

## Layout base (layout.tsx)

- `<html>` con las 3 font variables como className
- `<body>` con `bg-bg-page min-h-screen font-body`

## Dependencias

- next, react, react-dom
- tailwindcss, @tailwindcss/postcss
- lucide-react
