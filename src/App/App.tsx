import { ThemeProvider } from "@gravity-ui/uikit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import { AppHeader } from "../components/layout/AppHeader";
import { storageKeys } from "../constants";
import { useLocalStorage } from "../hooks";
import i18n, { type Language } from "../i18n";
import { BoardPage } from "../pages/BoardPage";

import type { AppThemeMode } from "../theme";

export function App() {
  const [themeMode, setThemeMode] = useLocalStorage<AppThemeMode>(storageKeys.themeMode, "light");
  const [language, setLanguage] = useLocalStorage<Language>(storageKeys.language, "ru");
  const [queryClient] = useState(
    () => new QueryClient({ defaultOptions: { queries: { retry: 1, staleTime: 30_000 } } }),
  );

  useEffect(() => {
    void i18n.changeLanguage(language);
  }, [language]);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={themeMode} lang={language}>
        <AppHeader
          language={language}
          themeMode={themeMode}
          onLanguageChange={setLanguage}
          onThemeModeChange={() => setThemeMode(mode => (mode === "light" ? "dark" : "light"))}
        />
        <BoardPage />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
