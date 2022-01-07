import S from "components/Elements";
import { ChatContext } from "context/ChatContext";
import Image from "next/image";
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

const RoundedImage = styled(Image)`
  border-radius: 50%;
`;

export default function ChatUser({ user }) {
  const router = useRouter();
  const { currentPrivateChatId, setCurrentPrivateChatId } =
    useContext(ChatContext);

  return (
    <CustomSpan
      onClick={() => {
        setCurrentPrivateChatId(user.id);
        router.push(`/private-chat/${user.id}`);
      }}
      isActive={currentPrivateChatId === +user.id}
      px={2}
      py={1}
      display="flex"
      items="center"
    >
      <S.Span className="material-icons">tag</S.Span>
      <S.Div display="flex" items="center" justify="center" width="30%">
        <RoundedImage width={45} height={45} src={getGravatar(user?.name)} />
      </S.Div>
      <S.Span>{user.name}</S.Span>
    </CustomSpan>
  );
}
