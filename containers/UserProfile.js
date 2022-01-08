import { useContext, useState } from "react";
import S from "components/Elements";
import { PersistenceContext } from "context/PersistenceProvider";
import FormInput from "components/inputs/FormInput";
import { InsertModeButton } from "components/buttons/InsertModeButton";
import ProfileImage from "components/ProfileImage";

export default function UserProfile({ currentUser }) {
  const [insertMode, setInsertMode] = useState(false);
  const { idb } = useContext(PersistenceContext);
  const [userName, setUserName] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    await idb.users.update(+currentUser.id, {
      name: userName,
    });
    setInsertMode(false);
  };

  const onChange = (e) => {
    setUserName(e.target.value);
  };

  return insertMode ? (
    <FormInput
      placeholder="Nuevo username"
      onChange={onChange}
      onSubmit={onSubmit}
      variant="secondary"
      icon="save"
    />
  ) : (
    <InsertModeButton
      onClick={() => {
        setInsertMode(true);
      }}
      variant="secondary"
    >
      <ProfileImage userName={currentUser?.name} size={50} />
      <S.Heading.H1 maxWidth="60%" ml={4} text="md">
        {currentUser?.name}
      </S.Heading.H1>
      <S.Span ml={5} text="lg" className="material-icons">
        edit
      </S.Span>
      <S.Span>(Editar)</S.Span>
    </InsertModeButton>
  );
}
