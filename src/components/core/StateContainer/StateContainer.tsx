import { Alert, Loader, Overlay } from "@gravity-ui/uikit";

import type { StateContainerProps } from "./StateContainer.types";

export function StateContainer({
  children,
  isEmpty = false,
  isError = false,
  isPending = false,
  emptyContent = null,
  error = null,
  loadingContent,
  loadingMode = "overlay",
  loaderSize = "l",
  className,
}: StateContainerProps) {
  const loadingView = loadingContent ?? <Loader size={loaderSize} />;
  const content = isEmpty ? emptyContent : children;

  return (
    <section className={["state-container", className].filter(Boolean).join(" ")}>
      {isError && error && (
        <div className="state-container__error">
          <Alert theme="danger" message={error} />
        </div>
      )}
      {isPending && loadingMode === "replace" ? (
        <div className="state-container__loading-replace">{loadingView}</div>
      ) : (
        <div className="state-container__content">
          {content}
          <Overlay visible={isPending}>{loadingView}</Overlay>
        </div>
      )}
    </section>
  );
}
