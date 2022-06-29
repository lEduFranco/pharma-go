import styled from "styled-components";

import colors from "../config/colors";

interface IconProps {
  focused: boolean;
}

export const ButtonsContainer = styled.View`
  display: flex;
  flex-direction: row;
`;

export const ButtonWrapper = styled.View`
  flex: 1;
  padding: 10px;
`;

export const IconContainer = styled.View<IconProps>`
  border: 1.5px solid
    ${({ focused }): string => (focused ? colors.BLUE : colors.LIGHTER_GRAY)};
  border-radius: 100px;
  padding: 10px;
`;

export const Icon = styled.Image<IconProps>`
  tint-color: ${({ focused }): string => (focused ? colors.BLUE : colors.gray)};
`;
