import { useState } from "react";
import { Alert } from "react-native";
import { validate } from "../helpers/validators";
import { saveToken, setItem } from "../services/storageService";

export const useLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {

        // Validaciones
        // Espacio vacio validation ya lo teniamos con Vidal esa 
        if (email.trim() === '' || password.trim() === '') {
            Alert.alert('Error', 'All the fields required');
            return;
        }

        if (!email.includes('@')) {
            Alert.alert('Error', 'Email not valid');
            return;
        }

        if (!validate("email", email)) {
            Alert.alert("Error", "Email inválido");
            return;
        }

        // MOCK LOGIN
        const mockUser = {
            email: "test@test.com",
            password: "123456"
        };

        if (email !== mockUser.email || password !== mockUser.password) {
            Alert.alert("Error", "Credenciales incorrectas");
            return;
        }

        // Guardar sesión
        const fakeToken = "TOKEN-FAKE-123";

        await saveToken(fakeToken);
        await setItem("last_login", new Date().toISOString());

        Alert.alert("Éxito", "Login correcto");

        // limpiar
        setEmail("");
        setPassword("");
    };

    return {
        email,
        setEmail,
        password,
        setPassword,
        handleLogin,
    };
};