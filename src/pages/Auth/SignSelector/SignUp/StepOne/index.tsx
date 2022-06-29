import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { parseISO } from "date-fns";
import moment from "moment";

import Button from "../../../../../components/Button";
import DatePicker from "../../../../../components/DatePicker";
import FormGroup from "../../../../../components/FormGroup";
import Input from "../../../../../components/Input";
import { getEmailValidation } from "../../../../../services";
import { Creators as AuthActions } from "../../../../../store/ducks/auth";
import {
  SignUpContainer,
  Form,
  Message,
  FormFooter,
  ErrorMessage,
} from "../../styles";

interface Props {
  clickNext: (name: string, email: string, birthDate: Date) => void;
}

const StepOne: React.FC<Props> = ({ clickNext }) => {
  const dispatch = useDispatch();
  const userName = useSelector(
    (state: {
      auth: {
        name: string;
      };
    }) => state.auth.name
  );
  const userEmail = useSelector(
    (state: {
      auth: {
        email: string;
      };
    }) => state.auth.email
  );
  const userBirthDate = useSelector(
    (state: {
      auth: {
        birthDate: string;
      };
    }) => {
      state.auth.birthDate;
    }
  );
  const [name, setName] = useState(userName);
  const [email, setEmail] = useState(userEmail);
  const [birthDate, setBirthDate] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [emailError, setEmailError] = useState(false);

  console.log("---------- userBirthDate ----------");
  console.log(userBirthDate);
  console.log("---------- userBirthDate ----------");

  const handleNext = async (): Promise<void> => {
    setLoading(true);
    setError(false);
    setEmailError(false);

    if (name === "" || email === "") {
      setError(true);
    } else {
      const response = await getEmailValidation(email);
      if (response !== "Email Já cadastrado") {
        setLoading(false);
        dispatch(AuthActions.setName(name));
        dispatch(AuthActions.setEmail(email));
        dispatch(AuthActions.setBirthDate(moment.utc(birthDate).toISOString()));
        clickNext();
      } else {
        setEmailError(true);
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    if (userBirthDate !== "") setBirthDate(new Date(userBirthDate));
  }, [userBirthDate]);

  return (
    <SignUpContainer>
      <Form>
        <FormGroup>
          <Input
            placeholder="Nome"
            value={name}
            onChange={(e: string): void => setName(e)}
            noBold
            error={error && name === ""}
          />
        </FormGroup>
        <FormGroup>
          <Input
            placeholder="Email"
            value={email}
            onChange={(e: string): void => setEmail(e)}
            type="email"
            noBold
            error={emailError || (error && email === "")}
          />
          {emailError && (
            <ErrorMessage>Esse email já possui cadastro!</ErrorMessage>
          )}
        </FormGroup>
        <FormGroup>
          <DatePicker
            placeholder="Data de nascimento"
            value={birthDate}
            onChange={(e: Date): void => {
              console.log("---------- e ----------");
              console.log(e);
              console.log("---------- e ----------");
              setBirthDate(e);
            }}
            mode="date"
            noBold
          />
        </FormGroup>
        {loading ? (
          <Message>Estamos verificando se email já possui cadastro...</Message>
        ) : (
          <Message>Vamos criar seu perfil</Message>
        )}
        <FormFooter>
          <Button
            color="primary"
            title="Próximo Passo"
            onPress={(): Promise<void> => handleNext()}
            margin="15px 0"
            loading={loading}
          />
          {/* <Button
            color="facebook"
            title="Preencher com Facebook"
            onPress={(): void => {
              console.log("facebook");
            }}
            margin="15px 0"
          /> */}
        </FormFooter>
      </Form>
    </SignUpContainer>
  );
};

export default StepOne;
