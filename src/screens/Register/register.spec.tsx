import React from "react";
import { fireEvent, render, waitFor } from "@testing-library/react-native";
import { ThemeProvider } from "styled-components/native";
import * as mockAsyncStorage from "@react-native-async-storage/async-storage/jest/async-storage-mock";
import { NavigationContainer } from "@react-navigation/native";

import { Register } from ".";
import theme from "../../global/styles/theme";
import { AuthContextProvider } from "../../contexts/AuthContext";

jest.mock("@react-native-async-storage/async-storage", () => mockAsyncStorage);

const Providers = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider theme={theme}>
    <AuthContextProvider>{children}</AuthContextProvider>
  </ThemeProvider>
);

describe("Register Screen", () => {
  it("should be open category modal when user click on the category button", async () => {
    const { getByTestId } = render(
      <NavigationContainer>
        <Register />
      </NavigationContainer>,
      { wrapper: Providers }
    );

    const categoryModal = getByTestId("modal-category");
    const buttonCategory = getByTestId("category-button");

    fireEvent.press(buttonCategory);

    await waitFor(() => {
      expect(categoryModal.props.visible).toBeTruthy();
    });
  });
});
