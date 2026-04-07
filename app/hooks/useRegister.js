import { useState } from "react";
import { Alert } from "react-native";
import { validate } from "../helpers/validators";
import api from '../models/auth';
import { saveToken, setItem } from "../services/storageService";
import { useRouter } from 'expo-router';

export const useRegister = () => {
    const router = useRouter(); 
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('Patient');
    const [loading, setLoading] = useState(false);

    const [age, setAge] = useState('');
    const [sex, setSex] = useState('');
    const [bloodType, setBloodType] = useState('');
    const [allergies, setAllergies] = useState('');
    const [chronicConditions, setChronicConditions] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const handleRegister = async () => {
        // 1. Validaciones de campos obligatorios
        if (email.trim() === '' || password.trim() === '' || name.trim() === '') {
            Alert.alert('Error', 'All the fields required');
            return;
        }

        if (!validate("email", email)) {
            Alert.alert("Error", "Email inválido");
            return;
        }

        if (!phoneNumber.trim() || isNaN(phoneNumber) || phoneNumber.length !== 10) {
            Alert.alert("Error", "Please enter a valid 10-digit phone number");
            return;
        }

        // Validaciones extra si es Paciente
        if (role === 'Patient') {
            if (!age.trim() || isNaN(age) || parseInt(age) <= 0) {
                Alert.alert("Error", "Please enter a valid age");
                return;
            }
            if (!bloodType.trim()) {
                Alert.alert("Error", "Blood type is required");
                return;
            }
        }

        try {
            setLoading(true);

            // 2. MAPEO PARA EL BACKEND (Enum fix)
            // Convertimos 'Patient' -> 'paciente' y 'Doctor' -> 'medico'
            const rolParaBackend = role === 'Patient' ? 'paciente' : 'medico';

            // 3. Creación del objeto 
            const registerData = {
                nombre: name, 
                email: email.toLowerCase().trim(),
                password: password,
                rol: rolParaBackend,
                // campos extras que agregue cuando pedi el formulario extra:
                telefono: phoneNumber, 
                ...(role === 'Patient' && {
                    edad: parseInt(age),
                    sexo: sex,
                    tipoSangre: bloodType.toUpperCase(),
                    alergias: allergies,
                    condicionesCronicas: chronicConditions,
                })
            };

            // Petición  a Render
            const response = await api.post('auth/register', registerData);
            console.log("Respuesta Registro:", response.data);

            const onConfirmSuccess = () => {
                // Resetear estados
                setName(''); setEmail(''); setPassword('');
                setRole('Patient'); setPhoneNumber(''); setAge('');
                setSex(''); setBloodType(''); setAllergies('');
                setChronicConditions('');

                router.replace('/views/LoginScreen'); 
            };

            // 5. Manejo de éxito
            if (response.data) {
                Alert.alert(
                    '¡Succesfully!',
                    `User ${name} correctly registered as ${role}.`,
                    [{ text: 'Ir al Login', onPress: onConfirmSuccess }]
                );
            }

        } catch (error) {
            console.error("Register Error:", error.response?.data || error.message);
            const serverMsg = error.response?.data?.message || "The registration could not be completed.";
            Alert.alert("Error", serverMsg);
        } finally {
            setLoading(false);
        }
    };

    return {
        name, setName,
        email, setEmail,
        password, setPassword,
        role, setRole,
        phoneNumber, setPhoneNumber,
        age, setAge,
        sex, setSex,
        bloodType, setBloodType,
        allergies, setAllergies,
        chronicConditions, setChronicConditions,
        loading,
        handleRegister
    };
};

export default useRegister;