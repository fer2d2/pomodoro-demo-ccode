# Pomodoro App — Issue Breakdown Design

## Overview

Desglose del proyecto Pomodoro en issues de GitHub para desarrollo incremental con Next.js. Los componentes siguen metodología Atomic Design y se documentan en una ruta `/design-system`.

## Design tokens (Pencil variables)

- **Colores**: accent `#7C9082`, bg-page `#FAF8F5`, bg-card `#FFFFFF`, bg-surface `#F5F3EF`, bg-muted `#F0EDE8`, border `#E8E4DF`, text-primary `#2D2D2D`, text-secondary `#8A8A8A`, text-muted `#ADADAD`, danger `#D4544E`
- **Fuentes**: Fraunces (display), Inter (body), IBM Plex Mono (mono)
- **Tamaños fuente**: xs=11, sm=12, md=13, lg=14, xl=16, 2xl=20, 3xl=28, 4xl=32, timer=48
- **Spacing**: xs=4, sm=8, md=12, lg=16, xl=24, 2xl=32, 3xl=40
- **Radii**: sm=8, md=12, lg=16, xl=20, pill=9999
- **Iconos**: Lucide icons (sm=14, md=18, lg=24)

## Issues

### 1. Setup proyecto Next.js y design tokens

Scaffold del proyecto Next.js con App Router, configuración de fuentes Google (Fraunces, Inter, IBM Plex Mono), y CSS custom properties con todos los design tokens.

**Pencil refs**: Variables del documento (colores, spacing, radii, font sizes)

### 2. Design System: Buttons

Tres variantes de botón con soporte de icono Lucide opcional:

- **Primary** (`S3vdp`): fondo accent, texto blanco, border-radius pill, padding 12/24
- **Secondary** (`rEVSC`): fondo bg-surface, borde border, texto primary, border-radius pill
- **Ghost** (`lcxyY`): sin fondo ni borde, texto primary, border-radius pill

### 3. Design System: Tabs

- **Tab/Active** (`bFXSZ`): fondo card, borde, icono accent, texto primary, pill shape
- **Tab/Inactive** (`sHztz`): sin fondo, icono muted, texto secondary
- **TabBar** (`ANrKK`): contenedor con fondo bg-surface, padding 4, pill shape, contiene tabs

### 4. Design System: Controls

- **IconButton/Stepper** (`Z1lZZ`): 32x32, fondo bg-surface, borde, border-radius 16
- **Divider** (`okyyf`): línea horizontal, color border, height 1
- **SessionDot/Active** (`zlTck`): ellipse 8x8, fill accent
- **SessionDot/Inactive** (`0wnYi`): ellipse 8x8, fill bg-surface, borde

### 5. Design System: Inputs

- **TimeInput** (`UILug`): label superior (uppercase, font-size xs), fila con botón minus, valor central (monospace), botón plus. Gap 8 entre steppers y valor.

### 6. Design System: Timer

- **TimerRing** (`ekX0h`): 220x220, SVG con:
  - Anillo de fondo (stroke bg-surface, thickness 6)
  - Anillo de progreso (stroke accent, thickness 6, cap round, sweepAngle variable)
  - Centro: tiempo en IBM Plex Mono font-size 48, label en Inter font-size 12

### 7. Design System: Layout

- **SoundToggle** (`cmLVL`): icono volume + label "Sound on/off", gap 6
- **SessionCounter** (`8hZaZ`): 4 session dots + label "n/4", gap 6
- **Card** (`DA3Ed`): fondo card, border-radius 20, padding 40, borde sutil, layout vertical gap 32, width 420

### 8. Ruta /design-system

Página showcase en `/design-system` con todas las secciones del design system organizadas por categoría (Buttons, Tabs, Controls, Inputs, Timer, Layout). Referencia el frame `nTBI5` del diseño Pencil.

### 9. Pantalla principal Pomodoro

Ensamblaje de la pantalla completa (frame `bi8Au`, 800x760):

- **Header** (`5oge4`): título "Pomodoro" en Fraunces 32, subtítulo en Inter 13
- **TabBar** (instancia de `ANrKK`): Focus / Break
- **TimerRing** (instancia de `ekX0h`): 25:00, "minutes remaining"
- **Actions** (`y94ZR`): botón Start (primary, 140w) + Reset (secondary, 140w)
- **Divider** (instancia de `okyyf`)
- **Settings** (`KpWSY`): TimeInput Focus (25 min) + TimeInput Break (5 min)
- **Footer** (`qZE6Q`): SoundToggle a la izquierda, SessionCounter a la derecha

Todo dentro del Card (`DA3Ed`) centrado en página con fondo bg-page.
