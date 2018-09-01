import {ActionName} from "../../constants/ActionName";

export const TransactionReducer = (state, action) => {
    switch(action.type){
        case ActionName.EDIT_TRANSACTION:
            return action.id === state.id ? {
                ...state,
                fromId: action.fromId,
                toId: action.toId,
                articleId: action.articleId,
                amount: action.amount,
                description: action.description,
                date: action.date,
                isValid: action.isValid
            } : state;
        default:
            return state;
    }
}