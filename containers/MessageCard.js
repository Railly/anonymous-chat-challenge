import S from "components/Elements";
import { PersistenceContext } from "context/PersistenceProvider";
import { useContext } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import Image from "next/image";
import { parseDate } from "utils/parseDate";
import { getGravatar } from "utils/getGravatar";
import styled from "styled-components";
import { UserContext } from "context/UserContext";
import { useState } from "react";
import { RoundedImage } from "components/RoundedImage";

const MessageCloud = styled.article`
  display: flex;
  justify-self: flex-end;
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

const CustomDiv = styled.div`
  overflow-wrap: break-word;
  word-break: break-word;
  padding: 0.875rem;
  max-width: 80%;
`;

const DeleteIcon = styled.span`
  color: ${(p) => p.theme.colors[p.color]};
  background-color: ${(p) => p.theme.colors[p.bgColor]};
  border-radius: 10px;
  padding: 0.3rem;
  cursor: pointer;
  font-size: 1.5rem;
  margin-left: 0.5rem;
`;

export default function MessageCard({ message }) {
  const [isVisible, setIsVisible] = useState(true);
  const { idb } = useContext(PersistenceContext);
  const { currentUser } = useContext(UserContext);

  const user = useLiveQuery(() =>
    idb.users
      .where("id")
      .equals(+message.userId)
      .first()
  );

  return (
    <>
      <S.Section
        width="95%"
        display={isVisible ? "flex" : "none"}
        direction={message.userId === currentUser?.id ? "row-reverse" : "row"}
        ml={message.userId !== currentUser?.id && 6}
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
          <CustomDiv>
            <S.Heading.H3 font="bold">{user?.name}</S.Heading.H3>
            <S.Span maxWidth="100%">{message.text}</S.Span>
          </CustomDiv>
          <S.Div>
            <DeleteIcon
              color={message.userId === currentUser?.id ? "danger" : "white"}
              bgColor={message.userId === currentUser?.id ? "white" : "danger"}
              className="material-icons"
              onClick={() => setIsVisible(false)}
            >
              delete
            </DeleteIcon>
          </S.Div>
        </MessageCloud>
      </S.Section>
    </>
  );
}
