import { useState } from "react";
import { Alert } from "react-native";
import { validate } from "../helpers/validators";
import { saveToken, setItem } from "../services/storageService";
import { useRouter } from 'expo-router'; // 1. Importamos el router

export const useRegister = () => {
    const router = useRouter(); // 2. Inicializamos el router
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('Patient');

    const [age, setAge] = useState('');
    const [sex, setSex] = useState('');
    const [bloodType, setBloodType] = useState('');
    const [allergies, setAllergies] = useState('');
    const [chronicConditions, setChronicConditions] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const handleRegister = async () => {

        // 1. Validaciones base (Para todos)
        if (email.trim() === '' || password.trim() === '' || name.trim() === '') {
            Alert.alert('Error', 'All the fields required');
            return;
        }

        if (!validate("email", email)) {
            Alert.alert("Error", "Email inválido");
            return;
        }

        // Validación de 10 números exactamente
        if (!phoneNumber.trim() || isNaN(phoneNumber) || phoneNumber.length !== 10) {
            Alert.alert("Error", "Please enter a valid 10-digit phone number");
            return;
        }

        // 2. Validaciones exclusivas para PACIENTES
        if (role === 'Patient') {
            if (!age.trim() || isNaN(age) || parseInt(age) <= 0) {
                Alert.alert("Error", "Please enter a valid age");
                return;
            }
            if (!bloodType.trim()) {
                Alert.alert("Error", "Blood type is required");
                return;
            }
            if (!allergies.trim()) {
                Alert.alert("Error", "Allergies field is required (write 'None' if applicable)");
                return;
            }
            if (!chronicConditions.trim()) {
                Alert.alert("Error", "Chronic conditions field is required (write 'None' if applicable)");
                return;
            }
        }

        // 3. Creación del objeto de usuario
        const newUser = {
            name,
            email,
            password,
            role,
            phoneNumber,
            ...(role === 'Patient' && {
                age: parseInt(age),
                sex,
                bloodType: bloodType.toUpperCase(),
                allergies,
                chronicConditions,
            }),
            createdAt: new Date().toISOString()
        };

        try {
            const fakeToken = "REGISTER-TOKEN-999";
            await saveToken(fakeToken);
            await setItem('user_profile', newUser);

            // Función para limpiar y navegar
            const onConfirmSuccess = () => {
                // Limpiar formulario
                setName('');
                setEmail('');
                setPassword('');
                setRole('Patient');
                setPhoneNumber('');
                setAge('');
                setSex('');
                setBloodType('');
                setAllergies('');
                setChronicConditions('');

                // Navegar al login
                router.replace('./LoginScreen'); 
            };

            // --- LÓGICA DE ALERTA DIFERENCIADA CON REDIRECCIÓN ---
            if (role === 'Patient') {
                Alert.alert(
                    '¡Éxito!',
                    `Usuario ${name} registrado como ${role}\n\n` +
                    `Información Médica:\n` +
                    `• Edad: ${age}\n` +
                    `• Sexo: ${sex}\n` +
                    `• Sangre: ${bloodType.toUpperCase()}\n` +
                    `• Alergias: ${allergies}\n` +
                    `• Condiciones: ${chronicConditions}\n` +
                    `• Phone Number: ${phoneNumber}`,
                    [{ text: 'OK', onPress: onConfirmSuccess }] // Botón para redirigir
                );
            } else {
                Alert.alert(
                    '¡Éxito!', 
                    `Usuario ${name} registrado como ${role} and your phone number is: ${phoneNumber}`,
                    [{ text: 'OK', onPress: onConfirmSuccess }] // Botón para redirigir
                );
            }

        } catch (error) {
            console.error("Error en el registro:", error);
            Alert.alert("Error", "No se pudieron guardar los datos del registro.");
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
        handleRegister
    };
};

export default useRegister;