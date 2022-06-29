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
import Modal from "../../../components/Modal";
import Row from "../../../components/Row";
import colors from "../../../config/colors";
import {
  getMedicineAlertsByUserId,
  putMedicineAlert,
  deleteMedicineAlert,
} from "../../../services";
import { Creators as AlarmsActions } from "../../../store/ducks/alarms";
import { ArrowContainer, Title, ModalTitle, FrequencyLabel } from "./styles";

const MedicineAlarm: React.FC = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const instructionUses = useSelector(
    (state: {
      instructionUses: {
        list: [
          {
            description: string;
            id: string;
          }
        ];
      };
    }) => state.instructionUses.list
  );
  const alarm = useSelector(
    (state: {
      alarms: {
        selectedMedicine: {
          item: {
            medicineName: string;
            hour: string;
            frequencyDayHour: string;
            frequency: number;
            startData: string;
            endData: string;
            instructionUse: {
              description: string;
              id: string;
            };
            instructionUseId: string;
            status: string;
            userId: string;
            id: string;
          };
          index: number;
        };
      };
    }) => state.alarms.selectedMedicine
  );
  const loadingEdit = useSelector(
    (state: {
      alarms: {
        editMedicineLoading: boolean;
      };
    }) => state.alarms.editMedicineLoading
  );
  const loadingDelete = useSelector(
    (state: {
      alarms: {
        deleteMedicineLoading: boolean;
      };
    }) => state.alarms.deleteMedicineLoading
  );
  const [form, setForm] = useState({
    medicineName: alarm.item.medicineName,
    hour: alarm.item.hour,
    frequencyDayHour: alarm.item.frequencyDayHour,
    frequency: alarm.item.frequency,
    startData: alarm.item.startData,
    endData: alarm.item.endData,
    instructionUse: alarm.item.instructionUse,
    instructionUseId: alarm.item.instructionUseId,
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
  const [startDate, setStartDate] = useState(new Date(alarm.item.startData));
  const [endDate, setEndDate] = useState(new Date(alarm.item.endData));
  const [error, setError] = useState(false);

  const handleEdit = async (): Promise<void> => {
    dispatch(AlarmsActions.setEditMedicineLoading(true));
    const newForm = {
      ...form,
      hour: moment.utc(startDate).toISOString(),
      startData: moment.utc(startDate).toISOString(),
      endData: moment.utc(endDate).toISOString(),
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const response = await putMedicineAlert(
      alarm.item.id,
      JSON.stringify(newForm)
    );
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const responseList = await getMedicineAlertsByUserId(
      alarm.item.userId
    ).then((data) => {
      dispatch(AlarmsActions.setMedicinesList(data));
      return data;
    });
    dispatch(AlarmsActions.setEditMedicineLoading(false));
    setModal({ ...modal, save: !modal.save });
    navigation.goBack();
  };

  const handleDelete = async (): Promise<void> => {
    dispatch(AlarmsActions.setDeleteMedicineLoading(true));
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const response = await deleteMedicineAlert(alarm.item.id);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const responseList = await getMedicineAlertsByUserId(
      alarm.item.userId
    ).then((data) => {
      dispatch(AlarmsActions.setMedicinesList(data));
      return data;
    });
    dispatch(AlarmsActions.setDeleteMedicineLoading(false));
    setModal({ ...modal, delete: !modal.delete });
    navigation.goBack();
  };

  const handleValidation = (): void => {
    setError(false);
    if (
      form.medicineName === "" ||
      form.instructionUseId === "" ||
      form.frequency === null ||
      form.frequencyDayHour === null ||
      form.instructionUseId === null
    ) {
      setError(true);
    } else {
      setModal({ ...modal, save: !modal.save });
    }
  };

  const getInstructionUsesArray = (): {
    label: string;
    value: { description: string; id: string };
  }[] => {
    const array: {
      label: string;
      value: { description: string; id: string };
    }[] = [];
    if (instructionUses)
      instructionUses.forEach((item) => {
        array.push({ label: item.description, value: item });
      });
    return array;
  };

  const getFrequencyArray = (): {
    label: string;
    value: string;
  }[] => {
    const array: {
      label: string;
      value: string;
    }[] = [];
    for (let i = 1; i < 25; i += 1) {
      array.push({ label: i.toString(), value: i.toString() });
    }
    return array;
  };

  const getFrequencyDayHourArray = (): {
    label: string;
    value: string;
  }[] => {
    const array: {
      label: string;
      value: string;
    }[] = [];
    array.push({ label: "horas", value: "hora" });
    array.push({ label: "dias", value: "dia" });
    // array.push({ label: "semanas", value: "semana" });
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
            placeholder="Nome do medicamento"
            value={form.medicineName}
            onChange={(e: string): void =>
              setForm({ ...form, medicineName: e })
            }
            bold
            noBorder
            error={error && form.medicineName === ""}
          />
        </Col>
      </Row>
      <Row
        style={{
          borderBottomWidth: 1,
          borderBottomColor: colors.lightGray,
        }}
      >
        <DatePicker
          label="Início: "
          value={startDate}
          onChange={(e: Date): void => setStartDate(e)}
          noBorder
        />
      </Row>
      <Row
        style={{
          borderBottomWidth: 1,
          borderBottomColor: colors.lightGray,
        }}
      >
        <FrequencyLabel>Frequência: </FrequencyLabel>
        <FrequencyLabel>de</FrequencyLabel>
        <DropdownList
          selected={form.frequency ? form.frequency.toString() : ""}
          setSelected={(e: number): void => {
            setForm({
              ...form,
              frequency: e,
            });
          }}
          items={getFrequencyArray()}
          placeholder="X"
          noBorder
          singleLine
          error={error && !form.frequency}
        />
        <FrequencyLabel>em</FrequencyLabel>
        <DropdownList
          selected={form.frequency ? form.frequency.toString() : ""}
          setSelected={(e: number): void => {
            setForm({
              ...form,
              frequency: e,
            });
          }}
          items={getFrequencyArray()}
          placeholder="X"
          noBorder
          singleLine
          error={error && !form.frequency}
        />
        <DropdownList
          selected={
            form.frequencyDayHour === "hour" || form.frequencyDayHour === "hora"
              ? "hora"
              : form.frequencyDayHour === "day" ||
                form.frequencyDayHour === "dia"
              ? "dia"
              : ""
          }
          setSelected={(e: string): void => {
            setForm({
              ...form,
              frequencyDayHour: e,
            });
          }}
          items={getFrequencyDayHourArray()}
          placeholder="xxx"
          noBorder
          singleLine
          error={error && !form.frequencyDayHour}
        />
      </Row>
      <Row
        style={{
          borderBottomWidth: 1,
          borderBottomColor: colors.lightGray,
        }}
      >
        <DatePicker
          label="Término: "
          value={endDate}
          onChange={(e: Date): void => setEndDate(e)}
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
      <Row
        style={{
          borderBottomWidth: 1,
          borderBottomColor: colors.lightGray,
        }}
      >
        <DropdownList
          selected={form.instructionUse ? form.instructionUse : ""}
          setSelected={(e: {
            label: string;
            value: { description: string; id: string };
          }): void =>
            setForm({
              ...form,
              instructionUse: e || null,
              instructionUseId: e ? e.id : null,
            })
          }
          items={getInstructionUsesArray()}
          placeholder="Instruções de uso"
          noBorder
          noBold
          error={error && !form.instructionUseId}
        />
      </Row>
      <Row justifyContent="flex-start">
        <Checkbox
          title="Finalizar tratamento"
          checked={form.finalized}
          color="white"
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
                  finalized: false,
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

export default MedicineAlarm;
