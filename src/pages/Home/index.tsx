import React, { useEffect } from "react";
import { useWindowDimensions } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { useNavigation } from "@react-navigation/native";
import * as Location from "expo-location";

import CaregiverImage from "../../assets/images/caregiver.png";
import CheckupImage from "../../assets/images/checkup.png";
import DrugImage from "../../assets/images/drug.png";
import ForwardImage from "../../assets/images/forward.png";
import NewsImage from "../../assets/images/news.png";
import ProfileImage from "../../assets/images/profile.png";
import Container from "../../components/Container";
import {
  getCaregiversByUserId,
  getPharmacyByUserId,
  getExamsByUserId,
  getAppointmentAlertsByUserId,
  getExamAlertsByUserId,
  getMedicineAlertsByUserId,
  getHowToUse,
  getExamTypes,
  getInstructionUses,
  getMedicalSpecialties,
  getAllergies,
  getFamilyDiseases,
  getHealthPlans,
} from "../../services";
import { Creators as AlertsActions } from "../../store/ducks/alarms";
import { Creators as AllergiesActions } from "../../store/ducks/allergies";
import { Creators as CaregiversActions } from "../../store/ducks/caregivers";
import { Creators as ExamsActions } from "../../store/ducks/exams";
import { Creators as ExamTypesActions } from "../../store/ducks/examTypes";
import { Creators as FamilyDiseasesActions } from "../../store/ducks/familyDiseases";
import { Creators as HealthPlansActions } from "../../store/ducks/healthPlans";
import { Creators as HowToUseActions } from "../../store/ducks/howToUse";
import { Creators as InstructionUsesActions } from "../../store/ducks/instructionUses";
import { Creators as LocationActions } from "../../store/ducks/location";
import { Creators as MedicalSpecialtiesActions } from "../../store/ducks/medicalSpecialties";
import { Creators as PharmacyActions } from "../../store/ducks/pharmacy";
import {
  HomeBox,
  HomeBoxWrapper,
  HomeBoxTextContainer,
  HomeBoxTitle,
  HomeBoxInfo,
  HomeBoxArrowContainer,
  ArrowImage,
  HomeBoxImageContainer,
  HomeBoxImage,
  BottomBoxesWrapper,
  BottomBoxesScroll,
  BottomBox,
  BottomBoxTitle,
  BottomBoxInfo,
  BottomBoxLink,
  BottomBoxLinkText,
} from "./styles";

