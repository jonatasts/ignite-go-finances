import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled(TouchableOpacity).attrs({
  activeOpacity: 0.8,
})<TouchableOpacityProps>`
  background-color: ${({ theme, disabled }) =>
    disabled ? theme.colors.text : theme.colors.secondary};
  width: 100%;
  justify-content: center;
  align-items: center;
  padding: 18px;
  border-radius: 5px;
  margin-top: 16px;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.shape};
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.medium};
`;
