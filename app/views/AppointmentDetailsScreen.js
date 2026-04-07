import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Image as RNImage } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useAppointmentDetails } from "../hooks/useAppointmentDetails";
import { useRouter, useLocalSearchParams } from "expo-router";

const AppointmentDetailsScreen = () => {
    const router = useRouter();
    const { id } = useLocalSearchParams();

    // Pasamos ese id al hook
    const { appointment, notes, setNotes, status, setStatus, isLoading, handleFinish } = useAppointmentDetails(id);

    if (isLoading) return <View style={styles.center}><Text>Loading patient data...</Text></View>;

    const statusOptions = [
        { label: 'Pending', value: 'pendiente', icon: 'clock-outline', color: '#f39c12' },
        { label: 'Cancel', value: 'cancelada', icon: 'close-circle-outline', color: '#e74c3c' },
        { label: 'Done', value: 'realizada', icon: 'check-all', color: '#27ae60' },
    ];

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="arrow-back-circle" size={45} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Appointment Details</Text>
            </View>

            <View style={styles.contentCard}>
                <ScrollView showsVerticalScrollIndicator={false}>

                    {/* TARJETA DE IDENTIFICACIÓN DEL PACIENTE */}
                    <View style={styles.idCard}>
                        <RNImage
                            source={require('../assets/images/patient-icon.png')}
                            style={styles.patientImg}
                        />
                        <View style={styles.idTextContainer}>
                            <Text style={styles.idLabel}>
                                Patient: <Text style={styles.idValue}>{appointment?.paciente?.nombre || "Not available"}</Text>
                            </Text>

                            <Text style={styles.idLabel}>
                                Email: <Text style={styles.idValue}>{appointment?.paciente?.email || "Not available"}</Text>
                            </Text>

                            <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                <View style={{ flex: 1 }}>
                                    <Text style={styles.idLabel}>
                                        Blood Type: <Text style={styles.idValue}>{appointment?.paciente?.tipoSangre || "--"}</Text>
                                    </Text>
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Text style={styles.idLabel}>
                                        Age: <Text style={styles.idValue}>{appointment?.paciente?.edad || "--"}</Text>
                                    </Text>
                                </View>
                            </View>

                            <Text style={styles.idLabel}>
                                Reason: <Text style={styles.idValue}>{appointment?.motivo || "General appointment"}</Text>
                            </Text>
                        </View>
                    </View>

                    <Text style={styles.sectionTitle}>Appointment status</Text>
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

                    <Text style={styles.sectionTitle}>MEDICAL NOTES</Text>
                    <View style={styles.notesBox}>
                        <Text style={styles.notesLabel}>Diagnosis and observations:</Text>
                        <TextInput
                            style={styles.input}
                            multiline
                            placeholder="Write your consultation notes here..."
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