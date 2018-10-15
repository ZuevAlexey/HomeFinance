import {ActionName} from "../../constants/actionName";
import {TransactionReducer} from './transactionReducer';

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
                    lastModificationTime: action.lastModificationTime
                }
            ];
        case ActionName.REMOVE_TRANSACTIONS:
            return state.filter(e => !action.ids.has(e.id));
        default:
            return state;
    }
};