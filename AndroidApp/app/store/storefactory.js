import {combineReducers, createStore} from 'redux';
import {persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage';
import {MoneyCellsReducer} from "./reducers/moneyCellsReducer";
import {PeopleReducer} from "./reducers/peopleReducer";
import {TransactionsReducer} from "./reducers/transactionsReducer";
import {SystemDataReducer} from "./reducers/systemDataReducer";
import {defaultState} from "./defaultState";
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'
import {
    articlesTransform,
    moneyCellsTransform,
    peopleTransform,
    systemDataTransform,
    transactionsTransform
} from "./transform";
import {ArticlesReducer} from "./reducers/articlesReducer";

const persistConfig = {
    key: 'root',
    storage,
    transforms: [systemDataTransform, peopleTransform, moneyCellsTransform, transactionsTransform, articlesTransform],
    whitelist: ['people', 'moneyCells', 'transactions', 'articles', 'systemData'],
    stateReconciler: autoMergeLevel2
};

const rootReducer = combineReducers({
    "people": PeopleReducer,
    "moneyCells": MoneyCellsReducer,
    "transactions": TransactionsReducer,
    "articles": ArticlesReducer,
    "systemData": SystemDataReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const storeFactory = () => {
    let store = createStore(persistedReducer, defaultState);
    let persistor = persistStore(store)
    return { store, persistor }
}