import styled from "styled-components/native";

import colors from "../../config/colors";

interface ScrollProps {
  backgroundColor?: "white" | "gray";
}

interface ContainerProps {
  windowHeight: number;
  statusBarHeight: number;
  source?: string;
  backgroundColor?: "white" | "gray";
  flexDirection?: "row" | "column";
  justifyContent?: "space-around" | "space-between" | "flex-start" | "flex-end";
  alignItems?: "center" | "flex-start" | "flex-end";
  white?: boolean;
  noPadding?: boolean;
}

export const ScrollContainer = styled.ScrollView<ScrollProps>`
  height: 100%;
  width: 100%;
  background-color: ${({ backgroundColor }): string =>
    backgroundColor === "gray" ? colors.grayBG : colors.white};
`;

export const OutterContainer = styled.View<ScrollProps>`
  height: 100%;
  width: 100%;
  background-color: ${({ backgroundColor }): string =>
    backgroundColor === "gray" ? colors.grayBG : colors.white};
`;

export const MainContainer = styled.View<ContainerProps>`
  flex: 1;
  width: 100%;
  padding: ${({ noPadding }): string =>
    noPadding ? "0" : "40px 25px 105px 25px"};
  flex-direction: ${({ flexDirection }): string => flexDirection || "column"};
  justify-content: ${({ justifyContent }): string =>
    justifyContent || "space-around"};
  align-items: ${({ alignItems }): string => alignItems || "center"};
  background-color: transparent;
`;

export const BackgroundImageContainer = styled.ImageBackground<ContainerProps>`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  /* height: ${({ windowHeight, statusBarHeight }): string =>
    `${windowHeight + statusBarHeight}px`}; */
  height: 100%;
  width: 100%;
  padding: 40px 20px 30px 20px;
  flex-direction: ${({ flexDirection }): string => flexDirection || "column"};
  justify-content: ${({ justifyContent }): string =>
    justifyContent || "space-around"};
  align-items: ${({ alignItems }): string => alignItems || "center"};
`;

export const Wrapper = styled.View`
  flex: 1;
  width: 100%;
  height: 100%;
`;
