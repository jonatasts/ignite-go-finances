import React, { useState } from "react";
import { Alert, Keyboard, Modal, TouchableWithoutFeedback } from "react-native";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import { CategorySelect } from "../CategorySelect";

import { Button } from "../../components/Forms/Button";
import { CategorySelectButton } from "../../components/Forms/CategorySelectButton";
import { TransactionButton } from "../../components/Forms/TransactionButton";
import { InputForm } from "../../components/Forms/InputForm";

import {
  Container,
  Title,
  Header,
  Form,
  Fields,
  TransactionsContainer,
} from "./styles";

interface FormData {
  name: string;
  amount: string;
}

const schema = Yup.object().shape({
  name: Yup.string().required("Nome é obrigatório"),
  amount: Yup.number()
    .typeError("Informe um valor númerico")
    .positive("O valor não pode ser negativo")
    .required("O valor é obrigatório"),
});

export const Register = () => {
  const [transactionType, setTransactionType] = useState<string>("");
  const [categoryModalOpen, setCategoryModalOpen] = useState<boolean>(false);
  const [category, setCategory] = useState({
    key: "category",
    name: "Categoria",
    icon: "",
    color: "",
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleRegister = async (form: Partial<FormData>) => {
    if (!transactionType) {
      return Alert.alert("Selecione o tipo da transação");
    }
    if (category.key === "category") {
      return Alert.alert("Selecione alguma categoria");
    }

    const data = {
      name: form.name,
      amount: form.amount,
      transactionType,
      category: category.key,
    };

    console.log(data);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <Header>
          <Title>Cadastro</Title>
        </Header>

        <Form>
          <Fields>
            <InputForm
              autoCapitalize="sentences"
              autoCorrect={false}
              control={control}
              error={errors.name && errors.name.message}
              name="name"
              placeholder="Nome"
            />

            <InputForm
              error={errors.amount && errors.amount.message}
              control={control}
              keyboardType="numeric"
              name="amount"
              placeholder="Valor"
            />

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
              category={category}
              onPress={() => setCategoryModalOpen(true)}
            />
          </Fields>

          <Button onPress={handleSubmit(handleRegister)} title="Salvar" />
        </Form>

        <Modal animationType="slide" visible={categoryModalOpen}>
          <CategorySelect
            category={category}
            setCategory={setCategory}
            closeSelectCategory={() => setCategoryModalOpen(false)}
          />
        </Modal>
      </Container>
    </TouchableWithoutFeedback>
  );
};
