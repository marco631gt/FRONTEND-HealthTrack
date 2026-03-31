import { useState, useEffect } from "react";
import { getItem } from "../services/storageService";

export const usePatientDashboard = () => {
    const [doctors, setDoctors] = useState([
        { label: 'Dr. Garcia - Cardiología', value: '1' },
        { label: 'Dra. Rodriguez - Pediatría', value: '2' }
    ]); // Esto luego vendrá de tu API o DB
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(false);

    // Estados del formulario
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [appointmentDate, setAppointmentDate] = useState("");
    const [reason, setReason] = useState("");

    const handleCreateAppointment = async () => {
        // Aquí irá tu lógica de POST a la API
        console.log("Cita creada con:", { selectedDoctor, appointmentDate, reason });
    };

    return {
        doctors,
        appointments,
        loading,
        selectedDoctor,
        setSelectedDoctor,
        appointmentDate,
        setAppointmentDate,
        reason,
        setReason,
        handleCreateAppointment
    };
};