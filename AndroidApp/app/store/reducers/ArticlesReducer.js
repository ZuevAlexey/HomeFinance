import {ActionName} from "../../constants/actionName";

export const ArticlesReducer = (state = [], action) => {
    switch(action.type){
        case ActionName.SYNCHRONIZATION:
            return action.articles;
        default:
            return state;
    }
}