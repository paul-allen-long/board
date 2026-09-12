import type {
  BoardData,
  Column,
  CreateColumnRequest,
  CreateTaskRequest,
  MoveTaskRequest,
  Task,
  UpdateColumnRequest,
} from "../types/board";

const apiUrl = "http://localhost:8080/api";

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${apiUrl}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  if (!response.ok) {
    const body = (await response.json().catch(() => null)) as { error?: string } | null;
    throw new Error(body?.error ?? "Не удалось выполнить запрос к API.");
  }

  return response.status === 204 ? (undefined as T) : ((await response.json()) as T);
}

export const boardApi = {
  getBoard: () => request<BoardData>("/board"),
  createColumn: (payload: CreateColumnRequest) =>
    request<Column>("/columns", { method: "POST", body: JSON.stringify(payload) }),
  renameColumn: (id: string, payload: UpdateColumnRequest) =>
    request<void>(`/columns/${id}`, { method: "PATCH", body: JSON.stringify(payload) }),
  deleteColumn: (id: string) => request<void>(`/columns/${id}`, { method: "DELETE" }),
  createTask: (payload: CreateTaskRequest) =>
    request<Task>("/tasks", { method: "POST", body: JSON.stringify(payload) }),
  moveTask: (id: number, payload: MoveTaskRequest) =>
    request<void>(`/tasks/${id}`, { method: "PATCH", body: JSON.stringify(payload) }),
  deleteTask: (id: number) => request<void>(`/tasks/${id}`, { method: "DELETE" }),
};
