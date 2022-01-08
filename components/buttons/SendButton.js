import styled from "styled-components";

export const SendButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 0;
  cursor: pointer;
  padding: 0.5rem;
  background-color: ${(p) => p.theme.colors.primary};
  color: ${(p) => p.theme.colors.white};
  font-size: 1.2rem;
  font-weight: 500;
  border-radius: 5px;
  margin-bottom: 1rem;
  width: 10%;

  &:hover {
    background-color: ${(p) => p.theme.darkColors.primary};
    transition: all 0.2s ease-in-out;
  }

  &:disabled {
    transition: all 0.2s ease-in-out;
    background-color: ${(p) => p.theme.colors.lightPrimary};
    color: ${(p) => p.theme.colors.mediumPrimary};
    cursor: not-allowed;
  }
`;
