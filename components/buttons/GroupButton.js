import S from "components/Elements";
import { Option } from "components/Option";

export default function GroupButton({ selected, setSelected }) {
  return (
    <>
      <Option
        onClick={() => {
          setSelected("grupal");
        }}
        isActive={selected === "grupal"}
      >
        <S.Span className="material-icons">groups</S.Span>
        <S.Span ml={2}>Chats grupales</S.Span>
      </Option>
      <Option
        onClick={() => setSelected("individual")}
        isActive={selected === "individual"}
      >
        <S.Span text="md" className="material-icons">
          send
        </S.Span>
        <S.Span ml={2}>Mensajes directos</S.Span>
      </Option>
    </>
  );
}
