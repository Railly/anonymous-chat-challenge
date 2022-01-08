import styled from "styled-components";

export const Option = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 0.3rem;
  margin-bottom: 1rem;
  margin-left: 1rem;
  margin-right: 1rem;
  border-radius: 5px;
  border: 5px solid
    ${(p) =>
      p.isActive ? p.theme.colors.primary : p.theme.colors.lightPrimary};
  background-color: ${(p) =>
    p.isActive ? p.theme.colors.primary : p.theme.colors.lightPrimary};
  color: ${(p) => (p.isActive ? p.theme.colors.white : p.theme.colors.primary)};
  font-weight: bold;
  &:hover {
    transition: all 0.1s ease-in-out;
    border: 5px solid ${(p) => p.theme.colors.primary};
  }
`;
