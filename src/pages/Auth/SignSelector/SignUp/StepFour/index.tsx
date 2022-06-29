import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import Button from "../../../../../components/Button";
import DropdownList from "../../../../../components/DropdownList";
import FormGroup from "../../../../../components/FormGroup";
import Input from "../../../../../components/Input";
import { Creators as AuthActions } from "../../../../../store/ducks/auth";
import { SignUpContainer, Form, FormFooter } from "../../styles";

interface Props {
  clickNext: () => void;
}

const StepFour: React.FC<Props> = ({ clickNext }) => {
  const dispatch = useDispatch();
  const userSex = useSelector(
    (state: {
      auth: {
        sex: string;
      };
    }) => state.auth.sex
  );
  const userBloodType = useSelector(
    (state: {
      auth: {
        bloodType: string;
      };
    }) => state.auth.bloodType
  );
  const userPreexistingConditions = useSelector(
    (state: {
      auth: {
        preexistingConditions: string;
      };
    }) => state.auth.preexistingConditions
  );
  const userSpecialNeeds = useSelector(
    (state: {
      auth: {
        specialNeeds: string;
      };
    }) => state.auth.specialNeeds
  );
  const [sex, setSex] = useState(userSex);
  const [bloodType, setBloodType] = useState(userBloodType);
  const [preexistingConditions, setPreexistingConditions] = useState(
    userPreexistingConditions
  );
  const [specialNeeds, setSpecialNeeds] = useState(userSpecialNeeds);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleNext = (): void => {
    setLoading(true);
    setError(false);

    if (
      sex === "" ||
      bloodType === "" ||
      preexistingConditions === "" ||
      specialNeeds === ""
    ) {
      setError(true);
    } else {
      setLoading(false);
      dispatch(AuthActions.setSex(sex));
      dispatch(AuthActions.setBloodType(bloodType));
      dispatch(AuthActions.setPreexistingConditions(preexistingConditions));
      dispatch(AuthActions.setSpecialNeeds(specialNeeds));
      clickNext();
    }
    setLoading(false);
  };

  return (
    <SignUpContainer>
      <Form>
        <FormGroup>
          <DropdownList
            selected={sex}
            setSelected={setSex}
            items={[
              { label: "Masculino", value: "masculino" },
              { label: "Feminino", value: "feminino" },
            ]}
            placeholder="Sexo"
            noBold
            error={error && sex === ""}
          />
        </FormGroup>
        <FormGroup>
          <DropdownList
            selected={bloodType}
            setSelected={setBloodType}
            items={[
              { label: "A+", value: "A+" },
              { label: "B+", value: "B+" },
              { label: "AB+", value: "AB+" },
              { label: "A-", value: "A-" },
              { label: "B-", value: "B-" },
              { label: "AB-", value: "AB-" },
              { label: "O+", value: "O+" },
              { label: "O-", value: "O-" },
            ]}
            placeholder="Grupo Sanguíneo"
            noBold
            error={error && bloodType === ""}
          />
        </FormGroup>
        <FormGroup>
          <Input
            placeholder="Condições preexistentes"
            value={preexistingConditions}
            onChange={(e: string): void => setPreexistingConditions(e)}
            noBold
            error={error && preexistingConditions === ""}
          />
        </FormGroup>
        <FormGroup>
          <Input
            placeholder="Necessidades especiais"
            value={specialNeeds}
            onChange={(e: string): void => setSpecialNeeds(e)}
            noBold
            error={error && specialNeeds === ""}
          />
        </FormGroup>
      </Form>
      <FormFooter>
        <Button
          color="primary"
          title="Próximo Passo"
          onPress={(): void => handleNext()}
          margin="15px 0"
          loading={loading}
        />
      </FormFooter>
    </SignUpContainer>
  );
};

export default StepFour;
