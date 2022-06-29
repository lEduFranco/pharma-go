import React, { useState, useEffect } from "react";
import { ActivityIndicator } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import { useNavigation } from "@react-navigation/native";

import checkImage from "../../../../../assets/images/foursquare-check-in.png";
import Button from "../../../../../components/Button";
import colors from "../../../../../config/colors";
import {
  postCreateUser,
  postAddress,
  postProfile,
} from "../../../../../services";
import { Creators as AuthActions } from "../../../../../store/ducks/auth";
import { Creators as UserActions } from "../../../../../store/ducks/user";
import { SuccessContainer, Message, CheckImage } from "./styles";

const SignIn: React.FC = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const authData = useSelector(
    (state: {
      auth: {
        email: string;
        password: string;
        userType: string;
        birthDate: string;
        name: string;
        cpf: string;
        phone: string;
        sex: string;
        bloodType: string;
        preexistingConditions: string;
        specialNeeds: string;
        street: string;
        number: string;
        complement: string;
        cep: string;
        district: string;
        city: string;
        state: string;
      };
    }) => state.auth
  );
  const [userId, setUserId] = useState();
  const [loading, setLoading] = useState(true);

  const handleResetSignupData = (): void => {
    dispatch(AuthActions.setEmail(""));
    dispatch(AuthActions.setPassword(""));
    dispatch(AuthActions.setUserType(""));
    dispatch(AuthActions.setBirthDate(""));
    dispatch(AuthActions.setName(""));
    dispatch(AuthActions.setCPF(""));
    dispatch(AuthActions.setPhone(""));
    dispatch(AuthActions.setSex(""));
    dispatch(AuthActions.setBloodType(""));
    dispatch(AuthActions.setPreexistingConditions(""));
    dispatch(AuthActions.setSpecialNeeds(""));
    dispatch(AuthActions.setStreet(""));
    dispatch(AuthActions.setNumber(""));
    dispatch(AuthActions.setComplement(""));
    dispatch(AuthActions.setCEP(""));
    dispatch(AuthActions.setDistrict(""));
    dispatch(AuthActions.setCity(""));
    dispatch(AuthActions.setState(""));
  };

  const handleSignup = async (): Promise<void> => {
    const userData = {
      email: authData.email,
      senha: authData.password,
      tipoUsuario: authData.userType,
    };
    const addressData = {
      logradouro: authData.street,
      numero: authData.number,
      complemento: authData.complement,
      cep: authData.cep,
      bairro: authData.district,
      cidade: authData.city,
      estado: authData.state,
      userId: "",
    };
    const profileData = {
      birthDate: authData.birthDate,
      name: authData.name,
      cpf: authData.cpf,
      phone: authData.phone,
      sexo: authData.sex,
      bloodGroup: authData.bloodType,
      preexistingCondition: authData.preexistingConditions,
      specialNeed: authData.specialNeeds,
      weight: "",
      height: "",
      allergies: [],
      usaMarcapasso: true,
      proteseOrtopedica: true,
      alteracoesCardiacas: true,
      familyDiseases: [],
      cancerRegion: "",
      rareDisease: "",
      physicalActivityPractice: true,
      physicalActivityFrequency: true,
      smokeCigarette: true,
      averageCigaretteSmoke: "",
      alcoholConsumes: true,
      frequencyAlcoholConsumption: "",
      drugUser: true,
      userId: "",
    };
    try {
      const userResponse = await postCreateUser(userData);
      if (userResponse) {
        const addressResponse = await postAddress({
          ...addressData,
          userId: userResponse.id,
        });
        const profileResponse = await postProfile({
          ...profileData,
          userId: userResponse.id,
        });
        if (addressResponse && profileResponse) {
          setLoading(false);
          handleResetSignupData();
          dispatch(UserActions.setUserAddress(addressResponse));
          dispatch(UserActions.setUserProfile(profileResponse));
          dispatch(UserActions.setUserData(userResponse));
          setUserId(userResponse.id);
        }
      } else {
        handleResetSignupData();
        dispatch(AuthActions.setSignupError(true));
        dispatch(AuthActions.setSignupStep(1));
        navigation.navigate("AuthSelector");
      }
    } catch (e) {
      handleResetSignupData();
      dispatch(AuthActions.setSignupError(true));
      dispatch(AuthActions.setSignupStep(1));
      navigation.navigate("AuthSelector");
    }
  };

  useEffect(() => {
    handleSignup();
  }, []);

  return (
    <SuccessContainer>
      {loading ? (
        <Message>Seu cadastro está sendo realizado...</Message>
      ) : (
        <Message>
          Cadastro efetuado com sucesso! A partir de agora você tem mais
          controle da sua saúde :)
        </Message>
      )}
      {loading ? (
        <ActivityIndicator animating={loading} color={colors.blue01} />
      ) : (
        <CheckImage source={checkImage} />
      )}
      <Button
        color="primary"
        title="Acessar"
        onPress={(): { type: string; payload: { data: any } } =>
          dispatch(
            UserActions.setUserId({
              id: userId,
            })
          )
        }
        margin="15px 0"
        disabled={loading}
      />
    </SuccessContainer>
  );
};

export default SignIn;
