import { useDroppable } from "@dnd-kit/react";
import { Plus, TrashBin } from "@gravity-ui/icons";
import { Button, Card, Icon, Label, Text, TextInput } from "@gravity-ui/uikit";
import { AnimatePresence } from "motion/react";
import { useTranslation } from "react-i18next";

import { AnimatedTaskCard } from "../../animated/AnimatedTaskCard";
import { TaskDropPlaceholder } from "../../animated/TaskDropPlaceholder";

import type { BoardColumnProps } from "./BoardColumn.types";

export function BoardColumn({
  column,
  tasks,
  onAdd,
  onRename,
  onDelete,
  onDeleteTask,
  dropPreviewTask,
}: BoardColumnProps) {
  const { t } = useTranslation();
  const { isDropTarget, ref } = useDroppable({ id: `column-${column.id}` });

  return (
    <div ref={ref} className={isDropTarget ? "board-column-drop-target" : undefined}>
      <Card className="board-column" view="filled">
        <div className="board-column__header">
          <span className="board-column__color" style={{ backgroundColor: column.color }} />
          <TextInput
            className="board-column__name"
            view="clear"
            size="s"
            defaultValue={column.name}
            onBlur={event => onRename(column.id, event.target.value)}
          />
          <Label theme="normal" size="xs">
            {tasks.length}
          </Label>
          <Button
            view="flat-danger"
            size="s"
            aria-label={t("boardColumn.delete")}
            onClick={() => onDelete(column.id)}
          >
            <Icon data={TrashBin} size={16} />
          </Button>
        </div>
        <div className="board-column__tasks">
          <AnimatePresence initial={false}>
            {tasks.map(task => (
              <AnimatedTaskCard key={task.id} task={task} onDelete={onDeleteTask} />
            ))}
            {dropPreviewTask && <TaskDropPlaceholder task={dropPreviewTask} />}
          </AnimatePresence>
          {!tasks.length && (
            <Text className="board-column__empty" variant="body-2" color="secondary">
              {t("boardColumn.empty")}
            </Text>
          )}
        </div>
        <Button
          className="board-column__add-task"
          view="flat"
          width="max"
          onClick={() => onAdd(column.id)}
        >
          <Icon data={Plus} size={16} />
          {t("boardColumn.addTask")}
        </Button>
      </Card>
    </div>
  );
}
