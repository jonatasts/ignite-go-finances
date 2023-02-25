import React from "react";
import { TouchableOpacityProps } from "react-native";
import { Category as CategoryType } from "../../../screens/CategorySelect";
import {
  Container,
  Category,
  Icon,
  IconCategory,
  CategoryText,
} from "./styles";

interface CategorySelectProps extends TouchableOpacityProps {
  category: CategoryType;
}

export const CategorySelectButton = ({
  activeOpacity,
  category,
  ...rest
}: CategorySelectProps) => {
  return (
    <Container {...rest}>
      <Category>
        {category.key !== "category" && <IconCategory name={category.icon} color={category.color}/>}

        <CategoryText>{category.name}</CategoryText>
      </Category>
      <Icon name="chevron-down" />
    </Container>
  );
};
