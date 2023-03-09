import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AuthRoutes } from "./auth.routes";
import { AppRoutes } from "./app.routes";
import { useAuthContext } from "../contexts/AuthContext";

export const Routes = () => {
  const { isUserStorageLoading, user } = useAuthContext();  

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
