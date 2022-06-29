import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Container from "../../../components/Container";
import { Creators as AuthActions } from "../../../store/ducks/auth";
import AuthHeader from "./AuthHeader";
import SignIn from "./SignIn";
import StepFive from "./SignUp/StepFive";
import StepFour from "./SignUp/StepFour";
import StepOne from "./SignUp/StepOne";
import StepThree from "./SignUp/StepThree";
import StepTwo from "./SignUp/StepTwo";
import Success from "./SignUp/Success";
import { Content, SignUpContainer, StepContainer, Step } from "./styles";

const Auth: React.FC = () => {
  const dispatch = useDispatch();
  const authType = useSelector(
    (state: { auth: { type: { signin: boolean; signup: boolean } } }) =>
      state.auth.type
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

  return (
    <Container noHeader noNavBar backgroundColor="white">
      {step < 6 ? <AuthHeader /> : null}
      <Content>
        {selected.signin && <SignIn />}
        {selected.signup && (
          <SignUpContainer>
            {step < 6 ? (
              <StepContainer>
                <Step>
                  {step}
                  /5
                </Step>
              </StepContainer>
            ) : null}
            {step === 1 ? (
              <StepOne
                clickNext={(): void => {
                  dispatch(AuthActions.setSignupStep(2));
                }}
              />
            ) : step === 2 ? (
              <StepTwo
                clickNext={(): { type: string; payload: { data: number } } =>
                  dispatch(AuthActions.setSignupStep(3))
                }
              />
            ) : step === 3 ? (
              <StepThree
                clickNext={(): { type: string; payload: { data: number } } =>
                  dispatch(AuthActions.setSignupStep(4))
                }
              />
            ) : step === 4 ? (
              <StepFour
                clickNext={(): { type: string; payload: { data: number } } =>
                  dispatch(AuthActions.setSignupStep(5))
                }
              />
            ) : step === 5 ? (
              <StepFive
                clickNext={(): {
                  type: string;
                  payload: {
                    data: number;
                  };
                } => dispatch(AuthActions.setSignupStep(6))}
              />
            ) : (
              <Success />
            )}
          </SignUpContainer>
        )}
      </Content>
    </Container>
  );
};

export default Auth;
