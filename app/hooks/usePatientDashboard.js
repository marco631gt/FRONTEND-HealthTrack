import { useState, useEffect } from "react";
import { Alert } from "react-native";
import api from "../models/auth";

export const usePatientDashboard = () => {
    const [doctors, setDoctors] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(false);

    // Estados del formulario
    const [selectedDoctorId, setSelectedDoctorId] = useState(null);
    const [appointmentDate, setAppointmentDate] = useState(""); 
    const [selectedHour, setSelectedHour] = useState(null); 
    const [reason, setReason] = useState("");
    const [availableSlots, setAvailableSlots] = useState([]);
    
    // Control del calendario nativo
    const [showDatePicker, setShowDatePicker] = useState(false);

    const allSlots = ["08:00", "09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00"];

    useEffect(() => {
        fetchInitialData();
    }, []);

    useEffect(() => {
        if (selectedDoctorId && appointmentDate) {
            const occupied = appointments
                .filter(appt => 
                    appt.medico?._id === selectedDoctorId && 
                    appt.fecha.startsWith(appointmentDate) &&
                    //LE MOVI AQUI 1.  appt.estado !== 'Cancelada'
                    appt.estado !== 'Cancelled'
                )
                .map(appt => {
                    const d = new Date(appt.fecha);
                    return `${d.getHours().toString().padStart(2, '0')}:00`;
                });

            const free = allSlots.filter(slot => !occupied.includes(slot));
            setAvailableSlots(free);
        } else {
            setAvailableSlots([]);
        }
    }, [selectedDoctorId, appointmentDate, appointments]);

    const fetchInitialData = async () => {
        try {
            setLoading(true);
            const [docsRes, apptsRes] = await Promise.all([
                api.get('citas/medicos'),
                api.get('citas/mis-citas')
            ]);
            setDoctors(docsRes.data);
            setAppointments(apptsRes.data);
        } catch (error) {
            Alert.alert("Error", "The information could not be retrieved");
        } finally {
            setLoading(false);
        }
    };

    const handleCreateAppointment = async () => {
        if (!selectedDoctorId || !appointmentDate || !selectedHour || !reason.trim()) {
            Alert.alert("Error", "Complete the fields");
            return;
        }
        try {
            setLoading(true);
            const combinedDate = `${appointmentDate}T${selectedHour}:00`;
            const response = await api.post('citas/crear', {
                medicoId: selectedDoctorId,
                fecha: combinedDate,
                motivo: reason
            });

            if (response.status === 201) {
                Alert.alert("Succesfull!", "Appointment booked");
                setSelectedDoctorId(null);
                setAppointmentDate("");
                setSelectedHour(null);
                setReason("");
                fetchInitialData();
            }
        } catch (error) {
            Alert.alert("Error", error.response?.data?.message || "Error to create");
        } finally {
            setLoading(false);
        }
    };

    return {
        doctors, appointments, loading,
        selectedDoctorId, setSelectedDoctorId,
        appointmentDate, setAppointmentDate,
        selectedHour, setSelectedHour,
        reason, setReason,
        availableSlots,
        showDatePicker, setShowDatePicker, 
        handleCreateAppointment,
        refreshAppointments: fetchInitialData
    };
};