const Home: React.FC = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const userId = useSelector(
    (state: {
      user: {
        id: string;
      };
    }) => state.user.id
  );
  const windowWidth = useWindowDimensions().width;

  useEffect(() => {
    async (): Promise<void> => {
      const { status } = await Location.requestPermissionsAsync();
      if (status === "granted") {
        const currLocation = await Location.getCurrentPositionAsync({});
        dispatch(
          LocationActions.setCoordinates({
            latitude: currLocation.coords.latitude,
            longitude: currLocation.coords.longitude,
          })
        );
      }
    };
    getCaregiversByUserId(userId).then((data) => {
      dispatch(CaregiversActions.setList(data));
    });
    getExamsByUserId(userId).then((data) => {
      dispatch(ExamsActions.setList(data));
    });
    getPharmacyByUserId(userId).then((data) => {
      dispatch(PharmacyActions.setList(data));
    });
    getHowToUse().then((data) => {
      dispatch(HowToUseActions.setList(data));
    });
    getExamTypes().then((data) => {
      dispatch(ExamTypesActions.setList(data));
    });
    getInstructionUses().then((data) => {
      dispatch(InstructionUsesActions.setList(data));
    });
    getMedicalSpecialties().then((data) => {
      dispatch(MedicalSpecialtiesActions.setList(data));
    });
    getAppointmentAlertsByUserId(userId).then((data) => {
      dispatch(AlertsActions.setAppointmentsList(data));
    });
    getExamAlertsByUserId(userId).then((data) => {
      dispatch(AlertsActions.setExamsList(data));
    });
    getMedicineAlertsByUserId(userId).then((data) => {
      dispatch(AlertsActions.setMedicinesList(data));
    });
    getAllergies().then((data) => {
      dispatch(AllergiesActions.setList(data));
    });
    getFamilyDiseases().then((data) => {
      dispatch(FamilyDiseasesActions.setList(data));
    });
    getHealthPlans().then((data) => {
      dispatch(HealthPlansActions.setList(data));
    });
  }, [userId, dispatch]);

  return (
    <Container
      backgroundColor="gray"
      flexDirection="column"
      justifyContent="flex-start"
      alignItems="center"
    >
      <HomeBox onPress={(): void => navigation.navigate("Profile")}>
        <HomeBoxWrapper>
          <HomeBoxImageContainer>
            <HomeBoxImage source={ProfileImage} />
          </HomeBoxImageContainer>
          <HomeBoxTextContainer>
            <HomeBoxTitle>Perfil</HomeBoxTitle>
            <HomeBoxInfo>Maria Estrela, 47 anos</HomeBoxInfo>
          </HomeBoxTextContainer>
          <HomeBoxArrowContainer>
            <ArrowImage source={ForwardImage} />
          </HomeBoxArrowContainer>
        </HomeBoxWrapper>
      </HomeBox>

      <HomeBox onPress={(): void => navigation.navigate("Caregivers")}>
        <HomeBoxWrapper>
          <HomeBoxImageContainer>
            <HomeBoxImage source={CaregiverImage} />
          </HomeBoxImageContainer>
          <HomeBoxTextContainer>
            <HomeBoxTitle>Meus cuidadores</HomeBoxTitle>
            <HomeBoxInfo>
              Associe pessoas que podem{"\n"}acompanhar seus tratamentos
            </HomeBoxInfo>
          </HomeBoxTextContainer>
          <HomeBoxArrowContainer>
            <ArrowImage source={ForwardImage} />
          </HomeBoxArrowContainer>
        </HomeBoxWrapper>
      </HomeBox>

      <HomeBox onPress={(): void => navigation.navigate("Pharmacy")}>
        <HomeBoxWrapper>
          <HomeBoxImageContainer>
            <HomeBoxImage source={DrugImage} />
          </HomeBoxImageContainer>
          <HomeBoxTextContainer>
            <HomeBoxTitle>Minha farmácia</HomeBoxTitle>
            <HomeBoxInfo>Acesse sua lista de{"\n"}medicamentos</HomeBoxInfo>
          </HomeBoxTextContainer>
          <HomeBoxArrowContainer>
            <ArrowImage source={ForwardImage} />
          </HomeBoxArrowContainer>
        </HomeBoxWrapper>
      </HomeBox>

      <HomeBox onPress={(): void => navigation.navigate("Alarms")}>
        <HomeBoxWrapper>
          <HomeBoxImageContainer>
            <HomeBoxImage source={NewsImage} />
          </HomeBoxImageContainer>
          <HomeBoxTextContainer>
            <HomeBoxTitle>Alertas</HomeBoxTitle>
            <HomeBoxInfo>Programe um alerta</HomeBoxInfo>
          </HomeBoxTextContainer>
          <HomeBoxArrowContainer>
            <ArrowImage source={ForwardImage} />
          </HomeBoxArrowContainer>
        </HomeBoxWrapper>
      </HomeBox>

      <HomeBox onPress={(): void => navigation.navigate("Exams")}>
        <HomeBoxWrapper>
          <HomeBoxImageContainer>
            <HomeBoxImage source={CheckupImage} />
          </HomeBoxImageContainer>
          <HomeBoxTextContainer>
            <HomeBoxTitle>Meus exames</HomeBoxTitle>
            <HomeBoxInfo>Visualize seu histórico de{"\n"}exames</HomeBoxInfo>
          </HomeBoxTextContainer>
          <HomeBoxArrowContainer>
            <ArrowImage source={ForwardImage} />
          </HomeBoxArrowContainer>
        </HomeBoxWrapper>
      </HomeBox>

      <BottomBoxesWrapper windowWidth={windowWidth}>
        <BottomBoxesScroll horizontal showsHorizontalScrollIndicator={false}>
          <BottomBox color="light">
            <BottomBoxTitle>Medicamentos e produtos</BottomBoxTitle>
            <BottomBoxInfo>Pesquise preços e disponibilidades</BottomBoxInfo>
            <BottomBoxLink
              onPress={(): void => navigation.navigate("Products")}
            >
              <BottomBoxLinkText>Procurar</BottomBoxLinkText>
            </BottomBoxLink>
          </BottomBox>
          <BottomBox color="dark">
            <BottomBoxTitle>Farmácias e laboratórios</BottomBoxTitle>
            <BottomBoxInfo>Pesquise unidades perto de você!</BottomBoxInfo>
            <BottomBoxLink onPress={(): void => navigation.navigate("Map")}>
              <BottomBoxLinkText>Procurar</BottomBoxLinkText>
            </BottomBoxLink>
          </BottomBox>
        </BottomBoxesScroll>
      </BottomBoxesWrapper>
    </Container>
  );
};

export default Home;
