# Pomodoro

A minimal, elegant Pomodoro timer app designed to help you stay focused, one session at a time.

## Features

- **Focus & Break modes** — Switch between focus and break timers with a tab bar
- **Circular timer** — Visual progress ring with countdown display
- **Configurable durations** — Adjust focus time (default 25 min) and break time (default 5 min) with stepper controls
- **Session tracking** — Track completed sessions (e.g., 2/4) before a long break
- **Sound toggle** — Enable or disable notification sounds
- **Start / Reset controls** — Simple two-button interface to manage your timer

## Design

The UI follows a warm, minimal aesthetic with a sage green accent palette:

| Token | Value |
|-------|-------|
| Accent | `#7C9082` |
| Background | `#FAF8F5` |
| Card | `#FFFFFF` |
| Text | `#2D2D2D` |

**Typography:**

- **Display:** Fraunces
- **Body:** Inter
- **Mono:** IBM Plex Mono

The design file with the full component library is located at `docs/ui-app.pen`.

### Components

The design system includes reusable components:

- **Buttons** — Primary (filled), Secondary (outlined), Ghost
- **Tabs** — Active / Inactive states with TabBar container
- **Timer Ring** — Circular progress indicator with countdown text
- **Time Input** — Label + value with stepper buttons
- **Controls** — Divider, Session dots (active/inactive), Icon buttons
- **Layout** — Sound toggle, Session counter

## Getting Started

> Implementation pending — this project currently contains the UI design specification.

## License

MIT
