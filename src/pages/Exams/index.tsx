import React from "react";
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
import { Creators as ExamsActions } from "../../store/ducks/exams";
import {
  ArrowContainer,
  Arrow,
  Title,
  ExamTitle,
  ExamDate,
  ExamDescription,
  LoadingContainer,
} from "./styles";

const Exams: React.FC = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const exams = useSelector(
    (state: {
      exams: {
        list: [
          {
            examName: string;
            pathImg: string;
            userId: string;
            id: string;
          }
        ];
      };
    }) => state.exams.list
  );

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
      {exams ? (
        exams.length > 0 ? (
          exams
            .sort((a, b) => b.id - a.id)
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
                    <ExamTitle>{item.examName}</ExamTitle>
                    <ExamDate>Criado em 12 de agosto de 2020</ExamDate>
                  </Col>
                  <Col size="1">
                    <ArrowContainer
                      onPress={(): void => {
                        dispatch(
                          ExamsActions.setSelected({
                            item,
                            index,
                          })
                        );
                        navigation.navigate("EditExam");
                      }}
                    >
                      <Arrow source={BtnArrowRight} />
                    </ArrowContainer>
                  </Col>
                </Row>
              );
            })
        ) : (
          <ExamDescription style={{ marginTop: 30 }}>
            Você ainda não adicionou exames
          </ExamDescription>
        )
      ) : (
        <LoadingContainer loading={exams === null}>
          <ActivityIndicator
            color={colors.blue01}
            animating={exams === null}
            style={{ height: 100, width: "100%", display: "flex" }}
          />
        </LoadingContainer>
      )}
      <Row>
        <Button
          color="primary"
          title="Adicionar novo exame"
          size="small"
          style={{ marginTop: 30, marginBottom: 30 }}
          onPress={(): void => navigation.navigate("NewExam")}
          shadow
        />
      </Row>
    </Container>
  );
};

export default Exams;
