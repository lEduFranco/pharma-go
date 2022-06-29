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

export const AddedFileWrapper = styled.View`
  background-color: transparent;
  border-radius: 50px;
  height: 52px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-width: 1px;
  border-color: ${colors.blue01};
  padding: 0 10px 0 20px;
  margin: 10px 0 0 0;
`;

export const AddedFileContent = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const AddedFileText = styled.Text`
  color: ${colors.blue01};
  font-size: 16px;
  text-align: center;
  margin-left: 4px;
`;

export const AddedFileContainer = styled.View`
  height: auto;
  width: 30px;
  overflow: hidden;
  margin: 0 10px 0 10px;
`;

export const RemoveFileWrapper = styled.TouchableOpacity.attrs({
  underlayColor: colors.blue02,
})`
  background-color: transparent;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 5px;
  margin: 5px 0;
`;

export const RemoveFileText = styled.Text`
  color: ${colors.blue01};
  font-size: 14px;
  text-align: right;
  margin-left: 4px;
`;

export const AddFileButton = styled.TouchableOpacity.attrs({
  underlayColor: colors.blue02,
})`
  background-color: transparent;
  border-radius: 50px;
  height: 52px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-width: 1px;
  border-color: ${colors.blue02};
  padding: 0 10px 0 20px;
  margin: 10px 0;
`;

export const AddFileContent = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const AddFileText = styled.Text`
  color: ${colors.blue02};
  font-size: 16px;
  text-align: center;
  margin-left: 4px;
`;

export const AddImageContainer = styled.View`
  height: auto;
  width: 30px;
  overflow: hidden;
  margin: 0 10px 0 10px;
`;

export const Icon = styled.Image.attrs({
  resizeMode: "contain",
})`
  height: 30px;
  width: 30px;
`;

export const Message = styled.Text`
  flex: 1;
  text-align: center;
  color: ${colors.gray};
  font-size: 14px;
  padding: 10px 30px;
`;
