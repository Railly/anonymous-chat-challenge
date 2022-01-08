import { useContext, useState } from "react";
import S from "components/Elements";
import styled from "styled-components";
import { getGravatar } from "utils/getGravatar";
import { PersistenceContext } from "context/PersistenceProvider";
import Image from "next/image";

const CustomInput = styled.input`
  width: 75%;
  display: inline-block;
  border: none;
  border: 1px solid #ccc;
  padding: 1rem;
  font-size: 1rem;
  margin-top: 0.875rem;
  margin-bottom: 0.875rem;
  margin-left: 1rem;
  &:focus {
    outline: none;
  }
`;

const InsertModeButton = styled.button`
  display: flex;
  align-items: center;
  border: 0;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 5px;
  font-weight: bold;
  width: 95%;
  color: ${(p) => p.theme.colors.black};
  background-color: transparent;

  &:hover {
    transition: all 0.3s ease-in-out;
    color: ${(p) => p.theme.darkColors.secondary};
    background-color: ${(p) => p.theme.lightColors.secondary};
  }
  margin-bottom: 0.5rem;
`;

const ChangeUsernameButton = styled.button`
  display: flex;
  width: 25%;
  margin: 0.5rem;
  align-items: center;
  justify-content: center;
  border: 0;
  cursor: pointer;
  border-radius: 5px;
  font-weight: bold;
  color: ${(p) => p.theme.colors.white};
  background-color: ${(p) => p.theme.colors.secondary};

  &:hover {
    transition: all 0.3s ease-in-out;
    background-color: ${(p) => p.theme.darkColors.secondary};
  }
`;

const RoundedImage = styled(Image)`
  border-radius: 50%;
`;

export default function UserProfile({ currentUser }) {
  const [insertMode, setInsertMode] = useState(false);
  const { idb } = useContext(PersistenceContext);
  const [userName, setUserName] = useState("");

  return insertMode ? (
    <S.Form
      onSubmit={async (e) => {
        e.preventDefault();
        await idb.users.update(+currentUser.id, {
          name: userName,
        });
        setInsertMode(false);
      }}
      display="flex"
    >
      <CustomInput
        type="text"
        placeholder="Nuevo username"
        name="name"
        onChange={async (e) => {
          setUserName(e.target.value);
        }}
      />
      <ChangeUsernameButton type="submit">
        <S.Span text="md" className="material-icons">
          save
        </S.Span>
      </ChangeUsernameButton>
    </S.Form>
  ) : (
    <InsertModeButton
      onClick={() => {
        setInsertMode(true);
      }}
    >
      <S.Div mr={4}>
        <RoundedImage
          width={50}
          height={50}
          src={getGravatar(currentUser?.name)}
        />
      </S.Div>
      <S.Heading.H1 text="md">{currentUser?.name}</S.Heading.H1>
      <S.Span ml={5} text="lg" className="material-icons">
        edit
      </S.Span>
      <S.Span>(Editar)</S.Span>
    </InsertModeButton>
  );
}
