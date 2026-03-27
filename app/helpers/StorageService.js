import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Keychain from 'react-native-keychain';

class StorageService {
    //REGEX 
    //Common Patterns
    static patterns = {
        email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
    };

    static validate(type, value) {
        return this.patterns[type] ? this.patterns[type].test(value) : false;
    }

    //ASYNC STORAGE data no sensible
    static async setItem(key, value) {
        try {
            const jsonValue = JSON.stringify(value);
            await AsyncStorage.setItem(key, jsonValue);
        } catch (error) {
            console.error('Error guardando en AsyncStorage', error);
        }
    }

    static async getItem(key) {
        try {
            const jsonValue = await AsyncStorage.getItem(key);
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch (error) {
            console.error('Error guardando en AsyncStorage', error);
        }
    }

    // KEYCHAIN - Sensitive
    static async saveCredentials(username, token) {
        try {
            await Keychain.setGenericPassword(username, token);
            return true;
        } catch (error) {
            console.error('Error en KeyChain', error);
        }
    }


    static async getCredentials() {
        try {
            const credentials = await Keychain.getGenericPassword();
            if (credentials) {
                return {
                    user: credentials.username, token: credentials.password
                };
            }
            return null;
        } catch (error) {
            console.error('No se pudieron recuperar las credenciales', error);
        }
    }

    static async resetCredentials() {
        await Keychain.resetGenericPassword();
    }
}

export default StorageService;


