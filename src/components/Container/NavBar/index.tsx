import React from "react";

import { useNavigation } from "@react-navigation/native";

import ImageCheckup from "../../../assets/images/checkup.png";
import ImageDrug from "../../../assets/images/drug.png";
import ImageHome from "../../../assets/images/home.png";
import ImageNews from "../../../assets/images/news.png";
import {
  Container,
  NavButtonsContainer,
  NavButtonWrapper,
  NavButtonIcon,
} from "./styles";

const NavBar: React.FC = () => {
  const navigation = useNavigation();

  return (
    <Container>
      <NavButtonsContainer>
        <NavButtonWrapper onPress={(): void => navigation.navigate("Home")}>
          <NavButtonIcon source={ImageHome} />
        </NavButtonWrapper>
        <NavButtonWrapper>
          <NavButtonIcon source={ImageCheckup} />
        </NavButtonWrapper>
        <NavButtonWrapper onPress={(): void => navigation.navigate("Pharmacy")}>
          <NavButtonIcon source={ImageDrug} />
        </NavButtonWrapper>
        <NavButtonWrapper onPress={(): void => navigation.navigate("Alarms")}>
          <NavButtonIcon source={ImageNews} />
        </NavButtonWrapper>
      </NavButtonsContainer>
    </Container>
  );
};

export default NavBar;
