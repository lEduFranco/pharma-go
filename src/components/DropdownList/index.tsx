import React, { useState, useCallback } from "react";
import { Animated, StyleSheet } from "react-native";
import RNPickerSelect from "react-native-picker-select";

// import { read } from "store/storages/localStorage";

import ArrowIcon from "../../assets/images/icn_back_dark-1.png";
import colors from "../../config/colors";
import { Container, TouchableContainer, Label, Icon } from "./styles";

interface DropdownListProps {
  selected: string;
  setSelected: (value: string) => void;
  items: { label: string; value: string }[];
  placeholder: string;
  type?: "rounded" | "square";
  placeholderTextColor?: "primary" | "secondary" | "warning" | "white";
  disabled?: boolean;
  label?: string;
  noBorder?: boolean;
  noBold?: boolean;
  error?: boolean;
  singleLine?: boolean;
}

const DropdownList: React.FC<DropdownListProps> = ({
  selected,
  setSelected,
  items,
  placeholder,
  placeholderTextColor,
  disabled = false,
  label,
  noBorder,
  noBold,
  error = false,
  singleLine = false,
  ...rest
}) => {
  const ORIGINAL_COLOR = colors.gray;
  const FOCUS_COLOR = colors.blue02;
  const ORIGINAL_VALUE = 0;
  const SUCCESS_VALUE = 1;

  const [hasFocus, setHasFocus] = useState(false);
  const [interpolatedColor] = useState(new Animated.Value(ORIGINAL_VALUE));

  const onBlur = useCallback(() => {
    Animated.timing(interpolatedColor, {
      duration: 400,
      toValue: ORIGINAL_VALUE,
    }).start();
    setHasFocus(false);
  }, [interpolatedColor]);

  const onFocus = useCallback(() => {
    Animated.timing(interpolatedColor, {
      duration: 400,
      toValue: SUCCESS_VALUE,
    }).start();
    setHasFocus(true);
  }, [interpolatedColor]);

  const borderBottomColor = interpolatedColor.interpolate({
    inputRange: [ORIGINAL_VALUE, SUCCESS_VALUE],
    outputRange: [ORIGINAL_COLOR, FOCUS_COLOR],
  });

  const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
      fontSize: 14,
      paddingVertical: 0,
      paddingHorizontal: 0,
      borderWidth: 0,
      borderColor: "transparent",
      borderRadius: 0,
      color: colors.black,
      paddingRight: 30, // to ensure the text is never behind the icon
      height: 40,
      width: "100%",
      fontWeight: noBold ? "normal" : "bold",
    },
    inputAndroid: {
      fontSize: 14,
      paddingHorizontal: 0,
      paddingVertical: 0,
      borderWidth: 0,
      borderColor: "transparent",
      borderRadius: 0,
      color: colors.black,
      paddingRight: 30, // to ensure the text is never behind the icon
      height: 40,
      width: "100%",
      fontWeight: noBold ? "normal" : "bold",
    },
  });

  return (
    <TouchableContainer
      onPress={(): void => onFocus()}
      onBlur={(): void => onBlur()}
      onFocus={(): void => onFocus()}
    >
      <Container
        hasFocus={hasFocus}
        style={borderBottomColor}
        label={label}
        noBorder={noBorder}
        error={error}
        singleLine={singleLine}
      >
        {label && <Label>{label}</Label>}
        <RNPickerSelect
          value={selected}
          onValueChange={(item): void => setSelected(item)}
          items={items}
          disabled={disabled}
          style={{
            ...pickerSelectStyles,
            iconContainer: {
              top: "45%",
              right: 12,
            },
            placeholder: {
              color: placeholderTextColor || colors.gray,
              fontSize: 14,
            },
          }}
          placeholder={{
            label: placeholder,
            value: null,
            color: colors.gray,
          }}
          Icon={(): object => {
            return <Icon source={ArrowIcon} />;
          }}
          onBlur={(): void => onBlur()}
          onFocus={(): void => onFocus()}
          {...rest}
        />
      </Container>
    </TouchableContainer>
  );
};

export default DropdownList;
