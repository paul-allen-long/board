# Application map

## Runtime flow

```text
Browser
  └─ src/index.tsx
      └─ App: Gravity ThemeProvider + React Query provider + persisted language/theme
          ├─ AppHeader
          └─ BoardPage
              └─ React Query -> boardApi -> Go API -> board.json
```

## Frontend boundaries

| Area | Location | Responsibility |
| --- | --- | --- |
| App shell | `src/App` | providers and persisted theme/language |
| Page orchestration | `src/pages/BoardPage` | board query, mutations, filters, dnd events |
| Layout components | `src/components/layout` | app-shell UI such as the header |
| Board components | `src/components/board` | render board-specific UI |
| Core components | `src/components/core` | reusable Gravity UI wrappers and state container |
| Animated components | `src/components/animated` | Motion and dnd-kit presentation |
| API client/types | `src/api`, `src/queries`, `src/types` | generated contract boundary and React Query |
| Localization | `src/i18n`, colocated `*.i18n.ts` | RU/EN resources |

## State ownership

- Server state: TanStack Query; mutations invalidate `['board']`.
- User preference: `useLocalStorage` for `board-theme-mode` and `board-language`.
- Page-local UI state: search, new-column input, current drag preview.
- UI toolkit state: Gravity UI controls; generic async presentation: `core/StateContainer`.

## Server boundaries

- OpenAPI contract: `api/openapi.yaml`.
- Generated Go server interface: `server/api/api.gen.go`.
- Store/HTTP handlers: `server/main.go`.
- Persisted lightweight data: `server/data/board.json`.

## Commands

```text
bun dev                         # frontend + Air Go API
bun run api:generate            # regenerate Go and TypeScript from OpenAPI
bun run check                   # frontend + API checks
```
