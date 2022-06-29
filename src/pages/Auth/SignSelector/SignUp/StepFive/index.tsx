import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import Button from "../../../../../components/Button";
import FormGroup from "../../../../../components/FormGroup";
import Input from "../../../../../components/Input";
import { Creators as AuthActions } from "../../../../../store/ducks/auth";
import {
  SignUpContainer,
  Form,
  Message,
  ErrorMessage,
  FormFooter,
} from "../../styles";

interface Props {
  clickNext: () => void;
}

const StepFive: React.FC<Props> = ({ clickNext }) => {
  const dispatch = useDispatch();
  const userPassword = useSelector(
    (state: {
      auth: {
        password: string;
      };
    }) => state.auth.password
  );
  const [password, setPassword] = useState(userPassword);
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleNext = (): void => {
    setLoading(true);
    setError(false);
    setPasswordError(false);

    if (password === "" || passwordConfirmation === "") {
      setError(true);
    } else if (password !== passwordConfirmation) {
      setPasswordError(true);
    } else {
      dispatch(AuthActions.setPassword(password));
      setLoading(false);
      setPasswordError(false);
      clickNext();
    }
    setLoading(false);
  };

  return (
    <SignUpContainer>
      <Form>
        <FormGroup>
          <Input
            placeholder="Senha"
            value={password}
            onChange={(e: string): void => setPassword(e)}
            noBold
            type="password"
            error={error && password === ""}
          />
        </FormGroup>
        <FormGroup>
          <Input
            placeholder="Confirmar senha"
            value={passwordConfirmation}
            onChange={(e: string): void => setPasswordConfirmation(e)}
            noBold
            type="password"
            error={error && passwordConfirmation === ""}
          />
        </FormGroup>
        {passwordError && <ErrorMessage>Senhas não são iguais!</ErrorMessage>}
        <Message style={passwordError ? { marginTop: 19 } : { marginTop: 40 }}>
          A senha deve conter no mínimo 8 caracteres
        </Message>
      </Form>
      <FormFooter>
        <Button
          color="secondary"
          title="Finalizar"
          onPress={(): void => handleNext()}
          margin="20px 0 15px 0"
          loading={loading}
        />
      </FormFooter>
    </SignUpContainer>
  );
};

export default StepFive;
