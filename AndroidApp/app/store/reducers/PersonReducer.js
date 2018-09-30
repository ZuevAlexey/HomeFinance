import {ActionName} from "../../constants/actionName";

export const PersonReducer = (state = {}, action) => {
    switch(action.type){
        case ActionName.EDIT_PERSON:
            return action.id === state.id ? {
                ...state,
                lastName: action.lastName,
                firstName: action.firstName,
                sex: action.sex,
                lastModificationTime: action.lastModificationTime
            } : state;
        case ActionName.MARK_DELETE_PERSON:
            return action.id === state.id ? {
                ...state,
                isDeleted: true,
                lastModificationTime: action.lastModificationTime
            } : state;
        default:
            return state;
    }
}