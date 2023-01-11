import React from "react";
import {
  Container,
  Header,
  Title,
  Icon,
  Content,
  Amount,
  LastTransaction,
} from "./styles";

interface HighlightCardProps {
  title: string;
  amount: string;
  lastTransaction: string;
  type: "up" | "down" | "total";
}

const icon = {
  up: "arrow-up-circle",
  down: "arrow-down-circle",
  total: "dollar-sign",
};

export const HighlightCard = ({
  title,
  amount,
  lastTransaction,
  type,
}: HighlightCardProps) => {
  return (
    <Container cardType={type}>
      <Header>
        <Title cardType={type}>{title}</Title>
        <Icon name={icon[type]} cardType={type} />
      </Header>

      <Content cardType={type}>
        <Amount cardType={type}>{amount}</Amount>
        <LastTransaction cardType={type}>{lastTransaction}</LastTransaction>
      </Content>
    </Container>
  );
};
