import {ActionName} from "../../constants/actionName";
import {TransactionReducer} from './transactionReducer';
import {synchronize} from "../../helpers/synchronizationHelper";

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
        default:
            return state;
    }
};