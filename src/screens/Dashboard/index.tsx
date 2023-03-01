import React, { useCallback, useState } from "react";
import { ActivityIndicator, Alert, StatusBar } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import moment from "moment";
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
  LoadingContainer,
} from "./styles";

interface HighlightCardDataProps {
  entries: HightlightCardData;
  expensives: HightlightCardData;
  total: HightlightCardData;
}

interface HightlightCardData {
  amount: string;
  lastTransaction: string;
}

export interface DataListProps extends TransactionCardDataProps {
  id: string;
}

const getLastTransactionDate = (
  collection: DataListProps[],
  type: "positive" | "negative"
) => {
  const transactionFilttered = collection.filter(
    (transaction) => transaction.type === type
  );

  if (transactionFilttered.length === 0) {
    return false;
  }

  const lastTransaction = new Date(
    Math.max.apply(
      Math,
      transactionFilttered.map((item) =>
        moment(item.date, "DD MMM YYYY").toDate().getTime()
      )
    )
  );

  let day = lastTransaction.getDate().toString();
  day = day.length === 1 ? "0" + day : day;

  return `${day} de ${lastTransaction.toLocaleString("pt-Br", {
    month: "long",
  })}`;
};

export const Dashboard = () => {
  const theme = useTheme();
  const collectionKey = `@gofinances:transactions`;
  const [transactions, setTransactions] = useState<DataListProps[]>([]);
  const [highlightData, setHighlightData] = useState<HighlightCardDataProps>(
    {} as HighlightCardDataProps
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
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

          const amount = Number(item.amount).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          });

          const format =
            moment(item.date).year() === moment().year()
              ? "DD MMM"
              : "DD MMM YYYY";
          const timezone = "America/Bahia";
          const date = moment(item.date);
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

      const lastTransactionsEntries = getLastTransactionDate(
        formattedTransactions,
        "positive"
      );

      const lastTransactionsExpensives = getLastTransactionDate(
        formattedTransactions,
        "negative"
      );

      const totalSum = entriesSum - expensivesSum;

      const entriesLastTransactionDescription =
        lastTransactionsEntries === false
          ? "Não há transações"
          : `Ultima entrada em ${lastTransactionsEntries}`;

      const expensivesLastTransactionDescription =
        lastTransactionsExpensives === false
          ? "Não há transações"
          : `Ultima saída em ${lastTransactionsExpensives}`;

      const totalLastTransactionDescription =
        lastTransactionsExpensives === false
          ? "Não há despesas registradas"
          : lastTransactionsExpensives.indexOf("01") === -1
          ? `01 a ${lastTransactionsExpensives}`
          : lastTransactionsExpensives;

      setHighlightData({
        entries: {
          amount: entriesSum.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          }),
          lastTransaction: entriesLastTransactionDescription,
        },
        expensives: {
          amount: expensivesSum.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          }),
          lastTransaction: expensivesLastTransactionDescription,
        },
        total: {
          amount: totalSum.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          }),
          lastTransaction: totalLastTransactionDescription,
        },
      });

      //TODO: Botão para alterar a ordem de exibição das transações
      setTransactions(formattedTransactions.reverse());
      setIsLoading(false);
    } catch (error) {
      console.log(error);

      Alert.alert("Erro ao carregar as transações");
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadTransactions();
    }, [])
  );

  return (
    <Container>
      <StatusBar backgroundColor={theme.colors.primary} />

      {isLoading ? (
        <LoadingContainer>
          <ActivityIndicator color={theme.colors.primary} size="large" />
        </LoadingContainer>
      ) : (
        <>
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
              amount={highlightData.entries.amount}
              type="up"
              lastTransaction={highlightData.entries.lastTransaction}
              title="Entradas"
            />
            <HighlightCard
              amount={highlightData.expensives.amount}
              type="down"
              lastTransaction={highlightData.expensives.lastTransaction}
              title="Saídas"
            />
            <HighlightCard
              amount={highlightData.total.amount}
              type="total"
              lastTransaction={highlightData.total.lastTransaction}
              title="Total"
            />
          </HighlightCards>

          <Transactions>
            <Title>Listagem</Title>
            <TransactionsList
              data={transactions}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => <TransactionCard data={item} />}
            />
          </Transactions>
        </>
      )}
    </Container>
  );
};
