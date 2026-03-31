import { useState, useEffect } from "react";
import { Alert } from "react-native";
import { useRouter } from "expo-router";

export const useAppointmentDetail = (appointmentId) => {
    const router = useRouter();
    const [appointment, setAppointment] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulamos la carga de una cita específica
        const fetchDetail = () => {
            setLoading(true);
            // Esto vendría de tu base de datos filtrando por ID
            const mockDetail = {
                id: appointmentId,
                doctorName: "Dr. Alberto Garcia",
                specialty: "Cardiology",
                date: "2026-03-25",
                time: "10:30 AM",
                reason: "Chest pain and dizziness",
                doctorDetails: "Patient shows stable rhythm. Suggested blood test for cholesterol. Avoid caffeine for 48 hours.", // Lo que puso el doctor
                status: "Confirmed"
            };
            setAppointment(mockDetail);
            setLoading(false);
        };

        fetchDetail();
    }, [appointmentId]);

    const handleCancel = () => {
        Alert.alert(
            "Cancel Appointment",
            "Are you sure you want to cancel this appointment?",
            [
                { text: "No", style: "cancel" },
                { 
                    text: "Yes, Cancel", 
                    style: "destructive",
                    onPress: () => {
                        console.log("Cita cancelada");
                        router.back();
                    }
                }
            ]
        );
    };

    const handleReschedule = () => {
        Alert.alert("Reschedule", "Redirecting to calendar...");
        // Aquí podrías mandarlos de vuelta al Dashboard con los datos precargados
    };

    return {
        appointment,
        loading,
        handleCancel,
        handleReschedule
    };
};