---
name: board-api-contract
description: Extend or change the Board Go API, OpenAPI schema, generated types, JSON store, or React Query integration.
---

# Board API contract

Use this skill whenever a UI feature needs data or server behavior.

Read [the contract map](references/contract.md) before editing.

- `api/openapi.yaml` is the contract source of truth.
- Never hand-edit `server/api/api.gen.go` or `src/api/generated/schema.ts`.
- After contract edits run `bun run api:generate`; then implement the generated Go interface in `server/main.go` and expose the request through `src/api/boardApi.ts` and `src/queries/boardQueries.ts`.
- Keep JSON writes protected by the store lock and preserve atomic temporary-file replacement in `store.save`.
- Return meaningful 400/404 errors through the existing error response shape.

Run Go vet/tests and TypeScript checks after a contract change.
