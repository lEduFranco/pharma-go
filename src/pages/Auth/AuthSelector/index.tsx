import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { useNavigation } from "@react-navigation/native";

import backgroundImage from "../../../assets/images/auth_bg.png";
import Button from "../../../components/Button";
import Col from "../../../components/Col";
import Container from "../../../components/Container";
import Modal from "../../../components/Modal";
import Row from "../../../components/Row";
import { Creators as AuthActions } from "../../../store/ducks/auth";
import { ButtonsWrapper, ModalText } from "./styles";

const AuthSelector: React.FC = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const signupError = useSelector(
    (state: {
      auth: {
        signupError: boolean;
      };
    }) => state.auth.signupError
  );

  return (
    <Container
      source={backgroundImage}
      justifyContent="flex-end"
      noHeader
      noNavBar
      backgroundColor="white"
    >
      <ButtonsWrapper>
        <Button
          color="primary"
          title="Fazer Login"
          type="rounded"
          onPress={(): void => {
            dispatch(
              AuthActions.setAuthType({
                signin: true,
                signup: false,
              })
            );
            navigation.navigate("SignSelector");
          }}
        />
        <Button
          color="white"
          title="Cadastrar-se"
          type="rounded"
          onPress={(): void => {
            dispatch(
              AuthActions.setAuthType({
                signin: false,
                signup: true,
              })
            );
            navigation.navigate("SignSelector");
          }}
        />
      </ButtonsWrapper>
      <Modal
        open={signupError}
        toggle={(): {
          type: string;
          payload: {
            data: boolean;
          };
        } => dispatch(AuthActions.setSignupError(false))}
      >
        <Col style={{ height: 200 }}>
          <Row size="1">
            <ModalText>
              Ocorreu um erro em seu cadastro. Tente novamente mais tarde.
            </ModalText>
          </Row>
          <Row size="1">
            <Button
              color="transparent"
              borderColor="primary"
              onPress={(): {
                type: string;
                payload: {
                  data: boolean;
                };
              } => dispatch(AuthActions.setSignupError(false))}
              title="OK"
              size="small"
              shadow
            />
          </Row>
        </Col>
      </Modal>
    </Container>
  );
};

export default AuthSelector;
