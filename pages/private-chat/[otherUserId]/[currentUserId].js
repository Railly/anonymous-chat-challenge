import S from "components/Elements";
import { useRouter } from "next/router";
import { useContext } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { PersistenceContext } from "context/PersistenceProvider";
import MessageCard from "containers/MessageCard";
import styled from "styled-components";

const CustomSection = styled.section`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: ${(p) => p.theme.colors.mediumPrimary};
`;

const CustomDiv = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 100vh;
  background-color: ${(p) => p.theme.colors.mediumPrimary};
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

export default function PrivateChatID() {
  const router = useRouter();
  const { otherUserId, currentUserId } = router.query;
  const { idb } = useContext(PersistenceContext);

  const chat = useLiveQuery(() => {
    if (otherUserId && currentUserId) {
      return (
        idb.directChats
          .where("otherUserId")
          .equals(+otherUserId)
          .or("currentUserId")
          .equals(+otherUserId)
          // .and(
          //   (chat) =>
          //     chat.otherUserId === +currentUserId ||
          //     chat.currentUserId === +currentUserId
          // )
          .first()
      );
    }
  }, [otherUserId, currentUserId]);

  const messages = useLiveQuery(() => {
    if (chat) {
      console.log(otherUserId, currentUserId);
      return idb.messages
        .where("type")
        .equals("private")
        .and(
          (message) =>
            (message.chatId === +otherUserId &&
              message.userId === +currentUserId) ||
            (message.chatId === +currentUserId &&
              message.userId === +otherUserId)
        )
        .toArray();
    }
  }, [chat]);

  console.log(chat, "chat");

  console.log(messages, "messages");

  return (
    <CustomSection>
      <CustomDiv>
        {chat && (
          <S.Heading.H1 text="lg" color="black" display="flex" items="center">
            {chat.name}
          </S.Heading.H1>
        )}
        <S.Div display="flex" direction="column">
          {messages?.length > 0 &&
            messages.map((message) => (
              <MessageCard key={message.id} message={message} />
            ))}
        </S.Div>
      </CustomDiv>
    </CustomSection>
  );
}
