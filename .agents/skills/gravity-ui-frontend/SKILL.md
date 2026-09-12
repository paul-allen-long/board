---
name: gravity-ui-frontend
description: Build or edit this board's React UI with Gravity UI components, project core wrappers, local i18n, and design tokens.
---

# Gravity UI frontend

Use this skill for client UI changes in `src/`.

- Use Gravity UI as the base control library. Do not add MUI or another component system.
- `src/components/` contains category directories only: `layout/` for app-shell components, `board/` for board-specific components, `core/` for reusable Gravity UI wrappers, and `animated/` for Motion/DnD components. Do not put a component directory directly in `src/components/`.
- Put reusable wrappers over Gravity UI in `src/components/core/<Name>/`; keep feature-specific Motion and DnD components in `src/components/animated/<Name>/`.
- A component/page directory contains `<Name>.tsx`, `<Name>.types.ts`, `index.ts`, and `<Name>.i18n.ts` when it owns UI copy.
- Keep user-facing strings in the local `.i18n.ts` file. `src/i18n/resources.ts` only aggregates local dictionaries.
- Prefer Gravity semantic CSS tokens (`--g-*`) and component props over hard-coded visual values. Add CSS only for layout or behavior not covered by UIKit.
- Reuse `StateContainer` for pending/error/empty states and `SearchInput`, `ActionMenu`, and `SegmentedControl` for their established UI patterns.

Run `bun run format:check`, `bun run lint`, and `bun run typecheck` after frontend changes.
