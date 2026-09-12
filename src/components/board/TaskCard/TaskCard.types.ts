import type { Task } from "../../../types/board";

export type TaskCardProps = {
  task: Task;
  onDelete: (taskId: number) => void;
};
