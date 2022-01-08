import styled from "styled-components";

export const CustomSection = styled.section`
  position: relative;
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

export const FixedDiv = styled.div`
  display: flex;
  border-radius: 10px;
  position: absolute;
  z-index: 1;
  top: 0.5rem;
  left: 0.5rem;
  flex-direction: column;
  height: 8vh;
  padding: 0.875rem 2rem;
  background-color: ${(p) => p.theme.colors.primary};
  color: ${(p) => p.theme.colors.white};
`;
