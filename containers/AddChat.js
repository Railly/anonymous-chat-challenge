import S from "components/Elements";
import { PersistenceContext } from "context/PersistenceProvider";
import { useContext, useState } from "react";
import styled from "styled-components";

const CustomInput = styled.input`
  width: 75%;
  display: inline-block;
  border: none;
  border: 1px solid #ccc;
  padding: 0.5rem;
  font-size: 1rem;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
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
  color: ${(p) => p.theme.colors.tertiary};
  background-color: transparent;

  &:hover {
    transition: all 0.3s ease-in-out;
    color: ${(p) => p.theme.darkColors.tertiary};
    background-color: ${(p) => p.theme.lightColors.tertiary};
  }
  margin-bottom: 0.5rem;
`;

const AddCategoryButton = styled.button`
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
  background-color: ${(p) => p.theme.colors.tertiary};

  &:hover {
    transition: all 0.3s ease-in-out;
    background-color: ${(p) => p.theme.darkColors.tertiary};
  }
`;

export default function AddChat({ insertMode, setInsertMode, categoryId }) {
  const [chatName, setChatName] = useState("");
  const { idb } = useContext(PersistenceContext);

  return insertMode ? (
    <S.Form
      onSubmit={async (e) => {
        e.preventDefault();
        await idb.groupChats.add({
          name: chatName,
          categoryId: categoryId,
          type: "group",
        });
        setInsertMode(false);
      }}
      display="flex"
    >
      <CustomInput
        type="text"
        placeholder="Nombre del chat"
        name="name"
        onChange={async (e) => {
          setChatName(e.target.value);
        }}
      />
      <AddCategoryButton type="submit">
        <S.Span text="md" className="material-icons">
          add
        </S.Span>
      </AddCategoryButton>
    </S.Form>
  ) : (
    <InsertModeButton
      onClick={() => setInsertMode(true)}
      width="100%"
      variant="secondary"
    >
      <S.Span text="md" className="material-icons">
        add
      </S.Span>
      <S.Span ml={2} text="base">
        Nuevo chat
      </S.Span>
    </InsertModeButton>
  );
}
