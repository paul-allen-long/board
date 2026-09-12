import { Plus } from "@gravity-ui/icons";
import { Button, Card, Icon, TextInput } from "@gravity-ui/uikit";
import { useTranslation } from "react-i18next";

import type { NewColumnFormProps } from "./NewColumnForm.types";

export function NewColumnForm({ name, onNameChange, onSubmit }: NewColumnFormProps) {
  const { t } = useTranslation();

  return (
    <Card className="new-column-form" view="outlined">
      <form onSubmit={onSubmit}>
        <TextInput
          size="s"
          placeholder={t("newColumnForm.placeholder")}
          value={name}
          onUpdate={onNameChange}
        />
        <Button className="new-column-form__submit" width="max" type="submit">
          <Icon data={Plus} size={16} />
          {t("newColumnForm.submit")}
        </Button>
      </form>
    </Card>
  );
}
