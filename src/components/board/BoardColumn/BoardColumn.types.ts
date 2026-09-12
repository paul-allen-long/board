import type { Column, Task } from "../../../types/board";

export type BoardColumnProps = {
  column: Column;
  tasks: Task[];
  onAdd: (columnId: string) => void;
  onRename: (columnId: string, name: string) => void;
  onDelete: (columnId: string) => void;
  onDeleteTask: (taskId: number) => void;
  dropPreviewTask?: Task;
};
