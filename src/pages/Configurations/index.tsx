import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useNavigation } from "@react-navigation/native";
import moment from "moment";

import BackButton from "../../components/BackButton";
import Button from "../../components/Button";
import Col from "../../components/Col";
import Container from "../../components/Container";
import Input from "../../components/Input";
import Modal from "../../components/Modal";
import Row from "../../components/Row";
import { getEmailValidation, putUser, putProfile } from "../../services";
import { Creators as UserActions } from "../../store/ducks/user";
import {
  ArrowContainer,
  Title,
  BoxWrapper,
  DataForm,
  ModalTitle,
  SuccessText,
  ErrorText,
} from "./styles";

const Configurations: React.FC = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const userData = useSelector(
    (state: {
      user: {
        data: {
          id: string;
          email: string;
          senha: string;
          tipoUsuario: string;
        };
      };
    }) => state.user.data
  );
  const userProfile = useSelector(
    (state: {
      user: {
        profile: {
          birthDate: string;
          name: string;
          cpf: string;
          phone: string;
          sexo: string;
          bloodGroup: string;
          preexistingCondition: string;
          specialNeed: string;
          userId: string;
          id: string;
        };
      };
    }) => state.user.profile
  );
  const [name, setName] = useState(userProfile.name);
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [edited, setEdited] = useState(false);

  const handleEdit = async (): Promise<void> => {
    setError(false);
    setEdited(false);
    const profileParams = {
      birthDate: moment.utc(userProfile.birthDate).toISOString(),
      name,
      cpf: userProfile.cpf,
      phone: userProfile.phone,
      sexo: userProfile.sexo,
      bloodGroup: userProfile.bloodGroup,
      preexistingCondition: userProfile.preexistingCondition,
      specialNeed: userProfile.specialNeed,
      userId: userProfile.userId,
      id: userProfile.id,
    };
    if (name === "") {
      setError(true);
    } else {
      setLoading(true);
      const response = await putProfile(
        userProfile.id,
        JSON.stringify(profileParams)
      );
      dispatch(UserActions.setUserProfile(response));
      setLoading(false);
      setEdited(true);
    }
    setLoading(false);
  };

  return (
    <Container
      backgroundColor="gray"
      flexDirection="row"
      justifyContent="flex-start"
      alignItems="center"
    >
      <BoxWrapper>
        <Row justifyContent="center" alignItems="center">
          <ArrowContainer>
            <BackButton
              onPress={(): void => {
                setEdited(false);
                navigation.goBack();
              }}
            />
          </ArrowContainer>
          <Title>Configurações da conta</Title>
        </Row>
        <DataForm>
          <Row>
            <Input
              label="Nome: "
              placeholder=""
              value={name}
              onChange={(e: string): void => setName(e)}
              blue
              bold
              error={error && name === ""}
            />
          </Row>
          <Row>
            <Input
              label="E-mail: "
              placeholder=""
              value={userData.email}
              blue
              bold
              disabled
            />
          </Row>
          <Row>{edited && <SuccessText>Alterações salvas!</SuccessText>}</Row>
          <Row>
            <Button
              color="primary"
              title="Salvar edições"
              size="small"
              onPress={(): Promise<void> => handleEdit()}
              margin="15px 0 0 0"
              shadow
              loading={loading}
            />
          </Row>
          <Row>
            <Button
              color="transparent"
              borderColor="primary"
              title="Alterar senha"
              size="small"
              onPress={(): void => navigation.goBack()}
              shadow
            />
          </Row>
          <Row>
            <Button
              color="transparent"
              title="Deslogar"
              size="small"
              onPress={(): object => dispatch(UserActions.setUserId(null))}
            />
          </Row>
          <Row>
            <Button
              color="transparent"
              title="Apagar conta"
              size="small"
              onPress={(): void => setModal(!modal)}
              margin="90px 0 0 0"
            />
          </Row>
        </DataForm>
      </BoxWrapper>
      <Modal open={modal} toggle={(): void => setModal(!modal)}>
        <Col style={{ height: 200 }}>
          <Row size="1">
            <ModalTitle>Deseja apagar sua conta?</ModalTitle>
          </Row>
          <Row size="1">
            <Button
              color="primary"
              onPress={(): void => setModal(!modal)}
              title="Apagar conta"
              size="small"
              shadow
            />
          </Row>
          <Row size="1">
            <Button
              color="transparent"
              borderColor="primary"
              onPress={(): void => setModal(!modal)}
              title="Cancelar"
              size="small"
              shadow
            />
          </Row>
        </Col>
      </Modal>
    </Container>
  );
};

export default Configurations;
