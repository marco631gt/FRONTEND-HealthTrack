import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { usePatientDashboard } from "../hooks/usePatientDashboard";

const PatientDashboardScreen = () => {
    const router = useRouter();
    const {
        doctors, appointments, loading,
        selectedDoctorId, setSelectedDoctorId,
        appointmentDate, setAppointmentDate,
        selectedHour, setSelectedHour,
        reason, setReason,
        availableSlots,
        showDatePicker, setShowDatePicker,
        handleCreateAppointment
    } = usePatientDashboard();

    // Manejador del calendario
    const onChangeDate = (event, selectedDate) => {
        setShowDatePicker(false); // Cerrar calendario
        if (selectedDate) {
            // Formatear a YYYY-MM-DD
            const year = selectedDate.getFullYear();
            const month = (selectedDate.getMonth() + 1).toString().padStart(2, '0');
            const day = selectedDate.getDate().toString().padStart(2, '0');
            setAppointmentDate(`${year}-${month}-${day}`);
            setSelectedHour(null); // Resetear hora al cambiar día
        }
    };

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
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>

                    <View style={styles.sectionHeader}>
                        <MaterialCommunityIcons name="calendar-edit" size={24} color="#1a73e8" />
                        <Text style={styles.sectionTitle}>Book Appointment</Text>
                    </View>

                    <View style={styles.formCard}>
                        <Text style={styles.label}>Select Doctor</Text>
                        <View style={styles.pickerWrapper}>
                            <Picker
                                selectedValue={selectedDoctorId}
                                onValueChange={(v) => setSelectedDoctorId(v)}
                                style={styles.picker}
                            >
                                <Picker.Item label="Tap to select..." value={null} color="#999" />
                                {doctors.map((doc) => (
                                    <Picker.Item key={doc._id} label={doc.nombre} value={doc._id} />
                                ))}
                            </Picker>
                        </View>

                        <Text style={styles.label}>Date (Tap to select)</Text>
                        <TouchableOpacity
                            style={styles.inputWrapper}
                            onPress={() => setShowDatePicker(true)}
                        >
                            <Text style={[styles.inputInternal, { color: appointmentDate ? '#333' : '#999' }]}>
                                {appointmentDate || "YYYY-MM-DD"}
                            </Text>
                        </TouchableOpacity>

                        {showDatePicker && (
                            <DateTimePicker
                                value={new Date()}
                                mode="date"
                                display="default"
                                minimumDate={new Date()}
                                onChange={onChangeDate}
                            />
                        )}

                        <Text style={styles.label}>Available Hours</Text>
                        <View style={styles.slotsContainer}>
                            {availableSlots.length > 0 ? (
                                availableSlots.map((slot) => (
                                    <TouchableOpacity
                                        key={slot}
                                        style={[styles.slotChip, selectedHour === slot && styles.slotChipSelected]}
                                        onPress={() => setSelectedHour(slot)}
                                    >
                                        <Text style={[styles.slotText, selectedHour === slot && styles.slotTextSelected]}>
                                            {slot}
                                        </Text>
                                    </TouchableOpacity>
                                ))
                            ) : (
                                <Text style={styles.emptySlotsText}>Select doctor and date to see hours</Text>
                            )}
                        </View>

                        <Text style={styles.label}>Reason</Text>
                        <View style={[styles.inputWrapper, { height: 70 }]}>
                            <TextInput
                                style={styles.inputInternal}
                                placeholder="Symptoms..."
                                multiline
                                value={reason}
                                onChangeText={setReason}
                            />
                        </View>

                        <TouchableOpacity
                            style={[styles.btnCreate, loading && { opacity: 0.7 }]}
                            onPress={handleCreateAppointment}
                            disabled={loading}
                        >
                            {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.btnText}>Confirm Appointment</Text>}
                        </TouchableOpacity>
                    </View>

                    <View style={[styles.sectionHeader, { marginTop: 30 }]}>
                        <MaterialCommunityIcons name="format-list-bulleted" size={24} color="#1a73e8" />
                        <Text style={styles.sectionTitle}>My Appointments</Text>
                    </View>

                    {appointments.map((item) => (
                        <TouchableOpacity
                            key={item._id}
                            style={styles.appointmentItem}
                            // Navegamos a la vista de detalle pasando el ID como parámetro
                            onPress={() => router.push({
                                pathname: '/views/AppointmentDetailScreen',
                                params: { id: item._id }
                            })}
                        >
                            <View style={styles.apptInfo}>
                                <Text style={styles.apptDoctor}>{item.medico?.nombre || 'Doctor'}</Text>
                                <Text style={styles.apptDate}>{new Date(item.fecha).toLocaleString()}</Text>
                                <View style={[styles.badge, { backgroundColor: getStatusColor(item.estado) }]}>
                                    <Text style={styles.badgeText}>
                                        {STATUS_TRANSLATIONS[item.estado]?.label || item.estado}
                                    </Text>
                                </View>
                            </View>
                            <Ionicons name="chevron-forward-circle" size={30} color="#1a73e8" />
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

//le movi a colors, porque antes estaban asi: const colors = { confirmada: '#27ae60', pendiente: '#f39c12', cancelada: '#e74c3c', realizada: '#3498db' }; 2
// 1. Objeto de soporte
const STATUS_TRANSLATIONS = {
    confirmada: { label: 'Confirmed', key: 'confirmed' },
    pendiente: { label: 'Pending', key: 'pending' },
    cancelada: { label: 'Cancelled', key: 'cancelled' },
    realizada: { label: 'Completed', key: 'completed' },
};

// 2. Función de color actualizada
const getStatusColor = (status) => {
    const colors = {
        confirmed: '#27ae60',
        pending: '#f39c12',
        cancelled: '#e74c3c',
        completed: '#3498db'
    };
    const key = STATUS_TRANSLATIONS[status]?.key;
    return colors[key] || '#95a5a6';
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#1a73e8' },
    blueHeader: { height: 100, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 25 },
    welcomeText: { color: '#b9d4ec', fontSize: 16, fontWeight: '500' },
    headerTitle: { color: '#fff', fontSize: 28, fontWeight: '900' },
    contentCard: { flex: 1, backgroundColor: '#fcfcfc', borderTopLeftRadius: 50, paddingHorizontal: 25, paddingTop: 30 },
    sectionHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
    sectionTitle: { fontSize: 20, fontWeight: 'bold', color: '#1a4f8d', marginLeft: 10 },
    formCard: { backgroundColor: '#fff', borderRadius: 25, padding: 20, elevation: 5, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 10 },
    label: { fontSize: 13, fontWeight: 'bold', color: '#4a4a4a', marginBottom: 8, marginLeft: 5 },
    pickerWrapper: { backgroundColor: '#ecf4fa', borderRadius: 15, borderWidth: 1, borderColor: '#d1e4f4', marginBottom: 12, overflow: 'hidden' },
    picker: { height: 50, width: '100%' },
    inputWrapper: { backgroundColor: '#ecf4fa', borderRadius: 15, borderWidth: 1, borderColor: '#d1e4f4', marginBottom: 12 },
    inputInternal: { padding: 12, fontSize: 14, color: '#333' },
    slotsContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 15 },
    slotChip: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 10, backgroundColor: '#ecf4fa', borderWhite: 1, borderColor: '#d1e4f4' },
    slotChipSelected: { backgroundColor: '#1a73e8', borderColor: '#1a73e8' },
    slotText: { fontSize: 13, color: '#1a73e8', fontWeight: '600' },
    slotTextSelected: { color: '#fff' },
    emptySlotsText: { fontSize: 12, color: '#999', fontStyle: 'italic', marginBottom: 10 },
    btnCreate: { backgroundColor: '#1a73e8', padding: 16, borderRadius: 15, alignItems: 'center' },
    btnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
    appointmentItem: { backgroundColor: '#fff', padding: 18, borderRadius: 20, flexDirection: 'row', alignItems: 'center', marginBottom: 12, elevation: 3 },
    apptInfo: { flex: 1 },
    apptDoctor: { fontSize: 16, fontWeight: 'bold', color: '#1a4f8d' },
    apptDate: { fontSize: 13, color: '#666', marginVertical: 4 },
    badge: { alignSelf: 'flex-start', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8 },
    badgeText: { color: '#fff', fontSize: 10, fontWeight: 'bold', textTransform: 'uppercase' },
});

export default PatientDashboardScreen;