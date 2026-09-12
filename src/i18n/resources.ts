import { boardColumnI18n } from "../components/board/BoardColumn/BoardColumn.i18n";
import { newColumnFormI18n } from "../components/board/NewColumnForm/NewColumnForm.i18n";
import { taskCardI18n } from "../components/board/TaskCard/TaskCard.i18n";
import { appHeaderI18n } from "../components/layout/AppHeader/AppHeader.i18n";
import { boardPageI18n } from "../pages/BoardPage/BoardPage.i18n";

export const resources = {
  ru: {
    translation: {
      ...appHeaderI18n.ru,
      ...boardColumnI18n.ru,
      ...newColumnFormI18n.ru,
      ...taskCardI18n.ru,
      ...boardPageI18n.ru,
    },
  },
  en: {
    translation: {
      ...appHeaderI18n.en,
      ...boardColumnI18n.en,
      ...newColumnFormI18n.en,
      ...taskCardI18n.en,
      ...boardPageI18n.en,
    },
  },
} as const;
