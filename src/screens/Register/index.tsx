import React, { useState } from "react";
import { Button } from "../../components/Forms/Button";
import { Input } from "../../components/Forms/Input";
import { TransactionButton } from "../../components/Forms/TransactionButton";

import {
  Container,
  Title,
  Header,
  Form,
  Fields,
  TransactionsContainer,
} from "./styles";

export const Register = () => {
  const [transactionType, setTransactionType] = useState<string>("");

  return (
    <Container>
      <Header>
        <Title>Cadastro</Title>
      </Header>

      <Form>
        <Fields>
          <Input placeholder="Nome" />

          <Input placeholder="Preço" />

          <TransactionsContainer>
            <TransactionButton
              title="Income"
              isActive={transactionType === 'positive'}
              type={"up"}
              onPress={() => setTransactionType("positive")}
            />

            <TransactionButton
              title="Income"
              isActive={transactionType === 'negative'}
              type={"down"}
              onPress={() => setTransactionType("negative")}
            />
          </TransactionsContainer>
        </Fields>

        <Button title="Enviar" onPress={() => {}} />
      </Form>
    </Container>
  );
};
