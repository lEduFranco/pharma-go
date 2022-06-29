import React from "react";

import { useNavigation } from "@react-navigation/native";

import Button from "../../../../components/Button";
import Container from "../../../../components/Container";
import FormGroup from "../../../../components/FormGroup";
import Input from "../../../../components/Input";
import { Wrapper, Form, FormFooter, Message } from "./styles";

const ForgotPassword: React.FC = () => {
  const navigation = useNavigation();

  return (
    <Container noHeader noNavBar backgroundColor="white">
      <Wrapper>
        <Message>
          Você receberá por e-mail um link para recuperação de sua senha.
        </Message>
        <Form>
          <FormGroup>
            <Input placeholder="Email" />
          </FormGroup>
          <FormFooter>
            <Button
              color="primary"
              title="Enviar"
              onPress={(): void => {
                // eslint-disable-next-line no-alert
                window.alert("Mensagem enviada");
                navigation.goBack();
              }}
              margin="15px 0"
            />
          </FormFooter>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default ForgotPassword;
