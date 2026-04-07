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

    const executeLogout = async () => {
    try {
        await removeItem('user_profile'); 
        
        await deleteToken(); 

        setTimeout(() => {
            router.replace('/views/LoginScreen');
        }, 100);
    } catch (error) {
        console.error("Error Log out:", error);
    }
};

    const handleLogout = () => {
        Alert.alert(
            "Log Out", 
            "Are you sure you want to log out of your account?",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancelado"),
                    style: "cancel"
                },
                { 
                    text: "Yes, logout", 
                    onPress: executeLogout,
                    style: "destructive" 
                }
            ],
            { cancelable: true }
        );
    };

    return { user, isLoading, handleLogout };
};