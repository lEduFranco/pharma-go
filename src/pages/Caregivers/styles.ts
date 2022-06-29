import { Dimensions } from "react-native";

import styled from "styled-components/native";

import colors from "../../config/colors";

interface ValidityProps {
  outOfDate?: boolean;
}

interface LoadingProps {
  loading: boolean;
}

export const ArrowContainer = styled.TouchableOpacity.attrs({
  underlayColor: "transparent",
})`
  width: 40px;
  width: 40px;
`;

export const Arrow = styled.Image``;

export const Title = styled.Text`
  flex: 1;
  height: 40px;
  text-align: center;
  color: ${colors.blue01};
  font-size: 15px;
  font-weight: bold;
  padding: 20px 30px 0 0;
`;

export const CaregiverTitle = styled.Text`
  flex: 1;
  text-align: center;
  color: ${colors.black};
  font-size: 15px;
  font-weight: bold;
  margin: 10px 0 0 0;
`;

export const CaregiverDescription = styled.Text`
  flex: 1;
  text-align: center;
  color: ${colors.black};
  font-size: 14px;
  margin: 10px 0 0 0;
`;

export const CaregiverBottom = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const CaregiverContact = styled.Text`
  text-align: center;
  color: ${colors.black};
  font-size: 10px;
  margin: 10px 0 0 0;
`;

export const EditButton = styled.TouchableOpacity.attrs({
  underlayColor: "transparent",
})``;

export const Edit = styled.Text`
  text-align: center;
  color: ${colors.blue02};
  font-size: 14px;
  margin: 10px 0 0 0;
`;

export const LoadingContainer = styled.View<LoadingProps>`
  width: ${Dimensions.get("window").width};
  height: 100%;
  display: ${({ loading }): string => (loading ? "flex" : "none")};
  justify-content: center;
  align-items: center;
`;
