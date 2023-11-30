import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const MenuContext = createContext();

export const MenuProvider = ({ children }) => {
  const [menu, setMenu] = useState([]);
  const [precioAcumulado, setPrecioAcumulado] = useState(0);
  const [healthScorePromedio, setHealthScorePromedio] = useState(0);

  useEffect(() => {
    actualizarEstadisticas();
  }, [menu]);

  const agregarAlMenu = (plato) => {
    if ((plato.vegan? contarVeganos() < 2 : contarNoVeganos() < 2)) {
      setMenu([...menu, plato]);
      actualizarEstadisticas();
    } else {
      alert("No se puede agregar más platos al menú.");
    }
  };

  const eliminarDelMenu = (platoId) => {
    const nuevoMenu = menu.filter((plato) => plato.id !== platoId);
    setMenu(nuevoMenu);
    actualizarEstadisticas();
  };

  const actualizarEstadisticas = () => {
    let acumulado = 0;
    let totalHealthScore = 0;

    menu.forEach((plato) => {
      acumulado += plato.pricePerServing ; 
      totalHealthScore += plato.healthScore;
    });

    const promedio = menu.length > 0 ? totalHealthScore / menu.length : 0;

    setPrecioAcumulado(acumulado);
    setHealthScorePromedio(promedio);
  };

  const contarVeganos = () => {
    return menu.filter((plato) => plato.vegano).length;
  };

  const contarNoVeganos = () => {
    return menu.filter((plato) => !plato.vegano).length;
  };

  const buscarPlatos = async (filtro) => {
    try {
      if (filtro.length > 2) {
        const response = await axios.get("https://api.spoonacular.com/recipes/complexSearch", {
          params: {
            apiKey: "1fcffc9826e745be90f1f569128f1a5c",
            query: filtro,
          },
        });
        const platosConDetalles = await Promise.all(
          response.data.results.map(async (plato) => {
            const detallePlato = await axios.get(
              `https://api.spoonacular.com/recipes/${plato.id}/information`,
              {
                params: {
                  apiKey: "1fcffc9826e745be90f1f569128f1a5c",
                },
              }
            );
            return detallePlato.data;
          })
        );
  
        return platosConDetalles;
      } else {
        return [];
      }
    } catch (error) {
      console.error("Error al buscar platos:", error);
      return [];
    }
  };
  

  return (
    <MenuContext.Provider
      value={{
        menu,
        precioAcumulado,
        healthScorePromedio,
        agregarAlMenu,
        eliminarDelMenu,
        buscarPlatos,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};

export const useMenu = () => {
  return useContext(MenuContext);
};
