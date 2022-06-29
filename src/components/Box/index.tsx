import React from "react";

import { Container, Text, Content } from "./styles";

interface Props {
  title?: string;
  color:
    | "primary"
    | "secondary"
    | "warning"
    | "transparent"
    | "lightBlue"
    | "blue"
    | "purple";
  style?: object;
  size?: "small" | "normal" | "extrasmall" | "round";
  icon?: React.ReactNode;
}

const Box: React.FC<Props> = ({
  title,
  color,
  onPress,
  style,
  size = "normal",
  icon,
}) => {
  return (
    <Container style={style} color={color} onPress={onPress} size={size}>
      <Content>
        {icon || null}
        {title ? (
          <Text color={color} size={size}>
            {title}
          </Text>
        ) : null}
      </Content>
    </Container>
  );
};

export default Box;
