import {combineReducers, createStore, applyMiddleware} from 'redux';
import {ArticlesReducer} from "./reducers/articlesReducer";
import {MoneyCellsReducer} from "./reducers/moneyCellsReducer";
import {PeopleReducer} from "./reducers/peopleReducer";
import {TransactionsReducer} from "./reducers/transactionsReducer";
import {SystemDataReducer} from "./reducers/systemDataReducer";
import {initialState} from './initialState';
import {fileStorage} from "../helpers/fileStorage";

const stateName = 'state.json';

const logger = ({getState}) => {
    return next => action => {
        const result = next(action);
        fileStorage.save(stateName, getState());
        return result;
    }
};

export const storeFactory = () => createStore(
    combineReducers({
            "people": PeopleReducer,
            "moneyCells": MoneyCellsReducer,
            "transactions": TransactionsReducer,
            "articles": ArticlesReducer,
            "systemData": SystemDataReducer
        }), initialState, applyMiddleware(logger));