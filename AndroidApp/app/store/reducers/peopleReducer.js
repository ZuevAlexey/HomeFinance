import {ActionName} from '../../constants/actionName';
import {PersonReducer} from './personReducer';
import {synchronize} from '../../helpers/synchronizationHelper';
import {defaultState} from '../defaultState';
import {resetState} from '../../helpers/resetStorageHelper';
import {withNullCheck} from '../../helpers/maybe';

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
                    creationTime: action.creationTime,
                    isDeleted: false
                }
            ];
        case ActionName.SYNCHRONIZATION:
            return synchronize(state, action.data.people);
        case ActionName.RESET_STORAGE:
            return withNullCheck(action.syncData, e => e.people, defaultState.people);
        default:
            return state;
    }
};