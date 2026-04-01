import { Alert } from "react-native";
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

    // ejecuta el borrado y navegación
    const executeLogout = async () => {
    try {
        // Borramos el perfil del almacenamiento
        await removeItem('user_profile'); 
        
        // Borramos el token del almacenamiento seguro
        await deleteToken(); 

        setTimeout(() => {
            router.replace('/views/LoginScreen');
        }, 100);
    } catch (error) {
        console.error("Error al cerrar sesión:", error);
    }
};

    const handleLogout = () => {
        Alert.alert(
            "Cerrar Sesión", 
            "¿Estás seguro de que deseas salir de tu cuenta?",
            [
                {
                    text: "Cancelar",
                    onPress: () => console.log("Cancelado"),
                    style: "cancel"
                },
                { 
                    text: "Sí, salir", 
                    onPress: executeLogout,
                    style: "destructive" 
                }
            ],
            { cancelable: true }
        );
    };

    return { user, isLoading, handleLogout };
};