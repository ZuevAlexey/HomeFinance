import {ActionName} from "../../constants/ActionName";

export const MoneyCellReducer = (state = {}, action) => {
    switch(action.type){
        case ActionName.EDIT_MONEY_CELL:
            return action.id === state.id ? {
                ...state,
                name: action.name,
                status: action.status
            } : state;
        default:
            return state;
    }
}