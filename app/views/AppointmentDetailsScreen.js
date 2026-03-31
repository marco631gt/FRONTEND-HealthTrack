import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Image as RNImage } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
// IMPORTANTE: Asegúrate de tener estas dos importaciones
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons"; 
import { useAppointmentDetails } from "../hooks/useAppointmentDetails";
import { useRouter } from "expo-router";

const AppointmentDetailsScreen = ({ appointmentId }) => {
    const router = useRouter();
    const { patientData, notes, setNotes, status, setStatus, isLoading, handleFinish } = useAppointmentDetails(appointmentId);

    if (isLoading) return <View style={styles.center}><Text>Loading...</Text></View>;

    const statusOptions = [
        { label: 'In Progress', value: 'In Progress', icon: 'clock-outline', color: '#f39c12' },
        { label: 'Canceled', value: 'Canceled', icon: 'close-circle-outline', color: '#e74c3c' },
        { label: 'Completed', value: 'Completed', icon: 'check-all', color: '#27ae60' },
    ];

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="arrow-back-circle" size={45} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Appointment Details</Text>
            </View>

            <View style={styles.contentCard}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    {/* Tarjeta de Identificación */}
                    <View style={styles.idCard}>
                        <RNImage 
                            source={require('../assets/images/doctor-profile.png')} 
                            style={styles.patientImg} 
                        />
                        <View style={styles.idTextContainer}>
                            <Text style={styles.idLabel}>Patient: <Text style={styles.idValue}>{patientData.name}</Text></Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={styles.idLabel}>Id: <Text style={styles.idValue}>{patientData.id}</Text></Text>
                                <Text style={styles.idLabel}>Age: <Text style={styles.idValue}>{patientData.age}</Text></Text>
                            </View>
                            <Text style={styles.idLabel}>Blood: <Text style={styles.idValue}>{patientData.blood}</Text></Text>
                            <Text style={styles.idLabel}>Allergies: <Text style={styles.idValue}>{patientData.allergies}</Text></Text>
                        </View>
                    </View>

                    {/* --- BARRA DE ESTATUS --- */}
                    <Text style={styles.sectionTitle}>APPOINTMENT STATUS</Text>
                    <View style={styles.statusContainer}>
                        {statusOptions.map((option) => (
                            <TouchableOpacity
                                key={option.value}
                                style={[
                                    styles.statusButton,
                                    status === option.value && { backgroundColor: option.color, borderColor: option.color }
                                ]}
                                onPress={() => setStatus(option.value)}
                            >
                                <MaterialCommunityIcons 
                                    name={option.icon} 
                                    size={20} 
                                    color={status === option.value ? "#fff" : "#666"} 
                                />
                                <Text style={[
                                    styles.statusText,
                                    status === option.value && { color: "#fff", fontWeight: 'bold' }
                                ]}>
                                    {option.label}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* Notas de Consulta */}
                    <Text style={styles.sectionTitle}>CONSULTATION NOTES</Text>
                    <View style={styles.notesBox}>
                        <Text style={styles.notesLabel}>Reason:</Text>
                        <TextInput
                            style={styles.input}
                            multiline
                            placeholder="Type notes here..."
                            value={notes}
                            onChangeText={setNotes}
                        />
                    </View>

                    <TouchableOpacity style={styles.finishBtn} onPress={handleFinish}>
                        <Text style={styles.finishBtnText}>FINISH CONSULTATION</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#1a73e8' },
    header: { padding: 20, flexDirection: 'row', alignItems: 'center' },
    headerTitle: { color: '#fff', fontSize: 24, fontWeight: '900', marginLeft: 10 },
    contentCard: { flex: 1, backgroundColor: '#f0f7ff', borderTopLeftRadius: 50, padding: 25 },
    idCard: { backgroundColor: '#1a73e8', borderRadius: 20, padding: 15, flexDirection: 'row', marginTop: 10 },
    patientImg: { width: 80, height: 100, borderRadius: 10, backgroundColor: '#fff' },
    idTextContainer: { flex: 1, marginLeft: 15 },
    idLabel: { color: 'rgba(255,255,255,0.7)', fontSize: 12, fontWeight: 'bold', marginBottom: 2 },
    idValue: { color: '#fff', fontSize: 15 },
    sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#1a4f8d', marginTop: 25, marginBottom: 15 },
    
    // ESTILOS NUEVOS PARA LA BARRA DE ESTATUS
    statusContainer: { 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        backgroundColor: '#fff', 
        borderRadius: 15, 
        padding: 5,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4
    },
    statusButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        marginHorizontal: 2,
        borderRadius: 10,
    },
    statusText: { fontSize: 11, marginLeft: 5, color: '#666' },

    notesBox: { backgroundColor: '#fff', borderRadius: 20, padding: 15, elevation: 3 },
    notesLabel: { fontWeight: 'bold', color: '#666', marginBottom: 5 },
    input: { height: 150, textAlignVertical: 'top', fontSize: 16 },
    finishBtn: { backgroundColor: '#1a73e8', padding: 18, borderRadius: 15, alignItems: 'center', marginTop: 25, marginBottom: 30 },
    finishBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
    center: { flex: 1, justifyContent: 'center', alignItems: 'center' }
});

export default AppointmentDetailsScreen;