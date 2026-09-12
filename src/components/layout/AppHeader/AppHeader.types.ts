import type { Language } from "../../../i18n";
import type { AppThemeMode } from "../../../theme";

export type AppHeaderProps = {
  language: Language;
  themeMode: AppThemeMode;
  onLanguageChange: (language: Language) => void;
  onThemeModeChange: () => void;
};
