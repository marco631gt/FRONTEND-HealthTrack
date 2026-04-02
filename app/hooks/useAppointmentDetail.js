import { useState, useEffect } from "react";
import { Alert } from "react-native";
import { useRouter } from "expo-router";
import api from "../models/auth";

export const useAppointmentDetail = (appointmentId) => {
    const router = useRouter();
    const [appointment, setAppointment] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchDetailFromList = async () => {
        if (!appointmentId) return;

        try {
            setLoading(true);
            // Obtenemos todas las citas del paciente
            const response = await api.get("citas/mis-citas");
            
            // Buscamos la cita específica por ID dentro del arreglo
            const selectedAppt = response.data.find(item => item._id === appointmentId);
            
            if (selectedAppt) {
                setAppointment(selectedAppt);
            } else {
                console.error("Cita no encontrada en la lista");
            }
        } catch (error) {
            console.error("Error fetching detail:", error);
            Alert.alert("Error", "No se pudo cargar la información");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDetailFromList();
    }, [appointmentId]);

    const handleCancel = () => {
        Alert.alert(
            "Cancelar Cita",
            "¿Estás seguro de que deseas cancelar esta cita?",
            [
                { text: "No", style: "cancel" },
                {
                    text: "Sí, Cancelar",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            setLoading(true);
                            // Según tu doc: PUT /api/citas/estado
                            await api.put("citas/estado", {
                                citaId: appointmentId,
                                estado: "cancelada" // Los pacientes solo pueden cancelar
                            });
                            Alert.alert("Éxito", "Cita cancelada");
                            router.back();
                        } catch (error) {
                            Alert.alert("Error", "No tienes permiso o la cita no se pudo cancelar");
                        } finally {
                            setLoading(false);
                        }
                    }
                }
            ]
        );
    };

    return { appointment, loading, handleCancel };
};