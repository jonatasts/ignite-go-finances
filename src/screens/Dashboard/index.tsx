import { StatusBar } from "react-native";
import { useTheme } from "styled-components";

import {
  Container,
  Header,
  UserWrapper,
  UserInfo,
  Photo,
  User,
  UserGreetting,
  UserName,
} from "./styles";

export const Dashboard = () => {
  const theme = useTheme();

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
        </UserWrapper>
      </Header>
    </Container>
  );
};
