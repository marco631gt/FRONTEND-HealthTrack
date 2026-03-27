import React from "react";
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useLogin } from '../hooks/useLogin';

const pantallaLogin = () => {
    //Deconstruir nuestro hook
    const {
        email,
        setEmail,
        password,
        setPassword,
        handleLogin
    } = useLogin();

    return (
        <View style = {styles.contenedor}>
            <Text style={styles.titulo}>Iniciar Sesion </Text>

            <TextInput 
            style={styles.input}
            placeholder="Email"
            value={email}
            onChange={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            />

            <TextInput 
            style={styles.input}
            placeholder="Password"
            value={password}
            onChange={setPassword}
            secureTextEntry={true}
            />

            <Button 
            title = 'Iniciar Sesion'
            onPress={handleLogin}
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


export default pantallaLogin;