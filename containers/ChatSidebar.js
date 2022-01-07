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

export default function ChatSidebar() {
  const router = useRouter();
  const { currentUser } = useContext(UserContext);
  const { messages } = useContext(ChatContext);

  return (
    <S.Section minHeight="100vh" bgColor="white">
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
          .reduce(reduceToUnique, [])
          .map((message) => (
            <ChatCard
              type={message.type}
              key={message.chatId}
              id={message.chatId}
            />
          ))}
    </S.Section>
  );
}
