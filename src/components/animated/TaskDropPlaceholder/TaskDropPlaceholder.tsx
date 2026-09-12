import { Card, Text } from "@gravity-ui/uikit";
import { motion } from "motion/react";

import type { TaskDropPlaceholderProps } from "./TaskDropPlaceholder.types";

export function TaskDropPlaceholder({ task }: TaskDropPlaceholderProps) {
  return (
    <motion.div
      layout
      className="task-drop-placeholder"
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ type: "spring", stiffness: 500, damping: 34 }}
    >
      <Card className="task-drop-placeholder__card" view="outlined">
        <Text variant="caption-2" color="secondary">
          {task.key}
        </Text>
        <Text variant="body-2">{task.title}</Text>
      </Card>
    </motion.div>
  );
}
