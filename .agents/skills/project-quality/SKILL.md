---
name: project-quality
description: Validate, format, run, or change dependencies and development workflows for this Bun, React, and Go board project.
---

# Project quality

Use this skill for tooling, dependencies, and local development workflows.

- Keep every dependency version exact in `package.json`; do not introduce `^` or `~` ranges.
- Bun owns the frontend and lockfile. Use `bun` commands, not npm.
- `bun dev` runs the frontend and Air-managed Go API together. It requires both Bun and Go on PATH.
- Air watches Go, JSON, and YAML. It rebuilds the Go API on relevant file changes; the frontend has its own hot reload.
- Required frontend checks: `bun run format:check`, `bun run lint`, `bun run typecheck`, and `bun run build`.
- Required API checks: `bun run api:check`.

When a dev server stops unexpectedly, inspect its process and port before editing application code.
