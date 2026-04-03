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
            if (userProfile?.nombre) setDoctorName(`Dr. ${userProfile.nombre}`);

            const response = await api.get("citas/mis-citas");
            setAllAppointments(response.data || []);
        } catch (error) {
            console.error("Error loading schedule:", error);
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
            // Comparamos año, mes y día para evitar errores de zona horaria/horas
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
        changeDate, // Nueva función
        isLoading,
        refresh: loadDashboardData
    };
};