import styled from "styled-components/native";

import colors from "../../../config/colors";

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
  color: ${colors.blue01};
  font-size: 18px;
  font-weight: bold;
  margin: 10px 30px 15px 10px;
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

export const ModalTitle = styled.Text`
  font-size: 15px;
  color: ${colors.black};
  font-weight: bold;
  width: 100%;
  height: 60px;
  text-align: center;
`;
