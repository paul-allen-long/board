# Board API contract map

```text
api/openapi.yaml
  ├─ oapi-codegen ──────> server/api/api.gen.go
  └─ openapi-typescript -> src/api/generated/schema.ts

server/main.go <-> server/data/board.json
src/api/boardApi.ts -> src/queries/boardQueries.ts -> pages/components
```

## Operations

| Operation | Route | UI caller |
| --- | --- | --- |
| Read board | `GET /api/board` | `useBoardQuery` |
| Create/rename/delete column | `/api/columns` | `useBoardMutations` |
| Create task | `POST /api/tasks` | Board page/column |
| Move task | `PATCH /api/tasks/{taskId}` | dnd-kit drag end |
| Delete task | `DELETE /api/tasks/{taskId}` | Task action menu |

Tasks have no persisted order. A cross-column move updates only `columnId`.
