---
name: board-interactions
description: Change task drag-and-drop, task actions, state presentation, or Motion animations in this board.
---

# Board interactions

Use this skill for behavior around cards and columns.

- Keep drag-and-drop on `@dnd-kit/react`; use `DragDropProvider`, draggable task cards, and droppable columns.
- Keep Motion-specific components under `src/components/animated/`. Use `layout` and `AnimatePresence` for list and height changes; do not animate the same layout with competing CSS transforms.
- The current backend persists only `columnId`, not a task position. A drag preview and the final move belong at the end of the target column. Add an explicit `position` field to OpenAPI, Go storage, generated TypeScript types, and mutations before implementing arbitrary insertion/reordering.
- Route card actions through `core/ActionMenu`; destructive actions must call the API and invalidate the board query.
- Preserve accessible names for icon-only controls and keep drag affordances usable on touch devices.

Verify a move and a delete against the API, then run the frontend checks.
