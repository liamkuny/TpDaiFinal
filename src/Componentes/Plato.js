import React from "react";
import { View, Text, Image, Button, StyleSheet } from "react-native";

const Plato = ({ route, navigation }) => {
  const { plato } = route.params;

  const agregarAlMenu = () => {
    route.params.agregarAlMenu(plato);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Detalle del Plato</Text>
      <Image source={{ uri: plato.imagen }} style={styles.imagen} />
      <Text>Nombre: {plato.nombre}</Text>
      <Text>Precio: ${plato.precio}</Text>
      <Text>HealthScore: {plato.healthScore}</Text>
      <Button title="Agregar al Menú" onPress={agregarAlMenu} />
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
    marginBottom: 10,
  },
});

export default Plato;