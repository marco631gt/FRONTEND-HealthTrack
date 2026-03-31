import { useState, useEffect } from "react";

export const useAppointmentDetails = (appointmentId) => {
    const [patientData, setPatientData] = useState(null);
    const [notes, setNotes] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [status, setStatus] = useState("In Progress");

    useEffect(() => {
        const loadData = async () => {
            setIsLoading(true);
            // Simulamos una carga de datos
            await new Promise(resolve => setTimeout(resolve, 800));

            // Datos de prueba (Mocks)
            const mockData = {
                "1": { name: "María González", id: "MG12345", age: 34, blood: "A+", allergies: "Penicillin" },
                "2": { name: "Carlos Rodríguez", id: "CR98765", age: 45, blood: "O+", allergies: "None" },
                "3": { name: "Ana Hernández", id: "AH55555", age: 29, blood: "B-", allergies: "Lactose" },
            };

            setPatientData(mockData[appointmentId] || mockData["1"]);
            setIsLoading(false);
        };
        loadData();
    }, [appointmentId]);

    const handleFinish = () => {
        console.log("Consulta finalizada:", {
            appointmentId,
            status,
            notes
        });
        // Aquí enviarías status y notes a tu backend
    };

    // Retornamos status y setStatus
    return { patientData, notes, setNotes, status, setStatus, isLoading, handleFinish };
};