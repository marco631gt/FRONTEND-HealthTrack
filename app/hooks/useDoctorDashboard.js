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

            if (userProfile) {
                let data = typeof userProfile === 'string' ? JSON.parse(userProfile) : userProfile;
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
        setSelectedDate, 
        changeDate,
        isLoading,
        refresh: loadDashboardData
    };
};