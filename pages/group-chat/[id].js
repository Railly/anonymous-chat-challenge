import S from "components/Elements";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { PersistenceContext } from "context/PersistenceProvider";
import MessageCard from "containers/MessageCard";
import { UserContext } from "context/UserContext";
import { ChatInput } from "components/inputs/ChatInput";
import { SendButton } from "components/buttons/SendButton";
import { CustomDiv, CustomSection, FixedDiv } from "components/Wrapper";

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

  const onSubmit = async (e) => {
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
  };

  return (
    <CustomSection>
      <CustomDiv>
        <FixedDiv>
          {chat && (
            <S.Heading.H1 text="lg" display="flex" items="center">
              {chat.name}
            </S.Heading.H1>
          )}
        </FixedDiv>
        <S.Div mt={16} display="flex" direction="column">
          {messages?.length > 0 &&
            messages.map((message) => (
              <MessageCard key={message.id} message={message} />
            ))}
        </S.Div>
      </CustomDiv>
      <S.Form
        onSubmit={onSubmit}
        display="flex"
        width="95%"
        height="12%"
        mt={2}
        mx={4}
      >
        <ChatInput
          onChange={(e) => {
            e.preventDefault();
            setTextMessage(e.target.value);
          }}
          value={textMessage}
          placeholder="Escribe un mensaje..."
        />
        <SendButton disabled={textMessage === ""} type="submit" mt={2}>
          <S.Span className="material-icons">send</S.Span>
        </SendButton>
      </S.Form>
    </CustomSection>
  );
}
