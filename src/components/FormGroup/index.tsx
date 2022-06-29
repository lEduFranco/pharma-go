import React from "react";

import { Container } from "./styles";

interface Props {
  row?: boolean;
}

const FormGroup: React.FC<Props> = ({ row, children }) => {
  return <Container row={row}>{children}</Container>;
};

export default FormGroup;
