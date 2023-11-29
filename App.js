import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import Login from "./src/Componentes/Login";
import Menu from "./src/Componentes/Menu";
import Busqueda from "./src/Componentes/Busqueda";
import Plato from "./src/Componentes/Plato";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ title: "Login" }}
          />
          <Stack.Screen
            name="Busqueda"
            component={Busqueda}
            options={{ title: "Busqueda de Platos" }}
          />
          <Stack.Screen
            name="Menu"
            component={Menu}
            options={{ title: "Menu" }}
          />
          <Stack.Screen
            name="Plato"
            component={Plato}
            options={{ title: "Plato" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});