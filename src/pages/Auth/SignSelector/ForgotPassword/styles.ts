import styled from "styled-components/native";

import colors from "../../../../config/colors";

export const Wrapper = styled.View`
  flex: 1;
  height: 100%;
  width: 100%;
`;

export const Form = styled.View`
  width: 100%;
  padding: 50px 20px 0 20px;
`;

export const FormFooter = styled.View`
  margin-top: 64px;
  display: flex;
  align-items: center;
`;

export const Message = styled.Text`
  color: ${colors.gray};
  margin: 40px 0 0 0;
  font-size: 16px;
  text-align: center;
`;
