import React from 'react';
import { View, Button, Alert } from 'react-native';
import StorageService from '../helpers/StorageService';

const LoginScreen = () => {

    const handleLogin = async (email, password, token) => {
        //Validar con REGEX
        if (!StorageService.validate("email", email)) {
            Alert.alert('Error', 'Correo no valido');
            return;
        }

        //Guardar datos sensibles de forma segura
        await StorageService.saveCredentials(email, token);

        //Guardar datos generales
        await StorageService.setItem('last_login', new Date().toISOString());

        Alert.alert('Exito', "Sesion iniciada y protegida");
    }

    return (
        <View style={{ padding: 20 }}>
            <Button
                title='Simular Login'
                onPress={() => handleLogin('dev@correo.com', 'Pass123', 'SECRET-123')}
            />

        </View>
    );
}

export default LoginScreen;