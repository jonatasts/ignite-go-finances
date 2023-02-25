import styled from "styled-components/native";
import { TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";

interface iconProps {
  color?: string;
}

export const Container = styled(TouchableOpacity).attrs({
  activeOpacity: 0.8,
})`
  align-items: center;
  background-color: ${({ theme }) => theme.colors.shape};
  border-radius: 5px;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 16px;
  padding: 18px 16px;
`;

export const Category = styled.View`
  flex-direction: row;
`;

export const Icon = styled(Feather)`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${RFValue(20)}px;
`;

export const IconCategory = styled(Feather)<iconProps>`
  color: ${({ theme, color }) => (color ? color : theme.colors.secondary)};
  font-size: ${RFValue(20)}px;
  margin-right: 7px;
`;

export const CategoryText = styled.Text`
  color: ${({ theme }) => theme.colors.text_dark};
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;
`;
