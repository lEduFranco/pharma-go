import styled from "styled-components/native";

import colors from "../../../../../config/colors";

export const SuccessContainer = styled.View`
  height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

export const Message = styled.Text`
  color: ${colors.gray};
  margin: 40px 0 0 0;
  font-size: 16px;
  text-align: center;
`;

export const CheckImage = styled.Image`
  height: 100px;
  width: 100px;
`;
