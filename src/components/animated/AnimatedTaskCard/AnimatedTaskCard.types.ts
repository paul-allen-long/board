import type { Task } from "../../../types/board";

export type AnimatedTaskCardProps = {
  task: Task;
  onDelete: (taskId: number) => void;
};
