import {ActionName} from "../../constants/actionName";
import {TransactionReducer} from './transactionReducer';
import {synchronize} from "../../helpers/synchronizationHelper";
import {defaultState} from "../defaultState";
import {resetState} from "../../helpers/resetStorageHelper";

export const TransactionsReducer = (state = [], action) => {
    switch(action.type){
        case ActionName.EDIT_TRANSACTION:
            return state.map(e => TransactionReducer(e, action));
        case ActionName.MARK_DELETE_TRANSACTION:
            return state.map(e => TransactionReducer(e, action));
        case ActionName.ADD_TRANSACTION:
            return [
                ...state,
                {
                    id: action.id,
                    fromId: action.fromId,
                    toId: action.toId,
                    articleId: action.articleId,
                    amount: action.amount,
                    date: action.date,
                    description: action.description,
                    isValid: action.isValid,
                    lastModificationTime: action.lastModificationTime,
                    creationTime: action.creationTime,
                    isDeleted: false
                }
            ];
        case ActionName.SYNCHRONIZATION:
            return synchronize(state, action.data.transactions);
        case ActionName.RESET_STORAGE:
            return resetState(state, action.syncDate, defaultState.transactions);
        default:
            return state;
    }
};