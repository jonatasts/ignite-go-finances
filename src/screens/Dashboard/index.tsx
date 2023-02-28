import React, { useCallback, useEffect, useState } from "react";
import { Alert, StatusBar } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import Moment from "moment";
import { useTheme } from "styled-components";
import { formatCurrency } from "react-native-format-currency";

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
        Moment(item.date, "DD MMM YYYY").toDate().getTime()
      )
    )
  );

  const format = "MMMM";
  const timezone = "America/Bahia";
  const date = Moment(lastTransaction);
  const dateFormated = date.tz(timezone).format(format);

  return `${lastTransaction.getDate()} de ${dateFormated}`;
};

const removeFormattedValue = (value: string) => {
  let amountFormatted = value.substring(3).replace(".", "");
  amountFormatted = amountFormatted.replace(",", ".");

  return amountFormatted;
};

export const Dashboard = () => {
  const theme = useTheme();
  const [transactions, setTransactions] = useState<DataListProps[]>([]);
  const [highlightData, setHighlightData] = useState<HighlightCardDataProps>();
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
            entriesSum += Number(removeFormattedValue(item.amount));
          } else {
            expensivesSum += Number(removeFormattedValue(item.amount));
          }
          const amount = item.amount;

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

      const totalSum = entriesSum - expensivesSum;

      const lastTransactionsEntries = getLastTransactionDate(
        formattedTransactions,
        "positive"
      );

      const lastTransactionsExpensives = getLastTransactionDate(
        formattedTransactions,
        "negative"
      );

      //TODO: Refatorar o intervalo
      const totalInterval =
        lastTransactionsExpensives === false
          ? "Não há transações"
          : `01 a ${lastTransactionsExpensives}`;

      let [entriesSumWithSymbol] = formatCurrency({
        amount: entriesSum,
        code: "BRL",
      });

      entriesSumWithSymbol =
        entriesSumWithSymbol.indexOf(",") !== -1 &&
        entriesSumWithSymbol.split(",")[1].length === 1
          ? `${entriesSumWithSymbol}0`
          : entriesSumWithSymbol;

      let [expensivesSumWithSymbol] = formatCurrency({
        amount: expensivesSum,
        code: "BRL",
      });

      expensivesSumWithSymbol =
        expensivesSumWithSymbol.indexOf(",") !== -1 &&
        expensivesSumWithSymbol.split(",")[1].length === 1
          ? `${expensivesSumWithSymbol}0`
          : expensivesSumWithSymbol;

      let [totalSumWithSymbol] = formatCurrency({
        amount: totalSum,
        code: "BRL",
      });

      totalSumWithSymbol =
        totalSumWithSymbol.indexOf(",") !== -1 &&
        totalSumWithSymbol.split(",")[1].length === 1
          ? `${totalSumWithSymbol}0`
          : totalSumWithSymbol;

      setHighlightData({
        entries: {
          amount:
            entriesSumWithSymbol.indexOf(",") !== -1
              ? entriesSumWithSymbol
              : `${entriesSumWithSymbol},00`,
          lastTransaction:
            lastTransactionsEntries === false
              ? "Não há transações"
              : `Ultima entrada dia ${lastTransactionsEntries}`,
        },
        expensives: {
          amount:
            expensivesSumWithSymbol.indexOf(",") !== -1
              ? expensivesSumWithSymbol
              : `${expensivesSumWithSymbol},00`,
          lastTransaction:
            lastTransactionsExpensives === false
              ? "Não há transações"
              : `Ultima saída dia ${lastTransactionsExpensives}`,
        },
        total: {
          amount:
            totalSumWithSymbol.indexOf(",") !== -1
              ? totalSumWithSymbol
              : `${totalSumWithSymbol},00`,
          lastTransaction: totalInterval,
        },
      });

      setTransactions(formattedTransactions);
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
        {highlightData && (
          <HighlightCard
            // amount={""}
            amount={highlightData.entries.amount}
            type="up"
            // lastTransaction={""}
            lastTransaction={highlightData.entries.lastTransaction}
            title="Entradas"
          />
        )}
        {highlightData && (
          <HighlightCard
            // amount={""}
            amount={highlightData.expensives.amount}
            type="down"
            // lastTransaction={""}
            lastTransaction={highlightData.expensives.lastTransaction}
            title="Saídas"
          />
        )}
        {highlightData && (
          <HighlightCard
            // amount={""}
            amount={highlightData.total.amount}
            type="total"
            // lastTransaction={""}
            lastTransaction={highlightData.total.lastTransaction}
            title="Total"
          />
        )}
      </HighlightCards>

      <Transactions>
        <Title>Listagem</Title>
        <TransactionsList
          data={transactions}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <TransactionCard data={item} />}
        />
      </Transactions>
    </Container>
  );
};
