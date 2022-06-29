import styled from "styled-components/native";

import colors from "../../config/colors";

interface ButtonProps {
  selected: boolean;
}

interface TextProps {
  selected: boolean;
}

interface RowTextProps {
  color?: string;
}

interface LoadingProps {
  loading: boolean;
}

export const Title = styled.Text`
  flex: 1;
  height: 40px;
  text-align: center;
  color: ${colors.blue01};
  font-size: 15px;
  font-weight: bold;
  padding: 20px 30px 0 0;
`;

export const ButtonsContainer = styled.View`
  height: auto;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 10px 0;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const Button = styled.TouchableOpacity`
  height: 40px;
  border-radius: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 15px;
`;

export const ClinicalDataButton = styled(Button)<ButtonProps>`
  background-color: ${({ selected }): string =>
    selected ? colors.blue02 : "transparent"};
`;

export const PersonalDataButton = styled(Button)<ButtonProps>`
  background-color: ${({ selected }): string =>
    selected ? colors.blue02 : "transparent"};
`;

const ButtonText = styled.Text`
  font-size: 14px;
`;

export const ClinicalDataButtonText = styled(ButtonText)<TextProps>`
  color: ${({ selected }): string => (selected ? colors.white : colors.gray)};
`;

export const PersonalDataButtonText = styled(ButtonText)<TextProps>`
  color: ${({ selected }): string => (selected ? colors.white : colors.gray)};
`;

export const DataForm = styled.View`
  height: auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 10px 0;
`;

export const ArrowContainer = styled.TouchableOpacity.attrs({
  underlayColor: "transparent",
})`
  width: 40px;
  width: 40px;
`;

export const Arrow = styled.Image``;

export const RowTitle = styled.Text`
  flex: 1;
  text-align: center;
  color: ${colors.black};
  font-size: 15px;
  font-weight: bold;
  margin: 10px 0 10px 0;
`;

export const RowText = styled.Text<RowTextProps>`
  flex: 1;
  text-align: center;
  font-size: 14px;
  margin: 10px 0 0 0;
  color: ${({ color }): string => color || colors.black};
`;
