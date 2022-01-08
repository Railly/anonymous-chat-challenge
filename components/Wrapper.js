import styled from "styled-components";

export const CustomSection = styled.section`
  display: flex;
  justify-content: center;
  width: 100%;
  flex-direction: column;
  min-height: 100vh;
  background-color: ${(p) => p.theme.colors.mediumPrimary};
`;

export const CustomDiv = styled.div`
  display: flex;
  height: 85%;
  flex-direction: column;
  max-height: 85vh;
  background-color: ${(p) => p.theme.colors.mediumPrimary};
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 0.5rem;
  }

  &::-webkit-scrollbar-track {
    background: ${(p) => p.theme.colors.lightPrimary};
  }

  &::-webkit-scrollbar-thumb {
    background: ${(p) => p.theme.colors.primary};
    border-radius: 5px;
  }
`;
