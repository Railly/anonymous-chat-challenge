import { SubmitButton } from "components/buttons/SubmitButton";
import { CustomInput } from "./CustomInput";
import S from "components/Elements";

export default function FormInput({
  placeholder,
  icon,
  onChange,
  onSubmit,
  variant,
}) {
  return (
    <S.Form onSubmit={onSubmit} display="flex">
      <CustomInput
        type="text"
        placeholder={placeholder}
        name="name"
        onChange={onChange}
      />
      <SubmitButton color="white" bgColor={variant} type="submit">
        <S.Span text="md" className="material-icons">
          {icon}
        </S.Span>
      </SubmitButton>
    </S.Form>
  );
}
