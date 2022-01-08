import LogoIcon from "components/LogoIcon";
import ChatCategory from "containers/ChatCategory";
import styled from "styled-components";
import S from "components/Elements";
import { useContext, useEffect, useState } from "react";
import { ChatContext } from "context/ChatContext";
import { UserContext } from "context/UserContext";
import ChatUser from "./ChatUser";
import { useRouter } from "next/router";
import AddCategory from "./AddCategory";

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

export default function MainSidebar() {
  const router = useRouter();
  const [selected, setSelected] = useState("grupal");
  const [insertMode, setInsertMode] = useState(false);
  const { categories } = useContext(ChatContext);
  const { users } = useContext(UserContext);

  useEffect(() => {
    if (router.pathname.includes("private-chat")) {
      setSelected("individual");
    }
  }, [router.pathname]);

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
          <CustomInput type="search" placeholder="Busca usuarios o grupos" />
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
        </CustomDiv>
      </CustomSection>
      {/* <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        type="new-category"
      /> */}
    </>
  );
}
