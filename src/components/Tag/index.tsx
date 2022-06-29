import React, { useState, useCallback } from "react";

import { Container, Content } from "./styles";

interface Props {
  title: string;
  pressed: boolean;
  onPress: (arg0: boolean) => void;
}

const Tag: React.FC<Props> = ({ title, pressed, onPress }) => {
  // const [pressed, setPressed] = useState(active);

  // const handlePress = useCallback(() => {
  //   setPressed(!pressed);
  // }, [pressed]);

  return (
    <Container pressed={pressed} onPress={onPress}>
      <Content pressed={pressed}>{title}</Content>
    </Container>
  );
};

export default Tag;
