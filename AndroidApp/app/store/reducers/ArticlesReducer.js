import {ActionName} from "../../constants/ActionName";

export const ArticlesReducer = (state = [], action) => {
    switch(action.type){
        case ActionName.SINCHRONIZATION:
            return action.articles;
        default:
            return state;
    }
}