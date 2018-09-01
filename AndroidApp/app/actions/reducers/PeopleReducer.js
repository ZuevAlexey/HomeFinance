import {ActionName} from "../../constants/ActionName";
import {PersonReducer} from './PersonReducer';

export const PeopleReducer = (state, action) => {
    switch(action.type){
        case ActionName.EDIT_PERSON:
            return state.map(e => PersonReducer(e, action));
        case ActionName.DELETE_PERSON:
            return state.filter(e => e.id !== action.id);
        case ActionName.ADD_PERSON:
            return [
                ...state,
                {
                    id: action.id,
                    firstName: action.firstName,
                    lastName: action.lastName,
                    sex: action.sex
                }
            ];
        default:
            return state;
    }
}