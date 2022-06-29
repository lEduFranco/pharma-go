import styled from "styled-components/native";

import colors from "../../../config/colors";

export const Content = styled.View`
  width: 100%;
  height: 100%;
  padding-top: 30px;
  position: relative;
`;

export const SignUpContainer = styled.View`
  display: flex;
`;

export const StepContainer = styled.View`
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  padding: 10px 20px 0 0;
`;

export const Step = styled.Text`
  color: ${colors.gray};
  font-size: 16px;
`;

export const SignUpStepsContainer = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Form = styled.View`
  display: flex;
  align-items: center;
  height: auto;
  width: 100%;
  background-color: ${colors.white};
  position: relative;
  border-radius: 40px;
  padding: 0 20px 10px 20px;
`;

export const Message = styled.Text`
  color: ${colors.gray};
  margin: 40px 0 0 0;
  font-size: 16px;
  text-align: center;
`;

export const FormFooter = styled.View`
  margin-top: 30px;
  display: flex;
  align-items: center;
  width: 100%;
`;

export const SuccessContainer = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

export const CheckImage = styled.Image`
  height: 100px;
  width: 100px;
`;

export const ErrorMessage = styled.Text`
  color: ${colors.red};
  margin: 5px 0 0 0;
  font-size: 14px;
  text-align: left;
`;
