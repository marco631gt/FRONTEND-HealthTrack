import React, { useEffect } from 'react';
import { View, Image, StyleSheet, ActivityIndicator } from 'react-native';

const SplashScreen = ({ onFinish }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
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
      <ActivityIndicator size="large" color="#2a75ca" style={styles.loader} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2a75ca', 
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