import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { boardApi } from "../api/boardApi";

import type { MoveTaskRequest, UpdateColumnRequest } from "../types/board";

const boardQueryKey = ["board"] as const;

export function useBoardQuery() {
  return useQuery({ queryKey: boardQueryKey, queryFn: boardApi.getBoard });
}

export function useBoardMutations() {
  const queryClient = useQueryClient();
  const invalidateBoard = () => queryClient.invalidateQueries({ queryKey: boardQueryKey });

  return {
    createColumn: useMutation({ mutationFn: boardApi.createColumn, onSuccess: invalidateBoard }),
    renameColumn: useMutation({
      mutationFn: ({ id, payload }: { id: string; payload: UpdateColumnRequest }) =>
        boardApi.renameColumn(id, payload),
      onSuccess: invalidateBoard,
    }),
    deleteColumn: useMutation({ mutationFn: boardApi.deleteColumn, onSuccess: invalidateBoard }),
    createTask: useMutation({ mutationFn: boardApi.createTask, onSuccess: invalidateBoard }),
    moveTask: useMutation({
      mutationFn: ({ id, payload }: { id: number; payload: MoveTaskRequest }) =>
        boardApi.moveTask(id, payload),
      onSuccess: invalidateBoard,
    }),
    deleteTask: useMutation({ mutationFn: boardApi.deleteTask, onSuccess: invalidateBoard }),
  };
}
