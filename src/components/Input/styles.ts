import { Animated } from "react-native";
import { TextInputMask } from "react-native-masked-text";

import styled from "styled-components/native";

import colors from "../../config/colors";

interface ContainerProps {
  hasFocus: boolean;
  white?: boolean;
  noBorder?: boolean;
  fullBordered?: boolean;
  error?: boolean;
  disabled?: boolean;
}

interface LabelProps {
  white?: boolean;
}

interface InputProps {
  white?: boolean;
  noBold?: boolean;
  fullBordered?: boolean;
}

export const Container = styled(Animated.View)<ContainerProps>`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  border-width: ${({ fullBordered, noBorder, hasFocus }): string =>
    noBorder
      ? "0px"
      : fullBordered && hasFocus
      ? "3px"
      : fullBordered
      ? "1px"
      : "0px"};
  border-bottom-width: ${({
    fullBordered,
    noBorder,
    hasFocus,
    error,
  }): string =>
    noBorder && !error
      ? "0px"
      : !noBorder && error
      ? "1px"
      : fullBordered && hasFocus
      ? "3px"
      : "1px"};
  border-bottom-color: ${({ disabled, error }): string =>
    !disabled && error ? colors.red : colors.gray};
  border-left-color: ${({ fullBordered, error, disabled }): string =>
    fullBordered && !disabled && error ? colors.red : colors.gray};
  border-right-color: ${({ fullBordered, error, disabled }): string =>
    fullBordered && !disabled && error ? colors.red : colors.gray};
  border-top-color: ${({ fullBordered, error, disabled }): string =>
    fullBordered && !disabled && error ? colors.red : colors.gray};
  border-radius: ${({ fullBordered }): string =>
    fullBordered ? "20px" : "0px"};
  padding: ${({ fullBordered }): string =>
    fullBordered ? "8px 10px" : "8px 0"};
  height: 40px;
  width: 100%;
  background-color: ${({ disabled }): string =>
    disabled ? colors.lightGray : "transparent"};
  color: ${({ white }): string => (white ? colors.white : colors.gray)};
`;

export const Label = styled.Text<LabelProps>`
  color: ${({ white }): string => (white ? colors.white : colors.black)};
  /* font-weight: ${({ bold }): string => (bold ? "bold" : "normal")}; */
  font-size: 14px;
`;

export const TextInput = styled.TextInput<InputProps>`
  color: ${({ white }): string => (white ? colors.white : colors.black)};
  font-weight: ${({ noBold }): string => (noBold ? "normal" : "bold")};
  font-size: 14px;
  flex: 1;
`;

export const MaskedTextInput = styled(TextInputMask)<InputProps>`
  color: ${({ white }): string => (white ? colors.white : colors.black)};
  font-weight: ${({ noBold }): string => (noBold ? "normal" : "bold")};
  font-size: 14px;
  flex: 1;
`;

export const Message = styled.Text`
  flex: 1;
  text-align: center;
  color: ${colors.gray};
  font-size: 10px;
  margin: 10px 0 0 0;
`;

export const Icon = styled.Image.attrs({
  resizeMode: "contain",
})`
  margin-right: 10px;
  height: 20px;
  width: 20px;
`;
