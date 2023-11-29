import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const DetallePlato = ({ route }) => {
  const { plato } = route.params;

  console.log(plato)
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>{plato.title}</Text>
      <Image source={{ uri: plato.image }} style={styles.imagen} />
      <Text style={styles.info}>Precio: ${plato.price}</Text>
      <Text style={styles.info}>Health Score: {plato.healthScore}</Text>
      <Text style={styles.info}>{plato.vegan ? "Vegano" : "No Vegano"}</Text>
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
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  imagen: {
    width: 200,
    height: 200,
    resizeMode: "cover",
    marginBottom: 10,
  },
  info: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default DetallePlato;
