import React from "react";
import { View, Text, FlatList, TouchableOpacity, Button, StyleSheet } from "react-native";
import { useMenu } from "../context/MenuContext";

const Menu = ({ navigation }) => {
  const { menu, precioAcumulado, healthScorePromedio, eliminarDelMenu } = useMenu();

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Menú:</Text>
      <Text style={styles.info}>Precio Acumulado: ${precioAcumulado.toFixed(2)}</Text>
      <Text style={styles.info}>Promedio de HealthScore: {healthScorePromedio.toFixed(2)}</Text>
      <FlatList
        data={menu}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.platoItem}>
            <View style={styles.infoContainer}>
              <Text style={styles.nombrePlato}>{item.title}</Text>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate("DetallePlato", { plato: item })}>
              <Text style={styles.verDetalles}>Ver Detalles</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => eliminarDelMenu(item.id)}>
              <Text style={styles.eliminarTexto}>Eliminar del Menú</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <Button title="Ir a Búsqueda" onPress={() => navigation.navigate("Busqueda")} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  titulo: {
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: 30,
  },
  info: {
    fontSize: 15,
    width: 225,
    fontWeight: "bold",
    marginBottom: 10,
  },
  platoItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderColor: "gray",
    borderWidth: 1,
    padding: 10,
    fontSize: 16,
    marginBottom: 10,
    width: 300,
  },
  infoContainer: {
    flex: 1,
  },
  nombrePlato: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  precioPlato: {
    color: "#007BFF",
    marginBottom: 5,
  },
  veganoPlato: {
    color: "green",
    marginBottom: 5,
  },
  verDetalles: {
    color: "blue",
  },
  eliminarTexto: {
    color: "red",
  },
});

export default Menu;
