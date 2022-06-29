import { Animated } from "react-native";

import styled from "styled-components/native";

import colors from "../../config/colors";

interface ContainerProps {
  hasFocus: boolean;
  label?: string;
  noBorder?: boolean;
  error?: boolean;
  singleLine?: boolean;
}
interface TextProps {
  placeholderTextColor?: "primary" | "secondary" | "warning" | "white";
}
interface LabelProps {
  white?: boolean;
}

export const Container = styled(Animated.View)<ContainerProps>`
  flex: 1;
  border-bottom-width: ${({ hasFocus, noBorder, error }): string =>
    noBorder && !error
      ? "0px"
      : !noBorder && error
      ? "1px"
      : hasFocus
      ? "3px"
      : "1px"};
  border-bottom-color: ${({ error }): string =>
    error ? colors.red : colors.gray};
  width: 100%;
  background-color: transparent;
  height: auto;
  color: ${colors.gray};
  display: flex;
  flex-direction: ${({ singleLine }): string =>
    singleLine ? "row" : "column"};
  justify-content: ${({ singleLine }): string =>
    singleLine ? "space-between" : "center"};
  align-items: flex-start;
`;

export const Label = styled.Text<LabelProps>`
  height: 30px;
  color: ${({ white }): string => (white ? colors.white : colors.black)};
  font-size: 14px;
  padding-top: 10px;
`;

export const TouchableContainer = styled.TouchableWithoutFeedback`
  width: 100%;
  height: auto;
  background-color: transparent;
`;

export const Icon = styled.Image<ContainerProps>`
  tint-color: ${({ hasFocus }): string =>
    hasFocus ? colors.black : colors.gray};
  height: 9px;
  width: 14px;
`;
