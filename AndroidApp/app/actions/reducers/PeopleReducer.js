import {ActionName} from "../../constants/ActionName";
import {PersonReducer} from './PersonReducer';

export const PeopleReducer = (state, action) => {
    switch(action.type){
        case ActionName.EDIT_PERSON:
            return state.map(e => PersonReducer(e, action));
        default:
            return state;
    }
}