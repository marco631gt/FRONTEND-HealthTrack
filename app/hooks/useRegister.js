import { useState } from "react";
import { Alert } from "react-native";
import { validate } from "../helpers/validators"; 
// Importamos las funciones específicas que definiste en tu storageService.js
import { saveToken, setItem } from "../services/storageService"; 

export const useRegister = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('Patient');

    const handleRegister = async () => {
       
        // 1. Validaciones de campos vacíos
        if (email.trim() === '' || password.trim() === '' || name.trim() === '') {
            Alert.alert('Error', 'All the fields required');
            return;
        }

        // 2. Validación de formato de email
        if (!email.includes('@')) {
            Alert.alert('Error', 'Email not valid');
            return;
        }

        if (!validate("email", email)) {
            Alert.alert("Error", "Email inválido");
            return;
        }

        // 3. Simulación de Registro (Mock Data)
        const newUser = {
            name,
            email,
            password,
            role,
            createdAt: new Date().toISOString()
        };

        try {
            // Guardamos el token de forma segura usando la función de tu servicio
            const fakeToken = "REGISTER-TOKEN-999";
            await saveToken(fakeToken); 
            
            // Guardamos el perfil del usuario en AsyncStorage usando tu función setItem
            await setItem('user_profile', newUser);

            Alert.alert('¡Éxito!', `Usuario ${name} registrado como ${role}`);

            // 4. Limpiar formulario tras éxito
            setName('');
            setEmail('');
            setPassword('');
            setRole('Patient');
            
        } catch (error) {
            console.error("Error en el registro:", error);
            Alert.alert("Error", "No se pudieron guardar los datos del registro.");
        }
    };

    return {
        name, 
        setName,
        email, 
        setEmail,
        password, 
        setPassword,
        role, 
        setRole,
        handleRegister
    };
};

export default useRegister;