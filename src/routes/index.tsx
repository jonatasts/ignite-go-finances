import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AuthRoutes } from "./auth.routes";
import { AppRoutes } from "./app.routes";
import { useAuthContext } from "../contexts/AuthContext";
import * as SplashScreen from "expo-splash-screen";

export const Routes = () => {
  const { isUserStorageLoading, user } = useAuthContext();

  async function hideSplash() {
    await SplashScreen.hideAsync();
  }

  useEffect(() => {
    if (!isUserStorageLoading) {
      hideSplash();
    }
  }, [isUserStorageLoading]);

  if (!isUserStorageLoading) {
    return (
      <NavigationContainer>
        {user.id ? <AppRoutes /> : <AuthRoutes />}
      </NavigationContainer>
    );
  }

  //TODO: show splash screen
  return <></>;
};
