import React, { useState } from "react";
import {
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from "react-native";

import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLogin } from "../hooks/useLogin";

const LoginScreen = () => {
    // Integramos tu hook ViewModel
    const {
        email,
        setEmail,
        password,
        setPassword,
        handleLogin
    } = useLogin();

    // Estado local solo para el checkbox
    const [rememberMe, setRememberMe] = useState(false);

    return (
        <SafeAreaView style={styles.safeArea}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.keyboardView}
            >
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    keyboardShouldPersistTaps="handled" // Cierra teclado al tocar fuera
                >
                    {/* Cierra el teclado si tocas en cualquier parte de la pantalla */}
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View style={styles.mainContainer}>

                            {/* 1. Imagen de Cabecera (Doctora) */}
                            <Image
                                source={require('../assets/images/doctor-icon.png')}
                                style={styles.headerImage}
                                contentFit="contain" // Ajusta la imagen dentro del contenedor
                            />

                            {/* 2. Título principal "Login In" (con efecto 3D) */}
                            <View style={styles.titleContainer}>
                                <Text style={styles.title}>Login In</Text>
                            </View>

                            {/* 3. Inputs */}
                            <View style={styles.formContainer}>
                                {/* Email */}
                                <Text style={styles.inputLabel}>Email Address</Text>
                                <View style={styles.inputWrapper}>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Enter your email address"
                                        placeholderTextColor="#b0b0b0"
                                        value={email}
                                        onChangeText={setEmail}
                                        keyboardType="email-address"
                                        autoCapitalize="none"
                                    />
                                </View>

                                {/* Password */}
                                <Text style={styles.inputLabel}>Password</Text>
                                <View style={styles.inputWrapper}>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Enter your password"
                                        placeholderTextColor="#b0b0b0"
                                        value={password}
                                        onChangeText={setPassword}
                                        secureTextEntry={true}
                                    />
                                </View>
                            </View>

                            {/* 4. Botón de Login */}
                            <TouchableOpacity style={styles.loginButton}
                                onPress={handleLogin}>
                                <Text
                                    style={styles.loginButtonText}>Login In
                                </Text>
                            </TouchableOpacity>

                            {/* 5. Remember Me / Forgot Password? */}
                            <View style={styles.optionsContainer}>
                                {/* Checkbox (Remember me) */}
                                <TouchableOpacity
                                    style={styles.checkboxContainer}
                                    onPress={() => setRememberMe(!rememberMe)}
                                >
                                    <Ionicons
                                        name={rememberMe ? "checkbox" : "square-outline"}
                                        size={22}
                                        color={rememberMe ? "#007bff" : "#007bff"} // Color azul del checkbox
                                    />
                                    <Text style={styles.checkboxLabel}>Remember me</Text>
                                </TouchableOpacity>

                                {/* Separador vertical */}
                                <View style={styles.verticalSeparator} />

                                {/* Forgot Password */}
                                <TouchableOpacity>
                                    <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                                </TouchableOpacity>
                            </View>

                            {/* 6. Social Sign In */}
                            <Text style={styles.socialTitle}>Our Sing in with</Text>
                            <View style={styles.socialButtonsContainer}>
                                {/* Facebook */}
                                <TouchableOpacity style={styles.socialButton}>
                                    <Image source={require('../assets/images/facebook.jpg')} style={{ width: 35, height: 35 }} />
                                </TouchableOpacity>
                                {/* Google */}
                                <TouchableOpacity style={styles.socialButton}>
                                    <Image source={require('../assets/images/google.png')} style={{ width: 35, height: 35 }} />
                                </TouchableOpacity>
                                {/* Apple */}
                                <TouchableOpacity style={styles.socialButton}>
                                    <FontAwesome name="apple" size={40} color="#1c1c1e" />
                                </TouchableOpacity>
                            </View>

                            {/* 7. Sign Up Link */}
                            <View style={styles.signUpContainer}>
                                <Text style={styles.signUpText}>Don’t have an account?</Text>
                                <TouchableOpacity>
                                    <Text style={styles.signUpLink}> Sign Up</Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                    </TouchableWithoutFeedback>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

// 🎨  DISEÑO 
const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#fcfcfc", // Fondo casi blanco
    },
    keyboardView: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
    },
    mainContainer: {
        flex: 1,
        paddingHorizontal: 25,
        paddingTop: Platform.OS === "ios" ? 20 : 50, // Pequeño margen superior
        alignItems: "center",
    },
    // 1. Imagen de Cabecera
    headerImage: {
        width: '100%',
        height: 180, // Ajusta según la imagen real
        marginBottom: 20,
        marginTop: 10,
    },
    // 2. Título (Doble texto para efecto sombra)
    titleContainer: {
        width: '100%',
        alignItems: 'center',
        marginBottom: 30,
        position: 'relative',
    },
    title: {
        fontSize: 48,
        fontWeight: "900", // Muy negrita
        color: "#1a4f8d", // Azul oscuro
        fontFamily: Platform.OS === "ios" ? "AvenirNext-Heavy" : "Roboto", // Tipografía gruesa
    },
    titleShadow: {
        fontSize: 48,
        fontWeight: "900",
        color: "#b9d4ec", // Sombra azul clara
        position: 'absolute',
        top: 4, // Desplazamiento
        left: 4, // Desplazamiento
        fontFamily: Platform.OS === "ios" ? "AvenirNext-Heavy" : "Roboto",
    },
    // 3. Inputs
    formContainer: {
        width: '100%',
        marginBottom: 25,
    },
    inputLabel: {
        fontSize: 16,
        fontWeight: "600",
        color: "#4a4a4a",
        marginBottom: 8,
        marginLeft: 5,
    },
    inputWrapper: {
        backgroundColor: "#ecf4fa", // Color de fondo claro
        borderRadius: 15,
        borderWidth: 1,
        borderColor: "#d1e4f4", // Borde claro
        marginBottom: 20,
        // Sombra (Elevation Android)
        elevation: 3,
        // Sombra (Shadows iOS)
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
    },
    input: {
        paddingHorizontal: 20,
        paddingVertical: Platform.OS === "ios" ? 18 : 15, // Ajuste para el padding
        fontSize: 16,
        color: "#333",
    },
    // 4. Botón de Login
    loginButton: {
        width: '100%',
        backgroundColor: "#2a75ca", // Azul del botón
        paddingVertical: 18,
        borderRadius: 15,
        alignItems: "center",
        marginBottom: 25,
        // Sombra del botón
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    loginButtonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },
    // 5. Options Container (Remember/Forgot)
    optionsContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: '100%',
        marginBottom: 40,
        paddingHorizontal: 10,
    },
    checkboxContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    checkboxLabel: {
        fontSize: 14,
        color: "#4a4a4a",
        fontWeight: "500",
        marginLeft: 8,
    },
    verticalSeparator: {
        height: '100%', // Usa el 100% del contenedor padre
        width: 2,
        backgroundColor: "#9a9a9a", // Color del separador gris
    },
    forgotPasswordText: {
        fontSize: 14,
        fontWeight: "500",
        color: "#4a4a4a",
    },
    // 6. Social Sign In
    socialTitle: {
        fontSize: 16,
        fontWeight: "600",
        color: "#4a4a4a",
        marginBottom: 15,
    },
    socialButtonsContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        width: '100%',
        marginBottom: 35,
    },
    socialButton: {
        marginHorizontal: 15,
        padding: 5,
    },
    // 7. Sign Up Link
    signUpContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 30,
    },
    signUpText: {
        fontSize: 15,
        color: "#4a4a4a",
        fontWeight: "500",
    },
    signUpLink: {
        fontSize: 15,
        fontWeight: "700",
        color: "#4a4a4a",
    },
});

export default LoginScreen;