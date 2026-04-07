import { useState } from "react";
import { Alert } from "react-native";
import { validate } from "../helpers/validators";
import api from '../models/auth';
import { saveToken, setItem } from "../services/storageService";
import { useRouter } from "expo-router";

export const useLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async () => {
        // 1. Validaciones iniciales
        if (email.trim() === '' || password.trim() === '') {
            Alert.alert('Error', 'All the fields are required');
            return;
        }

        if (!validate("email", email)) {
            Alert.alert("Error", "Email not valid");
            return;
        }

        try {
            setLoading(true);
            // 2. Intento de Login con la API
            const data = {
                email: email.toLowerCase().trim(),
                password: password,
            };

            const response = await api.post('auth/login', data);
            console.log('DATOS RECIBIDOS:', response.data);
            console.log('Status Code:', response.status);

            if (response.data && response.data.usuario) {

                const {
                    email: emailDb,
                    id,
                    nombre,
                    rol,
                    telefono = "",
                    edad = null,
                    tipoSangre = "",
                    alergias = "",
                    condicionesCronicas = ""
                } = response.data.usuario;
                const tokenServer = response.data.token;

                await saveToken(tokenServer);

                let mappedRole = "";
                if (rol === "paciente") {
                    mappedRole = "Patient";
                } else if (rol === "medico") {
                    mappedRole = "Doctor";
                } else {
                    mappedRole = rol; 
                }

                await setItem('user_profile', {
                    id: id,
                    role: mappedRole, 
                    name: nombre,
                    email: emailDb,
                    telefono: telefono,
                    edad: edad,
                    sangre: tipoSangre,
                    alergias: alergias,
                    condiciones: condicionesCronicas
                });

                await setItem("last_login", new Date().toISOString());

                Alert.alert("Welcome", `Hi, ${nombre}`, [
                    {
                        text: "OK",
                        onPress: () => router.replace("/") 
                    }
                ]);

                setEmail("");
                setPassword("");

            } else {
                Alert.alert("Error", "The user's information could not be retrieved");
            }

        } catch (error) {
            console.error("Login Error:", error);

            const message = error.response?.data?.msg || "Incorrect credentials or connection problem";
            Alert.alert("Login error", message);

        } finally {
            setLoading(false);
        }
    };

    return {
        email,
        setEmail,
        password,
        setPassword,
        handleLogin,
        loading,
    };
};

export default useLogin;