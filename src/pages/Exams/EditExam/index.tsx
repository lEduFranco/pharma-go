import React, { useState } from "react";
import { Platform } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { useNavigation } from "@react-navigation/native";

import checkImage from "../../../assets/images/foursquare-check-in.png";
import BackButton from "../../../components/BackButton";
import Button from "../../../components/Button";
import Col from "../../../components/Col";
import Container from "../../../components/Container";
import Modal from "../../../components/Modal";
import Row from "../../../components/Row";
import colors from "../../../config/colors";
import { getExamsByUserId, deleteExam } from "../../../services";
import { Creators as ExamsActions } from "../../../store/ducks/exams";
import {
  ArrowContainer,
  Title,
  DataForm,
  ModalTitle,
  ExamTitle,
  ExamDate,
  AddedFileWrapper,
  AddedFileContent,
  AddedFileText,
  AddedFileContainer,
  Icon,
  Message,
} from "./styles";

const EditExam: React.FC = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const userId = useSelector(
    (state: {
      user: {
        id: string;
      };
    }) => state.user.id
  );
  const exam = useSelector(
    (state: {
      exams: {
        selected: {
          item: {
            examName: string;
            pathImg: string;
            userId: string;
            id: string;
          };
          index: number;
        };
      };
    }) => state.exams.selected
  );
  const [files, setFiles] = useState([]);
  const [modal, setModal] = useState(false);
  const loading = useSelector(
    (state: {
      exams: {
        deleteLoading: boolean;
      };
    }) => state.exams.deleteLoading
  );

  const handleDelete = async (): Promise<void> => {
    dispatch(ExamsActions.setDeleteLoading(true));
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const response = await deleteExam(exam.item.id);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const responseList = await getExamsByUserId(exam.item.userId).then(
      (data) => {
        dispatch(ExamsActions.setList(data));
        return data;
      }
    );
    dispatch(ExamsActions.setDeleteLoading(false));
    setModal(!modal);
    navigation.goBack();
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
        <Title>Meus exames</Title>
      </Row>
      <DataForm>
        <Row
          style={{
            borderBottomWidth: 2,
            borderBottomColor: colors.lightGray,
            paddingBottom: 10,
          }}
        >
          <Col size="9" alignItems="flex-start">
            <ExamTitle>{exam.item.examName}</ExamTitle>
            <ExamDate>Criado em 12 de agosto de 2020</ExamDate>
          </Col>
        </Row>
        <Row>
          <AddedFileWrapper onPress={(): void => alert("Opens file!")}>
            <AddedFileContent>
              <AddedFileText>imagem.png</AddedFileText>
              <AddedFileContainer>
                <Icon source={checkImage} />
              </AddedFileContainer>
            </AddedFileContent>
          </AddedFileWrapper>
        </Row>
        <Row>
          <Message>
            Clique no(s) arquivo(s) para abri-lo em seu dispositivo
          </Message>
        </Row>
        <Row>
          <Button
            style={{ marginTop: 60 }}
            color="transparent"
            borderColor="primary"
            title="Adicionar novo exame"
            shadow
            onPress={(): void => navigation.navigate("NewExam")}
          />
        </Row>
        <Row>
          <Button
            style={{ marginBottom: 30 }}
            color="transparent"
            title="Excluir"
            shadow
            onPress={(): void => setModal(!modal)}
          />
        </Row>
      </DataForm>
      <Modal open={modal} toggle={(): void => setModal(!modal)}>
        <Col style={{ height: 200 }}>
          <Row size="1">
            <ModalTitle>Deseja excluir Exame?</ModalTitle>
          </Row>
          <Row size="1">
            <Button
              color="primary"
              onPress={(): void => handleDelete()}
              title="Sim"
              size="small"
              loading={loading}
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

export default EditExam;
