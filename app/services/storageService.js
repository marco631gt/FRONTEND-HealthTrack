import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";

// Datos NO sensibles
export const setItem = async (key, value) => {
  await AsyncStorage.setItem(key, JSON.stringify(value));
};

export const getItem = async (key) => {
  const data = await AsyncStorage.getItem(key);
  return data ? JSON.parse(data) : null;
};

// Datos sensibles
export const saveToken = async (token) => {
  await SecureStore.setItemAsync("token", token);
};

export const getToken = async () => {
  return await SecureStore.getItemAsync("token");
};

export const deleteToken = async () => {
  await SecureStore.deleteItemAsync("token");
};


const storageService = {
  setItem,
  getItem,
  saveToken,
  getToken,
  deleteToken
};

export default storageService; 