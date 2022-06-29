import React from "react";
import { ActivityIndicator } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { useNavigation } from "@react-navigation/native";

import BackButton from "../../components/BackButton";
import Button from "../../components/Button";
import Col from "../../components/Col";
import Container from "../../components/Container";
import Row from "../../components/Row";
import colors from "../../config/colors";
import { Creators as CaregiversActions } from "../../store/ducks/caregivers";
import {
  ArrowContainer,
  Arrow,
  Title,
  CaregiverTitle,
  CaregiverDescription,
  CaregiverBottom,
  CaregiverContact,
  EditButton,
  Edit,
  LoadingContainer,
} from "./styles";

const Caregivers: React.FC = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const caregivers = useSelector(
    (state: {
      caregivers: {
        list: [
          {
            name: string;
            email: string;
            phone: string;
            userId: string;
            id: string;
          }
        ];
      };
    }) => state.caregivers.list
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
        <Title>Meus cuidadores</Title>
      </Row>
      {caregivers ? (
        caregivers.length > 0 ? (
          caregivers
            .sort((a, b) => b.id - a.id)
            .map((item, index) => {
              return (
                <Row
                  key={item.id}
                  style={{
                    borderBottomWidth: 2,
                    borderBottomColor: colors.lightGray,
                    paddingBottom: 10,
                  }}
                >
                  <Col size="9" alignItems="flex-start">
                    <CaregiverTitle>{item.name}</CaregiverTitle>
                    <CaregiverDescription>
                      E-mail: {item.email}
                    </CaregiverDescription>
                    <CaregiverBottom>
                      <CaregiverContact>
                        Telefone: {item.phone}
                      </CaregiverContact>
                      <EditButton
                        onPress={(): void => {
                          dispatch(
                            CaregiversActions.setSelected({
                              item,
                              index,
                            })
                          );
                          navigation.navigate("EditCaregiver");
                        }}
                      >
                        <Edit>Editar</Edit>
                      </EditButton>
                    </CaregiverBottom>
                  </Col>
                </Row>
              );
            })
        ) : (
          <CaregiverDescription style={{ marginTop: 30 }}>
            Você ainda não adicionou cuidadores
          </CaregiverDescription>
        )
      ) : (
        <LoadingContainer loading={caregivers === null}>
          <ActivityIndicator
            color={colors.blue01}
            animating={caregivers === null}
            style={{ height: 100, width: "100%", display: "flex" }}
          />
        </LoadingContainer>
      )}
      <Row>
        <Button
          color="primary"
          title="Adicionar novo"
          size="small"
          style={{ marginTop: 30, marginBottom: 30 }}
          onPress={(): void => navigation.navigate("NewCaregiver")}
          shadow
        />
      </Row>
    </Container>
  );
};

export default Caregivers;
