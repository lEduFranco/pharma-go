import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import AppRoutes from "./app.routes";
import AuthRoutes from "./auth.routes";

const Stack = createStackNavigator();

const Routes: React.FC = () => {
  const userId = useSelector(
    (state: { user: { id: object } }) => state.user.id
  );

  const [user, setUser] = useState(userId);

  useEffect(() => {
    setUser(userId);
  }, [userId]);

  return (
    <NavigationContainer independent>
      <Stack.Navigator
        initialRouteName="Auth"
        screenOptions={{
          gestureEnabled: false,
        }}
      >
        {user ? (
          <Stack.Screen
            name="App"
            component={AppRoutes}
            options={{ headerShown: false }}
          />
        ) : (
          <Stack.Screen
            name="Auth"
            component={AuthRoutes}
            options={{ headerShown: false }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
