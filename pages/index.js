import S from "components/Elements";
import AppLayout from "components/AppLayout";
import LogoIcon from "components/LogoIcon";
import ChatCategory from "containers/ChatCategory";
import { useContext, useState } from "react";
import styled from "styled-components";
import { UserContext } from "context/UserContext";

const CustomInput = styled.input`
  display: inline-block;
  border: none;
  border: 1px solid #ccc;
  padding: 0.5rem;
  font-size: 1rem;
  margin: 1rem;
  &:focus {
    outline: none;
  }
`;

const Option = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 0.5rem;
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

// make a circle div with style components
const CircleDiv = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background-image: linear-gradient(
    to right,
    ${(p) => p.theme.colors.secondary},
    ${(p) => p.theme.colors.tertiary}
  );
  margin-right: 1rem;
`;

const CustomSection = styled.section`
  min-height: 100vh;
  background-color: ${(p) => p.theme.colors.white};

  &::-webkit-scrollbar {
    width: 0;
  }
`;

const CustomButton = styled.button`
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

const chats = [
  {
    id: 1,
    name: "Chat 1",
    lastMessage: "Hola",
    lastMessageDate: "2020-05-01",
    lastMessageTime: "12:00",
    isRead: true,
    isGroup: true,
    isOnline: true,
    avatar: "https://i.pravatar.cc/300",
  },
  {
    id: 2,
    name: "Chat 2",
    lastMessage: "Hola",
    lastMessageDate: "2020-05-01",
    lastMessageTime: "12:00",
    isRead: true,
    isGroup: true,
    isOnline: true,
    avatar: "https://i.pravatar.cc/300",
  },
];

export default function Home({ channel, idb }) {
  const [selected, setSelected] = useState("grupal");
  const [channelMessage, setChannelMessage] = useState("");
  const { users, currentUser } = useContext(UserContext);

  console.log(users, "users");
  console.log(currentUser, "currentUser");

  return (
    <AppLayout>
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
            onClick={() => setSelected("grupal")}
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
        <CustomButton
          width="100%"
          onClick={() => setSelected("individual")}
          variant="secondary"
        >
          <S.Span text="md" className="material-icons">
            add
          </S.Span>
          <S.Span ml={2} text="base">
            Nueva Categoría
          </S.Span>
        </CustomButton>
        <CustomButton
          onClick={() => postMessage("Hello Fucking World")}
          variant="secondary"
        >
          Enviar mensaje
        </CustomButton>
        <CustomDiv>
          <ChatCategory name="Categoría 1" chats={chats} />
          <ChatCategory name="Categoría 2" chats={chats} />
          <ChatCategory name="Categoría 3" chats={chats} />
          <ChatCategory name="Categoría 4" chats={chats} />
          <ChatCategory name="Categoría 4" chats={chats} />
          <ChatCategory name="Categoría 4" chats={chats} />
          <ChatCategory name="Categoría 4" chats={chats} />
        </CustomDiv>
      </CustomSection>
      <S.Section minHeight="100vh" bgColor="mediumPrimary">
        <h1>
          <S.Span text="lg" className="material-icons">
            send
          </S.Span>
          {channelMessage !== "" && <S.Span ml={2}>{channelMessage}</S.Span>}
        </h1>
      </S.Section>
      <S.Section minHeight="100vh" bgColor="white">
        <S.Div display="flex" items="center" ml={4} mt={2}>
          <CircleDiv />
          {currentUser && (
            <S.Heading.H1 text="md">{currentUser?.name}</S.Heading.H1>
          )}
        </S.Div>
        <S.Heading.H2 text="base" ml={4} mt={2}>
          Mis Chats
        </S.Heading.H2>
      </S.Section>
    </AppLayout>
  );
}
