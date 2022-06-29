/* global __DEV__ */

import "react-native-gesture-handler";
import React, { useState } from "react";
import { View } from "react-native";
import { Provider } from "react-redux";

import { NavigationContainer } from "@react-navigation/native";
import { registerRootComponent, AppLoading } from "expo";
import * as Font from "expo-font";

import Routes from "./routes";
import store from "./store";
import styles from "./styles/global";

if (__DEV__) {
  import("./config/ReactotronConfig").then(() =>
    console.log("Reactotron Configured")
  );
}

const App = (): JSX.Element => {
  const [dataLoaded, setDataLoaded] = useState(false);

  const fecthFonts = (): Promise<void> => {
    return Font.loadAsync({
      "poppins-regular": require("./assets/fonts/Poppins-Regular.ttf"),
      "poppins-medium": require("./assets/fonts/Poppins-Medium.ttf"),
      "poppins-bold": require("./assets/fonts/Poppins-Bold.ttf"),
      "poppins-italic": require("./assets/fonts/Poppins-Italic.ttf"),
    });
  };

  if (!dataLoaded) {
    return (
      <AppLoading
        startAsync={fecthFonts}
        onFinish={(): void => setDataLoaded(true)}
      />
    );
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <View style={styles.container}>
          <Routes />
        </View>
      </NavigationContainer>
    </Provider>
  );
};

export default registerRootComponent(App);
