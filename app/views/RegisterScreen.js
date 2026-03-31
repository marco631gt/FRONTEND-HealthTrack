import React from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRegister } from '../hooks/useRegister';
import { useRouter } from 'expo-router';

const RegisterScreen = () => {
    const router = useRouter(); // Inicialización del router
    const {
        name,
        setName,
        email,
        setEmail,
        password,
        setPassword,
        role,
        setRole,
        handleRegister
    } = useRegister();

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scroll}>

                {/* Botón de volver corregido */}
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => router.back()}
                >
                    <Ionicons name="arrow-back-circle" size={45} color="#fff" />
                </TouchableOpacity>

                <View style={styles.header}>
                    <Text style={styles.title}>Sign Up</Text>
                </View>

                <View style={styles.card}>
                    <Text style={styles.label}>Name</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your full name"
                        value={name}
                        onChangeText={setName}
                    />

                    <Text style={styles.label}>Email Address</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your email address"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />

                    <Text style={styles.label}>Password</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your password"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                    />

                    <Text style={styles.label}>Role</Text>
                    <View style={styles.roleContainer}>
                        <Text style={styles.rolePlaceholder}>Choose your role</Text>

                        <TouchableOpacity style={styles.checkboxRow} onPress={() => setRole('Doctor')}>
                            <Ionicons name={role === 'Doctor' ? "checkbox" : "square-outline"} size={24} color="#007bff" />
                            <Text style={styles.checkboxLabel}>Doctor</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.checkboxRow} onPress={() => setRole('Patient')}>
                            <Ionicons name={role === 'Patient' ? "checkbox" : "square-outline"} size={24} color="#007bff" />
                            <Text style={styles.checkboxLabel}>Patient</Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity style={styles.btnSignUp} onPress={handleRegister}>
                        <Text style={styles.btnText}>Sign Up</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.footer} onPress={() => router.back()}>
                        <Text style={styles.footerText}>Already have an account? <Text style={styles.bold}>Login In</Text></Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#1a73e8' },
    scroll: { flexGrow: 1 },
    backButton: { padding: 20 },
    header: { alignItems: 'center', marginBottom: 20 },
    title: { fontSize: 42, fontWeight: 'bold', color: '#fff' },
    card: {
        flex: 1,
        backgroundColor: '#fff',
        borderTopLeftRadius: 50,
        padding: 30,
        paddingTop: 50
    },
    label: { fontSize: 16, fontWeight: 'bold', color: '#444', marginBottom: 5 },
    input: {
        backgroundColor: '#f0f7ff',
        borderRadius: 10,
        padding: 15,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#d0e0f0',
        elevation: 2
    },
    roleContainer: {
        backgroundColor: '#f0f7ff',
        borderRadius: 10,
        padding: 15,
        marginBottom: 30,
        borderWidth: 1,
        borderColor: '#d0e0f0',
    },
    rolePlaceholder: { color: '#999', marginBottom: 10 },
    checkboxRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
    checkboxLabel: { marginLeft: 10, fontSize: 16, color: '#444' },
    btnSignUp: {
        backgroundColor: '#1a73e8',
        padding: 18,
        borderRadius: 15,
        alignItems: 'center',
        elevation: 4
    },
    btnText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
    footer: { marginTop: 20, alignItems: 'center' },
    footerText: { color: '#666' },
    bold: { fontWeight: 'bold', color: '#333' }
});

export default RegisterScreen;