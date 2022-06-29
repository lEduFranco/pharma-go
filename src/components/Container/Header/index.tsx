import React, { useState } from "react";
import { Animated, Easing } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { useNavigation } from "@react-navigation/native";

import ArrowDownImg from "../../../assets/images/icn_back_dark-1.png";
import SettingsImg from "../../../assets/images/settings.png";
import { putAddress } from "../../../services";
import { Creators as UserActions } from "../../../store/ducks/user";
import Button from "../../Button";
import Col from "../../Col";
import Input from "../../Input";
import Row from "../../Row";
import {
  Container,
  MainContent,
  Address,
  AddressText,
  AddressButton,
  AddressImage,
  SettingsButton,
  SettingsImage,
  FormContent,
} from "./styles";

const Header: React.FC = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const userAddress = useSelector(
    (state: {
      user: {
        address: {
          userId: string;
          logradouro: string;
          numero: string;
          complemento: string;
          cep: string;
          bairro: string;
          cidade: string;
          estado: string;
          id: string;
        };
      };
    }) => state.user.address
  );
  const [form, setForm] = useState({
    userId: userAddress.userId,
    logradouro: userAddress.logradouro,
    numero: userAddress.numero,
    complemento: userAddress.complemento,
    cep: userAddress.cep,
    bairro: userAddress.bairro,
    cidade: userAddress.cidade,
    estado: userAddress.estado,
    id: userAddress.id,
  });
  const [showForm, setShowForm] = useState(false);
  const [formAnimation] = useState(new Animated.Value(0));
  const [flipAnimation] = useState(new Animated.Value(0));
  const [spinAnimation] = useState(new Animated.Value(0));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [edited, setEdited] = useState(false);

  const handleEdit = async (): Promise<void> => {
    setError(false);
    setEdited(false);
    if (
      form.logradouro === "" ||
      form.numero === "" ||
      form.bairro === "" ||
      form.estado === ""
    ) {
      setError(true);
    } else {
      setLoading(true);
      const response = await putAddress(userAddress.id, JSON.stringify(form));
      dispatch(UserActions.setUserAddress(response));
      setLoading(false);
      setEdited(true);
    }
  };

  const handleOpenForm = (): void => {
    let heightValue = 300;
    let flipValue = 1;
    let spinValue = 1;

    if (showForm) {
      heightValue = 0;
      flipValue = 0;
      spinValue = 0;
      setEdited(false);
    }

    setShowForm(!showForm);

    Animated.timing(formAnimation, {
      toValue: heightValue,
      duration: 300,
    }).start();

    Animated.timing(flipAnimation, {
      toValue: flipValue,
      duration: 200,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();

    Animated.timing(spinAnimation, {
      toValue: spinValue,
      duration: 300,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  };

  const flip = flipAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });

  const spin = spinAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "90deg"],
  });

  return (
    <Container>
      <MainContent>
        <Address>
          <AddressText>
            {form.logradouro}, {form.numero}
          </AddressText>
          <AddressButton onPress={(): void => handleOpenForm()}>
            <AddressImage
              source={ArrowDownImg}
              style={{ transform: [{ rotate: flip }] }}
            />
          </AddressButton>
        </Address>
        <SettingsButton
          onPress={(): void => navigation.navigate("Configurations")}
        >
          <SettingsImage
            source={SettingsImg}
            style={{ transform: [{ rotate: spin }] }}
          />
        </SettingsButton>
      </MainContent>
      <FormContent
        style={[
          {
            height: formAnimation,
          },
        ]}
      >
        <Row>
          <Input
            placeholder="Rua"
            value={form.logradouro}
            onChange={(e: string): void => setForm({ ...form, logradouro: e })}
            white
            error={error && form.logradouro === ""}
          />
        </Row>
        <Row>
          <Col size="3">
            <Input
              placeholder="Nr"
              value={form.numero}
              onChange={(e: string): void => setForm({ ...form, numero: e })}
              white
              error={error && form.numero === ""}
            />
          </Col>
          <Col size="1" />
          <Col size="11">
            <Input
              placeholder="Bairro"
              value={form.bairro}
              onChange={(e: string): void => setForm({ ...form, bairro: e })}
              white
              error={error && form.bairro === ""}
            />
          </Col>
        </Row>
        <Row>
          <Col size="6">
            <Input
              placeholder="UF"
              value={form.estado}
              onChange={(e: string): void => setForm({ ...form, estado: e })}
              white
              error={error && form.estado === ""}
            />
          </Col>
          <Col size="1" />
          <Col size="8">
            <Input
              placeholder="Cidade"
              value={form.cidade}
              onChange={(e: string): void => setForm({ ...form, cidade: e })}
              white
              error={error && form.cidade === ""}
            />
          </Col>
        </Row>
        <Row>
          <Col size="1">{edited && <AddressText>Salvo!</AddressText>}</Col>
          <Col size="1">
            <Button
              color="white"
              title="Aplicar"
              size="small"
              onPress={(): Promise<void> => handleEdit()}
              loading={loading}
            />
          </Col>
        </Row>
      </FormContent>
    </Container>
  );
};

export default Header;
