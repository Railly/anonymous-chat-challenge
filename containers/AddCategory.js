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
  justify-content: center;
  border: 0;
  cursor: pointer;
  padding: 0.5rem;
  padding-right: 1rem;
  padding-left: 0.5rem;
  margin-left: 1rem;
  margin-bottom: 0.5rem;
  border-radius: 5px;
  font-weight: bold;
  color: ${(p) => p.theme.colors.secondary};
  background-color: transparent;

  &:hover {
    transition: all 0.3s ease-in-out;
    color: ${(p) => p.theme.darkColors.secondary};
    background-color: ${(p) => p.theme.lightColors.secondary};
  }
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
  background-color: ${(p) => p.theme.colors.secondary};

  &:hover {
    transition: all 0.3s ease-in-out;
    background-color: ${(p) => p.theme.darkColors.secondary};
  }
`;

export default function AddCategory({ insertMode, setInsertMode }) {
  const [categoryName, setCategoryName] = useState("");
  const { idb } = useContext(PersistenceContext);

  return insertMode ? (
    <S.Form
      onSubmit={async (e) => {
        e.preventDefault();
        await idb.categories.add({ name: categoryName });
        setInsertMode(false);
      }}
      display="flex"
    >
      <CustomInput
        type="text"
        placeholder="Nombre de la categoría"
        name="name"
        onChange={async (e) => {
          setCategoryName(e.target.value);
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
      width="100%"
      onClick={() => setInsertMode(true)}
      variant="secondary"
    >
      <S.Span text="md" className="material-icons">
        add
      </S.Span>
      <S.Span ml={2} text="base">
        Nueva Categoría
      </S.Span>
    </InsertModeButton>
  );
}
