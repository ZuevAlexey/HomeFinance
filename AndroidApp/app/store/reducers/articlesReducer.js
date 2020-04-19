import {ActionName} from '../../constants/actionName';
import {synchronize} from '../../helpers/synchronizationHelper';
import {defaultState} from '../defaultState';
import {withNullCheck} from '../../helpers/maybe';

export const ArticlesReducer = (state = [], action) => {
    switch (action.type) {
        case ActionName.SYNCHRONIZATION:
            return synchronize(state, action.data.main.articles);
        case ActionName.RESET_STORAGE:
            return withNullCheck(action.resetData, e => e.main.articles, defaultState.main.articles);
        default:
            return state;
    }
};