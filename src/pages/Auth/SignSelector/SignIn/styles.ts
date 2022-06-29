import styled from "styled-components/native";

import colors from "../../../../config/colors";

interface FormProps {
  errorMessage: boolean;
}

export const SignInContainer = styled.View`
  flex: 1;
`;

export const Form = styled.View`
  margin-top: 25px;
`;

export const FormFooter = styled.View<FormProps>`
  margin-top: ${({ errorMessage }): string => (errorMessage ? "18px" : "64px")};
  display: flex;
  align-items: center;
`;

export const ForgotPassword = styled.Text`
  margin-top: 15px;
  color: ${colors.blueFB};
  text-decoration: underline;
  font-size: 14px;
  font-weight: 600;
`;

export const ForgotPasswordWrapper = styled.TouchableOpacity.attrs({
  underlayColor: colors.white,
})``;

export const ErrorMessage = styled.Text`
  color: ${colors.red};
  margin: 30px 0 0 0;
  font-size: 14px;
  text-align: left;
`;
