import {ActionName} from "../../constants/actionName";
import {synchronize} from "../../helpers/synchronizationHelper";

export const ArticlesReducer = (state = [], action) => {
    switch(action.type){
        case ActionName.SYNCHRONIZATION:
            return synchronize(state, action.data.articles);
        default:
            return state;
    }
};