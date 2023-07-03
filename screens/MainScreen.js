import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  Image,
  ActivityIndicator,
  useColorScheme,
} from "react-native";
// import { Button } from "@rneui/themed";
// import { Ionicons } from "@expo/vector-icons";
import { getWeatherIcon } from '../assets/weatherIcons/WeatherIcons';
import { LinearGradient } from "expo-linear-gradient";
import { getButtonTheme, getGradientTheme, getTextTheme } from "../const/Themes";
import Layout from "../const/Layout";
import * as Location from 'expo-location';

export default MainScreen = (props) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [weatherIcon, setWeatherIcon] = useState(getWeatherIcon("800", "01d"));
  const colorScheme = useColorScheme();
  const apiKey = "11c13e975e4bfba45cf8587b81712f16";

  useEffect(() => {
    const getLocationAndFetchWeather = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Permission to access location was denied');
          return;
        }

        const location = await Location.getCurrentPositionAsync({ timeout: 5000 });
        const { latitude, longitude } = location.coords;

        let response = await fetch(
          `http://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&units=metric&lat=${latitude}&lon=${longitude}`
        );
        response = await response.json();

        if (response.cod >= 400) {
          Alert.alert("Error!", response.message, [{ title: "Ok" }]);
        } else {
          const city = await Location.reverseGeocodeAsync({ latitude, longitude });
          const cityName = city[0].city || city[0].subregion || city[0].region;
          response.name = cityName;
          setData(response);
          setWeatherIcon(getWeatherIcon(response.weather[0].id, response.weather[0].icon));
        }
      } catch (err) {
        Alert.alert("Could not get location!", err.message, [{ title: "Ok" }]);
      }
      setIsLoading(false);
    };

    getLocationAndFetchWeather();
  }, []);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>

      <View style={Layout.weatherContainer}>
        {isLoading ? (
          <ActivityIndicator style={{ marginTop: 20 }} size="large" color={getButtonTheme(colorScheme === "light")} />
        ) : (
          <View style={styles.bottomContainer}>
            <Text style={Layout.buttonText}>
              {data.name}: {"\n"}{data.weather[0].description} {"\n"}{data.main.temp.toFixed(1)} °C.
            </Text>
            <Image style={styles.weatherImage} source={weatherIcon} resizeMode="contain" />
          </View>
        )}
      </View>

    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: "100%",
    padding: 10,

  },
  weatherImage: {
    alignSelf: 'flex-end',
    width: 50,
    height: 50,
    marginTop: 10,
    marginHorizontal: 20,
  }
});
