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
import Row from "../../../components/Row";
import {
  getMedicineAlertsByUserId,
  postMedicineAlert,
} from "../../../services";
import { Creators as AlarmsActions } from "../../../store/ducks/alarms";
import {
  ArrowContainer,
  Title,
  DataForm,
  CheckboxLabelWrapper,
  FrequencyTitle,
  FrequencyLabel,
} from "./styles";

const NewMedicineAlarm: React.FC = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const userId = useSelector(
    (state: {
      user: {
        id: string;
      };
    }) => state.user.id
  );
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
  const loading = useSelector(
    (state: {
      alarms: {
        newMedicineLoading: boolean;
      };
    }) => state.alarms.newMedicineLoading
  );
  const [form, setForm] = useState({
    medicineName: "",
    hour: "",
    frequencyDayHour: "",
    frequency: 0,
    startData: "",
    endData: "",
    instructionUse: {
      description: "",
      id: "",
    },
    instructionUseId: "",
    status: "em aberto",
    userId,
  });
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [frequency, setFrequency] = useState({
    hours: true,
    days: false,
    time: "",
  });
  const [error, setError] = useState(false);

  const handleNew = async (): Promise<void> => {
    setError(false);
    if (
      form.medicineName === "" ||
      frequency.time === "" ||
      form.instructionUseId === ""
    ) {
      setError(true);
    } else {
      dispatch(AlarmsActions.setNewMedicineLoading(true));
      const newForm = {
        ...form,
        hour: moment.utc(startDate).toISOString(),
        startData: moment.utc(startDate).toISOString(),
        endData: moment.utc(endDate).toISOString(),
        frequencyDayHour: frequency.hours ? "hour" : "day",
        frequency: parseInt(frequency.time, 10),
      };
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const response = await postMedicineAlert(JSON.stringify(newForm));
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const responseList = await getMedicineAlertsByUserId(userId).then(
        (data) => {
          dispatch(AlarmsActions.setMedicinesList(data));
          return data;
        }
      );
      dispatch(AlarmsActions.setNewMedicineLoading(false));
      navigation.goBack();
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
        <Title>Adicionar alerta de medicamento</Title>
      </Row>
      <DataForm>
        <Row>
          <Input
            placeholder="Nome do medicamento"
            value={form.medicineName}
            onChange={(e: string): void =>
              setForm({ ...form, medicineName: e })
            }
            noBold
            error={error && form.medicineName === ""}
          />
        </Row>
        <Row>
          <DatePicker
            label="Início: "
            value={startDate}
            onChange={(e: Date): void => setStartDate(e)}
            noBold
          />
        </Row>
        <Row>
          <Col>
            <CheckboxLabelWrapper>
              <FrequencyTitle>Frequência:</FrequencyTitle>
            </CheckboxLabelWrapper>
            <Row style={{ justifyContent: "flex-start", marginTop: 5 }}>
              <FrequencyLabel>De</FrequencyLabel>
              <Input
                value={frequency.time}
                onChange={(e: string): void =>
                  setFrequency({
                    ...frequency,
                    time: e,
                  })
                }
                noBold
                fullBordered
                containerStyle={{ width: 60, marginRight: 15 }}
                error={error && frequency.time === ""}
              />
              <FrequencyLabel>em</FrequencyLabel>
              <Input
                value={frequency.time}
                onChange={(e: string): void =>
                  setFrequency({
                    ...frequency,
                    time: e,
                  })
                }
                noBold
                fullBordered
                containerStyle={{ width: 60 }}
                error={error && frequency.time === ""}
                disabled
              />
            </Row>
            <Row style={{ justifyContent: "flex-start", marginTop: 5 }}>
              <Checkbox
                title="Horas"
                checked={frequency.hours}
                labelColor="white"
                fillingColor="primary"
                style={{ marginRight: 30 }}
                setChecked={(): void =>
                  setFrequency({
                    ...frequency,
                    hours: true,
                    days: false,
                  })
                }
              />
              <Checkbox
                title="Dias"
                checked={frequency.days}
                labelColor="white"
                fillingColor="primary"
                setChecked={(): void =>
                  setFrequency({ ...frequency, hours: false, days: true })
                }
              />
            </Row>
          </Col>
        </Row>
        <Row>
          <DatePicker
            label="Término: "
            value={endDate}
            onChange={(e: Date): void => setEndDate(e)}
            noBold
          />
        </Row>
        <Row>
          <DropdownList
            selected={form.instructionUse}
            setSelected={(e: {
              label: string;
              value: { description: string; id: string };
            }): void => {
              e
                ? setForm({
                    ...form,
                    instructionUse: e,
                    instructionUseId: e.id,
                  })
                : setForm({
                    ...form,
                  });
            }}
            items={getInstructionUsesArray()}
            placeholder="Instruções de uso"
            noBold
            error={error && form.instructionUseId === ""}
          />
        </Row>
        <Row>
          <Button
            style={{ marginTop: 60 }}
            color="primary"
            title="Adicionar"
            size="small"
            onPress={(): Promise<void> => handleNew()}
            loading={loading}
          />
        </Row>
      </DataForm>
    </Container>
  );
};

export default NewMedicineAlarm;
