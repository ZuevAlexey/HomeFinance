import {ActionName} from "../../constants/actionName";
import {CommonConstants} from "../../constants/commonConstants";

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
        case ActionName.MARK_DELETE_MONEY_CELL: {
            if(action.id !== state.toId && action.id !== state.fromId){
                return state;
            }

            let result = {
                ...state,
                lastModificationTime: new Date()
            };
            if(action.id === state.toId){
                result.toId = CommonConstants.OUTSIDE_MONEY_CELL_ID;
            }

            if(action.id === state.fromId){
                result.fromId = CommonConstants.OUTSIDE_MONEY_CELL_ID;
            }

            if(result.fromId === CommonConstants.OUTSIDE_MONEY_CELL_ID && result.toId === CommonConstants.OUTSIDE_MONEY_CELL_ID){
                result.isDeleted = true;
            }

            return result;
        }
        default:
            return state;
    }
};