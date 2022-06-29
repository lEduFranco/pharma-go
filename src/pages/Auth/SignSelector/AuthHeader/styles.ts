import styled from "styled-components/native";

import colors from "../../../../config/colors";

interface ArrowProps {
  white: boolean;
  color: "white";
}

interface ButtonProps {
  selected: {
    signin: boolean;
    signup: boolean;
  };
}

interface TextProps {
  selected: {
    signin: boolean;
    signup: boolean;
  };
  white: boolean;
}

export const AuthHeaderContainer = styled.View`
  height: 150px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background: transparent;
`;

export const ArrowContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  padding: 10px;
`;

export const Image = styled.Image.attrs({
  resizeMode: "contain",
})<ArrowProps>`
  tint-color: ${({ white }): string => (white ? colors.white : colors.gray)};
`;

export const ButtonsContainer = styled.View`
  flex: 9;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

const Button = styled.TouchableOpacity`
  height: 40px;
  width: 100px;
  border-radius: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 10px;
`;

export const SignUpButton = styled(Button)<ButtonProps>`
  background-color: ${({ selected }): string =>
    selected.signup ? colors.blue02 : "transparent"};
`;

export const SignInButton = styled(Button)<ButtonProps>`
  background-color: ${({ selected }): string =>
    selected.signin ? colors.blue02 : "transparent"};
`;

const ButtonText = styled.Text`
  font-size: 16px;
  font-weight: 600;
`;

export const SignInButtonText = styled(ButtonText)<TextProps>`
  color: ${({ selected, white }): string =>
    white ? colors.white : selected.signin ? colors.white : colors.gray};
`;

export const SignUpButtonText = styled(ButtonText)<TextProps>`
  color: ${({ selected, white }): string =>
    white ? colors.white : selected.signup ? colors.white : colors.gray};
`;
