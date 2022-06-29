import styled from "styled-components/native";

import colors from "../../config/colors";

interface ValidityProps {
  outOfDate?: boolean;
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
  color: ${colors.black};
  font-size: 15px;
  font-weight: bold;
  padding: 20px 30px 0 0;
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

export const SuccessText = styled.Text`
  flex: 1;
  text-align: center;
  color: ${colors.blue01};
  font-size: 15px;
  font-weight: bold;
`;

export const ErrorText = styled.Text`
  flex: 1;
  text-align: center;
  color: ${colors.red};
  font-size: 15px;
  font-weight: bold;
`;
