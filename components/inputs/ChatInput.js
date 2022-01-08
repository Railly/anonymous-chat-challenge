import styled from "styled-components";

export const ChatInput = styled.input`
  font-family: "Inter", sans-serif;
  border: none;
  border-radius: 0;
  outline: none;
  padding: 0.5rem;
  font-size: 1.2rem;
  font-weight: 500;
  margin-bottom: 1rem;
  color: ${(p) => p.theme.colors.black};
  background-color: ${(p) => p.theme.colors.white};
  width: 90%;
`;
