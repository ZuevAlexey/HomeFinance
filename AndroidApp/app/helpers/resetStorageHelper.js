import {AsyncStorage} from 'react-native';

const KEY = '@HomeFinance:storeForReset';

export const saveSyncData = async (state) => {
    await AsyncStorage.setItem(KEY, JSON.stringify({
        people: state.people,
        moneyCells: state.moneyCells,
        transactions: state.transactions,
        articles: state.articles,
        systemData: state.systemData
    }));
};

export const readLocalSyncData = async () => {
    return await AsyncStorage.getItem(KEY, undefined);
};