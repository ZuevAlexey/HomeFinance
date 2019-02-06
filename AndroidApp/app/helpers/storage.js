//import {AsyncStorage} from 'react-native';
//var Sync = require('sync');

const key = '@HomeFinanceStore:store';

export const storage = {
    save : (data) => {
        //AsyncStorage.setItem.sync(key, data);
    },

    load: () => {
        //return AsyncStorage.getItem.sync(key);
    }
};