import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = (data) => {
  try {
    AsyncStorage.setItem('FAVORITES', JSON.stringify(data));
    return "stored it!";
  } catch (e) {
    throw e;
  }
};

export const getData = () => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem('FAVORITES').then(value => {
      if (value != null) {
        resolve(value);
      } else {
        reject(Error("Something went wrong!"));
      }
    });
  });
};