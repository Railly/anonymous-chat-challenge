import S from "components/Elements";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { PersistenceContext } from "context/PersistenceProvider";
import MessageCard from "containers/MessageCard";
import styled from "styled-components";
import { UserContext } from "context/UserContext";

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

export default function GroupChatID() {
  const router = useRouter();
  const { id } = router.query;
  const { idb } = useContext(PersistenceContext);
  const { currentUser } = useContext(UserContext);
  const [textMessage, setTextMessage] = useState("");

  const chat = useLiveQuery(() => {
    if (id) {
      return idb.groupChats
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
        .and((item) => item.type === "group")
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
      <S.Form
        onSubmit={async (e) => {
          e.preventDefault();
          idb.transaction("rw", idb.messages, idb.groupChats, async () => {
            await idb.messages.add({
              chatId: +id,
              text: textMessage,
              userId: +currentUser.id,
              createdAt: new Date(),
              type: "group",
            });

            await idb.groupChats.update(+id, {
              lastMessage: textMessage,
              lastMessageDate: new Date(),
              lastMessageUserId: +currentUser.id,
            });

            setTextMessage("");
          });
        }}
        display="flex"
        width="95%"
        height="12%"
        mt={2}
        mx={4}
      >
        <CustomInput
          onChange={(e) => {
            e.preventDefault();
            setTextMessage(e.target.value);
          }}
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

const CustomInput = styled.input`
  font-family: "Inter", sans-serif;
  border: none;
  border-radius: 0;
  outline: none;
  padding: 0.5rem;
  font-size: 1.2rem;
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
