import React, { useState } from "react";
import { Animated } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

import moment from "moment";
import "moment/locale/pt-br";

import colors from "../../config/colors";
import { Container, Placeholder, Label, Value } from "./styles";

moment.locale("pt-br");

interface Props {
  value: Date;
  mode: "datetime" | "time" | "date";
  label?: string;
  placeholder?: string;
  white?: boolean;
  blue?: boolean;
  noBorder?: boolean;
  containerStyle?: object;
  noBold?: boolean;
  fullBordered?: boolean;
  icon?: Node;
  onChange: (arg: Date) => Date;
  disabled?: boolean;
  darkLabel?: boolean;
}

const DatePicker: React.FC<Props> = ({
  value,
  mode = "datetime",
  label,
  placeholder,
  white,
  noBorder,
  containerStyle,
  noBold,
  fullBordered,
  onChange,
  disabled = false,
  darkLabel = false,
}) => {
  const ORIGINAL_COLOR = white ? colors.white : colors.gray;
  const FOCUS_COLOR = colors.blue02;
  const ORIGINAL_VALUE = 0;
  const SUCCESS_VALUE = 1;

  const [hasFocus, setHasFocus] = useState(false);
  const [interpolatedColor] = useState(new Animated.Value(ORIGINAL_VALUE));

  const borderColor = interpolatedColor.interpolate({
    inputRange: [ORIGINAL_VALUE, SUCCESS_VALUE],
    outputRange: [ORIGINAL_COLOR, FOCUS_COLOR],
  });

  const hideDatePicker = (): void => {
    setHasFocus(false);
  };

  const handleConfirm = (): void => {
    hideDatePicker();
  };

  return (
    <Container
      hasFocus={hasFocus}
      style={{ ...containerStyle, borderColor }}
      white={white}
      noBorder={noBorder}
      fullBordered={fullBordered}
      disabled={disabled}
      onTouchStart={(): void => setHasFocus(true)}
    >
      {placeholder && !value && <Placeholder>{placeholder}</Placeholder>}
      {label && (
        <Label gray={!darkLabel} noBold={noBold}>
          {label}
        </Label>
      )}
      {value && (
        <Value gray={darkLabel} noBold={noBold}>
          {mode === "datetime"
            ? moment.utc(value).local().format("LLL")
            : mode === "date"
            ? moment.utc(value).local().format("LL")
            : moment.utc(value).local().format("LT")}
        </Value>
      )}
      <DateTimePickerModal
        isVisible={hasFocus}
        mode={mode}
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        onChange={(e: Date): void => {
          console.log("---------- e ----------");
          console.log(e);
          console.log("---------- e ----------");
          onChange(e);
        }}
        cancelTextIOS="Cancelar"
        confirmTextIOS="Confirmar"
        date={value}
        headerTextIOS="Selecione data e hora"
        // pickerContainerStyleIOS={{
        //   display: "flex",
        //   alignItems: "center",
        //   justifyContent: "center",
        // }}
        display="spinner"
      />
    </Container>
  );
};

export default DatePicker;
