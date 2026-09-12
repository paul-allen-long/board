import type { components } from "../api/generated/schema";

export type BoardData = components["schemas"]["Board"];
export type Column = components["schemas"]["Column"];
export type Task = components["schemas"]["Task"];
export type TaskPriority = Task["priority"];
export type CreateColumnRequest = components["schemas"]["CreateColumnRequest"];
export type CreateTaskRequest = components["schemas"]["CreateTaskRequest"];
export type MoveTaskRequest = components["schemas"]["MoveTaskRequest"];
export type UpdateColumnRequest = components["schemas"]["UpdateColumnRequest"];
