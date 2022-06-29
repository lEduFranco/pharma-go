import styled from "styled-components/native";

import colors from "../../config/colors";

interface ContainerProps {
  color:
    | "primary"
    | "secondary"
    | "white"
    | "green"
    | "facebook"
    | "transparent";
  borderColor?: "primary" | "secondary" | "white";
  size?: "small" | "normal" | "extrasmall";
  margin?: string;
  shadow?: boolean;
}

interface TextProps {
  textColor: "primary" | "secondary" | "warning" | "white";
  color:
    | "primary"
    | "secondary"
    | "white"
    | "green"
    | "facebook"
    | "transparent";
  size?: "small" | "normal" | "extrasmall";
}

export const Container = styled.TouchableOpacity.attrs(
  ({ color }: ContainerProps) => ({
    underlayColor: color === "primary" ? colors.blue01 : colors.blue02,
  })
)<ContainerProps>`
  background-color: ${({ color }): string =>
    color === "primary"
      ? colors.blue03
      : color === "white"
      ? colors.white
      : color === "green"
      ? colors.green
      : color === "facebook"
      ? colors.blueFB
      : color === "transparent"
      ? "transparent"
      : colors.blue02};
  border-radius: 50px;
  height: ${({ size }): string => (size === "normal" ? "52px" : "40px")};
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: ${({ margin }): string => margin || "0px"};
  border-width: ${({ borderColor }): string => (borderColor ? "2px" : "0px")};
  border-color: ${({ borderColor }): string =>
    borderColor === "primary"
      ? colors.blue03
      : borderColor === "white"
      ? colors.white
      : colors.blue01};
  box-shadow: ${({ shadow }): string =>
    shadow ? "0px 3px 3px #00000029" : "none"};
  elevation: ${({ shadow }): string => (shadow ? "3" : "0")};
`;

export const Content = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const Text = styled.Text<TextProps>`
  color: ${({ color, textColor }): string =>
    textColor ||
    (color === "primary" ||
    color === "secondary" ||
    color === "facebook" ||
    color === "green"
      ? colors.white
      : colors.blue03)};
  font-size: ${({ size }): string =>
    size === "normal" ? "16px" : size === "extrasmall" ? "14px" : "16px"};
  text-align: center;
  margin-left: 4px;
`;
