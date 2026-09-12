import { LayoutColumns3, Moon, Sun } from "@gravity-ui/icons";
import { Avatar, Button, Icon, Text } from "@gravity-ui/uikit";
import { useTranslation } from "react-i18next";

import { SegmentedControl } from "../../core/SegmentedControl";

import type { AppHeaderProps } from "./AppHeader.types";

export function AppHeader({
  language,
  themeMode,
  onLanguageChange,
  onThemeModeChange,
}: AppHeaderProps) {
  const { t } = useTranslation();

  return (
    <header className="app-header">
      <div className="app-header__content">
        <div className="app-header__brand">
          <Icon data={LayoutColumns3} size={22} />
          <Text variant="subheader-2">Board</Text>
        </div>
        <div className="app-header__actions">
          <SegmentedControl
            ariaLabel={t("appHeader.language")}
            name="language"
            options={[
              { value: "ru", label: "RU" },
              { value: "en", label: "EN" },
            ]}
            value={language}
            onChange={onLanguageChange}
          />
          <Button
            view="flat"
            size="m"
            aria-label={t("appHeader.toggleTheme")}
            onClick={onThemeModeChange}
          >
            <Icon data={themeMode === "light" ? Moon : Sun} size={18} />
          </Button>
          <Avatar text="AB" size="s" theme="brand" />
        </div>
      </div>
    </header>
  );
}
