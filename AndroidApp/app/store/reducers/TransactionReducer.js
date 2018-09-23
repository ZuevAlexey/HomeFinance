import {ActionName} from "../../constants/actionName";

export const TransactionReducer = (state = {}, action) => {
    switch(action.type){
        case ActionName.EDIT_TRANSACTION:
            return action.id === state.id ? {
                ...state,
                fromId: action.newFromId,
                toId: action.newToId,
                articleId: action.articleId,
                amount: action.newAmount,
                description: action.description,
                date: action.date,
                isValid: action.isValid,
                lastModificationTime: action.lastModificationTime
            } : state;
        case ActionName.DELETE_TRANSACTION:
            return action.id === state.id ? {
                ...state,
                isDeleted : true,
                lastModificationTime: action.lastModificationTime
            } : state;
        default:
            return state;
    }
}