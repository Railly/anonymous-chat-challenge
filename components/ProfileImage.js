import S from "components/Elements";
import Image from "next/image";
import styled from "styled-components";
import { getGravatar } from "utils/getGravatar";

export const RoundedImage = styled(Image)`
  border-radius: 50%;
`;

export default function ProfileImage({ username, size }) {
  return (
    <S.Div display="flex" items="center" justify="center" width="100%">
      <RoundedImage width={size} height={size} src={getGravatar(username)} />
    </S.Div>
  );
}
