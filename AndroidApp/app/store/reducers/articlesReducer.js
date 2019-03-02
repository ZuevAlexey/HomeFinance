import {ActionName} from '../../constants/actionName';
import {synchronize} from '../../helpers/synchronizationHelper';
import {defaultState} from '../defaultState';
import {withNullCheck} from '../../helpers/maybe';

export const ArticlesReducer = (state = [], action) => {
    switch(action.type){
        case ActionName.SYNCHRONIZATION:
            return synchronize(state, action.data.articles);
        case ActionName.RESET_STORAGE:
            return withNullCheck(action.syncData, e => e.articles, defaultState.articles);
        default:
            return state;
    }
};