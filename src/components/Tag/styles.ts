import styled from "styled-components/native";

import colors from "../../config/colors";

interface ContainerProps {
  pressed: boolean;
}

interface ContentProps {
  pressed: boolean;
}

export const Container = styled.TouchableOpacity<ContainerProps>`
  height: 24px;
  border-radius: 24px;
  background-color: ${({ pressed }: ContainerProps): string =>
    pressed ? colors.blue02 : colors.gray};
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 4px;
  padding: 2px 10px;
  align-self: flex-start;
`;

export const Content = styled.Text<ContentProps>`
  font-size: 12px;
  color: ${colors.white};
  font-weight: 400;
`;
