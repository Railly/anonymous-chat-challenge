import LogoIcon from "components/LogoIcon";
import ChatCategory, { ChatGroup } from "containers/ChatCategory";
import styled from "styled-components";
import S from "components/Elements";
import { useContext, useState } from "react";
import { ChatContext } from "context/ChatContext";
import { UserContext } from "context/UserContext";
import ChatUser from "./ChatUser";
import { useRouter } from "next/router";
import AddCategory from "./AddCategory";
import FilteredData from "./FilteredData";

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

const Option = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 0.3rem;
  margin-bottom: 1rem;
  margin-left: 1rem;
  margin-right: 1rem;
  border-radius: 5px;
  border: 5px solid
    ${(p) =>
      p.isActive ? p.theme.colors.primary : p.theme.colors.lightPrimary};
  background-color: ${(p) =>
    p.isActive ? p.theme.colors.primary : p.theme.colors.lightPrimary};
  color: ${(p) => (p.isActive ? p.theme.colors.white : p.theme.colors.primary)};
  font-weight: bold;
  &:hover {
    transition: all 0.1s ease-in-out;
    border: 5px solid ${(p) => p.theme.colors.primary};
  }
`;

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

const FilterButton = styled.button`
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

export default function MainSidebar() {
  const [insertMode, setInsertMode] = useState(false);
  const [searchText, setSearchText] = useState("");
  const { categories, groupChats } = useContext(ChatContext);
  const { users, selected, setSelected } = useContext(UserContext);

  return (
    <>
      <CustomSection>
        <S.Div display="flex" direction="column">
          <S.Heading.H1
            display="flex"
            items="center"
            justify="center"
            text="lg"
            mt={2}
            px={4}
            py={2}
          >
            <LogoIcon />
            <S.Span ml={2}>Chat App</S.Span>
          </S.Heading.H1>
          <S.Form
            onSubmit={(e) => {
              e.preventDefault();
              setSelected("filter");
            }}
            display="flex"
          >
            <CustomInput
              type="text"
              placeholder="Busca por usuario o grupo"
              name="name"
              onChange={async (e) => {
                setSearchText(e.target.value);
              }}
            />
            <FilterButton type="submit">
              <S.Span text="md" className="material-icons">
                search
              </S.Span>
            </FilterButton>
          </S.Form>
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
        </S.Div>
        {selected === "grupal" && (
          <AddCategory insertMode={insertMode} setInsertMode={setInsertMode} />
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
