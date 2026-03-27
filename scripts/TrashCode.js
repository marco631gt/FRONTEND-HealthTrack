import React, { useState } from "react";
import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";

const GeneradorSaludos = () => {
  //Definicion de nuestros estados
  const [name, setName] = useState('');
  const [lastName, setlastName] = useState('');
  const [email, setEmail] = useState('');


  // Function to trigger the action button btn
  const handleBtnHello = () => {
    //Empty space validation
    if (name.trim() === '' || lastName.trim() === '' || email.trim() === '') {
      Alert.alert('Error', 'Please, all fields are required');
      return;
    }

    //Show alerts with hello message
    Alert.alert('Welcome:!', `Hello, ${name} and your Last Name is ${lastName} with the email ${email}`);


    //Clean
    setName('');
    setlastName('');
    setEmail('');

  }

  //Structure
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ingresa tus datos</Text>

      <TextInput
        style={styles.input}
        placeholder="Escribe tu nombre"
        value={name}
        onChangeText={setName} //Actualiza el estado de name cada vez que entra un caracter en el input
        autoCapitalize="words" //pone en mayuscula la primera letra
        // keyboardType="numeric"
        maxLength={30}
      />

      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={lastName}
        onChangeText={setlastName} //Actualiza el estado de name cada vez que entra un caracter en el input
        autoCapitalize="words" //pone en mayuscula la primera letra
        // keyboardType="numeric"
        maxLength={30}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail} //Actualiza el estado de name cada vez que entra un caracter en el input
        autoCapitalize="words" //pone en mayuscula la primera letra
        // keyboardType="numeric"
        maxLength={30}
      />

      <Button
        title="Saludar"
        onPress={handleBtnHello}
        color="#007BFF"
      />
    </View>
  )
}

export default function Index() {
  return (
    GeneradorSaludos()
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: '#f5f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',

  },
  input: {
    height: 50,
    borderColor: '#cccccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    backgroundColor: "#ffffff",
    fontSize: 16
  },
});