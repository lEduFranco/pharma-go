import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useNavigation } from "@react-navigation/native";
import moment from "moment";

import BackButton from "../../../components/BackButton";
import Button from "../../../components/Button";
import Container from "../../../components/Container";
import DatePicker from "../../../components/DatePicker";
import DropdownList from "../../../components/DropdownList";
import Input from "../../../components/Input";
import InputArea from "../../../components/InputArea";
import Row from "../../../components/Row";
import {
  getAppointmentAlertsByUserId,
  postAppointmentAlert,
} from "../../../services";
import { Creators as AlarmsActions } from "../../../store/ducks/alarms";
import { ArrowContainer, Title, DataForm } from "./styles";

const NewAppointmentAlarm: React.FC = () => {
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
      alarms: {
        newAppointmentLoading: boolean;
      };
    }) => state.alarms.newAppointmentLoading
  );
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
  const [form, setForm] = useState({
    medicalSpecialtyId: "",
    doctorName: "",
    medicalSpecialty: {
      description: "",
      id: "",
    },
    data: "",
    hour: "",
    address: "",
    note: "",
    status: "em aberto",
    userId,
  });
  const [date, setDate] = useState(new Date());
  const [error, setError] = useState(false);

  const handleNew = async (): Promise<void> => {
    setError(false);
    if (
      form.doctorName === "" ||
      form.medicalSpecialty.description === "" ||
      form.address === ""
    ) {
      setError(true);
    } else {
      dispatch(AlarmsActions.setNewAppointmentLoading(true));
      const newForm = {
        ...form,
        hour: moment.utc(date).toISOString(),
        data: moment.utc(date).toISOString(),
      };
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const response = await postAppointmentAlert(JSON.stringify(newForm));
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const responseList = await getAppointmentAlertsByUserId(userId).then(
        (data) => {
          dispatch(AlarmsActions.setAppointmentsList(data));
          return data;
        }
      );
      dispatch(AlarmsActions.setNewAppointmentLoading(false));
      navigation.goBack();
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
        <Title>Adicionar alerta de consulta</Title>
      </Row>
      <DataForm>
        <Row>
          <Input
            placeholder="Nome do médico"
            value={form.doctorName}
            onChange={(e: string): void => setForm({ ...form, doctorName: e })}
            noBold
            error={error && form.doctorName === ""}
          />
        </Row>
        <Row>
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
            noBold
            error={error && form.medicalSpecialtyId === ""}
          />
        </Row>
        <Row>
          <DatePicker
            label="Data: "
            value={date}
            onChange={(e: Date): void => setDate(e)}
            noBold
          />
        </Row>
        <Row>
          <InputArea
            placeholder="Endereço"
            value={form.address}
            onChange={(e: string): void => setForm({ ...form, address: e })}
            noBold
            placeholderTextColor="gray"
            error={error && form.address === ""}
          />
        </Row>
        <Row>
          <InputArea
            placeholder="Observação"
            value={form.note}
            onChange={(e: string): void => setForm({ ...form, note: e })}
            noBold
            placeholderTextColor="gray"
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

export default NewAppointmentAlarm;
