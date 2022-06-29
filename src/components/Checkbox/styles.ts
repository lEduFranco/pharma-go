import styled from "styled-components/native";

import colors from "../../config/colors";

interface BoxProps {
  size?: "small" | "normal" | "extrasmall";
}

interface BoxFillingProps {
  checked: boolean;
  color?: "primary" | "secondary" | "warning" | "white" | "gray";
  size?: "small" | "normal" | "extrasmall";
}

interface TextProps {
  color?: "primary" | "secondary" | "warning" | "white" | "gray";
  size?: "small" | "normal" | "extrasmall";
  disabled?: boolean;
}

export const Container = styled.View`
  height: auto;
  width: auto;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin: 5px 0;
`;

export const Box = styled.TouchableOpacity.attrs({
  underlayColor: colors.white,
})<BoxProps>`
  border-radius: 100px;
  border-width: 1px;
  border-color: ${colors.black};
  height: ${({ size }): string => (size === "normal" ? "21px" : "17px")};
  width: ${({ size }): string => (size === "normal" ? "21px" : "17px")};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const BoxFilling = styled.View<BoxFillingProps>`
  display: ${({ checked }): string => (checked ? "flex" : "none")};
  height: ${({ size }): string => (size === "normal" ? "14px" : "10px")};
  width: ${({ size }): string => (size === "normal" ? "14px" : "10px")};
  border-radius: 100px;
  background-color: ${colors.black};
`;

export const Content = styled.View`
  padding-left: 3px;
  align-items: center;
  display: flex;
  justify-content: flex-start;
`;

export const Text = styled.Text<TextProps>`
  color: ${colors.black};
  font-size: ${({ size }): string =>
    size === "normal" ? "14px" : size === "extrasmall" ? "10px" : "12px"};
  /* font-weight: 600; */
  text-align: center;
  margin-left: 4px;
`;
