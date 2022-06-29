import React from "react";

import arrowImg from "../../assets/images/icons-dark-back.png";
import { ArrowContainer, Image } from "./styles";

interface BackButtonProperties {
  onPress: () => void;
}

const BackButton: React.FC<BackButtonProperties> = ({ onPress }) => {
  return (
    <ArrowContainer onPress={onPress}>
      <Image source={arrowImg} />
    </ArrowContainer>
  );
};

export default BackButton;
