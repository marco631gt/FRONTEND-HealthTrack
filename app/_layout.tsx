import React, { useState, useEffect } from "react";
import { Stack } from "expo-router";
import SplashScreen from './views/SplashScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';

declare global {
  var checkStorage: () => Promise<string | undefined>;
}

if (__DEV__) {
  global.checkStorage = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const data = await AsyncStorage.multiGet(keys);
      const token = await SecureStore.getItemAsync('token');
      
      console.log('CONTENIDO ASYNC STORAGE ');
      if (!data || data.length === 0) {
        console.log('Vacio');
      } else {
        console.table(data);
      }

      console.log('TOKEN EN SECURE STORE');
      console.log(token ? `Token actual: ${token}` : 'No hay token guardado');
      
      return "Consulta de almacenamiento finalizada";
    } catch (e) {
      console.error("Error en checkStorage:", e);
    }
  };
}

export default function RootLayout() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (__DEV__) {
      console.log("🛠 Debugger listo: Escribe checkStorage() en la consola");
    }
  }, []);

  if (isLoading) {
    return <SplashScreen onFinish={() => setIsLoading(false)} />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" /> 
      <Stack.Screen name="doctor/appointment/[id]" />
    </Stack>
  );
}