import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useAppointmentDetail } from "../hooks/useAppointmentDetail";

const AppointmentDetailScreen = () => {
    const router = useRouter();
    const { appointment, loading, handleCancel, handleReschedule } = useAppointmentDetail("123");

    if (loading) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color="#1a73e8" />
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            {/* botón de volver */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={28} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Appointment Details</Text>
                <View style={{ width: 28 }} /> 
            </View>

            <View style={styles.contentCard}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    
                    <View style={styles.infoSection}>
                        <View style={styles.iconCircle}>
                            <MaterialCommunityIcons name="doctor" size={35} color="#1a73e8" />
                        </View>
                        <Text style={styles.doctorName}>{appointment.doctorName}</Text>
                        <Text style={styles.specialtyText}>{appointment.specialty}</Text>
                    </View>

                    <View style={styles.divider} />

                    <View style={styles.rowInfo}>
                        <View style={styles.detailItem}>
                            <Ionicons name="calendar-outline" size={20} color="#1a73e8" />
                            <Text style={styles.detailLabel}>Date</Text>
                            <Text style={styles.detailValue}>{appointment.date}</Text>
                        </View>
                        <View style={styles.detailItem}>
                            <Ionicons name="time-outline" size={20} color="#1a73e8" />
                            <Text style={styles.detailLabel}>Time</Text>
                            <Text style={styles.detailValue}>{appointment.time}</Text>
                        </View>
                    </View>

                    <Text style={styles.sectionTitle}>Your Reason for Visit</Text>
                    <View style={styles.reasonBox}>
                        <Text style={styles.reasonText}>{appointment.reason}</Text>
                    </View>

                    <Text style={[styles.sectionTitle, { color: '#2e7d32' }]}>Doctor's Clinical Notes</Text>
                    <View style={[styles.reasonBox, styles.doctorNoteBox]}>
                        <Text style={styles.doctorNoteText}>
                            {appointment.doctorDetails || "No notes added yet."}
                        </Text>
                    </View>

                    <View style={styles.actionContainer}>
                        <TouchableOpacity 
                            style={styles.btnReschedule} 
                            onPress={handleReschedule}
                        >
                            <Text style={styles.btnTextBlue}>Reschedule</Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                            style={styles.btnCancel} 
                            onPress={handleCancel}
                        >
                            <Text style={styles.btnTextRed}>Cancel Appointment</Text>
                        </TouchableOpacity>
                    </View>

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