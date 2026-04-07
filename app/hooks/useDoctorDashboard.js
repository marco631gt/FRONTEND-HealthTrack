import { useState, useEffect, useMemo } from "react";
import { getItem } from "../services/storageService";
import api from "../models/auth";

export const useDoctorDashboard = () => {
    const [doctorName, setDoctorName] = useState("");
    const [allAppointments, setAllAppointments] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [isLoading, setIsLoading] = useState(true);

    const loadDashboardData = async () => {
        try {
            setIsLoading(true);
            const userProfile = await getItem('user_profile');

            // --- DEBUG: Abre tu terminal de Node/Metro y mira qué sale aquí ---
            console.log("STORAGE PROFILE:", userProfile);

            if (userProfile) {
                // 1. Intentamos convertirlo a objeto por si viene como texto
                let data = typeof userProfile === 'string' ? JSON.parse(userProfile) : userProfile;

                // 2. Buscamos el nombre en todas las ubicaciones posibles
                // Algunos backends devuelven 'nombre', otros 'name', otros 'user.nombre'
                const name = data.nombre || data.user?.nombre || data.name || "Doctor";

                setDoctorName(`Dr. ${name}`);
            }

            const response = await api.get("citas/mis-citas");
            setAllAppointments(response.data || []);
        } catch (error) {
            console.error("Error loading dashboard:", error);
        } finally {
            setIsLoading(false);
        }
    };

    // Lógica para cambiar de día
    const changeDate = (days) => {
        const newDate = new Date(selectedDate);
        newDate.setDate(selectedDate.getDate() + days);
        setSelectedDate(newDate);
    };

    const filteredSchedule = useMemo(() => {
        return allAppointments.filter(appt => {
            const apptDate = new Date(appt.fecha);
            return (
                apptDate.getFullYear() === selectedDate.getFullYear() &&
                apptDate.getMonth() === selectedDate.getMonth() &&
                apptDate.getDate() === selectedDate.getDate()
            );
        });
    }, [allAppointments, selectedDate]);

    useEffect(() => { loadDashboardData(); }, []);

    return {
        doctorName,
        totalPatients: filteredSchedule.length,
        schedule: filteredSchedule,
        selectedDate,
        changeDate,
        isLoading,
        refresh: loadDashboardData
    };
};