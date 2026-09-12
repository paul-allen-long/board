import type { ReactNode } from "react";

export type ActionMenuItem = {
  label: string;
  onAction: () => void;
  icon?: ReactNode;
  theme?: "danger" | "normal";
};

export type ActionMenuProps = {
  ariaLabel: string;
  items: readonly ActionMenuItem[];
};
