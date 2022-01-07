import styled from "styled-components";

const Container = styled.div`
  display: grid;
  grid-template-columns: 1.2fr 3fr 1.2fr;
  overflow: hidden;
  color: ${({ theme }) => theme.colors.black};
`;

export default function AppLayout({ children }) {
  return <Container>{children}</Container>;
}
