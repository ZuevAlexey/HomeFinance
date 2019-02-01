import {ActionName} from "../../constants/actionName";
import {PersonReducer} from './personReducer';
import {synchronize} from "../../helpers/synchronizationHelper";

export const PeopleReducer = (state = [], action) => {
    switch(action.type){
        case ActionName.EDIT_PERSON:
            return state.map(e => PersonReducer(e, action));
        case ActionName.MARK_DELETE_PERSON:
            return state.map(e => PersonReducer(e, action));
        case ActionName.ADD_PERSON:
            return [
                ...state,
                {
                    id: action.id,
                    firstName: action.firstName,
                    lastName: action.lastName,
                    sex: action.sex,
                    lastModificationTime: action.lastModificationTime,
                    isDeleted: false
                }
            ];
        case ActionName.SYNCHRONIZATION:
            return synchronize(state, action.data.people);
        default:
            return state;
    }
};