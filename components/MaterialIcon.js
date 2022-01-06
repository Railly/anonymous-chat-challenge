import styled from "styled-components";
import { getFontSize } from "utils/fontSize";
import { getFontWeight } from "utils/fontWeight";
import { getSpacing } from "utils/spacing";

const Span = styled.span`
  font-size: 50px;
  color: ${(p) => p.$color};
  ${(p) => getSpacing(p)}
  ${(p) => getFontSize(p)}
  ${(p) => getFontWeight(p)}
`;

export default function MaterialIcon({ name, color, ...props }) {
  return (
    <Span className="material-icons" $color={color} {...props}>
      {name}
    </Span>
  );
}
