import React, { useState } from "react";
import SplashScreen from './views/SplashScreen';
import LoginScreen from './views/LoginScreen';

export default function Index() {
  const [isLoading, setIsLoading] = useState(true);

  if (isLoading) {
    return <SplashScreen onFinish={() => setIsLoading(false)} />;
  }

  // Simplemente retornamos el Login. 
  // La navegación se gestiona por carpetas automáticamente.
  return <LoginScreen />;
}