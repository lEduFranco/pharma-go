import React, { useState } from "react";

import { Container, Text, Content, Box, BoxFilling } from "./styles";

interface CheckboxProperties {
  checked: boolean;
  setChecked: (arg0: boolean) => void;
  title: string;
  // color?: "primary" | "secondary" | "warning" | "white";
  labelColor?: "primary" | "secondary" | "warning" | "white";
  fillingColor?: "primary" | "secondary" | "warning" | "white";
  style?: object;
  icon?: React.ReactNode;
  size?: "small" | "normal" | "extrasmall";
  disabled?: boolean;
}

const Checkbox: React.FC<CheckboxProperties> = ({
  title,
  // color,
  labelColor,
  fillingColor,
  size = "normal",
  checked,
  setChecked,
  style,
  icon,
  disabled = false,
  ...rest
}) => {
  return (
    <Container style={style} {...rest}>
      <Box
        onPress={(): void | boolean => !disabled && setChecked(!checked)}
        // color={color}
        size={size}
      >
        <BoxFilling checked={checked} color={fillingColor} size={size} />
      </Box>
      <Content>
        {icon || null}
        <Text color={labelColor} size={size} disabled={disabled}>
          {title}
        </Text>
      </Content>
    </Container>
  );
};

export default Checkbox;
