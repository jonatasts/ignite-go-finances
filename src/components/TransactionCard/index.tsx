import React from "react";
import { categories } from "../../utils/categories";
import {
  Amount,
  Category,
  CategoryName,
  Container,
  Date,
  Footer,
  Icon,
  Title,
} from "./styles";

export interface TransactionCardDataProps {
  type: "positive" | "negative";
  name: string;
  amount: string;
  category: string;
  date: string;
}

export interface TransactionCardProps {
  data: TransactionCardDataProps;
}

export const TransactionCard = ({ data }: TransactionCardProps) => {
  const category = categories.find(
    (category) => category.key === data.category
  );

  return (
    <Container>
      <Title>{data.name}</Title>

      <Amount type={data.type}>
        {data.type === "positive" ? data.amount : `- ${data.amount}`}
      </Amount>

      <Footer>
        <Category>
          <Icon name={category && category.icon} />
          <CategoryName>{category && category.name}</CategoryName>
        </Category>

        <Date>{data.date}</Date>
      </Footer>
    </Container>
  );
};
