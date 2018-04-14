import { AsyncStorage } from 'react-native';
import ApiErrorModel from '../models/error/ApiErrorModel';


export default class PreferencesRepo {

    async saveValue(key: string, value: string): Promise<ApiErrorModel>  {
        try {
            await AsyncStorage.setItem(key, value);
        } catch(error) {
            let error = {
                code: "191811", 
                message: "Error when saving item to storage"
            }
            return ApiErrorModel.createDefaultErrorInstance(error);
        }
    }

    async getValue(key: string): Promise<string | ApiErrorModel> {
        try {
            const value = await AsyncStorage.getItem(key);
            return value;
        } catch(error) {
            let error = {
                code: "113145", 
                message: "Error when retrieving item from storage"
            }
            return ApiErrorModel.createDefaultErrorInstance(error);
        }
    }

    async getAllKeys() {
        try {
            const keys = await AsyncStorage.getAllKeys();
            return keys;
        } catch(error) {
            let error = {
                code: "113172", 
                message: "Error when retrieving keys"
            }
            return ApiErrorModel.createDefaultErrorInstance(error);
        }
    }

    async deleteAllDataFromPreferences() {
        try {
            const keys = await this.getAllKeys();
            await AsyncStorage.multiRemove(keys);
        } catch(error) {
            let error = {
                code: "113179", 
                message: "Error when deleting keys"
            }
            return ApiErrorModel.createDefaultErrorInstance(error);
        }
    }


}