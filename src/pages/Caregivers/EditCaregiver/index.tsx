import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useNavigation } from "@react-navigation/native";

import BackButton from "../../../components/BackButton";
import Button from "../../../components/Button";
import Col from "../../../components/Col";
import Container from "../../../components/Container";
import Input from "../../../components/Input";
import Modal from "../../../components/Modal";
import Row from "../../../components/Row";
import {
  getCaregiversByUserId,
  putCaregiver,
  deleteCaregiver,
} from "../../../services";
import { Creators as CaregiversActions } from "../../../store/ducks/caregivers";
import { ArrowContainer, Title, DataForm, ModalTitle } from "./styles";

const EditCaregiver: React.FC = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const caregiver = useSelector(
    (state: {
      caregivers: {
        selected: {
          item: {
            name: string;
            email: string;
            phone: string;
            userId: string;
            id: string;
          };
          index: number;
        };
      };
    }) => state.caregivers.selected
  );
  const loadingEdit = useSelector(
    (state: {
      caregivers: {
        editLoading: boolean;
      };
    }) => state.caregivers.editLoading
  );
  const loadingDelete = useSelector(
    (state: {
      caregivers: {
        deleteLoading: boolean;
      };
    }) => state.caregivers.deleteLoading
  );
  const [form, setForm] = useState({
    name: caregiver.item.name,
    email: caregiver.item.email,
    phone: caregiver.item.phone,
    userId: caregiver.item.userId,
  });
  const [modal, setModal] = useState(false);
  const [error, setError] = useState(false);

  const handleEdit = async (): Promise<void> => {
    setError(false);
    if (form.name === "" || form.email === "" || form.phone === "") {
      setError(true);
    } else {
      dispatch(CaregiversActions.setEditLoading(true));
      const response = await putCaregiver(
        caregiver.item.id,
        JSON.stringify(form)
      );
      const responseList = await getCaregiversByUserId(
        caregiver.item.userId
      ).then((data) => {
        dispatch(CaregiversActions.setList(data));
        return data;
      });
      dispatch(CaregiversActions.setEditLoading(false));
      navigation.goBack();
    }
  };

  const handleDelete = async (): Promise<void> => {
    dispatch(CaregiversActions.setDeleteLoading(true));
    const response = await deleteCaregiver(caregiver.item.id);
    const responseList = await getCaregiversByUserId(
      caregiver.item.userId
    ).then((data) => {
      dispatch(CaregiversActions.setList(data));
      return data;
    });
    dispatch(CaregiversActions.setDeleteLoading(false));
    navigation.goBack();
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
            title="Salvar edições"
            shadow
            onPress={(): Promise<void> => handleEdit()}
            loading={loadingEdit}
          />
        </Row>
        <Row>
          <Button
            style={{ marginTop: 10, marginBottom: 30 }}
            color="transparent"
            borderColor="primary"
            title="Excluir"
            shadow
            onPress={(): Promise<void> => handleDelete()}
            loading={loadingDelete}
          />
        </Row>
      </DataForm>
      <Modal open={modal} toggle={(): void => setModal(!modal)}>
        <Col style={{ height: 200 }}>
          <Row size="1">
            <ModalTitle>Deseja excluir Cuidador?</ModalTitle>
          </Row>
          <Row size="1">
            <Button
              color="primary"
              onPress={(): void => {
                setModal(!modal);
                navigation.goBack();
              }}
              title="Sim"
              size="small"
              shadow
            />
          </Row>
          <Row size="1">
            <Button
              color="transparent"
              borderColor="primary"
              onPress={(): void => setModal(!modal)}
              title="Não"
              size="small"
              shadow
            />
          </Row>
        </Col>
      </Modal>
    </Container>
  );
};

export default EditCaregiver;
