import { Animated } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

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
  gray?: boolean;
  noBold?: boolean;
}

interface ValueProps {
  gray?: boolean;
  noBold?: boolean;
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
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  background-color: ${({ disabled }): string =>
    disabled ? colors.lightGray : "transparent"};
  color: ${({ white }): string => (white ? colors.white : colors.gray)};
`;

export const Placeholder = styled.Text`
  color: ${colors.gray};
  /* font-weight: bold; */
  font-size: 14px;
`;

export const Label = styled.Text<LabelProps>`
  color: ${({ gray, noBold }): string =>
    gray && noBold ? colors.gray : colors.black};
  font-size: 14px;
`;

export const Value = styled.Text<ValueProps>`
  color: ${({ gray, noBold }): string =>
    gray && noBold ? colors.gray : colors.black};
  font-weight: ${({ noBold }): string => (!noBold ? "bold" : "normal")};
  font-size: 14px;
`;

export const Icon = styled.Image.attrs({
  resizeMode: "contain",
})`
  margin-right: 10px;
  height: 20px;
  width: 20px;
`;
