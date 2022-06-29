import { Animated } from "react-native";

import styled from "styled-components/native";

import colors from "../../../config/colors";

interface ColProps {
  size: string;
  left?: boolean;
  right?: boolean;
}

export const Container = styled.View`
  background: ${colors.blue01};
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

export const MainContent = styled.View`
  background: ${colors.blue01};
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  padding: 40px 20px 20px 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  z-index: 10;
`;

export const Address = styled.View`
  flex: 14;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

export const AddressText = styled.Text`
  color: ${colors.white};
  font-size: 16px;
  font-weight: bold;
  padding: 10px;
`;

export const AddressButton = styled.TouchableOpacity.attrs({
  underlayColor: "transparent",
})`
  background-color: transparent;
  padding: 10px;
`;

export const AddressImage = styled(Animated.Image)`
  height: 15px;
  width: 15px;
`;

export const SettingsButton = styled.TouchableOpacity.attrs({
  underlayColor: "transparent",
})`
  background-color: transparent;
  flex: 1;
  padding: 10px;
`;

export const SettingsImage = styled(Animated.Image)`
  height: 20px;
  width: 20px;
`;

export const FormContent = styled(Animated.View)`
  width: 100%;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 0 60px;
`;

export const InputCol = styled.View<ColProps>`
  width: 100%;
  flex: ${({ size }): string => size || "1"};
  margin-left: ${({ right }): string => (right ? "10px" : "0")};
  margin-right: ${({ left }): string => (left ? "10px" : "0")};
`;
