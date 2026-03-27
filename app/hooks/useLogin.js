import { useState } from "react";
import { Alert } from "react-native";

// Hook encapsular toda la logica
export const useLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        // Espacio vacio validation
        if (email.trim() === '' || password.trim() === '') {
            Alert.alert('Error', 'All the fields required');
            return;
        }

        if(!email.includes('@')){
            Alert.alert('Error', 'Email not valid');
            return;
        }

        //Simulation
        Alert.alert('Exito', `Inicio de sesion correcta con: ${email}`);

        setEmail('');
        setPassword('');

    }

    // Hook exporta a la vista
    return{
        email,
        setEmail,
        password,
        setPassword,
        handleLogin,
    }
}

