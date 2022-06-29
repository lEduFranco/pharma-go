import styled from "styled-components/native";

import colors from "../../../config/colors";

export const ButtonsWrapper = styled.View`
  width: 100%;
  height: 140px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 20px;
`;

export const ModalText = styled.Text`
  color: ${colors.red};
  padding: 10px;
  font-size: 16px;
  text-align: center;
`;
