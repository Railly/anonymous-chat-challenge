import S from "components/Elements";
import { PersistenceContext } from "context/PersistenceProvider";
import { UserContext } from "context/UserContext";
import { useContext } from "react";
import styled from "styled-components";

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

export default function Home() {
  const { idb } = useContext(PersistenceContext);
  const { currentUser } = useContext(UserContext);

  return (
    <S.Section
      minHeight="100vh"
      bgColor="mediumPrimary"
      display="flex"
      justify="center"
      items="center"
    >
      <S.Heading.H1 text="lg" color="black" display="flex" items="center">
        <S.Span className="material-icons">chat</S.Span>
        <S.Span ml={2}>Selecciona un chat para empezar!</S.Span>
        <CustomButton
          onClick={() => {
            idb.categories.add({
              name: `Nueva categoría ${Math.floor(Math.random() * 100)}`,
            });
          }}
        >
          <S.Span ml={2}>Agregar Nueva Categoria</S.Span>
        </CustomButton>
        <CustomButton
          onClick={() => {
            idb.groupChats.add({
              name: `Nuevo chat ${Math.floor(Math.random() * 100)}`,
              categoryId: 1,
              type: "group",
            });
          }}
        >
          <S.Span ml={2}>Agregar chat a categoria 1</S.Span>
        </CustomButton>
        <CustomButton
          onClick={() => {
            idb.messages.add({
              chatId: 1,
              text: `Nuevo mensaje ${Math.floor(Math.random() * 100)}`,
              userId: currentUser.id,
              createdAt: new Date(),
              type: "group",
            });

            idb.groupChats.update(1, {
              lastMessage: `Nuevo mensaje ${Math.floor(Math.random() * 100)}`,
              lastMessageDate: new Date(),
              lastMessageUserId: currentUser.id,
              type: "group",
            });
          }}
        >
          <S.Span ml={2}>Agregar mensaje a chat 1</S.Span>
        </CustomButton>
        <CustomButton
          onClick={() => {
            idb.messages.add({
              chatId: 2,
              text: `Nuevo mensaje ${Math.floor(Math.random() * 100)}`,
              userId: currentUser.id,
              createdAt: new Date(),
              type: "group",
            });

            idb.groupChats.update(2, {
              lastMessage: `Nuevo mensaje ${Math.floor(Math.random() * 100)}`,
              lastMessageDate: new Date(),
              lastMessageUserId: currentUser.id,
              type: "group",
            });
          }}
        >
          <S.Span ml={2}>Agregar mensaje a chat 1</S.Span>
        </CustomButton>
      </S.Heading.H1>
    </S.Section>
  );
}
