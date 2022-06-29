import React from "react";
import { ActivityIndicator, ButtonProperties } from "react-native";

import colors from "../../config/colors";
import { Container, Text, Content } from "./styles";

interface Props extends ButtonProperties {
  title?: string;
  textColor?: "primary" | "secondary" | "warning" | "white";
  color:
    | "primary"
    | "secondary"
    | "white"
    | "green"
    | "facebook"
    | "transparent";
  borderColor?: "primary" | "secondary" | "white";
  style?: object;
  size?: "small" | "normal" | "extrasmall" | "round";
  type?: "rounded" | "squared" | "outline";
  icon?: React.ReactNode;
  margin?: string;
  shadow?: boolean;
  loading?: boolean;
}

const Button: React.FC<Props> = ({
  title,
  color,
  textColor,
  borderColor,
  onPress,
  style,
  size = "normal",
  type,
  icon,
  margin,
  shadow,
  loading = false,
  ...rest
}) => {
  const getLoadingColor = (): string => {
    if (color === "primary") return colors.white;
    return colors.blue01;
  };

  return (
    <Container
      style={style}
      color={color}
      borderColor={borderColor}
      onPress={onPress}
      size={size}
      type={type}
      margin={margin}
      shadow={shadow}
      {...rest}
    >
      <Content>
        {loading ? (
          <ActivityIndicator animating={loading} color={getLoadingColor()} />
        ) : (
          <>
            {icon || null}
            {title && (
              <Text color={color} textColor={textColor} size={size}>
                {title}
              </Text>
            )}
          </>
        )}
      </Content>
    </Container>
  );
};

export default Button;
