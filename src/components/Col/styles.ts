import styled from "styled-components/native";

interface Props {
  size?: string;
  justifyContent?:
    | "flex-start"
    | "flex-end"
    | "space-around"
    | "space-between"
    | "center";
  alignItems?:
    | "flex-start"
    | "flex-end"
    | "space-around"
    | "space-between"
    | "center";
}

export const Container = styled.View<Props>`
  width: 100%;
  display: flex;
  flex: ${({ size }): string => size || "none"};
  flex-direction: column;
  justify-content: ${({ justifyContent }): string =>
    justifyContent || "center"};
  align-items: ${({ alignItems }): string => alignItems || "center"};
`;
