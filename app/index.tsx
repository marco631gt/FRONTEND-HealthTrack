import React, { useState } from "react";
import SplashScreen from '../app/views/SplashScreen';
import LoginScreen from "./views/LoginScreen";

export default function Index() {
  const [isLoading, setIsLoading] = useState(true);
  if (isLoading) {
    // Si está cargando, mostramos la Splash
    return <SplashScreen onFinish={() => setIsLoading(false)} />;
  }

  return <LoginScreen />;
}