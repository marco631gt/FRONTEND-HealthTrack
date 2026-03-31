import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image as RNImage } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import { useProfile } from "../hooks/useProfile";
import { useRouter } from "expo-router";

const ProfileScreen = () => {
    const router = useRouter();
    const { user, isLoading, handleLogout } = useProfile();

    if (isLoading) return <View style={styles.center}><Text>Loading...</Text></View>;

    return (
        <SafeAreaView style={styles.container}>
            {/* Header Azul con Curva */}
            <View style={styles.blueHeader}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
                    <Ionicons name="arrow-back-circle" size={45} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Profile</Text>
            </View>

            {/* Tarjeta Blanca (Contenido) */}
            <View style={styles.contentCard}>
                {/* Avatar Circular que sobresale */}
                <View style={styles.avatarContainer}>
                    <View style={styles.avatarWrapper}>
                        <RNImage
                            source={require('../assets/images/doctor-profile.png')}
                            style={styles.avatarImg}
                        />
                    </View>
                </View>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.formContent}>

                    {/* Campo: Name */}
                    <Text style={styles.label}>Name</Text>
                    <View style={styles.inputBox}>
                        <Ionicons name="person-outline" size={20} color="#1a73e8" />
                        <Text style={styles.inputText}>{user?.name || 'Not available'}</Text>
                    </View>

                    {/* Campo: Email */}
                    <Text style={styles.label}>Email Address</Text>
                    <View style={styles.inputBox}>
                        <MaterialCommunityIcons name="email-outline" size={20} color="#1a73e8" />
                        <Text style={styles.inputText}>{user?.email || 'Not available'}</Text>
                    </View>

                    {/* Campo: Contact Phone */}
                    <Text style={styles.label}>Contact Phone</Text>
                    <View style={styles.inputBox}>
                        <Ionicons name="call-outline" size={20} color="#1a73e8" />
                        <Text style={styles.inputText}>{user?.phoneNumber || 'No phone set'}</Text>
                    </View>

                    {/* Botón Log Out */}
                    <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
                        <Text style={styles.logoutText}>LOG OUT</Text>
                        <Ionicons name="log-out-outline" size={20} color="#fff" style={{ marginLeft: 10 }} />
                    </TouchableOpacity>

                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#1a73e8' },
    blueHeader: {
        height: 120,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center'
    },
    headerTitle: { color: '#fff', fontSize: 28, fontWeight: '900', marginLeft: 15 },
    contentCard: {
        flex: 1,
        backgroundColor: '#f0f7ff',
        borderTopLeftRadius: 50,
        marginTop: 40, // Espacio para que el avatar respire
        paddingHorizontal: 25
    },
    avatarContainer: {
        alignItems: 'center',
        marginTop: -60, // Sube el círculo para que quede a la mitad
        marginBottom: 20
    },
    avatarWrapper: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: '#fff',
        padding: 5,
        elevation: 10,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 10,
    },
    avatarImg: { width: '100%', height: '100%', borderRadius: 60 },
    formContent: { paddingTop: 20 },
    label: { fontSize: 16, fontWeight: 'bold', color: '#1a4f8d', marginBottom: 8, marginLeft: 5 },
    inputBox: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 18,
        marginBottom: 20,
        elevation: 2
    },
    inputText: { marginLeft: 15, fontSize: 16, color: '#333', fontWeight: '500' },
    logoutBtn: {
        backgroundColor: '#ff4757',
        flexDirection: 'row',
        padding: 18,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30,
        elevation: 5
    },
    logoutText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
    center: { flex: 1, justifyContent: 'center', alignItems: 'center' }
});

export default ProfileScreen;