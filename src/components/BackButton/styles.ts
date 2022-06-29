import styled from "styled-components/native";

import colors from "../../config/colors";

export const ArrowContainer = styled.TouchableOpacity`
  height: auto;
  width: 30px;
  overflow: hidden;
  margin: 0 10px 0 10px;
  z-index: 5;
  position: absolute;
`;

export const Image = styled.Image.attrs({
  resizeMode: "contain",
})``;
