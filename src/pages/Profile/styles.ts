import styled from "styled-components/native";

import colors from "../../config/colors";

interface ButtonProps {
  selected: boolean;
}

interface TextProps {
  selected: boolean;
}

export const ArrowContainer = styled.View`
  width: 30px;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  overflow: hidden;
  padding: 10px;
`;

export const Title = styled.Text`
  flex: 1;
  text-align: center;
  color: ${colors.black};
  font-size: 18px;
  font-weight: bold;
  margin: 10px 30px 15px 10px;
`;

export const Profile = styled.Image`
  height: 72.55px;
  width: 72.55px;
  margin: 10px;
`;

export const BoxWrapper = styled.View`
  background: ${colors.white};
  border-radius: 24px;
  height: auto;
  width: 100%;
  elevation: 1;
  box-shadow: 0px 3px 3px #00000029;
  padding: 10px 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin-bottom: 30px;
`;

export const ButtonsContainer = styled.View`
  height: auto;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 10px 0;
  justify-content: space-between;
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

export const Message = styled.Text`
  font-size: 12px;
  color: ${colors.gray};
  margin: 10px;
`;

export const CheckboxWrapper = styled.View`
  height: auto;
  width: 100%;
  border-bottom-width: 1px;
  border-bottom-color: ${colors.gray};
  padding-bottom: 10px;
`;

export const CheckboxLabelWrapper = styled.View`
  height: auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin: 5px 0;
`;

export const CheckboxRow = styled.View`
  height: auto;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin: 5px 0 0 0;
`;

export const Label = styled.Text`
  color: ${colors.black};
  font-size: 14px;
`;

export const TagsWrapper = styled.View`
  margin-top: 10px;

  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
`;
