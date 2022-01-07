import S from "components/Elements";
import styled from "styled-components";
import { UserContext } from "context/UserContext";
import { ChatContext } from "context/ChatContext";
import { useContext } from "react";

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

export default function ChatSidebar() {
  const { users, currentUser } = useContext(UserContext);
  const { chats, categories, messages } = useContext(ChatContext);

  console.log(users, "users");
  console.log(currentUser, "currentUser");
  console.log(chats, "chats");
  console.log(categories, "categories");
  console.log(messages, "messages");

  return (
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
  );
}
