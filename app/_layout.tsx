import React, { useState, useEffect } from "react";
import { Stack } from "expo-router";
import SplashScreen from './views/SplashScreen';
import { getItem } from "./services/storageService";

export default function RootLayout() {
  const [isLoading, setIsLoading] = useState(true);

  if (isLoading) {
    return <SplashScreen onFinish={() => setIsLoading(false)} />;
  }

  // Usamos Stack para que la navegación "exista"
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" /> 
      <Stack.Screen name="doctor/appointment/[id]" />
    </Stack>
  );
}