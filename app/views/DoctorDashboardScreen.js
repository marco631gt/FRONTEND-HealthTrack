import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Platform, Image as RNImage } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { Stack } from 'expo-router';
import { useDoctorDashboard } from '../hooks/useDoctorDashboard';
import { useRouter } from 'expo-router';

const DoctorDashboardScreen = () => {
    const { doctorName, totalPatients, schedule, selectedDate, changeDate, isLoading } = useDoctorDashboard(); const router = useRouter();

    const renderScheduleCard = (item) => {
        const appointmentDate = new Date(item.fecha);
        const timeStr = appointmentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        return (
            <View key={item._id} style={styles.scheduleCard}>
                <View style={styles.appointmentInfoContainer}>
                    <View style={styles.cardHeader}>
                        <Ionicons name="time-outline" size={22} color="#555" />
                        <Text style={styles.cardLabel}>HOUR:</Text>
                        <Text style={styles.cardValue}>{timeStr}</Text>
                    </View>
                    <View style={styles.cardContent}>
                        <Ionicons name="person-circle-outline" size={22} color="#555" />
                        <Text style={styles.cardLabel}>PATIENT:</Text>
                        <Text style={styles.cardValue}>{item.paciente?.nombre || "N/A"}</Text>
                    </View>
                </View>

                <TouchableOpacity
                    style={styles.detailsButton}
                    onPress={() => router.push({
                        pathname: '/views/AppointmentDetailsScreen',
                        params: { id: item._id }
                    })}
                >
                    <Ionicons name="chevron-forward-circle" size={32} color="#1a73e8" />
                </TouchableOpacity>
            </View>
        );
    };

    if (isLoading) {
        return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text>Loading Schedule...</Text></View>;
    }

    return (
        <View style={{ flex: 1, backgroundColor: '#1a73e8' }}>
            <Stack.Screen options={{ headerShown: false }} />

            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.topBar}>
                        <TouchableOpacity style={styles.notificationGroup}>
                            <View style={styles.notificationWrapper}>
                                <Ionicons name="notifications" size={20} color="#fff" />
                                <View style={styles.notificationBadge} />
                            </View>
                            <Text style={styles.notificationText}>Notifications</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.profileCircleWrapper} onPress={() => router.push('/views/ProfileScreen')}>
                            <RNImage
                                source={require('../assets/images/doctor-profile.png')}
                                style={styles.profileAvatar}
                            />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.welcomeSection}>
                        <View style={styles.logoRow}>
                            <View style={styles.logoImageWrapper}>
                                <Ionicons name="fitness-outline" size={28} color="#fff" />
                            </View>
                            <Text style={styles.appName}>HEALTH<Text style={styles.appBold}>TRACK</Text></Text>
                        </View>
                        <Text style={styles.welcomeText}>Welcome, Doctor</Text>
                    </View>
                </View>

                <View style={styles.contentCard}>
                    <View style={styles.tabContainer}>
                        <TouchableOpacity style={[styles.tab, styles.activeTab]}>
                            <Ionicons name="home" size={24} color="#fff" />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.tab}>
                            <Ionicons name="calendar-outline" size={24} color="#1a73e8" />
                        </TouchableOpacity>
                    </View>

                    <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                        <Text style={styles.sectionTitle}>BASIC INFORMATION</Text>

                        <View style={styles.basicInfoContainer}>
                            <View style={styles.profileHeader}>
                                <Ionicons name="person-circle-outline" size={24} color="#1a73e8" />
                                <Text style={styles.profileTitle}>MY PROFILE</Text>
                            </View>
                            <View style={styles.nameField}>
                                <Text style={styles.doctorNameField}>{doctorName}</Text>
                            </View>
                            <View style={styles.patientsField}>
                                <FontAwesome5 name="users" size={18} color="#aaa" />
                                <Text style={styles.patientsText}>{totalPatients} Total Patients Today</Text>
                            </View>
                        </View>

                        <Text style={styles.sectionTitle}>DATE FILTER</Text>
                        <View style={styles.dateFilterContainer}>
                            <TouchableOpacity onPress={() => changeDate(-1)}>
                                <Ionicons name="chevron-back" size={24} color="#1a73e8" />
                            </TouchableOpacity>

                            <View style={styles.dateInfo}>
                                <Ionicons name="calendar" size={18} color="#1a73e8" />
                                <Text style={styles.dateText}>
                                    {selectedDate.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' })}
                                </Text>
                            </View>

                            <TouchableOpacity onPress={() => changeDate(1)}>
                                <Ionicons name="chevron-forward" size={24} color="#1a73e8" />
                            </TouchableOpacity>
                        </View>

                        <Text style={styles.sectionTitle}>SCHEDULE FOR THIS DAY</Text>
                        {/* ... resto del mapeo de schedule */}


                        <Text style={styles.sectionTitle}>TODAY'S SCHEDULE</Text>

                        {schedule.length > 0 ? (
                            schedule.map(renderScheduleCard)
                        ) : (
                            <Text style={styles.noAppointments}>No appointments scheduled.</Text>
                        )}

                        <TouchableOpacity style={styles.viewAllButton}>
                            <Text style={styles.viewAllButtonText}>VIEW ALL APPOINTMENTS</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </View>
            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    header: {
        backgroundColor: '#1a73e8',
        height: Platform.OS === 'ios' ? 180 : 200,
        paddingHorizontal: 20,
        justifyContent: 'center',
    },
    topBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: -10,
    },
    notificationGroup: { flexDirection: 'row', alignItems: 'center' },
    notificationWrapper: {
        width: 34, height: 34,
        backgroundColor: 'rgba(255,255,255,0.2)',
        borderRadius: 17,
        justifyContent: 'center', alignItems: 'center',
    },
    notificationBadge: {
        width: 8, height: 8,
        backgroundColor: '#ff3b30',
        borderRadius: 4,
        position: 'absolute',
        top: 0, right: 0,
        borderWidth: 1, borderColor: '#1a73e8'
    },
    notificationText: { color: '#fff', fontSize: 13, marginLeft: 8, fontWeight: '500' },
    profileCircleWrapper: {
        width: 55, height: 55,
        backgroundColor: '#fff',
        borderRadius: 27.5,
        padding: 2,
        elevation: 5,
    },
    profileAvatar: { width: '100%', height: '100%', borderRadius: 27.5 },
    welcomeSection: { alignItems: 'center', marginTop: 10 },
    logoRow: { flexDirection: 'row', alignItems: 'center' },
    appName: { color: '#fff', fontSize: 22, marginLeft: 8 },
    appBold: { fontWeight: 'bold' },
    welcomeText: { color: '#fff', fontSize: 34, fontWeight: '900', marginTop: 5 },
    contentCard: {
        flex: 1,
        backgroundColor: '#f0f7ff',
        borderTopLeftRadius: 40,
        marginTop: 20,
        paddingHorizontal: 20,
    },
    tabContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: -25,
        marginBottom: 10,
        zIndex: 10,
    },
    tab: {
        width: 50, height: 50,
        backgroundColor: '#fff',
        borderRadius: 25,
        justifyContent: 'center', alignItems: 'center',
        marginHorizontal: 10,
        elevation: 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
    },
    activeTab: { backgroundColor: '#1a73e8' },
    scrollContent: { paddingTop: 15, paddingBottom: 30 },
    sectionTitle: {
        fontSize: 16, fontWeight: 'bold',
        color: '#1a4f8d',
        marginVertical: 12,
    },
    basicInfoContainer: {
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 15,
        marginBottom: 10,
        elevation: 3,
    },
    profileHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
    profileTitle: { fontSize: 14, fontWeight: 'bold', color: '#444', marginLeft: 8 },
    nameField: {
        backgroundColor: '#f8f9fa',
        borderRadius: 10,
        padding: 12,
        marginBottom: 10,
    },
    doctorNameField: { fontSize: 16, fontWeight: 'bold', color: '#333' },
    patientsField: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 5,
    },
    patientsText: { fontSize: 14, color: '#666', marginLeft: 10 },
    scheduleCard: {
        flexDirection: 'row',
        backgroundColor: '#e1ecf7',
        borderRadius: 15,
        padding: 15,
        marginBottom: 12,
        alignItems: 'center',
        borderWidth: 1, borderColor: '#d0e0f0',
    },
    appointmentInfoContainer: { flex: 1 },
    cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 5 },
    cardContent: { flexDirection: 'row', alignItems: 'center' },
    cardLabel: { fontSize: 14, fontWeight: 'bold', color: '#555', marginLeft: 8 },
    cardValue: { fontSize: 14, color: '#333', marginLeft: 5 },
    detailsButton: { marginLeft: 10 },
    viewAllButton: {
        backgroundColor: '#1a73e8',
        paddingVertical: 15,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 10,
    },
    viewAllButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
    dateFilterContainer: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 15,
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
        elevation: 2,
    },
    dateInfo: { flexDirection: 'row', alignItems: 'center' },
    dateText: { fontSize: 16, fontWeight: '600', color: '#333', marginLeft: 8, textTransform: 'capitalize' },
});

export default DoctorDashboardScreen;