import React, { useState } from "react";
import { Modal } from "react-native";

import { CategorySelect } from "../CategorySelect";

import { Button } from "../../components/Forms/Button";
import { CategorySelectButton } from "../../components/Forms/CategorySelectButton";
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
  const [categoryModalOpen, setCategoryModalOpen] = useState<boolean>(false);
  const [category, setCategory] = useState({
    key: "category",
    name: "Categoria",
  });

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
              isActive={transactionType === "positive"}
              type={"up"}
              onPress={() => setTransactionType("positive")}
            />

            <TransactionButton
              title="Income"
              isActive={transactionType === "negative"}
              type={"down"}
              onPress={() => setTransactionType("negative")}
            />
          </TransactionsContainer>

          <CategorySelectButton
            category={"Categoria"}
            onPress={() => setCategoryModalOpen(true)}
          />
        </Fields>

        <Button title="Enviar" onPress={() => {}} />
      </Form>

      <Modal animationType="slide" visible={categoryModalOpen}>
        <CategorySelect
          category={category}
          setCategory={setCategory}
          closeSelectCategory={() => setCategoryModalOpen(false)}
        />
      </Modal>
    </Container>
  );
};
