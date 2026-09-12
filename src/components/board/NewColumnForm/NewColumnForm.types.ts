import type { FormEvent } from "react";

export type NewColumnFormProps = {
  name: string;
  onNameChange: (name: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};
