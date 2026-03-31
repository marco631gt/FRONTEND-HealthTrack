import React, { useEffect } from 'react';
import { View, Image, StyleSheet, ActivityIndicator } from 'react-native';

const SplashScreen = ({ onFinish }) => {
  useEffect(() => {
    // Simulamos una carga de 3 segundos y ya despues vamos a verificar tokens aquí
    const timer = setTimeout(() => {
      onFinish(); // Esta función le avisará a la App que ya puede mostrar el Login
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Image 
        source={require('../assets/images/splashImage.png')} 
        style={styles.image}
        resizeMode="contain"
      />
      {/* Opcional: un circulito de carga para que el usuario vea movimiento */}
      <ActivityIndicator size="large" color="#2a75ca" style={styles.loader} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2a75ca', // Ajusta al color de tu imagen
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '80%',
    height: '40%',
  },
  loader: {
    marginTop: 20,
  }
});

export default SplashScreen;