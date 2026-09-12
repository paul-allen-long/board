import { DropdownMenu } from "@gravity-ui/uikit";

import type { ActionMenuProps } from "./ActionMenu.types";

export function ActionMenu({ ariaLabel, items }: ActionMenuProps) {
  return (
    <DropdownMenu
      defaultSwitcherProps={{ "aria-label": ariaLabel }}
      items={items.map(item => ({
        action: item.onAction,
        iconStart: item.icon,
        text: item.label,
        theme: item.theme,
      }))}
      size="s"
    />
  );
}
