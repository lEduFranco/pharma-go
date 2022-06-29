import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useNavigation } from "@react-navigation/native";

import BackButton from "../../../components/BackButton";
import Button from "../../../components/Button";
import Container from "../../../components/Container";
import Input from "../../../components/Input";
import Row from "../../../components/Row";
import { getCaregiversByUserId, postCaregiver } from "../../../services";
import { Creators as CaregiversActions } from "../../../store/ducks/caregivers";
import { ArrowContainer, Title, DataForm } from "./styles";

const NewCaregiver: React.FC = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const userId = useSelector(
    (state: {
      user: {
        id: string;
      };
    }) => state.user.id
  );
  const loading = useSelector(
    (state: {
      caregivers: {
        newLoading: boolean;
      };
    }) => state.caregivers.newLoading
  );
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    userId,
  });
  const [error, setError] = useState(false);

  const handleNew = async (): Promise<void> => {
    setError(false);
    if (form.name === "" || form.email === "" || form.phone === "") {
      setError(true);
    } else {
      dispatch(CaregiversActions.setNewLoading(true));
      const response = await postCaregiver(JSON.stringify(form));
      const responseList = await getCaregiversByUserId(userId).then((data) => {
        dispatch(CaregiversActions.setList(data));
        return data;
      });
      dispatch(CaregiversActions.setNewLoading(false));
      navigation.goBack();
    }
  };

  return (
    <Container
      backgroundColor="gray"
      flexDirection="column"
      justifyContent="flex-start"
      alignItems="center"
    >
      <Row justifyContent="center" alignItems="center">
        <ArrowContainer>
          <BackButton onPress={(): void => navigation.goBack()} />
        </ArrowContainer>
        <Title>Meus cuidadores</Title>
      </Row>
      <DataForm>
        <Row>
          <Input
            placeholder="Nome do cuidador"
            value={form.name}
            onChange={(e: string): void => setForm({ ...form, name: e })}
            noBold
            error={error && form.name === ""}
          />
        </Row>
        <Row>
          <Input
            placeholder="E-mail"
            value={form.email}
            onChange={(e: string): void => setForm({ ...form, email: e })}
            noBold
            type="email"
            error={error && form.email === ""}
          />
        </Row>
        <Row>
          <Input
            placeholder="Telefone"
            value={form.phone}
            onChange={(e: string): void => setForm({ ...form, phone: e })}
            noBold
            error={error && form.phone === ""}
          />
        </Row>
        <Row>
          <Button
            style={{ marginTop: 30 }}
            color="primary"
            title="Adicionar"
            shadow
            onPress={(): Promise<void> => handleNew()}
            loading={loading}
          />
        </Row>
      </DataForm>
    </Container>
  );
};

export default NewCaregiver;
