import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useNavigation } from "@react-navigation/native";

import Button from "../../../../components/Button";
import FormGroup from "../../../../components/FormGroup";
import Input from "../../../../components/Input";
import {
  postLogin,
  getProfileByUserId,
  getAddressByUserId,
} from "../../../../services";
import { Creators as UserActions } from "../../../../store/ducks/user";
import {
  SignInContainer,
  Form,
  FormFooter,
  ForgotPasswordWrapper,
  ForgotPassword,
  ErrorMessage,
} from "./styles";

const SignIn: React.FC = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    email: "",
    senha: "",
    tipoUsuario: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [requestError, setRequestError] = useState(false);

  const handleLogin = async (): Promise<void> => {
    setLoading(true);
    setError(false);
    setRequestError(false);

    if (form.email === "" || form.senha === "") {
      setError(true);
    } else {
      const loginResponse = await postLogin(form);
      const profileResponse = await getProfileByUserId(loginResponse.id);
      const addressResponse = await getAddressByUserId(loginResponse.id);
      if (loginResponse && profileResponse && addressResponse) {
        setLoading(false);
        dispatch(UserActions.setUserAddress(addressResponse));
        dispatch(UserActions.setUserProfile(profileResponse));
        dispatch(UserActions.setUserData(loginResponse));
        dispatch(UserActions.setUserId(loginResponse.id));
      } else setRequestError(true);
    }
    setLoading(false);
  };

  return (
    <SignInContainer>
      <Form>
        <FormGroup>
          <Input
            placeholder="Email"
            value={form.email}
            onChange={(e: string): void => setForm({ ...form, email: e })}
            type="email"
            noBold
            error={error && form.email === ""}
          />
        </FormGroup>
        <FormGroup>
          <Input
            placeholder="Senha"
            value={form.senha}
            onChange={(e: string): void => setForm({ ...form, senha: e })}
            type="password"
            noBold
            error={error && form.senha === ""}
          />
          {requestError && (
            <ErrorMessage>Seu email ou senha está incorreto!</ErrorMessage>
          )}
        </FormGroup>
        <FormFooter errorMessage={requestError}>
          <Button
            color="primary"
            title="Entrar"
            onPress={(): Promise<void> => handleLogin()}
            margin="15px 0"
            loading={loading}
          />
          {/* <Button
            color="facebook"
            title="Login com Facebook"
            onPress={(): { type: string; payload: { data: number } } =>
              handleLogin()
            }
            margin="15px 0"
          /> */}
          <ForgotPasswordWrapper
            onPress={() => navigation.navigate("ForgotPassword")}
          >
            <ForgotPassword>Esqueci Minha Senha</ForgotPassword>
          </ForgotPasswordWrapper>
        </FormFooter>
      </Form>
    </SignInContainer>
  );
};

export default SignIn;
