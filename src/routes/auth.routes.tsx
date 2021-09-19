import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { SignIn } from "../screens/SignIn";

import { theme } from "../global/styles/theme";

const Stack = createNativeStackNavigator();

export function AuthRoutes() {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false,
      contentStyle: {
        backgroundColor: theme.colors.secondary100,
      },
    }}>
      <Stack.Screen name="SignIn" component={SignIn} />
    </Stack.Navigator>
  );
}