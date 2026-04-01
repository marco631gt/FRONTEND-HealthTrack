import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Platform, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { usePatientDashboard } from "../hooks/usePatientDashboard";

const PatientDashboardScreen = () => {
    const router = useRouter();
    
    const {
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
    } = usePatientDashboard();

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.blueHeader}>
                <View>
                    <Text style={styles.welcomeText}>Welcome back,</Text>
                    <Text style={styles.headerTitle}>Patient Panel</Text>
                </View>
                <TouchableOpacity onPress={() => router.push('/views/ProfileScreen')}>
                    <Ionicons name="person-circle" size={50} color="#fff" />
                </TouchableOpacity>
            </View>

            <View style={styles.contentCard}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    
                    <View style={styles.sectionHeader}>
                        <MaterialCommunityIcons name="calendar-edit" size={24} color="#1a73e8" />
                        <Text style={styles.sectionTitle}>Book Appointment</Text>
                    </View>

                    <View style={styles.formCard}>
                        <Text style={styles.label}>Select your Doctor</Text>
                        <View style={styles.inputWrapper}>
                            <TextInput 
                                style={styles.inputInternal}
                                placeholder="Tap to select doctor..."
                                value={selectedDoctor}
                                onChangeText={setSelectedDoctor}
                            />
                        </View>

                        <Text style={styles.label}>Date and Time</Text>
                        <View style={styles.inputWrapper}>
                            <TextInput 
                                style={styles.inputInternal}
                                placeholder="YYYY-MM-DD HH:MM"
                                value={appointmentDate}
                                onChangeText={setAppointmentDate}
                            />
                        </View>

                        <Text style={styles.label}>Reason for visit</Text>
                        <View style={[styles.inputWrapper, { height: 100 }]}>
                            <TextInput 
                                style={styles.inputInternal}
                                placeholder="Briefly describe your symptoms"
                                multiline
                                value={reason}
                                onChangeText={setReason}
                            />
                        </View>

                        <TouchableOpacity 
                            style={styles.btnCreate} 
                            onPress={handleCreateAppointment}
                        >
                            <Text style={styles.btnText}>Confirm Appointment</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={[styles.sectionHeader, { marginTop: 30 }]}>
                        <MaterialCommunityIcons name="format-list-bulleted" size={24} color="#1a73e8" />
                        <Text style={styles.sectionTitle}>My Appointments</Text>
                    </View>

                    {loading ? (
                        <ActivityIndicator color="#1a73e8" />
                    ) : (
                        <TouchableOpacity 
                            style={styles.appointmentItem}
                            onPress={() => router.push('/views/AppointmentDetailScreen')}
                        >
                            <View style={styles.apptInfo}>
                                <Text style={styles.apptDoctor}>Dr. Garcia</Text>
                                <Text style={styles.apptDate}>March 15, 2026 - 09:00 AM</Text>
                            </View>
                            <Ionicons name="chevron-forward-circle" size={30} color="#1a73e8" />
                        </TouchableOpacity>
                    )}
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#1a73e8' },
    blueHeader: {
        height: 100,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 25,
    },
    welcomeText: { color: '#b9d4ec', fontSize: 16, fontWeight: '500' },
    headerTitle: { color: '#fff', fontSize: 28, fontWeight: '900' },
    contentCard: {
        flex: 1,
        backgroundColor: '#fcfcfc',
        borderTopLeftRadius: 50,
        paddingHorizontal: 25,
        paddingTop: 30,
    },
    sectionHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
    sectionTitle: { fontSize: 20, fontWeight: 'bold', color: '#1a4f8d', marginLeft: 10 },
    formCard: {
        backgroundColor: '#fff',
        borderRadius: 25,
        padding: 20,
        elevation: 5,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
    },
    label: { fontSize: 14, fontWeight: 'bold', color: '#4a4a4a', marginBottom: 8, marginLeft: 5 },
    inputWrapper: {
        backgroundColor: '#ecf4fa',
        borderRadius: 15,
        borderWidth: 1,
        borderColor: '#d1e4f4',
        marginBottom: 15,
    },
    inputInternal: {
        padding: 15,
        fontSize: 15,
        color: '#333',
    },
    btnCreate: {
        backgroundColor: '#1a73e8',
        padding: 18,
        borderRadius: 15,
        alignItems: 'center',
        marginTop: 10,
    },
    btnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
    appointmentItem: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 15,
        elevation: 3,
    },
    apptInfo: { flex: 1 },
    apptDoctor: { fontSize: 17, fontWeight: 'bold', color: '#1a4f8d' },
    apptDate: { fontSize: 14, color: '#666', marginTop: 4 },
});

export default PatientDashboardScreen;