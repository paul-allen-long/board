import { SegmentedRadioGroup } from "@gravity-ui/uikit";

import type { SegmentedControlProps } from "./SegmentedControl.types";

export function SegmentedControl<Value extends string>({
  ariaLabel,
  name,
  options,
  value,
  onChange,
  className,
  disabled = false,
  size = "s",
}: SegmentedControlProps<Value>) {
  return (
    <SegmentedRadioGroup
      aria-label={ariaLabel}
      className={className}
      name={name}
      options={options.map(option => ({
        value: option.value,
        content: option.label,
        disabled: option.disabled,
      }))}
      value={value}
      disabled={disabled}
      size={size}
      onUpdate={onChange}
    />
  );
}
