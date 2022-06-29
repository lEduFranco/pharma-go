import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import Button from "../../../../../components/Button";
import FormGroup from "../../../../../components/FormGroup";
import Input from "../../../../../components/Input";
import { Creators as AuthActions } from "../../../../../store/ducks/auth";
import { SignUpContainer, Form, Message, FormFooter } from "../../styles";

interface Props {
  clickNext: () => void;
}

const StepThree: React.FC<Props> = ({ clickNext }) => {
  const dispatch = useDispatch();
  const userCEP = useSelector(
    (state: {
      auth: {
        cep: string;
      };
    }) => state.auth.cep
  );
  const userStreet = useSelector(
    (state: {
      auth: {
        street: string;
      };
    }) => state.auth.street
  );
  const userNumber = useSelector(
    (state: {
      auth: {
        number: string;
      };
    }) => state.auth.number
  );
  const userCity = useSelector(
    (state: {
      auth: {
        city: string;
      };
    }) => state.auth.city
  );
  const userState = useSelector(
    (state: {
      auth: {
        state: string;
      };
    }) => state.auth.state
  );
  const [cep, setCep] = useState(userCEP);
  const [street, setStreet] = useState(userStreet);
  const [number, setNumber] = useState(userNumber);
  const [city, setCity] = useState(userCity);
  const [state, setState] = useState(userState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleNext = (): void => {
    setLoading(true);
    setError(false);

    if (
      cep === "" ||
      street === "" ||
      number === "" ||
      city === "" ||
      state === ""
    ) {
      setError(true);
    } else {
      setLoading(false);
      dispatch(AuthActions.setCEP(cep));
      dispatch(AuthActions.setStreet(street));
      dispatch(AuthActions.setNumber(number));
      dispatch(AuthActions.setCity(city));
      dispatch(AuthActions.setState(state));
      clickNext();
    }
    setLoading(false);
  };

  return (
    <SignUpContainer>
      <Form>
        <FormGroup>
          <Input
            placeholder="CEP"
            value={cep}
            onChange={(e: string): void => setCep(e)}
            type="cep"
            noBold
            error={error && cep === ""}
          />
        </FormGroup>
        <FormGroup>
          <Input
            placeholder="Endereço"
            value={street}
            onChange={(e: string): void => setStreet(e)}
            noBold
            error={error && street === ""}
          />
        </FormGroup>
        <FormGroup>
          <Input
            placeholder="Número"
            value={number}
            onChange={(e: string): void => setNumber(e)}
            noBold
            error={error && number === ""}
          />
        </FormGroup>
        <FormGroup>
          <Input
            placeholder="Cidade"
            value={city}
            onChange={(e: string): void => setCity(e)}
            noBold
            error={error && city === ""}
          />
        </FormGroup>
        <FormGroup>
          <Input
            placeholder="Estado"
            value={state}
            onChange={(e: string): void => setState(e)}
            noBold
            error={error && state === ""}
          />
        </FormGroup>
        <FormFooter>
          <Button
            color="primary"
            title="Próximo Passo"
            onPress={(): void => handleNext()}
            margin="15px 0"
            loading={loading}
          />
        </FormFooter>
      </Form>
    </SignUpContainer>
  );
};

export default StepThree;
