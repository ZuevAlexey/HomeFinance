import {ActionName} from "../../constants/actionName";

export const ArticlesReducer = (state = [], action) => {
    switch(action.type){
        case ActionName.SINCHRONIZATION:
            return action.articles;
        default:
            return state;
    }
}