import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import AuthSelector from "../pages/Auth/AuthSelector";
import SignSelector from "../pages/Auth/SignSelector";
import ForgotPassword from "../pages/Auth/SignSelector/ForgotPassword";

const Auth = createStackNavigator();

const AuthRoutes: React.FC = () => (
  <Auth.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Auth.Screen name="AuthSelector" component={AuthSelector} />
    <Auth.Screen name="SignSelector" component={SignSelector} />
    <Auth.Screen name="ForgotPassword" component={ForgotPassword} />
  </Auth.Navigator>
);

export default AuthRoutes;
