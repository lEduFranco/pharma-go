import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { useNavigation } from "@react-navigation/native";

import BackButton from "../../../../components/BackButton";
import { Creators as AuthActions } from "../../../../store/ducks/auth";
import {
  AuthHeaderContainer,
  ArrowContainer,
  ButtonsContainer,
  Image,
  SignInButton,
  SignUpButton,
  SignInButtonText,
  SignUpButtonText,
} from "./styles";

const AuthHeader: React.FC = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const authType = useSelector(
    (state: { auth: { type: object } }) => state.auth.type
  );
  const authStep = useSelector(
    (state: { auth: { signupStep: number } }) => state.auth.signupStep
  );

  const [selected, setSelected] = useState(authType);
  const [step, setStep] = useState(authStep);

  useEffect(() => {
    setSelected(authType);
    setStep(authStep);
  }, [authType, authStep]);

  const handleGoBack = (): void => {
    if (step > 1) dispatch(AuthActions.setSignupStep(step - 1));
    else navigation.goBack();
  };

  return (
    <AuthHeaderContainer>
      <ArrowContainer>
        <BackButton onPress={(): void => handleGoBack()} />
      </ArrowContainer>
      <ButtonsContainer>
        <SignInButton
          selected={selected}
          onPress={() =>
            dispatch(AuthActions.setAuthType({ signin: true, signup: false }))
          }
        >
          <SignInButtonText white={selected.signin} selected={selected}>
            Login
          </SignInButtonText>
        </SignInButton>
        <SignUpButton
          selected={selected}
          onPress={() =>
            dispatch(AuthActions.setAuthType({ signin: false, signup: true }))
          }
        >
          <SignUpButtonText white={selected.signup} selected={selected}>
            Criar Perfil
          </SignUpButtonText>
        </SignUpButton>
      </ButtonsContainer>
    </AuthHeaderContainer>
  );
};
export default AuthHeader;
