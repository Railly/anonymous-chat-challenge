import { useContext, useState } from "react";
import S from "components/Elements";
import styled from "styled-components";
import { ChatContext } from "context/ChatContext";

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
  &:hover {
    transition: all 0.3s ease-in-out;
    background-color: ${(p) => p.theme.colors.lightPrimary};
  }
`;

const CustomDiv = styled.div`
  display: ${(p) => (p.isOpen ? "flex" : "none")};
  flex-direction: column;
  user-select: none;
  margin-top: 0.5rem;
`;

const CustomButton = styled.button`
  display: flex;
  align-items: center;
  border: 0;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 5px;
  font-weight: bold;
  color: ${(p) => p.theme.colors.tertiary};
  background-color: transparent;

  &:hover {
    transition: all 0.3s ease-in-out;
    color: ${(p) => p.theme.darkColors.tertiary};
    background-color: ${(p) => p.theme.lightColors.tertiary};
  }
  margin-bottom: 0.5rem;
`;

export default function ChatCategory({ name, chats = [] }) {
  const [isDisclosureOpen, setIsDisclosureOpen] = useState(true);

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
        {chats.map((chat) => (
          <ChatItem key={chat.id} chat={chat} />
        ))}
        <CustomButton width="100%" variant="secondary">
          <S.Span text="md" className="material-icons">
            add
          </S.Span>
          <S.Span ml={2} text="base">
            Nuevo chat
          </S.Span>
        </CustomButton>
      </CustomDiv>
    </>
  );
}

const ChatItem = ({ chat }) => {
  const { currentChatId, setCurrentChatId } = useContext(ChatContext);

  return (
    <CustomSpan
      onClick={() => setCurrentChatId(chat.id)}
      isActive={currentChatId === chat.id}
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
