import React, { useCallback, useState } from "react";
import { ActivityIndicator } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { RFValue } from "react-native-responsive-fontsize";
import { useTheme } from "styled-components";
import { VictoryPie } from "victory-native";
import { addMonths, subMonths, format } from "date-fns";
import { ptBR } from "date-fns/locale";

import { HistoryCard } from "../../components/HistoryCard";

import { categories } from "../../utils/categories";

import {
  Container,
  Header,
  Title,
  Content,
  ChartContainer,
  MonthSelect,
  MonthSelectButton,
  MonthSelectIcon,
  Month,
  LoadingContainer,
} from "./styles";

import { useAuthContext } from "../../contexts/AuthContext";

interface TotalByCategory {
  key: string;
  name: string;
  total: number;
  totalFormatted: string;
  color: string;
  percent: string;
}

interface TransactionData {
  type: "positive" | "negative";
  name: string;
  amount: string;
  category: string;
  date: string;
}

export const Resume = () => {
  const theme = useTheme();
  const { user } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [totalByCategories, setTotalByCategories] = useState<TotalByCategory[]>(
    []
  );
  const collectionKey = `@gofinances:transactions_user:${user.id}`;

  function handleDateChange(action: "next" | "prev") {
    action === "next"
      ? setSelectedDate(addMonths(selectedDate, 1))
      : setSelectedDate(subMonths(selectedDate, 1));
  }

  async function loadData() {
    setIsLoading(true);
    const response = await AsyncStorage.getItem(collectionKey);
    const responseFormatted = response ? JSON.parse(response) : [];

    const expensives = responseFormatted.filter(
      (expensive: TransactionData) =>
        expensive.type === "negative" &&
        new Date(expensive.date).getMonth() === selectedDate.getMonth() &&
        new Date(expensive.date).getFullYear() === selectedDate.getFullYear()
    );

    const expensivesTotal = expensives.reduce(
      (accumulator: number, expensive: TransactionData) => {
        return accumulator + Number(expensive.amount);
      },
      0
    );

    const totalByCategory: TotalByCategory[] = [];

    categories.forEach((category) => {
      let categoryExpensivesSum = 0;

      expensives.forEach((expensive: TransactionData) => {
        if (category.key === expensive.category) {
          categoryExpensivesSum += Number(expensive.amount);
        }
      });

      if (categoryExpensivesSum > 0) {
        const percent = `${(
          (categoryExpensivesSum / expensivesTotal) *
          100
        ).toFixed(1)}%`;

        totalByCategory.push({
          name: category.name,
          key: category.key,
          color: category.color,
          total: categoryExpensivesSum,
          totalFormatted: categoryExpensivesSum.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          }),
          percent,
        });
      }
    });
    setTotalByCategories(totalByCategory);
    setIsLoading(false);
  }

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [selectedDate])
  );

  return (
    <Container>
      <Header>
        <Title>Resumo</Title>
      </Header>
      {isLoading ? (
        <LoadingContainer>
          <ActivityIndicator color={theme.colors.primary} size="large" />
        </LoadingContainer>
      ) : (
        <Content
          contentContainerStyle={{
            paddingHorizontal: 24,
            paddingBottom: useBottomTabBarHeight() / 2,
          }}
          showsVerticalScrollIndicator={false}
        >
          <MonthSelect>
            <MonthSelectButton onPress={() => handleDateChange("prev")}>
              <MonthSelectIcon name="chevron-left" />
            </MonthSelectButton>

            <Month>
              {format(selectedDate, "MMMM, yyyy", { locale: ptBR })}
            </Month>

            <MonthSelectButton onPress={() => handleDateChange("next")}>
              <MonthSelectIcon name="chevron-right" />
            </MonthSelectButton>
          </MonthSelect>

          <ChartContainer>
            <VictoryPie
              colorScale={totalByCategories.map((category) => category.color)}
              data={totalByCategories}
              labelRadius={90}
              style={{
                labels: {
                  fontSize: RFValue(18),
                  fontWeight: "bold",
                  fill: theme.colors.shape,
                },
              }}
              x="percent"
              y="total"
            />
          </ChartContainer>

          {totalByCategories.map((category) => {
            return (
              <HistoryCard
                title={category.name}
                amount={category.totalFormatted}
                color={category.color}
                key={category.key}
              />
            );
          })}
        </Content>
      )}
    </Container>
  );
};
