import styled from "styled-components/native";

import colors from "../../config/colors";

interface ContainerProps {
  color:
    | "primary"
    | "secondary"
    | "warning"
    | "transparent"
    | "lightBlue"
    | "blue"
    | "purple";
  size?: "small" | "normal" | "extrasmall";
}

interface TextProps {
  color:
    | "primary"
    | "secondary"
    | "warning"
    | "transparent"
    | "lightBlue"
    | "blue"
    | "purple";
  size?: "small" | "normal" | "extrasmall";
}

export const Container = styled.TouchableOpacity.attrs({
  underlayColor: colors.white,
})<ContainerProps>`
  background-color: ${({ color }): string =>
    color === "primary" ? colors.blue01 : colors.blue02};
  border-radius: 15px;
  border-width: 1px;
  border-color: ${({ color }): string =>
    color === "transparent" ? colors.blue02 : "transparent"};
  height: ${({ size }): string => (size === "normal" ? "72px" : "52px")};
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 3px 3px #00000029;
  elevation: 3;
`;

export const Content = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const Text = styled.Text<TextProps>`
  color: ${colors.white};
  font-size: ${({ size }): string =>
    size === "normal" ? "18px" : size === "extrasmall" ? "12px" : "16px"};
  font-weight: 600;
  text-align: center;
  margin-left: 4px;
  /* text-transform: uppercase; */
`;
