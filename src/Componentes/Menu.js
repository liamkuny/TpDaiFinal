import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, Button, StyleSheet } from "react-native";

const Menu = ({ navigation }) => {
  const [menu, setMenu] = useState([]);
  const [precioAcumulado, setPrecioAcumulado] = useState(0);
  const [healthScorePromedio, setHealthScorePromedio] = useState(0);

  useEffect(() => {
    actualizarEstadisticas();
  }, [menu]);

  const actualizarEstadisticas = () => {
    let acumulado = 0;
    let totalHealthScore = 0;

    menu.forEach((plato) => {
      acumulado += plato.precio || 0;
      totalHealthScore += plato.healthScore || 0;
    });

    const promedio = menu.length > 0 ? totalHealthScore / menu.length : 0;

    setPrecioAcumulado(acumulado);
    setHealthScorePromedio(promedio);
  };

  const eliminarDelMenu = (platoId) => {
    const nuevoMenu = menu.filter((plato) => plato.id !== platoId);
    setMenu(nuevoMenu);
  };

  const verDetalle = (plato) => {
    navigation.navigate("Plato", { plato });
  };

  const irABusqueda = () => {
    navigation.navigate("Busqueda", { agregarAlMenu: agregarAlMenu });
  };

  const agregarAlMenu = (plato) => {
    if (menu.length < 4 && (plato.vegano ? contarVeganos() < 2 : contarNoVeganos() < 2)) {
      setMenu([...menu, plato]);
    } else {
      alert("No se puede agregar más platos al menú.");
    }
  };

  const contarVeganos = () => {
    return menu.filter((plato) => plato.vegano).length;
  };

  const contarNoVeganos = () => {
    return menu.filter((plato) => !plato.vegano).length;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Menú:</Text>
      <Text style={styles.info}>Precio Acumulado: ${precioAcumulado}</Text>
      <Text style={styles.info}>Promedio de HealthScore: {healthScorePromedio.toFixed(2)}</Text>
      <FlatList
        data={menu}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => verDetalle(item)}>
            <View style={styles.platoItem}>
              <Text>{item.nombre}</Text>
              <TouchableOpacity onPress={() => eliminarDelMenu(item.id)}>
                <Text style={styles.eliminarTexto}>Eliminar del Menú</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
      />
      <Button title="Ir a Búsqueda" onPress={irABusqueda} />
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
  info:
  {
    
    fontSize: 15,
    width: 225,
    fontWeight: "bold",
    
  },
  platoItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderColor: "gray",
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    width: "80%",
  },
  eliminarTexto: {
    color: "red",
  },
});

export default Menu;