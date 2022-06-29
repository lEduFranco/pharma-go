import React, { useState, useCallback } from "react";
import { TextInputProps, Animated } from "react-native";

import colors from "../../config/colors";
import {
  Container,
  Label,
  TextInput,
  MaskedTextInput,
  Message,
  Icon,
} from "./styles";

interface Props extends TextInputProps {
  label?: string;
  message?: string;
  white?: boolean;
  blue?: boolean;
  noBorder?: boolean;
  containerStyle?: object;
  noBold?: boolean;
  fullBordered?: boolean;
  icon?: Node;
  onChange: (arg: string | undefined) => void;
  autoCorrect?: boolean;
  type?: "email" | "password" | "phone" | "cpf" | "cnpj" | "card" | "cep";
  error?: boolean;
  disabled?: boolean;
}

const Input: React.FC<Props> = ({
  label,
  message,
  white,
  blue,
  noBorder,
  containerStyle,
  noBold,
  fullBordered,
  icon,
  onChange,
  autoCorrect = false,
  type,
  error = false,
  disabled = false,
  ...rest
}) => {
  const ORIGINAL_COLOR = white ? colors.white : colors.gray;
  const FOCUS_COLOR = colors.blue02;
  const ORIGINAL_VALUE = 0;
  const SUCCESS_VALUE = 1;

  const [hasFocus, setHasFocus] = useState(false);
  const [interpolatedColor] = useState(new Animated.Value(ORIGINAL_VALUE));

  const onFocus = useCallback(() => {
    Animated.timing(interpolatedColor, {
      duration: 400,
      toValue: SUCCESS_VALUE,
    }).start();
    setHasFocus(true);
  }, [interpolatedColor]);

  const onBlur = useCallback(() => {
    Animated.timing(interpolatedColor, {
      duration: 400,
      toValue: ORIGINAL_VALUE,
    }).start();
    setHasFocus(false);
  }, [interpolatedColor]);

  const borderColor = interpolatedColor.interpolate({
    inputRange: [ORIGINAL_VALUE, SUCCESS_VALUE],
    outputRange: [ORIGINAL_COLOR, FOCUS_COLOR],
  });

  const getMaskType = (): string => {
    switch (type) {
      case "phone":
        return "cel-phone";
      case "cpf":
        return "cpf";
      case "cnpj":
        return "cnpj";
      case "card":
        return "credit-card";
      default:
        return "zip-code";
    }
  };

  const getMaskOptions = (): object => {
    switch (type) {
      case "phone":
        return {
          maskType: "BRL",
          withDDD: true,
          dddMask: "(99) ",
        };
      case "card":
        return {
          obfuscated: false,
          issuer: "amex",
        };
      default:
        return {};
    }
  };

  return (
    <Container
      hasFocus={hasFocus}
      style={{ ...containerStyle, borderColor }}
      white={white}
      noBorder={noBorder}
      fullBordered={fullBordered}
      error={error}
      disabled={disabled}
    >
      {label && <Label>{label}</Label>}
      {icon && <Icon source={icon} />}
      {type === undefined || type === "email" || type === "password" ? (
        <TextInput
          selectionColor={colors.blue02}
          onBlur={(): void => onBlur()}
          onFocus={(): void => onFocus()}
          white={white}
          placeholderTextColor={blue ? colors.blue02 : colors.gray}
          noBold={noBold}
          fullBordered={fullBordered}
          autoCorrect={autoCorrect}
          onChange={(e): void => onChange(e.nativeEvent.text)}
          secureTextEntry={type === "password"}
          keyboardType={type === "email" ? "email-address" : "default"}
          textContentType={type === "email" ? "emailAddress" : "none"}
          autoCapitalize={type === "email" ? "none" : "sentences"}
          editable={!disabled}
          {...rest}
        />
      ) : (
        <MaskedTextInput
          selectionColor={colors.blue02}
          onBlur={(): void => onBlur()}
          onFocus={(): void => onFocus()}
          white={white}
          placeholderTextColor={blue ? colors.blue02 : colors.gray}
          noBold={noBold}
          fullBordered={fullBordered}
          autoCorrect={autoCorrect}
          onChangeText={(e): void => onChange(e)}
          type={getMaskType()}
          options={getMaskOptions()}
          secureTextEntry={type === "password"}
          keyboardType={
            type === "email"
              ? "email-address"
              : type === "phone"
              ? "phone-pad"
              : type === "cpf" || type === "cnpj" || type === "card"
              ? "number-pad"
              : "default"
          }
          textContentType={
            type === "email"
              ? "emailAddress"
              : type === "phone"
              ? "telephoneNumber"
              : type === "card"
              ? "creditCardNumber"
              : type === "password"
              ? "newPassword"
              : "none"
          }
          autoCapitalize={type === "email" ? "none" : "sentences"}
          editable={!disabled}
          {...rest}
        />
      )}
      {message && <Message>{message}</Message>}
    </Container>
  );
};

export default Input;
