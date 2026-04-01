import { useState } from "react";
import { Alert } from "react-native";
import { validate } from "../helpers/validators";
import { saveToken, setItem } from "../services/storageService";

export const useLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        if (email.trim() === '' || password.trim() === '') {
            Alert.alert('Error', 'All the fields required');
            return;
        }

        if (!validate("email", email)) {
            Alert.alert("Error", "Email inválido");
            return;
        }

        const mockUser = {
            email: "test@test.com",
            password: "123456",
            name: "Usuario de Prueba",
            role: "Patient" // si cmabio a doctor para probar la otra
        };

        if (email !== mockUser.email || password !== mockUser.password) {
            Alert.alert("Error", "Credenciales incorrectas");
            return;
        }

        try {
            // Guardar sesión y PERFIL
            const fakeToken = "TOKEN-FAKE-123";
            await saveToken(fakeToken);
            
            // Guardamos el perfil con el ROL para el index.tsx
            await setItem('user_profile', { 
                role: mockUser.role, 
                name: mockUser.name,
                email: mockUser.email 
            });
            
            await setItem("last_login", new Date().toISOString());

            Alert.alert("Success", `Welcome ${mockUser.name}`, [
                { text: "OK" }
            ]);

            setEmail("");
            setPassword("");

        } catch (error) {
            console.error("Error saving session:", error);
            Alert.alert("Error", "Could not save session data");
        }
    };

    return {
        email,
        setEmail,
        password,
        setPassword,
        handleLogin,
    };
};

export default useLogin;