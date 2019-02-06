import {combineReducers, createStore, applyMiddleware} from 'redux';
import {ArticlesReducer} from "./reducers/articlesReducer";
import {MoneyCellsReducer} from "./reducers/moneyCellsReducer";
import {PeopleReducer} from "./reducers/peopleReducer";
import {TransactionsReducer} from "./reducers/transactionsReducer";
import {SystemDataReducer} from "./reducers/systemDataReducer";
import {defaultState} from './defaultState';
import {storage} from "../helpers/storage";
import {isNullOrUndefined} from "../helpers/maybe";

const logger = ({getState}) => {
    return next => action => {
        const result = next(action);
        storage.save(getState());
        return result;
    }
};



export const storeFactory = () => {
    let initialState = storage.load();
    if(isNullOrUndefined(initialState)){
        storage.save(defaultState);
        initialState = storage.load();
    }

    return createStore(
        combineReducers({
            "people": PeopleReducer,
            "moneyCells": MoneyCellsReducer,
            "transactions": TransactionsReducer,
            "articles": ArticlesReducer,
            "systemData": SystemDataReducer
        }), initialState, applyMiddleware(logger));
}