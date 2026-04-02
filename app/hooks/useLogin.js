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
        // 1. Validaciones iniciales (No gastamos recursos de red si los campos están mal)
        if (email.trim() === '' || password.trim() === '') {
            Alert.alert('Error', 'Todos los campos son obligatorios');
            return;
        }

        if (!validate("email", email)) {
            Alert.alert("Error", "Email inválido");
            return;
        }

        try {
            setLoading(true);
            // 2. Intento de Login con la API
            const data = {
                email: email.toLowerCase().trim(), // Limpiamos espacios y minúsculas por seguridad
                password: password,
            };

            const response = await api.post('auth/login', data);
            console.log('DATOS RECIBIDOS:', response.data); // Esto mostrará exactamente lo que viste en Postman
            console.log('Status Code:', response.status); // Verás el 200 OK

            // 3. Verificamos si la API devolvió los datos del usuario y el token
            // Según tu Postman: la respuesta tiene 'token' y 'usuario'
            if (response.data && response.data.usuario) {

                // Extraemos según tu objeto real de Postman: { id, email, nombre, rol }
                const { 
                    email: emailDb, 
                    id, 
                    nombre, 
                    rol } = response.data.usuario;
                const tokenServer = response.data.token;

                // 4. Guardado de sesión real
                // Guardamos el token que viene de la respuesta (response.data.token)
                await saveToken(tokenServer);

                // Mapeamos el rol: Tu API devuelve "paciente"
                // Lo convertimos a "Patient" para que tu Index.tsx haga el match
                let mappedRole = "";
                if (rol === "paciente") {
                    mappedRole = "Patient";
                } else if (rol === "medico") {
                    mappedRole = "Doctor";
                } else {
                    mappedRole = rol; // Por si llega algún otro
                }

                await setItem('user_profile', {
                    id: id,
                    role: mappedRole, // Guardamos "Patient" o "Doctor"
                    name: nombre,
                    email: emailDb
                });

                await setItem("last_login", new Date().toISOString());

                // 5. Éxito
                Alert.alert("Bienvenido", `Hola, ${nombre}`, [
                    {
                        text: "OK",
                        onPress: () => router.replace("/") // Al dar OK, forzamos ir al Index
                    }
                ]);

                // Limpiamos campos
                setEmail("");
                setPassword("");

            } else {
                Alert.alert("Error", "No se pudo obtener la información del usuario");
            }

        } catch (error) {
            // Manejo de errores de la API (Credenciales incorrectas, servidor caído, etc.)
            console.error("Login Error:", error);

            // Si la API mandó un mensaje de error (como el "msg" de tu respuesta de Postman) lo usamos
            const message = error.response?.data?.msg || "Credenciales incorrectas o problema de conexión";
            Alert.alert("Error de inicio de sesión", message);

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