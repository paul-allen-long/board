import { useDraggable } from "@dnd-kit/react";
import { motion } from "motion/react";

import { TaskCard } from "../../board/TaskCard";

import type { AnimatedTaskCardProps } from "./AnimatedTaskCard.types";

export function AnimatedTaskCard({ task, onDelete }: AnimatedTaskCardProps) {
  const { isDragging, ref } = useDraggable({ id: `task-${task.id}` });

  return (
    <motion.div
      ref={ref}
      layout
      className="animated-task-card"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: isDragging ? 0.4 : 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ type: "spring", stiffness: 520, damping: 36 }}
    >
      <TaskCard task={task} onDelete={onDelete} />
    </motion.div>
  );
}
