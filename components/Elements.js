import styled from "styled-components";
import { getFlexStyles } from "utils/flex";
import { getFontSize } from "utils/fontSize";
import { getFontWeight } from "utils/fontWeight";
import { getHeightStyles } from "utils/height";
import { getSpacing } from "utils/spacing";
import { getWidthStyles } from "utils/width";

const Div = styled.div`
  background-color: ${({ theme, bgColor = "white" }) => theme.colors[bgColor]};
  color: ${({ theme, color = "black" }) => theme.colors[color]};
  ${(p) => getFlexStyles(p)}
  ${(p) => getSpacing(p)}
  ${(p) => getWidthStyles(p)}
  ${(p) => getHeightStyles(p)}
  ${(p) => getFontSize(p)}
  ${(p) => getFontWeight(p)}
`;

const Span = styled.span`
  background-color: ${({ theme, bgColor = "white" }) => theme.colors[bgColor]};
  color: ${({ theme, color = "black" }) => theme.colors[color]};
  ${(p) => getFlexStyles(p)}
  ${(p) => getSpacing(p)}
  ${(p) => getWidthStyles(p)}
  ${(p) => getHeightStyles(p)}
  ${(p) => getFontSize(p)}
  ${(p) => getFontWeight(p)}
`;

const H1 = styled.h1`
  background-color: ${({ theme, bgColor = "white" }) => theme.colors[bgColor]};
  color: ${({ theme, color = "black" }) => theme.colors[color]};
  ${(p) => getFlexStyles(p)}
  ${(p) => getSpacing(p)}
  ${(p) => getWidthStyles(p)}
  ${(p) => getHeightStyles(p)}
  ${(p) => getFontSize(p)}
  ${(p) => getFontWeight(p)}
`;

const H2 = styled.h2`
  background-color: ${({ theme, bgColor = "white" }) => theme.colors[bgColor]};
  color: ${({ theme, color = "black" }) => theme.colors[color]};
  ${(p) => getFlexStyles(p)}
  ${(p) => getSpacing(p)}
  ${(p) => getWidthStyles(p)}
  ${(p) => getHeightStyles(p)}
  ${(p) => getFontSize(p)}
  ${(p) => getFontWeight(p)}
`;

const H3 = styled.h3`
  background-color: ${({ theme, bgColor = "white" }) => theme.colors[bgColor]};
  color: ${({ theme, color = "black" }) => theme.colors[color]};
  ${(p) => getFlexStyles(p)}
  ${(p) => getSpacing(p)}
  ${(p) => getWidthStyles(p)}
  ${(p) => getHeightStyles(p)}
  ${(p) => getFontSize(p)}
  ${(p) => getFontWeight(p)}
`;

export default {
  Div,
  Span,
  Heading: { H1, H2, H3 },
};
