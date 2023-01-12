import React from "react";
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

interface CategoryProps {
  name: string;
  icon: string;
}

export interface TransactionCardDataProps {
  type: "positive" | "negative";
  name: string;
  amount: string;
  category: CategoryProps;
  date: string;
}

export interface TransactionCardProps {
  data: TransactionCardDataProps;
}

export const TransactionCard = ({ data }: TransactionCardProps) => {
  return (
    <Container>
      <Title>{data.name}</Title>

      <Amount type={data.type}>
        {data.type === "positive" ? data.amount : `- ${data.amount}`}
      </Amount>

      <Footer>
        <Category>
          <Icon name={data.category.icon} />
          <CategoryName>{data.category.name}</CategoryName>
        </Category>

        <Date>{data.date}</Date>
      </Footer>
    </Container>
  );
};
