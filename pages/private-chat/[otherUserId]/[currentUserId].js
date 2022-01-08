import S from "components/Elements";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { PersistenceContext } from "context/PersistenceProvider";
import MessageCard from "containers/MessageCard";
import styled from "styled-components";

const CustomSection = styled.section`
  display: flex;
  justify-content: center;
  width: 100%;
  flex-direction: column;
  min-height: 100vh;
  background-color: ${(p) => p.theme.colors.mediumPrimary};
`;

const CustomDiv = styled.div`
  display: flex;
  height: 85%;
  flex-direction: column;
  max-height: 85vh;
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
  const [textMessage, setTextMessage] = useState("");

  const chat = useLiveQuery(() => {
    if (otherUserId && currentUserId) {
      return idb.directChats
        .where("otherUserId")
        .equals(+otherUserId)
        .or("currentUserId")
        .equals(+otherUserId)
        .and(
          (chat) =>
            (chat.currentUserId === +currentUserId &&
              chat.otherUserId === +otherUserId) ||
            (chat.currentUserId === +otherUserId &&
              chat.otherUserId === +currentUserId)
        )
        .first();
    }
  }, [otherUserId, currentUserId]);

  const messages = useLiveQuery(() => {
    if (chat) {
      return idb.messages
        .where("type")
        .equals("private")
        .and((message) => message.chatId === chat.id)
        .toArray();
    }
  }, [chat]);

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
      <S.Form
        onSubmit={async (e) => {
          e.preventDefault();
          idb.transaction("rw", idb.messages, idb.directChats, async () => {
            await idb.messages.add({
              chatId: +chat.id,
              text: textMessage,
              userId: +currentUserId,
              otherUserId: +otherUserId,
              createdAt: new Date(),
              type: "private",
            });

            await idb.directChats.update(+chat.id, {
              lastMessage: textMessage,
              lastMessageDate: new Date(),
              lastMessageUserId: +currentUserId,
            });
          });
          setTextMessage("");
        }}
        display="flex"
        width="95%"
        height="12%"
        mt={2}
        mx={4}
      >
        <CustomTextarea
          onChange={(e) => {
            e.preventDefault();
            setTextMessage(e.target.value);
          }}
          // reset the input
          value={textMessage}
          placeholder="Escribe un mensaje..."
        />
        <CustomButton disabled={textMessage === ""} type="submit" mt={2}>
          <S.Span className="material-icons">send</S.Span>
        </CustomButton>
      </S.Form>
    </CustomSection>
  );
}

const CustomTextarea = styled.textarea`
  font-family: "Inter", sans-serif;
  border: none;
  border-radius: 0;
  outline: none;
  padding: 0.5rem;
  font-size: 1.2rem;
  resize: none;
  font-weight: 500;
  margin-bottom: 1rem;
  color: ${(p) => p.theme.colors.black};
  background-color: ${(p) => p.theme.colors.white};
  width: 90%;
`;

const CustomButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 0;
  cursor: pointer;
  padding: 0.5rem;
  background-color: ${(p) => p.theme.colors.primary};
  color: ${(p) => p.theme.colors.white};
  font-size: 1.2rem;
  font-weight: 500;
  border-radius: 5px;
  margin-bottom: 1rem;
  width: 10%;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: ${(p) => p.theme.darkColors.primary};
    transition: all 0.2s ease-in-out;
  }

  &:disabled {
    transition: all 0.2s ease-in-out;
    background-color: ${(p) => p.theme.colors.lightPrimary};
    color: ${(p) => p.theme.colors.mediumPrimary};
    cursor: not-allowed;
  }
`;
