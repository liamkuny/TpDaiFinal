import { StatusBar } from "expo-status-bar";
import { StyleSheet, View} from "react-native";
import Login from './src/Componentes/Login';  
import Menu from "./src/Componentes/Menu.js";
import Busqueda from "./src/Componentes/Busqueda.js";
import Plato from "./src/Componentes/Plato.js";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <View>
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
            name="Home"
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
  }
});