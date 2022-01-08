import styled from "styled-components";

export const InsertModeButton = styled.button`
  display: flex;
  align-items: center;
  border: 0;
  cursor: pointer;
  padding: 0.5rem;
  padding-right: 1rem;
  padding-left: 0.5rem;
  margin-left: 1rem;
  margin-bottom: 0.5rem;
  border-radius: 5px;
  font-weight: bold;
  color: ${(p) => p.theme.colors[p.variant]};
  background-color: transparent;

  &:hover {
    transition: all 0.3s ease-in-out;
    color: ${(p) => p.theme.darkColors[p.variant]};
    background-color: ${(p) => p.theme.lightColors[p.variant]};
  }
`;
