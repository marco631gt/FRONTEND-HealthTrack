import { useState, useEffect } from "react";

export const useAppointmentDetails = (appointmentId) => {
    const [patientData, setPatientData] = useState(null);
    const [notes, setNotes] = useState("");
    const [isLoading, setIsLoading] = useState(true);

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
        console.log("Consulta finalizada con notas:", notes);
        // Aquí iría la lógica para guardar en base de datos
    };

    return { patientData, notes, setNotes, isLoading, handleFinish };
};