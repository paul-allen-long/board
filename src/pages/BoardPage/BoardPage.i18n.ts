export const boardPageI18n = {
  ru: {
    boardPage: {
      project: "ПРОЕКТ · DESK",
      title: "Доска",
      description: "Держим фокус на важном.",
      createTask: "Создать задачу",
      connectionError: "Не удалось подключиться к API.",
      searchPlaceholder: "Поиск задач",
      searchLabel: "Поиск задач",
      taskCount: "{{count}} задач",
      filters: "Фильтры",
      empty: "На доске пока нет колонок.",
      boardLabel: "Доска задач",
    },
  },
  en: {
    boardPage: {
      project: "PROJECT · DESK",
      title: "Dashboard",
      description: "Focus on what matters.",
      createTask: "Create task",
      connectionError: "Could not connect to the API.",
      searchPlaceholder: "Search tasks",
      searchLabel: "Search tasks",
      taskCount: "{{count}} tasks",
      filters: "Filters",
      empty: "There are no columns on the board yet.",
      boardLabel: "Task board",
    },
  },
} as const;
