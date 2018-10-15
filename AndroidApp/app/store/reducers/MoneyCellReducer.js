import {ActionName} from "../../constants/actionName";

export const MoneyCellReducer = (state = {}, action) => {
    switch(action.type){
        case ActionName.EDIT_MONEY_CELL:
            return action.id === state.id ? {
                ...state,
                name: action.name,
                status: action.status,
                lastModificationTime: action.lastModificationTime
            } : state;
        case ActionName.MARK_DELETE_MONEY_CELL:
            return action.id === state.id ? {
                ...state,
                isDeleted: true,
                lastModificationTime: action.lastModificationTime
            } : state;
        default:
            return state;
    }
};