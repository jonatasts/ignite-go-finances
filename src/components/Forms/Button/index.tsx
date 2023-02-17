import React from "react";
import { Container, Title } from "./styles";
import { TouchableOpacityProps } from "react-native";

interface Props extends TouchableOpacityProps {
  title: string;
  onPress: () => void;
}

export const Button = ({ title, activeOpacity, ...rest }: Props) => {
  return (
    <Container {...rest}>
      <Title>{title}</Title>
    </Container>
  );
};
