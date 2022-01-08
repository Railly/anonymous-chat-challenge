import styled from "styled-components";

export const SubmitButton = styled.button`
  display: flex;
  width: 25%;
  margin: 0.5rem;
  align-items: center;
  justify-content: center;
  border: 0;
  cursor: pointer;
  border-radius: 5px;
  font-weight: bold;
  color: ${(p) => p.theme.colors[p.color]};
  background-color: ${(p) => p.theme.colors[p.bgColor]};

  &:hover {
    transition: all 0.3s ease-in-out;
    background-color: ${(p) => p.theme.darkColors[p.bgColor]};
  }
`;
