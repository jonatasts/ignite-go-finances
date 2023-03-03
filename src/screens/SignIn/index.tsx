import React, { useState } from "react";
import { ActivityIndicator, Alert, Platform } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { useTheme } from "styled-components";

import { SignInSocialButton } from "../../components/SignInSocialButton";
import { useAuthContext } from "../../contexts/AuthContext";

import AppleSvg from "../../assets/apple.svg";
import GoogleSvg from "../../assets/google.svg";
import LogoSvg from "../../assets/logo.svg";

import {
  Container,
  Header,
  TitleWrapper,
  Title,
  SignInTitle,
  Footer,
  FooterWrapper,
} from "./styles";

export const Signin = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { signInWithGoogle, signInWithApple } = useAuthContext();
  const theme = useTheme();

  async function handleSignInWithGoogle() {
    setIsLoading(true);
    try {
      await signInWithGoogle();
      setIsLoading(false);
    } catch (error) {
      Alert.alert("Não foi possível conectar a conta Google");
      setIsLoading(false);
    }
  }

  async function handleSignInWithApple() {}

  return (
    <Container>
      <Header>
        <TitleWrapper>
          <LogoSvg height={RFValue(68)} width={RFValue(120)} />

          <Title>
            Controle suas{"\n"}finanças de forma{"\n"}muito simples
          </Title>
        </TitleWrapper>

        <SignInTitle>Faça seu login com{"\n"}uma das contas abaixo</SignInTitle>
      </Header>

      <Footer>
        <FooterWrapper>
          <SignInSocialButton
            disabled={isLoading}
            onPress={handleSignInWithGoogle}
            title="Entrar com o Google"
            svg={GoogleSvg}
          />
          {Platform.OS === "ios" && (
            <SignInSocialButton
              disabled={isLoading}
              onPress={handleSignInWithApple}
              title="Entrar com o Apple"
              svg={AppleSvg}
            />
          )}
        </FooterWrapper>

        {isLoading && (
          <ActivityIndicator
            color={theme.colors.shape}
            style={{ marginTop: 18 }}
            size={"large"}
          />
        )}
      </Footer>
    </Container>
  );
};
