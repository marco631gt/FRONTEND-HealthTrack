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
            if (!appointmentId) return; // Seguridad si el ID no llega
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
                Alert.alert("Error", "No se pudo conectar con el servidor");
            } finally {
                setIsLoading(false);
            }
        };
        loadData();
    }, [appointmentId]);

    const handleFinish = async () => {
        if (!notes.trim()) {
            Alert.alert("Aviso", "Por favor, agrega notas antes de finalizar");
            return;
        }

        try {
            // 1. Guardar Notas
            await api.put("citas/notas", {
                citaId: appointmentId,
                notasMedicas: notes
            });

            // 2. Actualizar Estado (Si es distinto a realizada, por ej: cancelada)
            // Nota: Normalmente guardar notas debería pasar a 'realizada' automáticamente
            await api.put("citas/estado", {
                citaId: appointmentId,
                estado: status
            });

            Alert.alert("Éxito", "Consulta guardada correctamente");
            router.back();
        } catch (error) {
            Alert.alert("Error", "No se pudieron guardar los cambios");
        }
    };

    return { appointment, notes, setNotes, status, setStatus, isLoading, handleFinish };
};