import { useState, useEffect } from "react";
// Importamos setItem de tu servicio de almacenamiento para simular la obtención del perfil
import { getItem } from "../services/storageService"; 

export const useDoctorDashboard = () => {
    // Estado para guardar el nombre del doctor
    const [doctorName, setDoctorName] = useState("Dr. García"); // Mock Data inicial
    // Estado para guardar el total de pacientes del día
    const [totalPatients, setTotalPatients] = useState(0);
    // Estado para guardar la agenda del día con citas simuladas
    const [schedule, setSchedule] = useState([]);

    // Efecto para cargar los datos cuando se monta el componente
    useEffect(() => {
        const loadDashboardData = async () => {
            // Simulamos la obtención del perfil del doctor desde el almacenamiento local
            const userProfile = await getItem('user_profile');
            if (userProfile && userProfile.name) {
                setDoctorName(`Dr. ${userProfile.name}`);
            }

            // Simulamos la obtención de los datos del día
            // Más adelante esto será una llamada a tu APIService.
            setTotalPatients(3); // Mock: 3 pacientes hoy

            const mockSchedule = [
                { id: "1", time: "09:00 AM", name: "María González", details: "Consulta de Seguimiento" },
                { id: "2", time: "10:30 AM", name: "Carlos Rodríguez", details: "Primera Consulta" },
                { id: "3", time: "02:00 PM", name: "Ana Hernández", details: "Revisión de Resultados" },
            ];
            setSchedule(mockSchedule);
        };

        loadDashboardData();
    }, []);

    return {
        doctorName,
        totalPatients,
        schedule,
    };
};

export default useDoctorDashboard;