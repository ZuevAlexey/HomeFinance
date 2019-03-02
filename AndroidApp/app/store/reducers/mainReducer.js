import {ActionName} from '../../constants/actionName';

export const MainReducer = (state = {}, action) => {
    switch(action.type){
        case ActionName.MARK_DELETE_PERSON: {

        }
        default:
            return state;
    }
};