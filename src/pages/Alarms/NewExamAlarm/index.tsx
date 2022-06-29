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
import { getExamAlertsByUserId, postExamAlert } from "../../../services";
import { Creators as AlarmsActions } from "../../../store/ducks/alarms";
import { ArrowContainer, Title, DataForm } from "./styles";

const NewExamAlarm: React.FC = () => {
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
        newExamLoading: boolean;
      };
    }) => state.alarms.newExamLoading
  );
  const examTypes = useSelector(
    (state: {
      examTypes: {
        list: [
          {
            description: string;
            id: string;
          }
        ];
      };
    }) => state.examTypes.list
  );
  const [form, setForm] = useState({
    nameExam: "",
    examTypeId: "",
    examType: {
      description: "",
      id: "",
    },
    type: "",
    data: "",
    hour: "",
    address: "",
    note: "",
    preparation: "",
    status: "em aberto",
    userId,
  });
  const [date, setDate] = useState(new Date());
  const [error, setError] = useState(false);

  const handleNew = async (): Promise<void> => {
    setError(false);
    if (
      form.nameExam === "" ||
      form.examType === null ||
      form.examTypeId === null ||
      form.address === "" ||
      form.preparation === ""
    ) {
      setError(true);
    } else {
      dispatch(AlarmsActions.setNewExamLoading(true));
      const newForm = {
        ...form,
        hour: moment.utc(date).toISOString(),
        data: moment.utc(date).toISOString(),
      };
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const response = await postExamAlert(JSON.stringify(newForm));
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const responseList = await getExamAlertsByUserId(userId).then((data) => {
        dispatch(AlarmsActions.setExamsList(data));
        return data;
      });
      dispatch(AlarmsActions.setNewExamLoading(false));
      navigation.goBack();
    }
  };

  const getExamTypesArray = (): {
    label: string;
    value: { description: string; id: string };
  }[] => {
    const array: {
      label: string;
      value: { description: string; id: string };
    }[] = [];
    if (examTypes)
      examTypes.forEach((item) => {
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
        <Title>Adicionar alerta de exame</Title>
      </Row>
      <DataForm>
        <Row>
          <Input
            placeholder="Nome do exame"
            value={form.nameExam}
            onChange={(e: string): void => setForm({ ...form, nameExam: e })}
            noBold
            error={error && form.nameExam === ""}
          />
        </Row>
        <Row>
          <DropdownList
            selected={form.examType ? form.examType : ""}
            setSelected={(e: {
              label: string;
              value: { description: string; id: string };
            }): void =>
              setForm({
                ...form,
                examType: e || null,
                examTypeId: e ? e.id : null,
              })
            }
            items={getExamTypesArray()}
            placeholder="Tipo de exame"
            noBold
            error={error && !form.examTypeId}
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
            placeholder="Preparação"
            value={form.preparation}
            onChange={(e: string): void => setForm({ ...form, preparation: e })}
            noBold
            placeholderTextColor="gray"
            error={error && form.preparation === ""}
          />
        </Row>
        <Row>
          <InputArea
            placeholder="Observação"
            value={form.notes}
            onChange={(e: string): void => setForm({ ...form, notes: e })}
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

export default NewExamAlarm;
