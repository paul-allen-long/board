import { DragDropProvider } from "@dnd-kit/react";
import { Funnel, Plus } from "@gravity-ui/icons";
import { Button, Icon, Text } from "@gravity-ui/uikit";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import { BoardColumn } from "../../components/board/BoardColumn";
import { NewColumnForm } from "../../components/board/NewColumnForm";
import { SearchInput } from "../../components/core/SearchInput";
import { StateContainer } from "../../components/core/StateContainer";
import { useBoardMutations, useBoardQuery } from "../../queries/boardQueries";

import type { FormEvent } from "react";

export function BoardPage() {
  const [search, setSearch] = useState("");
  const [newColumnName, setNewColumnName] = useState("");
  const [draggedTaskId, setDraggedTaskId] = useState<number | null>(null);
  const [dropColumnId, setDropColumnId] = useState<string | null>(null);
  const { data, error, isPending } = useBoardQuery();
  const { createColumn, createTask, deleteColumn, deleteTask, moveTask, renameColumn } =
    useBoardMutations();
  const { t } = useTranslation();
  const errorMessage = error instanceof TypeError ? t("boardPage.connectionError") : error?.message;

  const visibleTasks = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!data) {
      return [];
    }
    return query
      ? data.tasks.filter(task => `${task.key} ${task.title}`.toLowerCase().includes(query))
      : data.tasks;
  }, [data, search]);
  const draggedTask = data?.tasks.find(task => task.id === draggedTaskId);

  function addColumn(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const name = newColumnName.trim();
    if (!name) {
      return;
    }
    createColumn.mutate({ name }, { onSuccess: () => setNewColumnName("") });
  }

  return (
    <main className="board-page">
      <section className="board-page__intro">
        <div>
          <Text className="board-page__project" variant="caption-2" color="secondary">
            {t("boardPage.project")}
          </Text>
          <Text variant="header-1">{t("boardPage.title")}</Text>
          <Text className="board-page__description" variant="body-2" color="secondary">
            {t("boardPage.description")}
          </Text>
        </div>
        <Button
          view="action"
          disabled={!data || createTask.isPending}
          onClick={() => data && createTask.mutate({ columnId: data.columns[0].id })}
        >
          <Icon data={Plus} size={16} />
          {t("boardPage.createTask")}
        </Button>
      </section>
      <section className="board-page__toolbar">
        <SearchInput
          ariaLabel={t("boardPage.searchLabel")}
          className="board-page__search"
          placeholder={t("boardPage.searchPlaceholder")}
          value={search}
          onChange={setSearch}
        />
        <Text variant="body-2" color="secondary">
          {t("boardPage.taskCount", { count: visibleTasks.length })}
        </Text>
        <Button className="board-page__filter" view="outlined">
          <Icon data={Funnel} size={16} />
          {t("boardPage.filters")}
        </Button>
      </section>
      <StateContainer
        isEmpty={Boolean(data && !data.columns.length)}
        isError={Boolean(error)}
        isPending={isPending}
        emptyContent={<Text color="secondary">{t("boardPage.empty")}</Text>}
        error={errorMessage}
      >
        {data && (
          <DragDropProvider
            onDragStart={event => {
              const sourceID = String(event.operation.source?.id);
              const taskID = Number(sourceID.replace("task-", ""));
              setDraggedTaskId(Number.isInteger(taskID) ? taskID : null);
            }}
            onDragOver={event => {
              const targetID = event.operation.target?.id;
              setDropColumnId(
                typeof targetID === "string" && targetID.startsWith("column-")
                  ? targetID.replace("column-", "")
                  : null,
              );
            }}
            onDragEnd={event => {
              setDraggedTaskId(null);
              setDropColumnId(null);
              if (event.canceled) {
                return;
              }
              const source = event.operation.source;
              const targetID = event.operation.target?.id;
              if (!source || typeof targetID !== "string") {
                return;
              }
              const sourceID = String(source.id);
              if (!sourceID.startsWith("task-")) {
                return;
              }
              const taskID = Number(sourceID.replace("task-", ""));
              const columnID = targetID.replace("column-", "");
              if (!Number.isInteger(taskID) || !columnID) {
                return;
              }
              moveTask.mutate({ id: taskID, payload: { columnId: columnID } });
            }}
          >
            <section className="board-page__columns" aria-label={t("boardPage.boardLabel")}>
              {data.columns.map(column => (
                <BoardColumn
                  key={column.id}
                  column={column}
                  tasks={visibleTasks.filter(task => task.columnId === column.id)}
                  onAdd={columnId => createTask.mutate({ columnId })}
                  onRename={(id, name) => renameColumn.mutate({ id, payload: { name } })}
                  onDelete={id => deleteColumn.mutate(id)}
                  onDeleteTask={id => deleteTask.mutate(id)}
                  dropPreviewTask={dropColumnId === column.id ? draggedTask : undefined}
                />
              ))}
              <NewColumnForm
                name={newColumnName}
                onNameChange={setNewColumnName}
                onSubmit={addColumn}
              />
            </section>
          </DragDropProvider>
        )}
      </StateContainer>
    </main>
  );
}
