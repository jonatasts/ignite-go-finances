import React from "react";
import { Platform } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

import { SignInSocialButton } from "../../components/SignInSocialButton";

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
  async function handleSignInWithGoogle() {}

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
            onPress={handleSignInWithGoogle}
            title="Entrar com o Google"
            svg={GoogleSvg}
          />
          {Platform.OS === "ios" && (
            <SignInSocialButton
              onPress={handleSignInWithApple}
              title="Entrar com o Apple"
              svg={AppleSvg}
            />
          )}
        </FooterWrapper>
      </Footer>
    </Container>
  );
};
