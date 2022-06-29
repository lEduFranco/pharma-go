import React, { useState, useCallback } from "react";
import { TextInputProps, Animated } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import colors from "../../config/colors";
import { Container, Label, TextInput } from "./styles";

interface Props extends TextInputProps {
  type?: string;
  label?: string;
  numberOfLines: number;
  placeholderTextColor?: "gray" | "white";
  noBorder?: boolean;
  noBold?: boolean;
  onChange: (arg: string) => string;
  error?: boolean;
  disabled?: boolean;
}

const InputArea: React.FC<Props> = ({
  type = "square",
  label,
  numberOfLines,
  placeholderTextColor,
  noBorder,
  noBold,
  onChange,
  error = false,
  disabled = false,
  ...rest
}) => {
  const ORIGINAL_COLOR = colors.gray;
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

  const borderBottomColor = interpolatedColor.interpolate({
    inputRange: [ORIGINAL_VALUE, SUCCESS_VALUE],
    outputRange: [ORIGINAL_COLOR, FOCUS_COLOR],
  });

  return (
    <Container
      type={type}
      hasFocus={hasFocus}
      style={error ? {} : { borderBottomColor }}
      numberOfLines={numberOfLines}
      noBorder={noBorder}
      error={error}
      disabled={disabled}
    >
      <ScrollView style={{ flex: 1 }}>
        {label && <Label>{label}</Label>}
        <TextInput
          multiline
          numberOfLines={numberOfLines}
          placeholderTextColor={
            placeholderTextColor === "gray"
              ? colors.gray
              : placeholderTextColor === "white"
              ? colors.white
              : colors.blue02
          }
          selectionColor={colors.blue02}
          onBlur={(): void => onBlur()}
          onFocus={(): void => onFocus()}
          type={type}
          noBold={noBold}
          onChange={(e): string => onChange(e.nativeEvent.text)}
          editable={!disabled}
          {...rest}
        />
      </ScrollView>
    </Container>
  );
};

export default InputArea;
