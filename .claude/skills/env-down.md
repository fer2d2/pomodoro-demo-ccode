---
name: env-down
description: Use when the user wants to stop the development environment, kill the dev server, or shut down the project
---

# Stop Development Environment

Stop the Next.js dev server.

```bash
pkill -f "next dev" 2>/dev/null || pkill -f "next-server" 2>/dev/null
```

Confirm the server has been stopped.
