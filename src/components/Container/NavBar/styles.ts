import { Animated } from "react-native";

import styled from "styled-components/native";

import colors from "../../../config/colors";

interface ColProps {
  size: string;
  left?: boolean;
  right?: boolean;
}

export const Container = styled.View`
  background: ${colors.blue05};
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
  width: 100%;
  height: 55px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 0;
`;

export const NavButtonsContainer = styled.View`
  width: 80%;
  height: 55px;
  position: absolute;
  top: -30px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const NavButtonWrapper = styled.TouchableOpacity.attrs({
  underlayColor: colors.white,
})`
  background-color: transparent;
`;

export const NavButtonIcon = styled.Image`
  height: 50px;
  width: 50px;
`;
