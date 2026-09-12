import { TrashBin } from "@gravity-ui/icons";
import { Avatar, Card, Icon, Label, Text } from "@gravity-ui/uikit";
import { useTranslation } from "react-i18next";

import { ActionMenu } from "../../core/ActionMenu";

import type { TaskCardProps } from "./TaskCard.types";

const priorityThemes = { high: "danger", medium: "warning", low: "success" } as const;

export function TaskCard({ task, onDelete }: TaskCardProps) {
  const { t } = useTranslation();

  return (
    <Card className="task-card" view="outlined">
      <div className="task-card__content">
        <div className="task-card__meta">
          <Text variant="caption-2" color="secondary">
            {task.key}
          </Text>
          <div className="task-card__actions">
            <Label theme={priorityThemes[task.priority]} size="xxs" title={t("taskCard.priority")}>
              {task.priority}
            </Label>
            <ActionMenu
              ariaLabel={t("taskCard.moreActions")}
              items={[
                {
                  icon: <Icon data={TrashBin} size={16} />,
                  label: t("taskCard.delete"),
                  onAction: () => onDelete(task.id),
                  theme: "danger",
                },
              ]}
            />
          </div>
        </div>
        <Text className="task-card__title" variant="body-2">
          {task.title}
        </Text>
        <div className="task-card__footer">
          <Label theme="info" size="xs">
            {task.label}
          </Label>
          <Avatar text={task.assignee} size="2xs" theme="brand" />
        </div>
      </div>
    </Card>
  );
}
