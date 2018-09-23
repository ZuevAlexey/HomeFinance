import {ActionName} from "../../constants/actionName";
import {PersonReducer} from './personReducer';

export const PeopleReducer = (state = [], action) => {
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
                    sex: action.sex,
                    lastModificationTime: action.lastModificationTime
                }
            ];
        case ActionName.SINCHRONIZATION:
            return action.people;
        default:
            return state;
    }
}