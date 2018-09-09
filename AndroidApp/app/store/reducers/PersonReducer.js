import {ActionName} from "../../constants/actionName";

export const PersonReducer = (state = {}, action) => {
    switch(action.type){
        case ActionName.EDIT_PERSON:
            return action.id === state.id ? {
                ...state,
                lastName: action.lastName,
                firstName: action.firstName,
                sex: action.sex
            } : state;
        default:
            return state;
    }
}