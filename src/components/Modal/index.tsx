import React from "react";

import { Container, OuterContent, InnerContent, ModalBody } from "./styles";

interface ModalProps {
  open: boolean;
  toggle: () => void;
  color?: string;
}

const Modal: React.FC<ModalProps> = ({
  open,
  toggle,
  color,
  children,
  ...rest
}) => {
  return (
    <Container
      animationType="fade"
      presentationStyle="overFullScreen"
      transparent
      visible={open}
      {...rest}
    >
      <OuterContent activeOpacity={1} onPressOut={toggle}>
        <InnerContent>
          <ModalBody color={color}>{children}</ModalBody>
        </InnerContent>
      </OuterContent>
    </Container>
  );
};

export default Modal;
