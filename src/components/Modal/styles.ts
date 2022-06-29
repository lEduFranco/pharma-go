import styled from "styled-components/native";

import colors from "../../config/colors";

interface ModalBodyProps {
  color?: "primary" | "secondary" | "warning" | "white";
}

export const Container = styled.Modal`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const OuterContent = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${colors.modalLayer};
`;

export const InnerContent = styled.TouchableWithoutFeedback``;

export const ModalBody = styled.View<ModalBodyProps>`
  margin: 20px;
  padding: 30px 30px 50px 30px;
  align-items: center;
  border-radius: 24px;
  background-color: ${colors.white};
`;
