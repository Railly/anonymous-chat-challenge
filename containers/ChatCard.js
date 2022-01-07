import S from "components/Elements";
import { PersistenceContext } from "context/PersistenceProvider";
import { useContext } from "react/cjs/react.development";
import { useLiveQuery } from "dexie-react-hooks";
import { useRouter } from "next/router";
import { parseDate } from "utils/parseDate";
import styled from "styled-components";
import { getGravatar } from "utils/getGravatar";
import Image from "next/image";
import { UserContext } from "context/UserContext";
import { ChatContext } from "context/ChatContext";

const RoundedImage = styled(Image)`
  border-radius: 50%;
`;

const TruncatedText = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 0.875rem;
`;

const CustomSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  cursor: pointer;
  padding: 0.5rem 0;
  border-bottom: 1px solid ${(p) => p.theme.colors.gray};
  background-color: ${(p) =>
    p.isActive ? p.theme.colors.primary : p.theme.colors.transparent};
  color: ${(p) => (p.isActive ? p.theme.colors.white : p.theme.colors.black)};

  &:hover {
    transition: all 0.2s ease-in-out;
    background-color: ${(p) =>
      p.isActive ? p.theme.colors.primary : p.theme.colors.lightPrimary};
  }
`;

export default function ChatCard({ id, type }) {
  const router = useRouter();
  const { currentUser } = useContext(UserContext);
  const { currentGroupChatId, setCurrentGroupChatId } = useContext(ChatContext);
  const { idb } = useContext(PersistenceContext);

  const chat = useLiveQuery(() =>
    idb.groupChats
      .where("id")
      .equals(+id)
      .first()
  );

  const lastUser = useLiveQuery(() => {
    if (chat?.lastMessageUserId) {
      return idb.users
        .where("id")
        .equals(+chat.lastMessageUserId)
        .first();
    }
  }, [chat]);

  return (
    <CustomSection
      isActive={currentGroupChatId === +id}
      onClick={() => {
        setCurrentGroupChatId(+id);
        router.push(`/${type}-chat/${id}`);
      }}
    >
      {chat && (
        <>
          <S.Div display="flex" width="100%" py={1}>
            <S.Div display="flex" items="center" justify="center" width="30%">
              <RoundedImage
                width={45}
                height={45}
                src={getGravatar(lastUser?.name)}
              />
            </S.Div>
            <S.Div
              display="flex"
              direction="column"
              justify="center"
              width="70%"
            >
              <S.Heading.H3 font="bold">{chat.name}</S.Heading.H3>
              <S.Span font="bold" my={1} text="sm">
                {currentUser.id === lastUser?.id ? "Tú" : lastUser?.name}:
              </S.Span>
              <TruncatedText>{chat.lastMessage}</TruncatedText>
              <S.Span mt={2} text="sm">
                {parseDate(chat.lastMessageDate)}
              </S.Span>
            </S.Div>
          </S.Div>
        </>
      )}
    </CustomSection>
  );
}
