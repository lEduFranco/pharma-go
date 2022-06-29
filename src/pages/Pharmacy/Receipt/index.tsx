import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useNavigation } from "@react-navigation/native";
import moment from "moment";

import BackButton from "../../../components/BackButton";
import Button from "../../../components/Button";
import Col from "../../../components/Col";
import Container from "../../../components/Container";
import DatePicker from "../../../components/DatePicker";
import DropdownList from "../../../components/DropdownList";
import Input from "../../../components/Input";
import InputArea from "../../../components/InputArea";
import Modal from "../../../components/Modal";
import Row from "../../../components/Row";
import {
  getPharmacyByUserId,
  putPharmacy,
  deletePharmacy,
} from "../../../services";
import { Creators as PharmacyActions } from "../../../store/ducks/pharmacy";
import { ArrowContainer, Title, Text, CreatedOn, ModalTitle } from "./styles";

const Receipt: React.FC = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const pharmacy = useSelector(
    (state: {
      pharmacy: {
        selected: {
          item: {
            medicineName: string;
            amount: string;
            adverseReactions: string;
            howToUse: {
              description: string;
              id: string;
            };
            howToUseId: string;
            instructionUse: {
              description: string;
              id: string;
            };
            instructionUseId: string;
            validity: string;
            userId: string;
            id: string;
          };
          index: number;
        };
      };
    }) => state.pharmacy.selected
  );
  const howToUse = useSelector(
    (state: {
      howToUse: {
        list: [
          {
            description: string;
            id: string;
          }
        ];
      };
    }) => state.howToUse.list
  );
  const loadingEdit = useSelector(
    (state: {
      pharmacy: {
        editLoading: boolean;
      };
    }) => state.pharmacy.editLoading
  );
  const loadingDelete = useSelector(
    (state: {
      pharmacy: {
        deleteLoading: boolean;
      };
    }) => state.pharmacy.deleteLoading
  );
  const [form, setForm] = useState({
    medicineName: pharmacy.item.medicineName,
    amount: pharmacy.item.amount,
    adverseReactions: pharmacy.item.adverseReactions,
    howToUse: pharmacy.item.howToUse,
    howToUseId: pharmacy.item.howToUseId,
    instructionUse: pharmacy.item.instructionUse,
    instructionUseId: pharmacy.item.instructionUseId,
    validity: pharmacy.item.validity,
    userId: pharmacy.item.userId,
    id: pharmacy.item.id,
  });
  const [validity, setValidity] = useState(new Date(pharmacy.item.validity));
  const [error, setError] = useState(false);
  const [modal, setModal] = useState({
    save: false,
    delete: false,
  });

  const handleEdit = async (): Promise<void> => {
    setError(false);
    if (
      form.medicineName === "" ||
      form.amount === "" ||
      form.howToUse === null ||
      form.howToUseId === null ||
      form.instructionUse === null ||
      form.instructionUseId === null ||
      form.adverseReactions === ""
    ) {
      setError(true);
    } else {
      dispatch(PharmacyActions.setEditLoading(true));
      const newForm = {
        ...form,
        validity: moment.utc(validity).toISOString(),
      };
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const response = await putPharmacy(
        pharmacy.item.id,
        JSON.stringify(newForm)
      );
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const responseList = await getPharmacyByUserId(pharmacy.item.userId).then(
        (data) => {
          dispatch(PharmacyActions.setList(data));
          return data;
        }
      );
      dispatch(PharmacyActions.setEditLoading(false));
      navigation.goBack();
    }
  };

  const handleDelete = async (): Promise<void> => {
    dispatch(PharmacyActions.setDeleteLoading(true));
    const response = await deletePharmacy(pharmacy.item.id);
    const responseList = await getPharmacyByUserId(pharmacy.item.userId).then(
      (data) => {
        dispatch(PharmacyActions.setList(data));
        return data;
      }
    );
    dispatch(PharmacyActions.setDeleteLoading(false));
    navigation.goBack();
  };

  const getHowToUseArray = (): {
    label: string;
    value: { description: string; id: string };
  }[] => {
    const array: {
      label: string;
      value: { description: string; id: string };
    }[] = [];
    if (howToUse)
      howToUse.forEach((item) => {
        array.push({ label: item.description, value: item });
      });
    return array;
  };

  return (
    <Container
      backgroundColor="gray"
      flexDirection="column"
      justifyContent="flex-start"
      alignItems="center"
      noHeader
    >
      <Row justifyContent="center" alignItems="center">
        <ArrowContainer>
          <BackButton onPress={(): void => navigation.goBack()} />
        </ArrowContainer>
        <Title>Minha farmácia</Title>
      </Row>
      <Row>
        <Col alignItems="flex-start">
          <Input
            placeholder="Nome do remédio"
            value={form.medicineName}
            onChange={(e: string): void =>
              setForm({ ...form, medicineName: e })
            }
            error={error && form.medicineName === ""}
          />
        </Col>
      </Row>
      <Row>
        <Col alignItems="flex-start">
          <Input
            placeholder="xxx"
            label="Quantidade: "
            value={form.amount}
            onChange={(e: string): void => setForm({ ...form, amount: e })}
            noBorder
            error={error && form.amount === ""}
          />
          <DropdownList
            selected={form.howToUse ? form.howToUse : ""}
            setSelected={(e: {
              label: string;
              value: { description: string; id: string };
            }): void =>
              setForm({
                ...form,
                howToUse: e || null,
                howToUseId: e ? e.id : null,
              })
            }
            items={getHowToUseArray()}
            placeholder="Instruções de uso"
            noBold
            error={error && !form.howToUseId}
          />
        </Col>
      </Row>
      <Row
        style={{
          paddingBottom: 10,
        }}
      >
        <Col alignItems="flex-start">
          <InputArea
            label="Reações adversas: "
            placeholder="Adicionar"
            value={form.adverseReactions}
            onChange={(e: string): void =>
              setForm({ ...form, adverseReactions: e })
            }
            bold
            error={error && form.adverseReactions === ""}
          />
        </Col>
      </Row>
      <Row>
        <Col alignItems="flex-start">
          <Text>Validade do medicamento:</Text>
          <DatePicker
            value={validity}
            onChange={(e: Date): void => setValidity(e)}
            noBorder
          />
          <CreatedOn>Criado em 12 de agosto de 2020</CreatedOn>
        </Col>
      </Row>
      <Row style={{ marginTop: 40 }}>
        <Button
          color="primary"
          title="Salvar edições"
          onPress={(): void => setModal({ ...modal, save: !modal.save })}
          shadow
        />
      </Row>
      <Row style={{ marginTop: 10 }}>
        <Button
          color="transparent"
          borderColor="primary"
          title="Criar alerta"
          onPress={(): void => setModal({ ...modal, save: !modal.save })}
          shadow
          loading={loadingEdit}
        />
      </Row>
      <Row style={{ marginTop: 10, marginBottom: 60 }}>
        <Button
          color="transparent"
          title="Excluir"
          onPress={(): void => setModal({ ...modal, delete: !modal.delete })}
          loading={loadingDelete}
        />
      </Row>
      <Modal
        open={modal.save}
        toggle={(): void => setModal({ ...modal, save: !modal.save })}
      >
        <Col style={{ height: 200 }}>
          <Row size="1">
            <ModalTitle>Deseja salvar as alterações feitas?</ModalTitle>
          </Row>
          <Row size="1">
            <Button
              color="primary"
              onPress={(): Promise<void> => handleEdit()}
              title="Salvar"
              size="small"
              shadow
              loading={loadingEdit}
            />
          </Row>
          <Row size="1">
            <Button
              color="transparent"
              borderColor="primary"
              onPress={(): void => setModal({ ...modal, save: !modal.save })}
              title="Cancelar"
              size="small"
              shadow
            />
          </Row>
        </Col>
      </Modal>
      <Modal
        open={modal.delete}
        toggle={(): void => setModal({ ...modal, delete: !modal.delete })}
      >
        <Col style={{ height: 200 }}>
          <Row size="1">
            <ModalTitle>Deseja excluir medicamento?</ModalTitle>
          </Row>
          <Row size="1">
            <Button
              color="primary"
              onPress={(): Promise<void> => handleDelete()}
              title="Sim"
              size="small"
              shadow
              loading={loadingDelete}
            />
          </Row>
          <Row size="1">
            <Button
              color="transparent"
              borderColor="primary"
              onPress={(): void =>
                setModal({ ...modal, delete: !modal.delete })
              }
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

export default Receipt;
