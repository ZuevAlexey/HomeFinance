import {ActionName} from '../../constants/actionName';
import {CommonConstants} from '../../constants/commonConstants';

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
        case ActionName.MARK_DELETE_MONEY_CELL:
            return processMarkDeleteMoneyCellAction(state, action);
        case ActionName.MARK_DELETE_PERSON:
                return processMarkDeletePersonAction(state, action);
        default:
            return state;
    }
};

const processMarkDeletePersonAction = (state, action) => {
    return processMarkDeleteAction(state, (id) => action.moneyCellsIdsSet.has(id));
};

const processMarkDeleteMoneyCellAction = (state, action) => {
    return processMarkDeleteAction(state, (id) => action.id === id);
};

const processMarkDeleteAction = (state, predicate) => {
    if(!predicate(state.fromId) && !predicate(state.toId)){
        return state;
    }

    let result = {
        ...state,
        lastModificationTime: new Date()
    }

    if(predicate(state.fromId)){
        result.fromId = CommonConstants.OUTSIDE_MONEY_CELL_ID;
    }

    if(predicate(state.toId)){
        result.toId = CommonConstants.OUTSIDE_MONEY_CELL_ID;
    }

    if(result.fromId === CommonConstants.OUTSIDE_MONEY_CELL_ID && result.toId === CommonConstants.OUTSIDE_MONEY_CELL_ID){
        result.isDeleted = true;
    }

    return result;
};