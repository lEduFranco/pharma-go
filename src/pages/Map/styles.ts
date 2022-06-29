import styled from "styled-components/native";

import colors from "../../config/colors";

interface ButtonProps {
  selected: boolean;
}

interface TextProps {
  selected: boolean;
}

export const MapWrapper = styled.View`
  background-color: transparent;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const FilterButtonsRow = styled.View`
  background-color: transparent;
  height: auto;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 10px 0;
  position: absolute;
  top: 0;
  z-index: 10;
`;

const Button = styled.TouchableOpacity`
  height: 30px;
  width: 155px;
  border-radius: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 15px;
  margin: 10px;
  box-shadow: 0px 3px 3px #00000029;
  elevation: 3;
`;

export const LabsButton = styled(Button)<ButtonProps>`
  background-color: ${({ selected }): string =>
    selected ? colors.blue02 : colors.gray};
`;

export const PharmButton = styled(Button)<ButtonProps>`
  background-color: ${({ selected }): string =>
    selected ? colors.blue02 : colors.gray};
`;

const ButtonText = styled.Text`
  font-size: 14px;
`;

export const LabsButtonText = styled(ButtonText)<TextProps>`
  color: ${({ selected }): string => (selected ? colors.white : colors.black)};
`;

export const PharmButtonText = styled(ButtonText)<TextProps>`
  color: ${({ selected }): string => (selected ? colors.white : colors.black)};
`;

export const PinInfoWrapper = styled.View`
  background-color: ${colors.white};
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 10px 20px;
  max-width: 225px;
  border: 1px solid ${colors.blue01};
  border-radius: 10px;
`;

export const PinInfoOffer = styled.Text`
  color: ${colors.blue01};
  font-size: 14px;
  font-weight: bold;
  text-transform: uppercase;
  margin-bottom: 10px;
`;

export const PinInfoTitle = styled.Text`
  color: ${colors.black};
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 10px;
`;

export const PinInfoParagraph = styled.Text`
  color: ${colors.black};
  font-size: 10px;
  text-align: left;
  margin-bottom: 10px;
`;

export const GoBackButtonRow = styled.View`
  background-color: transparent;
  height: auto;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  position: absolute;
  bottom: 200px;
  z-index: 10;
  padding-right: 15px;
`;

export const GoBackButton = styled(Button)`
  background-color: ${colors.blue02};
`;

export const GoBackButtonText = styled(ButtonText)`
  color: ${colors.white};
`;
