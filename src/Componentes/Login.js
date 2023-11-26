import React, { useState } from "react";
import { View, TextInput, Button, Text, StyleSheet, SafeAreaView } from "react-native";
import axios from "axios";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = () => {
    setLoading(true);

    if (email === "" || password === "") {
      setError("Los campos de email y contraseña son obligatorios.");
      setLoading(false);
      return;
    }

    
      axios.post("http://challenge-react.alkemy.org/", {
        email,
        password,
      })
      .then((res) => {
        if (res.status === 200) {
          setLoading(false);
          
          navigation.navigate("Menu"); 
        } else {
          setLoading(false);
          setError(res.data.message);
        }
      })
      .catch((err) => {
        setLoading(false);
        setError(err.message);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        style={styles.input}
      />
      <TextInput
        placeholder="Contraseña"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
        style={styles.input}
      />
      <Button
        title="Iniciar Sesión"
        onPress={handleSubmit}
        disabled={loading}
      />
      {error && <Text style={styles.error}>{error}</Text>}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    width: "80%",
  },
  error: {
    color: "red",
    marginTop: 10,
  },
});

export default Login;
