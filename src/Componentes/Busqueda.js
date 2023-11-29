import React, { useState } from "react";
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import axios from "axios";

const Busqueda = ({ navigation, route }) => {
  const [filtro, setFiltro] = useState("");
  const [resultados, setResultados] = useState([]);

  const buscarPlatos = () => {
    if (filtro.length > 2) {
      axios
        .get("https://api.spoonacular.com/recipes/complexSearch", {
          params: {
            apiKey: "1fcffc9826e745be90f1f569128f1a5c", 
            query: filtro,
          },
        })
        .then((response) => {
          setResultados(response.data.results);
        })
        .catch((error) => {
          console.error("Error al buscar platos:", error);
        });
    } else {
      setResultados([]);
    }
  };

  const agregarAlMenu = (plato) => { 
    route.params.agregarAlMenu(plato);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Buscar Platos</Text>
      <TextInput
        placeholder="Ingrese el nombre del plato"
        value={filtro}
        onChangeText={(text) => setFiltro(text)}
        style={styles.input}
      />
      <Button title="Buscar" onPress={buscarPlatos} />
      <FlatList
        data={resultados}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => agregarAlMenu(item)}>
            <View style={styles.resultadoItem}>
              <Text style={styles.resultadoItemText}>{item.title}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
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
    width: 200,
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 50,
    fontSize: 16,
  },
  resultadoItem: {
    marginTop:20,
    borderColor: "#ccc",
    borderWidth: 2,
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    width: 700,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f9f9f9",
  },
  resultadoItemText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
});

export default Busqueda;
