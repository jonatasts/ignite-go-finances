import React from "react";
import { Button } from "../../components/Forms/Button";
import { Input } from "../../components/Forms/Input";
import {
  Container,
  Title,
  Header,
  // Form,
  // Fields,
  // TransactionsTypes
} from "./styles";

export const Register = () => {
  return (
    <Container>
      <Header>
        <Title>Cadastro</Title>
      </Header>

      <Input placeholder="Nome" />

      <Input placeholder="Preço" />

      <Button title="Enviar" onPress={() => {}} />
    </Container>
  );
};
