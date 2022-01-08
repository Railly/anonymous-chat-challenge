import { useContext, useState } from "react";
import S from "components/Elements";
import styled from "styled-components";
import { ChatContext } from "context/ChatContext";
import { useLiveQuery } from "dexie-react-hooks";
import { PersistenceContext } from "context/PersistenceProvider";
import { useRouter } from "next/router";
import { UserContext } from "context/UserContext";
import AddButton from "./AddButton";

const CustomH3 = styled.h3`
  display: flex;
  align-items: center;
  margin-top: 0.5rem;
  cursor: pointer;
  user-select: none;
  &:hover {
    transition: all 0.3s ease-in-out;
    color: ${(p) => p.theme.colors.primary};
  }
`;

const CustomSpan = styled.span`
  display: flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
  margin-right: 1rem;
  padding-left: 1.5rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  background-color: ${(p) =>
    p.isActive ? p.theme.colors.primary : p.theme.colors.transparent};
  color: ${(p) => (p.isActive ? p.theme.colors.white : p.theme.colors.primary)};
  border-radius: 5px;

  &:hover {
    transition: all 0.3s ease-in-out;
    background-color: ${(p) =>
      p.isActive ? p.theme.colors.primary : p.theme.colors.lightPrimary};
  }
`;

const CustomDiv = styled.div`
  display: ${(p) => (p.isOpen ? "flex" : "none")};
  flex-direction: column;
  user-select: none;
  margin-top: 0.5rem;
`;

export default function ChatCategory({ name, id }) {
  const [isDisclosureOpen, setIsDisclosureOpen] = useState(true);
  const [insertMode, setInsertMode] = useState(false);
  const { idb } = useContext(PersistenceContext);

  const chats = useLiveQuery(() =>
    idb.groupChats.where("categoryId").equals(id).toArray()
  );

  const addChat = async (name) => {
    await idb.groupChats.add({
      name,
      categoryId: id,
      type: "group",
    });
    setInsertMode(false);
  };

  return (
    <>
      <CustomH3 onClick={() => setIsDisclosureOpen(!isDisclosureOpen)}>
        {isDisclosureOpen ? (
          <S.Span className="material-icons">expand_more</S.Span>
        ) : (
          <S.Span className="material-icons">chevron_right</S.Span>
        )}
        <S.Span ml={2}>{name}</S.Span>
      </CustomH3>
      <CustomDiv isOpen={isDisclosureOpen}>
        {chats?.length > 0 &&
          chats.map((chat) => <ChatGroup key={chat.id} chat={chat} />)}
        <AddButton
          placeholder="Agregar chat"
          variant="tertiary"
          insertMode={insertMode}
          setInsertMode={setInsertMode}
          addField={addChat}
        />
      </CustomDiv>
    </>
  );
}

export const ChatGroup = ({ chat }) => {
  const router = useRouter();
  const { setCurrentPrivateChatId, currentGroupChatId, setCurrentGroupChatId } =
    useContext(ChatContext);
  const { currentUser } = useContext(UserContext);

  return (
    <CustomSpan
      onClick={() => {
        setCurrentGroupChatId(chat.id);
        setCurrentPrivateChatId("");
        if (chat.type === "group") {
          router.push(`/group-chat/${chat.id}`);
        } else {
          router.push(`/private-chat/${chat.id}/${currentUser.id}`);
        }
      }}
      isActive={currentGroupChatId === +chat.id}
      px={2}
      py={1}
      display="flex"
      items="center"
    >
      <S.Span className="material-icons">tag</S.Span>
      {chat.name}
    </CustomSpan>
  );
};
