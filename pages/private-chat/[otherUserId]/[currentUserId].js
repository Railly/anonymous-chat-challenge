import S from "components/Elements";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { PersistenceContext } from "context/PersistenceProvider";
import MessageCard from "containers/MessageCard";
import { ChatInput } from "components/inputs/ChatInput";
import { SendButton } from "components/buttons/SendButton";
import { CustomDiv, CustomSection, FixedDiv } from "components/Wrapper";

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

  const user = useLiveQuery(() => {
    if (chat) {
      return idb.users.where("id").equals(chat.otherUserId).first();
    }
  }, [chat]);

  const onSubmit = async (e) => {
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
  };

  return (
    <CustomSection>
      <CustomDiv>
        <FixedDiv>
          {user && (
            <S.Heading.H1 text="lg" display="flex" items="center">
              {user.name}
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
          // reset the input
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
