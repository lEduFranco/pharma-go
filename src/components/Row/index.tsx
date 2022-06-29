import React from "react";

import { Container } from "./styles";

interface Props {
  size?: string;
  justifyContent?:
    | "flex-start"
    | "flex-end"
    | "space-around"
    | "space-between"
    | "center";
  alignItems?:
    | "flex-start"
    | "flex-end"
    | "space-around"
    | "space-between"
    | "center";
  style?: object;
}

const Row: React.FC<Props> = ({
  size,
  justifyContent,
  alignItems,
  style,
  children,
  ...rest
}) => {
  return (
    <Container
      size={size}
      justifyContent={justifyContent}
      alignItems={alignItems}
      style={style}
      {...rest}
    >
      {children}
    </Container>
  );
};

export default Row;
