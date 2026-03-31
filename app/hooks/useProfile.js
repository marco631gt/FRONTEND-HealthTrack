import { Alert } from "react-native"; // <--- Importamos Alert
import { getItem, removeItem, deleteToken} from "../services/storageService";
import { useRouter } from "expo-router";
import { useState, useEffect } from "react";

export const useProfile = () => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const loadUserData = async () => {
            const profile = await getItem('user_profile');
            if (profile) setUser(profile);
            setIsLoading(false);
        };
        loadUserData();
    }, []);

    // Función que ejecuta el borrado y navegación
    const executeLogout = async () => {
    try {
        // 1. Borramos el perfil del almacenamiento normal
        await removeItem('user_profile'); 
        
        // 2. Borramos el token del almacenamiento seguro
        await deleteToken(); 

        // 3. Navegamos al login
        setTimeout(() => {
            router.replace('/views/LoginScreen');
        }, 100);
    } catch (error) {
        console.error("Error al cerrar sesión:", error);
    }
};

    // Función que muestra la alerta
    const handleLogout = () => {
        Alert.alert(
            "Cerrar Sesión", // Título
            "¿Estás seguro de que deseas salir de tu cuenta?", // Mensaje
            [
                {
                    text: "Cancelar",
                    onPress: () => console.log("Cancelado"),
                    style: "cancel" // En iOS esto lo pone en negrita/azul
                },
                { 
                    text: "Sí, salir", 
                    onPress: executeLogout,
                    style: "destructive" // En iOS esto lo pone en rojo
                }
            ],
            { cancelable: true } // Permite cerrar la alerta tocando fuera (en Android)
        );
    };

    return { user, isLoading, handleLogout };
};