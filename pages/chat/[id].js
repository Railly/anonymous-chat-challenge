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

export default function ChatID() {
  const router = useRouter();
  const { id } = router.query;
  const { idb } = useContext(PersistenceContext);

  const chat = useLiveQuery(() => {
    if (id) {
      return idb.chats
        .where("id")
        .equals(+id)
        .first();
    }
  }, [id]);

  const messages = useLiveQuery(() => {
    if (id) {
      return idb.messages
        .where("chatId")
        .equals(+id)
        .toArray();
    }
  }, [id]);

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
