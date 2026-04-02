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
import { useRouter } from 'expo-router';


const LoginScreen = () => {
    const router = useRouter();
    const {
        email,
        setEmail,
        password,
        setPassword,
        handleLogin
    } = useLogin();

    const [rememberMe, setRememberMe] = useState(false);


    return (
        <SafeAreaView style={styles.safeArea}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.keyboardView}
            >
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    keyboardShouldPersistTaps="handled"
                >
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View style={styles.mainContainer}>

                            <Image
                                source={require('../assets/images/doctor-icon.png')}
                                style={styles.headerImage}
                                contentFit="contain"
                            />

                            <View style={styles.titleContainer}>
                                <Text style={styles.title}>Login In</Text>
                            </View>

                            <View style={styles.formContainer}>
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

                            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                                <Text style={styles.loginButtonText}>Login In</Text>
                            </TouchableOpacity>

                            <View style={styles.optionsContainer}>
                                <TouchableOpacity
                                    style={styles.checkboxContainer}
                                    onPress={() => setRememberMe(!rememberMe)}
                                >
                                    <Ionicons
                                        name={rememberMe ? "checkbox" : "square-outline"}
                                        size={22}
                                        color="#007bff"
                                    />
                                    <Text style={styles.checkboxLabel}>Remember me</Text>
                                </TouchableOpacity>

                                <View style={styles.verticalSeparator} />

                                <TouchableOpacity>
                                    <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                                </TouchableOpacity>
                            </View>

                            <Text style={styles.socialTitle}>Our Sign in with</Text>
                            <View style={styles.socialButtonsContainer}>
                                <TouchableOpacity style={styles.socialButton}>
                                    <Image source={require('../assets/images/facebook.jpg')} style={{ width: 35, height: 35 }} />
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.socialButton}>
                                    <Image source={require('../assets/images/google.png')} style={{ width: 35, height: 35 }} />
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.socialButton}>
                                    <FontAwesome name="apple" size={40} color="#1c1c1e" />
                                </TouchableOpacity>
                            </View>

                            <View style={styles.signUpContainer}>
                                <Text style={styles.signUpText}>Don't have an account?</Text>
                                <TouchableOpacity onPress={() => router.push('/views/RegisterScreen')}>
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

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#fcfcfc",
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
        paddingTop: Platform.OS === "ios" ? 20 : 50,
        alignItems: "center",
    },
    headerImage: {
        width: '100%',
        height: 180,
        marginBottom: 20,
        marginTop: 10,
    },
    titleContainer: {
        width: '100%',
        alignItems: 'center',
        marginBottom: 30,
        position: 'relative',
    },
    title: {
        fontSize: 48,
        fontWeight: "900",
        color: "#1a4f8d",
        fontFamily: Platform.OS === "ios" ? "AvenirNext-Heavy" : "Roboto",
    },
    titleShadow: {
        fontSize: 48,
        fontWeight: "900",
        color: "#b9d4ec",
        position: 'absolute',
        top: 4,
        left: 4,
        fontFamily: Platform.OS === "ios" ? "AvenirNext-Heavy" : "Roboto",
    },
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
        backgroundColor: "#ecf4fa",
        borderRadius: 15,
        borderWidth: 1,
        borderColor: "#d1e4f4",
        marginBottom: 20,
        elevation: 3,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
    },
    input: {
        paddingHorizontal: 20,
        paddingVertical: Platform.OS === "ios" ? 18 : 15,
        fontSize: 16,
        color: "#333",
    },
    loginButton: {
        width: '100%',
        backgroundColor: "#2a75ca",
        paddingVertical: 18,
        borderRadius: 15,
        alignItems: "center",
        marginBottom: 25,
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
        height: '100%',
        width: 2,
        backgroundColor: "#9a9a9a",
    },
    forgotPasswordText: {
        fontSize: 14,
        fontWeight: "500",
        color: "#4a4a4a",
    },
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