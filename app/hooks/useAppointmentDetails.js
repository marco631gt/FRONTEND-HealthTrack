import { useState, useEffect } from "react";
import { Alert } from "react-native";
import api from "../models/auth";
import { useRouter } from "expo-router";

export const useAppointmentDetails = (appointmentId) => {
    const [appointment, setAppointment] = useState(null);
    const [notes, setNotes] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [status, setStatus] = useState("pendiente");
    const router = useRouter();

    useEffect(() => {
        const loadData = async () => {
            if (!appointmentId) return;
            try {
                setIsLoading(true);
                const response = await api.get("citas/mis-citas");
                const found = response.data.find(a => a._id === appointmentId);

                if (found) {
                    setAppointment(found);
                    setNotes(found.notasMedicas || "");
                    setStatus(found.estado || "pendiente");
                }
            } catch (error) {
                Alert.alert("Error", "Unable to connect to the server");
            } finally {
                setIsLoading(false);
            }
        };
        loadData();
    }, [appointmentId]);

    const handleFinish = async () => {
        if (!notes.trim()) {
            Alert.alert("Notice", "Please add any notes before finalizing");
            return;
        }

        try {
            // 1. Guardar Notas
            await api.put("citas/notas", {
                citaId: appointmentId,
                notasMedicas: notes
            });

            await api.put("citas/estado", {
                citaId: appointmentId,
                estado: status
            });

            Alert.alert("Success", "Appointment saved successfully");
            router.back();
        } catch (error) {
            Alert.alert("Error", "The changes could not be saved");
        }
    };

    return { appointment, notes, setNotes, status, setStatus, isLoading, handleFinish };
};