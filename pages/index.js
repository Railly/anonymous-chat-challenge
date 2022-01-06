import S from "components/Elements";
import AppLayout from "components/layouts/AppLayout";
import LogoIcon from "components/LogoIcon";
import { useState } from "react";
import styled from "styled-components";

const Option = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 2rem;
  cursor: pointer;
  margin: 1rem;
  border-radius: 5px;
  border: 5px solid
    ${(p) =>
      p.isActive ? p.theme.colors.primary : p.theme.colors.lightPrimary};
  background-color: ${(p) =>
    p.isActive ? p.theme.colors.primary : p.theme.colors.lightPrimary};
  color: ${(p) => (p.isActive ? p.theme.colors.white : p.theme.colors.primary)};
  font-weight: bold;
  &:hover {
    transition: all 0.3s ease-in-out;
    border: 5px solid ${(p) => p.theme.colors.primary};
  }
`;

export default function Home() {
  const [selected, setSelected] = useState("grupal");
  return (
    <AppLayout>
      <S.Div height="100vh" bgColor="white">
        <S.Heading.H1
          display="flex"
          items="center"
          justify="center"
          text="xl"
          px={4}
          py={2}
        >
          <LogoIcon />
          <S.Span ml={2}>Chat App</S.Span>
        </S.Heading.H1>
        <Option
          onClick={() => setSelected("grupal")}
          isActive={selected === "grupal"}
        >
          Chats Grupales
        </Option>
        <Option
          onClick={() => setSelected("individual")}
          isActive={selected === "individual"}
        >
          Mensajes Directos
        </Option>
        <S.Div ml={2}>
          <S.Heading.H3 display="flex" items="center" mt={2}>
            <S.Span className="material-icons">chat</S.Span>
            <S.Span ml={2}>Chats Grupales</S.Span>
          </S.Heading.H3>
          <S.Div display="flex" direction="column" my={2} ml={5}>
            <S.Span px={2} py={1} display="flex" items="center">
              <S.Span className="material-icons">tag</S.Span>
              Channel 1
            </S.Span>
            <S.Span px={2} py={1} display="flex" items="center">
              <S.Span className="material-icons">tag</S.Span>
              Channel 2
            </S.Span>
            <S.Span px={2} py={1} display="flex" items="center">
              <S.Span className="material-icons">tag</S.Span>
              Channel 3
            </S.Span>
            <S.Span px={2} py={1} display="flex" items="center">
              <S.Span className="material-icons">tag</S.Span>
              Channel 4
            </S.Span>
          </S.Div>
          <S.Heading.H3 display="flex" items="center" mt={2}>
            <S.Span className="material-icons">chat</S.Span>
            <S.Span ml={2}>Development</S.Span>
          </S.Heading.H3>
        </S.Div>
      </S.Div>
      {/* <S.Div bgColor="primary" color="white">
          <MaterialIcon text="3xl" name="tag" />
      </S.Div>
      <S.Div bgColor="secondary" color="white">
        <MaterialIcon name="lock" color="green" />
      </S.Div> */}
    </AppLayout>
  );
}
