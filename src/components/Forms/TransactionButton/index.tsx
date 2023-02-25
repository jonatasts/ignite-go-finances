import React from "react";
import { TouchableOpacityProps } from "react-native";
import { Container, Icon, Title, Button } from "./styles";

const icons = {
  up: "arrow-up-circle",
  down: "arrow-down-circle",
};

interface TransactionsTypeButtonProps extends TouchableOpacityProps {
  isActive: boolean;
  title: string;
  type: "up" | "down";
}

export const TransactionButton = ({
  isActive,
  title,
  type,
  ...rest
}: TransactionsTypeButtonProps) => {
  return (
    <Container isActive={isActive} type={type}>
      <Button {...rest}>
        <Icon name={icons[type]} type={type} />
        <Title>{title}</Title>
      </Button>
    </Container>
  );
};
