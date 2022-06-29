import React from "react";
import { useWindowDimensions, StatusBar } from "react-native";

import Header from "./Header";
import NavBar from "./NavBar";
import {
  ScrollContainer,
  OutterContainer,
  MainContainer,
  BackgroundImageContainer,
  Wrapper,
} from "./styles";

interface Props {
  source?: string;
  backgroundColor?: "white" | "gray";
  flexDirection?: "row" | "column";
  justifyContent?: "space-around" | "space-between" | "flex-start" | "flex-end";
  alignItems?: "center" | "flex-start" | "flex-end";
  noHeader?: boolean;
  noNavBar?: boolean;
  noPadding?: boolean;
  noScroll?: boolean;
}

const Container: React.FC<Props> = ({
  children,
  source,
  backgroundColor,
  flexDirection,
  justifyContent,
  alignItems,
  noHeader,
  noNavBar,
  noPadding,
  noScroll,
}) => {
  const windowHeight = useWindowDimensions().height;
  const statusBarHeight = StatusBar.currentHeight;

  const Bundle = (
    <Wrapper>
      {!noHeader && <Header />}
      {source ? (
        <BackgroundImageContainer
          windowHeight={windowHeight}
          statusBarHeight={statusBarHeight}
          source={source}
          flexDirection={flexDirection}
          justifyContent={justifyContent}
          alignItems={alignItems}
        >
          {children}
        </BackgroundImageContainer>
      ) : noScroll ? (
        <OutterContainer backgroundColor={backgroundColor}>
          <MainContainer
            backgroundColor={backgroundColor}
            windowHeight={windowHeight}
            statusBarHeight={statusBarHeight}
            flexDirection={flexDirection}
            justifyContent={justifyContent}
            alignItems={alignItems}
            noPadding={noPadding}
          >
            {children}
          </MainContainer>
        </OutterContainer>
      ) : (
        <ScrollContainer backgroundColor={backgroundColor}>
          <MainContainer
            backgroundColor={backgroundColor}
            windowHeight={windowHeight}
            statusBarHeight={statusBarHeight}
            flexDirection={flexDirection}
            justifyContent={justifyContent}
            alignItems={alignItems}
            noPadding={noPadding}
          >
            {children}
          </MainContainer>
        </ScrollContainer>
      )}
      {!noNavBar && <NavBar />}
    </Wrapper>
  );

  return Bundle;
};

export default Container;
