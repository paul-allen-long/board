import { Magnifier } from "@gravity-ui/icons";
import { Icon, TextInput } from "@gravity-ui/uikit";

import type { SearchInputProps } from "./SearchInput.types";

export function SearchInput({
  ariaLabel,
  placeholder,
  value,
  onChange,
  className,
  disabled = false,
}: SearchInputProps) {
  return (
    <TextInput
      aria-label={ariaLabel}
      className={className}
      disabled={disabled}
      hasClear
      placeholder={placeholder}
      size="m"
      startContent={
        <span className="search-input__icon">
          <Icon data={Magnifier} size={16} />
        </span>
      }
      type="search"
      value={value}
      onUpdate={onChange}
    />
  );
}
