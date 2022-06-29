import styled from "styled-components/native";

import colors from "../../../config/colors";

interface ValidityProps {
  outOfDate?: boolean;
}

export const ArrowContainer = styled.TouchableOpacity.attrs({
  underlayColor: "transparent",
})`
  width: 40px;
  width: 40px;
`;

export const Title = styled.Text`
  flex: 1;
  height: 40px;
  text-align: center;
  color: ${colors.blue01};
  font-size: 15px;
  font-weight: bold;
  padding: 20px 30px 0 0;
`;

export const ModalTitle = styled.Text`
  font-size: 15px;
  color: ${colors.black};
  font-weight: bold;
  width: 100%;
  height: 60px;
  text-align: center;
`;
