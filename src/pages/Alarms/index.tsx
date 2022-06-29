import React, { useState } from "react";
import { ActivityIndicator } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { useNavigation } from "@react-navigation/native";
import moment from "moment";

import BtnArrowRight from "../../assets/images/btn-arrow-right.png";
import BackButton from "../../components/BackButton";
import Button from "../../components/Button";
import Col from "../../components/Col";
import Container from "../../components/Container";
import Row from "../../components/Row";
import colors from "../../config/colors";
import { Creators as AlarmsActions } from "../../store/ducks/alarms";
import {
  ArrowContainer,
  Arrow,
  Title,
  ButtonsContainer,
  ClinicalDataButton,
  PersonalDataButton,
  ClinicalDataButtonText,
  PersonalDataButtonText,
  DataForm,
  RowTitle,
  RowText,
} from "./styles";

const Alarms: React.FC = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const appointments = useSelector(
    (state: {
      alarms: {
        appointmentsList: [
          {
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
          }
        ];
      };
    }) => state.alarms.appointmentsList
  );
  const exams = useSelector(
    (state: {
      alarms: {
        examsList: [
          {
            nameExam: string;
            examTypeId: string;
            examType: {
              description: string;
              id: string;
            };
            data: string;
            hour: string;
            address: string;
            note: string;
            preparation: string;
            status: string;
            userId: string;
            id: string;
          }
        ];
      };
    }) => state.alarms.examsList
  );
  const medicines = useSelector(
    (state: {
      alarms: {
        medicinesList: [
          {
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
          }
        ];
      };
    }) => state.alarms.medicinesList
  );
  const [selected, setSelected] = useState({
    medicines: true,
    appointments: false,
    exams: false,
  });

  const getFormattedDateTime = (itemData: string): string => {
    const date = moment.utc(itemData).local().format("DD/MM/YYYY, HH:mm");
    return `${date}`;
  };
  const getFormattedTime = (itemData: string): string => {
    const date = moment.utc(itemData).local().format("HH:mm");
    const passedTime = moment.utc(itemData).local().startOf("day").fromNow();
    return `${date}, ${passedTime} atrás`;
  };
  const getFormattedFrequency = (
    frequency: number,
    frequencyDayHour: string
  ): string => {
    return `${frequency} em ${frequency} ${frequencyDayHour}s`;
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
      <ButtonsContainer>
        <ClinicalDataButton
          selected={selected.medicines}
          onPress={(): void =>
            setSelected({ medicines: true, appointments: false, exams: false })
          }
        >
          <ClinicalDataButtonText selected={selected.medicines}>
            Medicamentos
          </ClinicalDataButtonText>
        </ClinicalDataButton>
        <PersonalDataButton
          selected={selected.appointments}
          onPress={(): void =>
            setSelected({ medicines: false, appointments: true, exams: false })
          }
        >
          <PersonalDataButtonText selected={selected.appointments}>
            Consultas
          </PersonalDataButtonText>
        </PersonalDataButton>
        <PersonalDataButton
          selected={selected.exams}
          onPress={(): void =>
            setSelected({ medicines: false, appointments: false, exams: true })
          }
        >
          <PersonalDataButtonText selected={selected.exams}>
            Exames
          </PersonalDataButtonText>
        </PersonalDataButton>
      </ButtonsContainer>
      {selected.medicines && (
        <DataForm>
          {medicines ? (
            medicines.length > 0 ? (
              medicines
                .sort((a, b) => new Date(b.data) - new Date(a.data))
                .map((item, index) => {
                  return (
                    <Row
                      style={{
                        borderBottomWidth: 2,
                        borderBottomColor: colors.lightGray,
                        paddingBottom: 10,
                      }}
                    >
                      <Col size="9" alignItems="flex-start">
                        <RowTitle>{item.medicineName}</RowTitle>
                        <RowText>
                          Inicio: {getFormattedTime(item.startData)}
                        </RowText>
                        <RowText>
                          Frequência:{" "}
                          {getFormattedFrequency(
                            item.frequency,
                            item.frequencyDayHour
                          )}
                        </RowText>
                        <RowText>
                          Status:{" "}
                          <RowText color={colors.blue02}>{item.status}</RowText>
                        </RowText>
                      </Col>
                      <Col size="1">
                        <ArrowContainer
                          onPress={(): void => {
                            dispatch(
                              AlarmsActions.setSelectedMedicine({
                                item,
                                index,
                              })
                            );
                            navigation.navigate("MedicineAlarm");
                          }}
                        >
                          <Arrow source={BtnArrowRight} />
                        </ArrowContainer>
                      </Col>
                    </Row>
                  );
                })
            ) : (
              <RowText style={{ marginTop: 30 }}>
                Você ainda não adicionou alertas de medicamentos
              </RowText>
            )
          ) : (
            <ActivityIndicator
              color={colors.blue01}
              animating={medicines === null}
              style={{ height: 100, width: "100%", display: "flex" }}
            />
          )}
          <Row>
            <Button
              color="primary"
              title="Adicionar novo"
              size="small"
              style={{ marginTop: 30, marginBottom: 30 }}
              onPress={(): void => navigation.navigate("NewMedicineAlarm")}
              shadow
            />
          </Row>
        </DataForm>
      )}
      {selected.appointments && (
        <DataForm>
          {appointments ? (
            appointments.length > 0 ? (
              appointments
                .sort((a, b) => new Date(b.data) - new Date(a.data))
                .map((item, index) => {
                  return (
                    <Row
                      style={{
                        borderBottomWidth: 2,
                        borderBottomColor: colors.lightGray,
                        paddingBottom: 10,
                      }}
                    >
                      <Col size="9" alignItems="flex-start">
                        <RowTitle>{item.doctorName}</RowTitle>
                        <RowText>
                          Data e horário: {getFormattedDateTime(item.data)}
                        </RowText>
                        <RowText>
                          Especialidade: {item.medicalSpecialty.description}
                        </RowText>
                        <RowText>
                          Status:{" "}
                          <RowText color={colors.blue01}>{item.status}</RowText>
                        </RowText>
                      </Col>
                      <Col size="1">
                        <ArrowContainer
                          onPress={(): void => {
                            dispatch(
                              AlarmsActions.setSelectedAppointment({
                                item,
                                index,
                              })
                            );
                            navigation.navigate("AppointmentAlarm");
                          }}
                        >
                          <Arrow source={BtnArrowRight} />
                        </ArrowContainer>
                      </Col>
                    </Row>
                  );
                })
            ) : (
              <RowText style={{ marginTop: 30 }}>
                Você ainda não adicionou alertas de consultas
              </RowText>
            )
          ) : (
            <ActivityIndicator
              color={colors.blue01}
              animating={appointments === null}
              style={{ height: 100, width: "100%", display: "flex" }}
            />
          )}
          <Row>
            <Button
              color="primary"
              title="Adicionar novo"
              size="small"
              style={{ marginTop: 30, marginBottom: 30 }}
              onPress={(): void => navigation.navigate("NewAppointmentAlarm")}
              shadow
            />
          </Row>
        </DataForm>
      )}
      {selected.exams && (
        <DataForm>
          {exams ? (
            exams.length > 0 ? (
              exams
                .sort((a, b) => new Date(b.data) - new Date(a.data))
                .map((item, index) => {
                  return (
                    <Row
                      style={{
                        borderBottomWidth: 2,
                        borderBottomColor: colors.lightGray,
                        paddingBottom: 10,
                      }}
                    >
                      <Col size="9" alignItems="flex-start">
                        <RowTitle>{item.nameExam}</RowTitle>
                        <RowText>
                          Data e horário: {getFormattedDateTime(item.data)}
                        </RowText>
                        <RowText>
                          Tipo de exame: {item.examType.description}
                        </RowText>
                        <RowText>
                          Status:{" "}
                          <RowText color={colors.blue01}>{item.status}</RowText>
                        </RowText>
                      </Col>
                      <Col size="1">
                        <ArrowContainer
                          onPress={(): void => {
                            dispatch(
                              AlarmsActions.setSelectedExam({
                                item,
                                index,
                              })
                            );
                            navigation.navigate("ExamAlarm");
                          }}
                        >
                          <Arrow source={BtnArrowRight} />
                        </ArrowContainer>
                      </Col>
                    </Row>
                  );
                })
            ) : (
              <RowText style={{ marginTop: 30 }}>
                Você ainda não adicionou alertas de exames
              </RowText>
            )
          ) : (
            <ActivityIndicator
              color={colors.blue01}
              animating={exams === null}
              style={{ height: 100, width: "100%", display: "flex" }}
            />
          )}
          <Row>
            <Button
              color="primary"
              title="Adicionar novo"
              size="small"
              style={{ marginTop: 30, marginBottom: 30 }}
              onPress={(): void => navigation.navigate("NewExamAlarm")}
              shadow
            />
          </Row>
        </DataForm>
      )}
    </Container>
  );
};

export default Alarms;
