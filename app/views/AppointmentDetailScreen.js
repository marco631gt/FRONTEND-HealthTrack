import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router"; 
import { useAppointmentDetail } from "../hooks/useAppointmentDetail";

const STATUS_TRANSLATIONS = {
    confirmada: 'Confirmed',
    pendiente: 'Pending',
    cancelada: 'Cancelled',
    realizada: 'Completed',
};


const AppointmentDetailScreen = () => {
    const router = useRouter();
    const { id } = useLocalSearchParams();
    const { appointment, loading, handleCancel } = useAppointmentDetail(id);

    if (loading) return <View style={styles.loaderContainer}><ActivityIndicator size="large" color="#1a73e8" /></View>;
    if (!appointment) return <View style={styles.loaderContainer}><Text>Appointment not found</Text></View>;

    const dateObj = new Date(appointment.fecha);

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={28} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Appointment Details</Text>
                <View style={{ width: 28 }} />
            </View>

            <View style={styles.contentCard}>
                <ScrollView showsVerticalScrollIndicator={false}>

                    {/* Información del Médico */}
                    <View style={styles.infoSection}>
                        <View style={styles.iconCircle}>
                            <MaterialCommunityIcons name="doctor" size={35} color="#1a73e8" />
                        </View>
                        <Text style={styles.doctorName}>{appointment.medico?.nombre}</Text>
                        <Text style={styles.specialtyText}>
                            State: {(STATUS_TRANSLATIONS[appointment.estado] || appointment.estado).toUpperCase()}
                        </Text>
                    </View>

                    <View style={styles.divider} />

                    {/* Fecha y Hora */}
                    <View style={styles.rowInfo}>
                        <View style={styles.detailItem}>
                            <Ionicons name="calendar-outline" size={20} color="#1a73e8" />
                            <Text style={styles.detailLabel}>Date</Text>
                            <Text style={styles.detailValue}>{dateObj.toLocaleDateString()}</Text>
                        </View>
                        <View style={styles.detailItem}>
                            <Ionicons name="time-outline" size={20} color="#1a73e8" />
                            <Text style={styles.detailLabel}>Hour</Text>
                            <Text style={styles.detailValue}>{dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
                        </View>
                    </View>

                    {/* Motivo (Lo que el paciente escribió) */}
                    <Text style={styles.sectionTitle}>Reason for the consultation</Text>
                    <View style={styles.reasonBox}>
                        <Text style={styles.reasonText}>{appointment.motivo}</Text>
                        <Text style={{ fontSize: 10, color: '#999', marginTop: 5 }}>Priority: {appointment.prioridad}</Text>
                    </View>

                    {/* Notas Médicas (Si existen) */}
                    <Text style={[styles.sectionTitle, { color: '#2e7d32' }]}>Doctor's Notes</Text>
                    <View style={[styles.reasonBox, styles.doctorNoteBox]}>
                        <Text style={styles.doctorNoteText}>
                            {/* Tu backend dice que el paciente NO ve notasMedicas, pero lo ponemos por si acaso el rol cambia */}
                            {appointment.notasMedicas || "The notes will be available when the doctor conducts the consultation."}
                        </Text>
                    </View>

                    {/* Botón de Cancelar (Solo si no está ya cancelada o realizada) */}
                    {appointment.estado === 'pendiente' && (
                        <View style={styles.actionContainer}>
                            <TouchableOpacity style={styles.btnCancel} onPress={handleCancel}>
                                <Text style={styles.btnTextRed}>Cancel Appointment</Text>
                            </TouchableOpacity>
                        </View>
                    )}

                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#1a73e8' },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        height: 70
    },
    headerTitle: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
    contentCard: {
        flex: 1,
        backgroundColor: '#fff',
        borderTopLeftRadius: 50,
        paddingHorizontal: 25,
        paddingTop: 30
    },
    infoSection: { alignItems: 'center', marginBottom: 20 },
    iconCircle: {
        width: 80,
        height: 80,
        backgroundColor: '#f0f7ff',
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10
    },
    doctorName: { fontSize: 22, fontWeight: 'bold', color: '#333' },
    specialtyText: { fontSize: 16, color: '#666' },
    divider: { height: 1, backgroundColor: '#eee', marginVertical: 20 },
    rowInfo: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 25 },
    detailItem: { alignItems: 'center' },
    detailLabel: { fontSize: 12, color: '#888', marginTop: 5 },
    detailValue: { fontSize: 15, fontWeight: 'bold', color: '#333' },
    sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#1a4f8d', marginBottom: 10, marginTop: 10 },
    reasonBox: {
        backgroundColor: '#f9f9f9',
        padding: 15,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: '#eee',
        marginBottom: 20
    },
    reasonText: { color: '#555', lineHeight: 20 },
    doctorNoteBox: { backgroundColor: '#f1f8e9', borderColor: '#c8e6c9' },
    doctorNoteText: { color: '#2e7d32', fontWeight: '500', fontStyle: 'italic' },
    actionContainer: { marginTop: 10, marginBottom: 30 },
    btnReschedule: {
        backgroundColor: '#e3f2fd',
        padding: 16,
        borderRadius: 15,
        alignItems: 'center',
        marginBottom: 12
    },
    btnCancel: {
        backgroundColor: '#ffebee',
        padding: 16,
        borderRadius: 15,
        alignItems: 'center'
    },
    btnTextBlue: { color: '#1a73e8', fontWeight: 'bold', fontSize: 16 },
    btnTextRed: { color: '#d32f2f', fontWeight: 'bold', fontSize: 16 },
    loaderContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' }
});

export default AppointmentDetailScreen;