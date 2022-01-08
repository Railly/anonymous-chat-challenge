import S from "components/Elements";
import FormInput from "components/inputs/FormInput";
import { InsertModeButton } from "components/buttons/InsertModeButton";
import { useState } from "react";

export default function AddButton({
  insertMode,
  setInsertMode,
  variant,
  placeholder,
  addField,
}) {
  const [name, setName] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    addField(name);
    setInsertMode(false);
  };

  const onChange = (e) => {
    setName(e.target.value);
  };

  return insertMode ? (
    <FormInput
      placeholder={placeholder}
      onSubmit={onSubmit}
      onChange={onChange}
      variant={variant}
      icon="add"
    />
  ) : (
    <InsertModeButton onClick={() => setInsertMode(true)} variant={variant}>
      <S.Span text="md" className="material-icons">
        add
      </S.Span>
      <S.Span ml={2} text="base">
        {placeholder}
      </S.Span>
    </InsertModeButton>
  );
}
