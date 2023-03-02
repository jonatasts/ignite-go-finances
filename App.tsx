import 'react-native-gesture-handler';

import "moment-timezone";
import "moment/locale/pt-br";

import "intl";
import "intl/locale-data/jsonp/pt-BR";

import React from "react";
import { StatusBar } from "react-native";
import { ThemeProvider } from "styled-components/native";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import moment from "moment";

import theme from "./src/global/styles/theme";

import { AppRoutes } from "./src/routes/app.routes";

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  });

  moment.locale("pt-br");

  if (!fontsLoaded) {
    return <></>;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider theme={theme}>
        <NavigationContainer>
          <StatusBar backgroundColor={theme.colors.primary} />

          <AppRoutes />
        </NavigationContainer>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
