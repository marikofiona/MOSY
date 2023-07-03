import React, { useEffect } from 'react';
import { StyleSheet, View, Image } from 'react-native';

import splashImage from '../assets/splash3.png';

const SplashScreen = () => {
  useEffect(() => {
    // Hier können zusätzliche Initialisierungs- oder Ladevorgänge durchgeführt werden

    // Beispiel: 
    // fetchInitialData()
    //   .then(() => {
    //     // Daten wurden erfolgreich geladen
    //   })
    //   .catch((error) => {
    //     // Fehler beim Laden der Daten
    //   });
  }, []);

  return (
    <View style={styles.container}>
      <Image source={splashImage} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#A0BBA5',
  },
  image: {
    flex: 1,
    resizeMode: 'contain',
  },
});

export default SplashScreen;
