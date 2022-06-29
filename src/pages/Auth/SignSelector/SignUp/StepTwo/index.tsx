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

const StepTwo: React.FC<Props> = ({ clickNext }) => {
  const dispatch = useDispatch();
  const userCPF = useSelector(
    (state: {
      auth: {
        cpf: string;
      };
    }) => state.auth.cpf
  );
  const userPhone = useSelector(
    (state: {
      auth: {
        phone: string;
      };
    }) => state.auth.phone
  );
  const [cpf, setCpf] = useState(userCPF);
  const [phone, setPhone] = useState(userPhone);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleNext = (): void => {
    setLoading(true);
    setError(false);

    if (cpf === "" || phone === "") {
      setError(true);
    } else {
      setLoading(false);
      dispatch(AuthActions.setCPF(cpf));
      dispatch(AuthActions.setPhone(phone));
      clickNext();
    }
    setLoading(false);
  };

  return (
    <SignUpContainer>
      <Form>
        <FormGroup>
          <Input
            placeholder="CPF"
            value={cpf}
            onChange={(e: string): void => setCpf(e)}
            type="cpf"
            noBold
            error={error && cpf === ""}
          />
        </FormGroup>
        <FormGroup>
          <Input
            placeholder="Telefone"
            value={phone}
            onChange={(e: string): void => setPhone(e)}
            type="phone"
            noBold
            error={error && phone === ""}
          />
        </FormGroup>
        <Message>Todas as suas informações estão seguras :)</Message>
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

export default StepTwo;
