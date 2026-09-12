export type SearchInputProps = {
  ariaLabel: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
  disabled?: boolean;
};
