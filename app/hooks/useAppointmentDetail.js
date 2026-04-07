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
            const response = await api.get("citas/mis-citas");
            
            // Buscamos la cita específica por ID dentro del arreglo
            const selectedAppt = response.data.find(item => item._id === appointmentId);
            
            if (selectedAppt) {
                setAppointment(selectedAppt);
            } else {
                console.error("Appointment not found in the list");
            }
        } catch (error) {
            console.error("Error fetching detail:", error);
            Alert.alert("Error", "The information could not be loaded");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDetailFromList();
    }, [appointmentId]);

    const handleCancel = () => {
        Alert.alert(
            "Cancel appointment",
            "Are you sure you want to cancel this appointment?",
            [
                { text: "No", style: "cancel" },
                {
                    text: "Yes, Cancel",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            setLoading(true);
                            await api.put("citas/estado", {
                                citaId: appointmentId,
                                estado: "cancelada"
                            });
                            Alert.alert("Successfull", "Cancel appointment");
                            router.back();
                        } catch (error) {
                            Alert.alert("Error", "You don't have permission, or the appointment could not be canceled");
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