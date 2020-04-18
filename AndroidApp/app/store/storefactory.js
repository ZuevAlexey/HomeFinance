import {combineReducers, createStore} from 'redux';
import {createMigrate, persistReducer, persistStore} from 'redux-persist'
import storage from 'redux-persist/lib/storage';
import {defaultState} from './defaultState';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'
import {mainTransform} from './transform';
import {MainReducer} from "./reducers/mainReducer";
import {migrationsManifest} from "./migrations";

const persistConfig = {
    key: 'root',
    version: 0,
    storage,
    transforms: [mainTransform],
    whitelist: ['main'],
    stateReconciler: autoMergeLevel2,
    migrate: createMigrate(migrationsManifest)
};

const rootReducer = combineReducers({
    'main': MainReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const storeFactory = () => {
    let store = createStore(persistedReducer, defaultState);
    let persistor = persistStore(store);
    return {store, persistor}
};