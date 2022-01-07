import S from "components/Elements";
import { PersistenceContext } from "context/PersistenceProvider";
import { useContext } from "react/cjs/react.development";
import { useLiveQuery } from "dexie-react-hooks";
import Image from "next/image";
import { parseDate } from "utils/parseDate";
import { getGravatar } from "utils/getGravatar";
import styled from "styled-components";
import { UserContext } from "context/UserContext";

const MessageCloud = styled.article`
  display: flex;
  justify-self: flex-end;
  width: max-content;
  max-width: 50%;
  padding: 1rem;
  background-color: ${(p) =>
    p.isOwn ? p.theme.colors.primary : p.theme.colors.white};
  color: ${(p) => (p.isOwn ? p.theme.colors.white : p.theme.colors.black)};
  border-radius: 25px;
  border-top-left-radius: ${(p) => (p.isOwn ? "25px" : "0")};
  border-bottom-right-radius: ${(p) => (p.isOwn ? "0" : "25px")};
  box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.1);
  margin-bottom: 1rem;
`;

const RoundedImage = styled(Image)`
  border-radius: 50%;
`;

export default function MessageCard({ message }) {
  const { idb } = useContext(PersistenceContext);
  const { currentUser } = useContext(UserContext);

  const user = useLiveQuery(() =>
    idb.users
      .where("id")
      .equals(+message.userId)
      .first()
  );

  return (
    <S.Section
      width="90%"
      display="flex"
      direction={message.userId === currentUser?.id ? "row-reverse" : "row"}
      ml={message.userId !== currentUser?.id && 6}
      mr={message.userId === currentUser?.id && 4}
    >
      <MessageCloud isOwn={message.userId === currentUser?.id}>
        <S.Div display="flex" direction="column">
          <S.Div>
            <RoundedImage
              width={50}
              height={50}
              src={getGravatar(user ? user.name : "User 800")}
            />
          </S.Div>
          <S.Span>{parseDate(message.createdAt)}</S.Span>
        </S.Div>
        <S.Span>{user?.name}</S.Span>
        <S.Span>{message.text}</S.Span>
      </MessageCloud>
    </S.Section>
  );
}
