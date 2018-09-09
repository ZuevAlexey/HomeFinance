import {combineReducers, createStore} from 'redux';
import {ArticlesReducer} from "./reducers/articlesReducer";
import {MoneyCellsReducer} from "./reducers/moneyCellsReducer";
import {PeopleReducer} from "./reducers/peopleReducer";
import {TransactionsReducer} from "./reducers/transactionsReducer";
import {SystemDataReducer} from "./reducers/systemDataReducer";

export const storeFactory = initialState => createStore(
    combineReducers({
            "people": PeopleReducer,
            "moneyCells": MoneyCellsReducer,
            "transactions": TransactionsReducer,
            "articles": ArticlesReducer,
            "systemData": SystemDataReducer
        }), initialState);