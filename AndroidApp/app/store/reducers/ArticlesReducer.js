import {ActionName} from "../../constants/actionName";
import {synchronize} from "../../helpers/synchronizationHelper";
import {defaultState} from "../defaultState";
import {resetState} from "../../helpers/resetStorageHelper";

export const ArticlesReducer = (state = [], action) => {
    switch(action.type){
        case ActionName.SYNCHRONIZATION:
            return synchronize(state, action.data.articles);
        case ActionName.RESET_STORAGE:
            return resetState(state, action.syncDate, defaultState.articles);
        default:
            return state;
    }
};