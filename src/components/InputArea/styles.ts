import { Animated } from "react-native";

import styled from "styled-components/native";

import colors from "../../config/colors";

interface ContainerProps {
  hasFocus: boolean;
  numberOfLines: number;
  noBorder?: boolean;
  error?: boolean;
}

interface LabelProps {
  white?: boolean;
}

interface InputProps {
  noBold?: boolean;
}

export const Container = styled(Animated.View)<ContainerProps>`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  border-bottom-width: ${({ noBorder, hasFocus, error }): string =>
    noBorder && !error
      ? "0px"
      : !noBorder && error
      ? "1px"
      : hasFocus
      ? "3px"
      : "1px"};
  /* border-bottom-color: ${({ error }): string =>
    error ? colors.red : colors.gray}; */
  border-bottom-color: ${colors.red};
  padding: 8px 4px 8px 0;
  width: 100%;
  background-color: transparent;
  height: auto;
  color: ${colors.gray};
`;

export const Label = styled.Text<LabelProps>`
  color: ${({ white }): string => (white ? colors.white : colors.black)};
  font-size: 14px;
  margin-bottom: 5px;
`;

export const TextInput = styled.TextInput<InputProps>`
  font-size: 14px;
  font-weight: ${({ noBold }): string => (noBold ? "normal" : "bold")};
  height: 100%;
`;
