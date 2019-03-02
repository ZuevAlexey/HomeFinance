import {createStore} from 'redux';
import {persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage';
import {defaultState} from './defaultState';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'
import {
    articlesTransform,
    moneyCellsTransform,
    peopleTransform,
    systemDataTransform,
    transactionsTransform
} from './transform';
import {MainReducer} from "./reducers/mainReducer";

const persistConfig = {
    key: 'root',
    storage,
    transforms: [systemDataTransform, peopleTransform, moneyCellsTransform, transactionsTransform, articlesTransform],
    whitelist: ['people', 'moneyCells', 'transactions', 'articles', 'systemData'],
    stateReconciler: autoMergeLevel2
};

const persistedReducer = persistReducer(persistConfig, MainReducer)

export const storeFactory = () => {
    let store = createStore(persistedReducer, defaultState);
    let persistor = persistStore(store)
    return { store, persistor }
}