import React, { useCallback, useEffect, useState } from "react";
import { Alert, StatusBar } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import Moment from "moment";
import { useTheme } from "styled-components";

import { HighlightCard } from "../../components/HighlightCard";
import {
  TransactionCard,
  TransactionCardDataProps,
} from "../../components/TransactionCard";

import {
  Container,
  Header,
  UserWrapper,
  UserInfo,
  Photo,
  User,
  UserGreetting,
  UserName,
  Icon,
  HighlightCards,
  Transactions,
  Title,
  TransactionsList,
  LogoutButton,
} from "./styles";

export interface DataListProps extends TransactionCardDataProps {
  id: string;
}

export const Dashboard = () => {
  const theme = useTheme();
  const [transactions, setTransactions] = useState<DataListProps[]>([]);
  const collectionKey = `@gofinances:transactions`;

  const loadTransactions = async () => {
    let entriesSum = 0;
    let expensivesSum = 0;

    try {
      const transactions = await AsyncStorage.getItem(collectionKey);
      const parsedTransactions = transactions ? JSON.parse(transactions) : [];

      const formattedTransactions: DataListProps[] = parsedTransactions.map(
        (item: DataListProps) => {
          if (item.type === "positive") {
            entriesSum += Number(item.amount);
          } else {
            expensivesSum += Number(item.amount);
          }

          const amount = item.amount;

          Moment.locale("pt-br");
          const format = "DD MMM YYYY";
          const timezone = "America/Bahia";
          const date = Moment(item.date);
          const dateFormated = date
            .tz(timezone)
            .format(format)
            .toLocaleUpperCase();

          return {
            id: item.id,
            name: item.name,
            amount,
            date: dateFormated,
            type: item.type,
            category: item.category,
          };
        }
      );

      setTransactions(formattedTransactions);
    } catch (error) {
      console.log(error);

      Alert.alert("Erro ao carregar as transações");
    }
  };

  useEffect(() => {
    loadTransactions();
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadTransactions();
    }, [])
  );

  return (
    <Container>
      <StatusBar backgroundColor={theme.colors.primary} />

      <Header>
        <UserWrapper>
          <UserInfo>
            <Photo
              source={{
                uri: "https://avatars.githubusercontent.com/u/49213782?v=4",
              }}
            />
            <User>
              <UserGreetting> Olá, </UserGreetting>
              <UserName>Jonatas</UserName>
            </User>
          </UserInfo>

          <LogoutButton onPress={() => {}}>
            <Icon name="power" />
          </LogoutButton>
        </UserWrapper>
      </Header>

      <HighlightCards>
        <HighlightCard
          type="up"
          title="Entrada"
          amount="R$ 17.400,00"
          lastTransaction="Última entrada dia 13 de abril"
        />
        <HighlightCard
          type="down"
          title="Saídas"
          amount="R$ 1.259,00"
          lastTransaction="Última saída dia 03 de abril"
        />
        <HighlightCard
          type="total"
          title="Total"
          amount="R$ 16.141,00"
          lastTransaction="01 à 16 de abril"
        />
      </HighlightCards>

      <Transactions>
        <Title>Listagem</Title>
        <TransactionsList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <TransactionCard data={item} />}
        />
      </Transactions>
    </Container>
  );
};
