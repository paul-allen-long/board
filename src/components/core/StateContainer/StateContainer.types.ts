import type { LoaderSize } from "@gravity-ui/uikit";
import type { ReactNode } from "react";

export type StateContainerLoadingMode = "overlay" | "replace";

export type StateContainerProps = {
  children: ReactNode;
  isEmpty?: boolean;
  isError?: boolean;
  isPending?: boolean;
  emptyContent?: ReactNode;
  error?: ReactNode;
  loadingContent?: ReactNode;
  loadingMode?: StateContainerLoadingMode;
  loaderSize?: LoaderSize;
  className?: string;
};
