import React from "react";
import { TextInputProps } from "react-native";
import { Mask } from "react-native-mask-input";
import { Container } from "./styles";

interface Props extends TextInputProps {
  active?: boolean;
  mask?: Mask | undefined;
}

export const Input = ({ active = false, mask, ...rest }: Props) => {
  return <Container active={active} {...rest} mask={mask} />;
};
