import S from "components/Elements";
import styled from "styled-components";
import { UserContext } from "context/UserContext";
import { ChatContext } from "context/ChatContext";
import { useContext } from "react";
import Image from "next/image";
import { getGravatar } from "utils/getGravatar";
import { reduceToUnique } from "utils/reduceToUnique";
import { useRouter } from "next/router";
import ChatCard from "./ChatCard";

const RoundedImage = styled(Image)`
  border-radius: 50%;
`;

const CustomDiv = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 100vh;
  background-color: ${(p) => p.theme.colors.white};
  overflow-y: scroll;

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

export default function ChatSidebar() {
  const router = useRouter();
  const { currentUser } = useContext(UserContext);
  const { messages } = useContext(ChatContext);

  return (
    <CustomDiv>
      <S.Div display="flex" items="center" ml={4} mt={2}>
        {currentUser && (
          <>
            <S.Div mr={4}>
              <RoundedImage
                width={50}
                height={50}
                src={getGravatar(currentUser?.name)}
              />
            </S.Div>
            <S.Heading.H1 text="md">{currentUser?.name}</S.Heading.H1>
          </>
        )}
      </S.Div>
      {messages &&
        messages.length > 0 &&
        messages
          .sort((a, b) => b.createdAt - a.createdAt)
          .reduce(reduceToUnique, [])
          .map((message) => (
            <ChatCard
              key={message.chatId}
              id={message.chatId}
              type={message.type}
            />
          ))}
    </CustomDiv>
  );
}
