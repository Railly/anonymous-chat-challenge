import styled from "styled-components";

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
`;

export default function AppLayout({ children }) {
  return <Container>{children}</Container>;
}
