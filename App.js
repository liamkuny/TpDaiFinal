import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MenuProvider } from "./src/context/MenuContext";
import Login from "./src/Componentes/Login";
import Menu from "./src/Componentes/Menu";
import Busqueda from "./src/Componentes/Busqueda";
import DetallePlato from "./src/Componentes/DetallePlato";

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <MenuProvider>
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
              name="DetallePlato"
              component={DetallePlato}
              options={{ title: "Detalle del Plato" }}
            />
          </Stack.Navigator>
        </NavigationContainer>
        <StatusBar style="auto" />
      </View>
    </MenuProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "left",
    justifyContent: "center",
  },
});

export default App;
