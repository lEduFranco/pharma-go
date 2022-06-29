import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useNavigation } from "@react-navigation/native";
import moment from "moment";

import BackButton from "../../../components/BackButton";
import Button from "../../../components/Button";
import Checkbox from "../../../components/Checkbox";
import Col from "../../../components/Col";
import Container from "../../../components/Container";
import DatePicker from "../../../components/DatePicker";
import DropdownList from "../../../components/DropdownList";
import Input from "../../../components/Input";
import InputArea from "../../../components/InputArea";
import Modal from "../../../components/Modal";
import Row from "../../../components/Row";
import colors from "../../../config/colors";
import {
  getAppointmentAlertsByUserId,
  putAppointmentAlert,
  deleteAppointmentAlert,
} from "../../../services";
import { Creators as AlarmsActions } from "../../../store/ducks/alarms";
import { ArrowContainer, Title, ModalTitle } from "./styles";

const AppointmentAlarm: React.FC = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const medicalSpecialties = useSelector(
    (state: {
      medicalSpecialties: {
        list: [
          {
            description: string;
            id: string;
          }
        ];
      };
    }) => state.medicalSpecialties.list
  );
  const alarm = useSelector(
    (state: {
      alarms: {
        selectedAppointment: {
          item: {
            medicalSpecialtyId: string;
            doctorName: string;
            medicalSpecialty: {
              description: string;
              id: string;
            };
            data: string;
            hour: string;
            address: string;
            note: string;
            status: string;
            userId: string;
            id: string;
          };
          index: number;
        };
      };
    }) => state.alarms.selectedAppointment
  );
  const loadingEdit = useSelector(
    (state: {
      alarms: {
        editAppointmentLoading: boolean;
      };
    }) => state.alarms.editAppointmentLoading
  );
  const loadingDelete = useSelector(
    (state: {
      alarms: {
        deleteAppointmentLoading: boolean;
      };
    }) => state.alarms.deleteAppointmentLoading
  );
  const [form, setForm] = useState({
    medicalSpecialtyId: alarm.item.medicalSpecialtyId,
    doctorName: alarm.item.doctorName,
    medicalSpecialty: alarm.item.medicalSpecialty,
    data: alarm.item.data,
    hour: alarm.item.hour,
    address: alarm.item.address,
    note: alarm.item.note,
    userId: alarm.item.userId,
    id: alarm.item.id,
    status: alarm.item.status,
    finalized: alarm.item.status !== "em aberto",
    finalizedReason: {
      optionOne: false,
      optionTwo: false,
      optionThree: false,
    },
  });
  const [modal, setModal] = useState({
    finish: false,
    save: false,
    delete: false,
  });
  const [date, setDate] = useState(new Date(alarm.item.data));
  const [error, setError] = useState(false);

  const handleEdit = async (): Promise<void> => {
    dispatch(AlarmsActions.setEditAppointmentLoading(true));
    const newForm = {
      ...form,
      hour: moment.utc(date).toISOString(),
      data: moment.utc(date).toISOString(),
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const response = await putAppointmentAlert(
      alarm.item.id,
      JSON.stringify(newForm)
    );
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const responseList = await getAppointmentAlertsByUserId(
      alarm.item.userId
    ).then((data) => {
      dispatch(AlarmsActions.setAppointmentsList(data));
      return data;
    });
    dispatch(AlarmsActions.setEditAppointmentLoading(false));
    setModal({ ...modal, save: !modal.save });
    navigation.goBack();
  };

  const handleDelete = async (): Promise<void> => {
    dispatch(AlarmsActions.setDeleteAppointmentLoading(true));
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const response = await deleteAppointmentAlert(alarm.item.id);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const responseList = await getAppointmentAlertsByUserId(
      alarm.item.userId
    ).then((data) => {
      dispatch(AlarmsActions.setAppointmentsList(data));
      return data;
    });
    dispatch(AlarmsActions.setDeleteAppointmentLoading(false));
    setModal({ ...modal, delete: !modal.delete });
    navigation.goBack();
  };

  const handleValidation = (): void => {
    setError(false);
    if (
      form.doctorName === "" ||
      form.medicalSpecialty.description === "" ||
      form.data === "" ||
      form.hour === "" ||
      form.address === ""
    ) {
      setError(true);
    } else {
      setModal({ ...modal, save: !modal.save });
    }
  };

  const getMedicalSpecialtiesArray = (): {
    label: string;
    value: { description: string; id: string };
  }[] => {
    const array: {
      label: string;
      value: { description: string; id: string };
    }[] = [];
    if (medicalSpecialties)
      medicalSpecialties.forEach((item) => {
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
        <Title>Alertas</Title>
      </Row>
      <Row
        style={{
          borderBottomWidth: 1,
          borderBottomColor: colors.lightGray,
        }}
      >
        <Col alignItems="flex-start">
          <Input
            placeholder="Nome do médico"
            value={form.doctorName}
            onChange={(e: string): void => setForm({ ...form, doctorName: e })}
            bold
            noBorder
            error={error && form.doctorName === ""}
          />
        </Col>
      </Row>
      <Row
        style={{
          borderBottomWidth: 1,
          borderBottomColor: colors.lightGray,
        }}
      >
        <DropdownList
          selected={form.medicalSpecialty}
          setSelected={(e: {
            label: string;
            value: { description: string; id: string };
          }): void => {
            e
              ? setForm({
                  ...form,
                  medicalSpecialty: e,
                  medicalSpecialtyId: e.id,
                })
              : setForm({
                  ...form,
                });
          }}
          items={getMedicalSpecialtiesArray()}
          placeholder="Especialidade"
          noBorder
          noBold
          error={error && form.medicalSpecialtyId === ""}
        />
      </Row>
      <Row
        style={{
          borderBottomWidth: 1,
          borderBottomColor: colors.lightGray,
        }}
      >
        <DatePicker
          label="Data: "
          value={date}
          onChange={(e: Date): void => setDate(e)}
          noBorder
        />
      </Row>
      <Row
        style={{
          borderBottomWidth: 1,
          borderBottomColor: colors.lightGray,
        }}
      >
        <InputArea
          label="Endereço: "
          placeholder="xxxxxxxx"
          value={form.address}
          onChange={(e: string): void => setForm({ ...form, address: e })}
          bold
          noBorder
        />
      </Row>
      <Row
        style={{
          borderBottomWidth: 1,
          borderBottomColor: colors.lightGray,
        }}
      >
        <InputArea
          label="Observação: "
          placeholder="xxxxxxxx"
          value={form.note}
          onChange={(e: string): void => setForm({ ...form, note: e })}
          bold
          noBorder
        />
      </Row>
      <Row
        style={{
          borderBottomWidth: 1,
          borderBottomColor: colors.lightGray,
        }}
      >
        <Input
          label="Status: "
          placeholder="xxxxx"
          value={form.status}
          onChange={(e: string): void => setForm({ ...form, status: e })}
          bold
          noBorder
          disabled
        />
      </Row>
      <Row justifyContent="flex-start">
        <Checkbox
          title="Finalizar consulta"
          checked={form.finalized}
          labelColor="white"
          fillingColor="primary"
          style={{ marginRight: 30 }}
          setChecked={(): void => {
            form.finalized
              ? setForm({
                  ...form,
                  status: "em aberto",
                  finalized: false,
                  finalizedReason: {
                    optionOne: false,
                    optionTwo: false,
                    optionThree: false,
                  },
                })
              : setModal({ ...modal, finish: !modal.finish });
          }}
        />
      </Row>
      <Row style={{ marginTop: 40 }}>
        <Button
          color="primary"
          title="Salvar edições"
          onPress={(): void => handleValidation()}
          shadow
          loading={loadingEdit}
        />
      </Row>
      <Row style={{ marginTop: 10, marginBottom: 60 }}>
        <Button
          color="transparent"
          borderColor="primary"
          title="Excluir"
          onPress={(): void => setModal({ ...modal, delete: !modal.delete })}
          shadow
          loading={loadingDelete}
        />
      </Row>
      <Modal
        open={modal.finish}
        toggle={(): void => setModal({ ...modal, finish: !modal.finish })}
      >
        <Col style={{ height: 350 }}>
          <Row size="1">
            <ModalTitle>Por que deseja finalizar o tratamento?</ModalTitle>
          </Row>
          <Col style={{ alignItems: "flex-start", marginBottom: 20 }}>
            <Row justifyContent="flex-start">
              <Checkbox
                title="O tempo de tratamento se encerrou"
                checked={form.finalizedReason.optionOne}
                labelColor="white"
                fillingColor="primary"
                setChecked={(): void =>
                  setForm({
                    ...form,
                    status: "encerrado",
                    finalizedReason: {
                      optionOne: true,
                      optionTwo: false,
                      optionThree: false,
                    },
                  })
                }
              />
            </Row>
            <Row justifyContent="flex-start">
              <Checkbox
                title="Não quero mais tomar esse medicamento"
                checked={form.finalizedReason.optionTwo}
                labelColor="white"
                fillingColor="primary"
                setChecked={(): void =>
                  setForm({
                    ...form,
                    status: "cancelado",
                    finalizedReason: {
                      optionOne: false,
                      optionTwo: true,
                      optionThree: false,
                    },
                  })
                }
              />
            </Row>
            <Row justifyContent="flex-start">
              <Checkbox
                title="O médico alterou meu tratamento"
                checked={form.finalizedReason.optionThree}
                labelColor="white"
                fillingColor="primary"
                setChecked={(): void =>
                  setForm({
                    ...form,
                    status: "alterado",
                    finalizedReason: {
                      optionOne: false,
                      optionTwo: false,
                      optionThree: true,
                    },
                  })
                }
              />
            </Row>
          </Col>
          <Row size="1">
            <Button
              color="primary"
              onPress={(): void => {
                setForm({ ...form, finalized: true });
                setModal({ ...modal, finish: !modal.finish });
              }}
              title="Salvar"
              size="small"
              disabled={
                !form.finalizedReason.optionOne &&
                !form.finalizedReason.optionTwo &&
                !form.finalizedReason.optionThree
              }
              shadow
            />
          </Row>
          <Row size="1">
            <Button
              color="transparent"
              borderColor="primary"
              onPress={(): void => {
                setForm({
                  ...form,
                  finalizedReason: {
                    optionOne: false,
                    optionTwo: false,
                    optionThree: false,
                  },
                });
                setModal({ ...modal, finish: !modal.finish });
              }}
              title="Cancelar"
              size="small"
              shadow
            />
          </Row>
        </Col>
      </Modal>
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
            <ModalTitle>Deseja excluir alerta?</ModalTitle>
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

export default AppointmentAlarm;
