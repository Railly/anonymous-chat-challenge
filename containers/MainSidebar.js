import ChatCategory from "containers/ChatCategory";
import styled from "styled-components";
import S from "components/Elements";
import { useContext, useState } from "react";
import { ChatContext } from "context/ChatContext";
import { UserContext } from "context/UserContext";
import ChatUser from "./ChatUser";
import AddButton from "./AddButton";
import FilteredData from "./FilteredData";
import GroupButton from "components/buttons/GroupButton";
import Logo from "components/Logo";
import FormInput from "components/inputs/FormInput";
import { PersistenceContext } from "context/PersistenceProvider";

const CustomDiv = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  max-height: 60vh;
  margin-left: 0.5rem;
  overflow-y: scroll;
  padding-bottom: 1rem;

  &::-webkit-scrollbar {
    width: 0.5rem;
  }

  &::-webkit-scrollbar-track {
    background: ${(p) => p.theme.colors.lightPrimary};
  }

  &::-webkit-scrollbar-thumb {
    background: ${(p) => p.theme.colors.primary};
    border-radius: 5px;
  }
`;

const CustomSection = styled.section`
  min-height: 100vh;
  background-color: ${(p) => p.theme.colors.white};

  &::-webkit-scrollbar {
    width: 0;
  }
`;

export default function MainSidebar() {
  const [insertMode, setInsertMode] = useState(false);
  const [searchText, setSearchText] = useState("");
  const { categories, groupChats } = useContext(ChatContext);
  const { users, selected, setSelected } = useContext(UserContext);
  const { idb } = useContext(PersistenceContext);

  const onSubmitSearch = (e) => {
    e.preventDefault();
    setSelected("filter");
  };

  const onChangeSearch = (e) => {
    setSearchText(e.target.value);
  };

  const addCategory = async (name) => {
    await idb.categories.add({ name });
  };

  return (
    <>
      <CustomSection>
        <S.Div display="flex" direction="column">
          <Logo />
          <FormInput
            placeholder="Busca por usuario o grupo"
            onChange={onChangeSearch}
            onSubmit={onSubmitSearch}
            variant="tertiary"
            icon="search"
          />
          <GroupButton selected={selected} setSelected={setSelected} />
        </S.Div>
        {selected === "grupal" && (
          <AddButton
            placeholder="Agregar categoría"
            variant="secondary"
            icon="add"
            insertMode={insertMode}
            setInsertMode={setInsertMode}
            addField={addCategory}
          />
        )}
        <CustomDiv>
          {selected === "grupal" &&
            categories &&
            categories.map((category) => (
              <ChatCategory
                key={category.id}
                name={category.name}
                id={category.id}
              />
            ))}

          {selected === "individual" &&
            users &&
            users.map((user) => <ChatUser key={user.id} user={user} />)}

          {selected === "filter" && (
            <FilteredData
              searchText={searchText}
              users={users}
              groupChats={groupChats}
            />
          )}
        </CustomDiv>
      </CustomSection>
    </>
  );
}
