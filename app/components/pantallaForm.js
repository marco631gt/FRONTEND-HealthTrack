import React from "react";
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useForm } from '../hooks/useForm';

const pantallaForm = () => {
    //Deconstruir nuestro hook
    const {
        name,
        setName,
        lastName,
        setlastName,
        email,
        setEmail,
        handleBtnHello
    } = useForm();

    return (
        <View style = {styles.contenedor}>
            <Text style={styles.titulo}>Iniciar Sesion </Text>

            <TextInput 
            style={styles.input}
            placeholder="Name"
            value={name}
            onChangeText={setName}
            autoCapitalize="none"
            />

            <TextInput 
            style={styles.input}
            placeholder="Last Name"
            value={lastName}
            onChangeText={setlastName}
            autoCapitalize="none"
            />

            <TextInput 
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            />

            <Button 
            title = 'Iniciar Sesion'
            onPress={handleBtnHello}
            color='#28a745'
            />

        </View>
      );

}

const styles = StyleSheet.create({
    contenedor: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        backgroundColor: '#f5f5f5'
    },
    titulo: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#333'
    },
    input: {
        height: 50,
        borderColor: "#cccccc",
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 15,
        marginBottom: 15,
        backgroundColor: '#ffffff',
        fontSize: 16
    }

});


export default pantallaForm;