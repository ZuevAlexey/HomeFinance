import {ActionName} from "../../constants/ActionName";
import {TransactionReducer} from './TransactionReducer';

export const TransactionsReducer = (state, action) => {
    switch(action.type){
        case ActionName.EDIT_TRANSACTION:
            return state.map(e => TransactionReducer(e, action));
        case ActionName.DELETE_TRANSACTION:
            return state.filter(e => e.id !== action.id);
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
                    isValid: action.isValid
                }
            ];
        case ActionName.SINCHRONIZATION:
            return action.transactions;
        default:
            return state;
    }
}