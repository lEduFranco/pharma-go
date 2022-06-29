import React from "react";
import { ActivityIndicator } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { useNavigation } from "@react-navigation/native";

import BtnArrowRight from "../../assets/images/btn-arrow-right.png";
import BackButton from "../../components/BackButton";
import Button from "../../components/Button";
import Col from "../../components/Col";
import Container from "../../components/Container";
import Row from "../../components/Row";
import colors from "../../config/colors";
import { Creators as PharmacyActions } from "../../store/ducks/pharmacy";
import {
  ArrowContainer,
  Arrow,
  Title,
  ReceiptTitle,
  ReceiptDescription,
  CreatedOn,
  LoadingContainer,
} from "./styles";

const Pharmacy: React.FC = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const pharmacy = useSelector(
    (state: {
      pharmacy: {
        list: [
          {
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
          }
        ];
      };
    }) => state.pharmacy.list
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
        <Title>Minha farmácia</Title>
      </Row>
      {pharmacy ? (
        pharmacy.length > 0 ? (
          pharmacy
            .sort((a, b) => new Date(b.validity) - new Date(a.validity))
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
                    <ReceiptTitle>{item.medicineName}</ReceiptTitle>
                    <ReceiptDescription>
                      Tratamento: {item.howToUse.description}
                    </ReceiptDescription>
                    <CreatedOn>Criado em 12 de agosto de 2020</CreatedOn>
                  </Col>
                  <Col size="1">
                    <ArrowContainer
                      onPress={(): void => {
                        dispatch(
                          PharmacyActions.setSelected({
                            item,
                            index,
                          })
                        );
                        navigation.navigate("Receipt");
                      }}
                    >
                      <Arrow source={BtnArrowRight} />
                    </ArrowContainer>
                  </Col>
                </Row>
              );
            })
        ) : (
          <ReceiptDescription style={{ marginTop: 30 }}>
            Você ainda não adicionou cuidadores
          </ReceiptDescription>
        )
      ) : (
        <LoadingContainer loading={pharmacy === null}>
          <ActivityIndicator
            color={colors.blue01}
            animating={pharmacy === null}
            style={{ height: 100, width: "100%", display: "flex" }}
          />
        </LoadingContainer>
      )}
      <Row>
        <Button
          color="primary"
          title="Adicionar nova"
          size="small"
          style={{ marginTop: 30, marginBottom: 30 }}
          onPress={(): void => navigation.navigate("NewReceipt")}
          shadow
        />
      </Row>
    </Container>
  );
};

export default Pharmacy;
