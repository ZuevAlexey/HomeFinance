import {ActionName} from "../../constants/actionName";

export const TransactionReducer = (state = {}, action) => {
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
                isValid: action.isValid,
                lastModificationTime: action.lastModificationTime
            } : state;
        case ActionName.MARK_DELETE_TRANSACTION:
            return action.id === state.id ? {
                ...state,
                isDeleted : true,
                lastModificationTime: action.lastModificationTime
            } : state;
        default:
            return state;
    }
};