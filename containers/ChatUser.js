import S from "components/Elements";
import ProfileImage from "components/ProfileImage";
import { ChatContext } from "context/ChatContext";
import { UserContext } from "context/UserContext";
import { useRouter } from "next/router";
import { useContext } from "react";
import styled from "styled-components";
import { getGravatar } from "utils/getGravatar";

const CustomSpan = styled.span`
  display: flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
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

export default function ChatUser({ user: otherUser }) {
  const router = useRouter();
  const {
    setCurrentGroupChatId,
    currentPrivateChatId,
    setCurrentPrivateChatId,
  } = useContext(ChatContext);
  const { currentUser } = useContext(UserContext);

  return (
    <CustomSpan
      onClick={() => {
        setCurrentPrivateChatId(otherUser.id);
        setCurrentGroupChatId("");
        router.push(`/private-chat/${otherUser.id}/${currentUser.id}`);
      }}
      isActive={currentPrivateChatId === +otherUser.id}
      px={2}
      py={1}
      display="flex"
      items="center"
    >
      <S.Span className="material-icons">tag</S.Span>
      <S.Div display="flex" items="center" justify="center" width="30%">
        <ProfileImage username={otherUser?.name} size={45} />
      </S.Div>
      <S.Span>{otherUser.name}</S.Span>
    </CustomSpan>
  );
}
