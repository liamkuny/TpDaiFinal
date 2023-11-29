import React, { useState } from "react";
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { useMenu } from "../context/MenuContext";

const Busqueda = ({}) => {
  const { buscarPlatos, agregarAlMenu } = useMenu();
  const [filtro, setFiltro] = useState("");
  const [resultados, setResultados] = useState([]);

  const handleBuscarPlatos = async () => {
    const resultados = await buscarPlatos(filtro);
    setResultados(resultados);
    
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
      <Button title="Buscar" onPress={handleBuscarPlatos} />
      <FlatList
        data={resultados}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.resultadoItem}>
            <Text style={styles.resultadoItemText}>{item.title}</Text>
            <TouchableOpacity onPress={() => agregarAlMenu(item)}>
              <Text style={styles.agregarButton}>Agregar al Menú</Text>
            </TouchableOpacity>
          </View>
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
    marginTop: 20,
    borderColor: "#ccc",
    borderWidth: 2,
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    width: 300,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f9f9f9",
  },
  resultadoItemText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  agregarButton: {
    marginTop: 10,
    color: "#007BFF",
    fontSize: 16,
  },
});

export default Busqueda;
