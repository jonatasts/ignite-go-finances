import "react-native-gesture-handler";

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
import moment from "moment";

import theme from "./src/global/styles/theme";

import { Routes } from "./src/routes";

import { AuthContextProvider } from "./src/contexts/AuthContext";

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  });

  moment.locale("pt-br");

  if (!fontsLoaded) {
    //TODO: show splash screen

    return <></>;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider theme={theme}>
        <StatusBar
          backgroundColor={theme.colors.primary}
          barStyle="light-content"
        />

        <AuthContextProvider>
          <Routes />
        </AuthContextProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
