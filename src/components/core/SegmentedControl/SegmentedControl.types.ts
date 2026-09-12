import type { SegmentedRadioGroupSize } from "@gravity-ui/uikit";

export type SegmentedControlOption<Value extends string> = {
  value: Value;
  label: string;
  disabled?: boolean;
};

export type SegmentedControlProps<Value extends string> = {
  ariaLabel: string;
  name: string;
  options: readonly SegmentedControlOption<Value>[];
  value: Value;
  onChange: (value: Value) => void;
  className?: string;
  disabled?: boolean;
  size?: SegmentedRadioGroupSize;
};
