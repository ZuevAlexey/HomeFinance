import {ActionName} from "../../constants/actionName";

export const ArticleReducer = (state = {}, action) => {
    switch(action.type){
        case ActionName.EDIT_ARTICLE:
            return state.id === action.id ?
                {
                    ...state,
                    name : action.name
                } : state;
        default:
            return state;
    }
};