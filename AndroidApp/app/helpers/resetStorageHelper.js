import {AsyncStorage} from 'react-native';

const KEY = '@HomeFinance:storeForReset';

export const saveSyncData = async (state) => {
    await AsyncStorage.setItem(KEY, JSON.stringify({
        main: state.main
    }));
};

export const readLocalSyncData = async () => {
    return await AsyncStorage.getItem(KEY, undefined);
};