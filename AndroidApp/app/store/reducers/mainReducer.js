import {ActionName} from '../../constants/actionName';
import {PeopleReducer} from "./peopleReducer";
import {MoneyCellsReducer} from "./moneyCellsReducer";
import {ArticlesReducer} from "./articlesReducer";
import {TransactionsReducer} from "./transactionsReducer";
import {SystemDataReducer} from "./systemDataReducer";

function ProcessAction(newState, action) {
    newState.people = PeopleReducer(newState.people, action);
    newState.moneyCells = MoneyCellsReducer(newState.moneyCells, action);
    newState.articles = ArticlesReducer(newState.articles, action);
    newState.transactions = TransactionsReducer(newState.transactions, action);
    newState.systemData = SystemDataReducer(newState.systemData, action);
    return newState;
}

export const MainReducer = (state = {}, action) => {
    switch (action.type) {
        case ActionName.RESET_STORAGE:
        case ActionName.ADD_PERSON:
        case ActionName.EDIT_PERSON:
        case ActionName.ADD_MONEY_CELL:
        case ActionName.EDIT_MONEY_CELL:
        case ActionName.MARK_DELETE_MONEY_CELL:
        case ActionName.CLOSE_MONEY_CELL:
        case ActionName.MARK_DELETE_PERSON:
        case ActionName.ADD_TRANSACTION:
        case ActionName.EDIT_TRANSACTION:
        case ActionName.MARK_DELETE_TRANSACTION:
        case ActionName.EDIT_SYSTEM_DATA:
        case ActionName.SYNCHRONIZATION: {
            return ProcessAction({...state}, action);
        }
        case ActionName.AGGREGATE: {
            return action.actions.reduce((acc, act) => {
                return ProcessAction(acc, act);
            }, {...state});
        }

        default:
            return state;
    }
};