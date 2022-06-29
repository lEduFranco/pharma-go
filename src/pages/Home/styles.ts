import styled from "styled-components/native";

import colors from "../../config/colors";

interface ScrollProps {
  windowWidth: number;
}

interface BottomCardProps {
  color: "light" | "dark";
}

export const HomeBox = styled.TouchableOpacity.attrs({
  underlayColor: colors.white,
})`
  background-color: transparent;
`;

export const HomeBoxWrapper = styled.View`
  background: ${colors.white};
  border-radius: 24px;
  height: 100px;
  width: 90%;
  elevation: 1;
  box-shadow: 0px 3px 3px #00000029;
  margin: 0 0 30px 30px;
  padding: 20px 20px 20px 60px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const HomeBoxTextContainer = styled.View`
  flex: 12;
`;

export const HomeBoxTitle = styled.Text`
  color: ${colors.black};
  font-size: 18px;
  font-weight: bold;
  margin: 3px 0;
`;

export const HomeBoxInfo = styled.Text`
  color: ${colors.black};
  font-size: 14px;
  opacity: 0.6;
  margin: 3px 0;
`;

export const HomeBoxArrowContainer = styled.View`
  flex: 1;
`;

export const ArrowImage = styled.Image.attrs({
  resizeMode: "contain",
})`
  width: 20px;
  height: 20px;
`;

export const HomeBoxImageContainer = styled.View`
  position: absolute;
  left: -30px;
  top: 12px;
`;

export const HomeBoxImage = styled.Image`
  height: 72.55px;
  width: 72.55px;
`;

export const BottomBoxesWrapper = styled.View<ScrollProps>`
  width: ${({ windowWidth }): string => `${windowWidth}px`};
  height: auto;
  display: flex;
  margin-bottom: 20px;
`;

export const BottomBoxesScroll = styled.ScrollView`
  display: flex;
`;

export const BottomBox = styled.View<BottomCardProps>`
  background: ${({ color }): string =>
    color === "light" ? colors.blue03 : colors.blue04};
  border-radius: 20px;
  height: 240px;
  width: 240px;
  elevation: 1;
  box-shadow: 0px 3px 3px #00000029;
  margin: 0 0 0 20px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

export const BottomBoxTitle = styled.Text`
  color: ${colors.white};
  font-size: 22px;
  font-weight: bold;
  margin: 0 0 20px 0;
`;

export const BottomBoxInfo = styled.Text`
  color: ${colors.white};
  font-size: 18px;
  margin: 0 0 20px 0;
`;

export const BottomBoxLink = styled.TouchableOpacity.attrs({
  underlayColor: colors.white,
})`
  background-color: transparent;
`;

export const BottomBoxLinkText = styled.Text`
  color: ${colors.white};
  font-size: 16px;
  margin: 3px 0;
  text-decoration: underline;
  text-decoration-color: white;
`;
