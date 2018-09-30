import {ActionName} from "../../constants/actionName";
import {ArticleReducer} from './articleReducer';

export const ArticlesReducer = (state = [], action) => {
    switch(action.type){
        case ActionName.EDIT_ARTICLE:
            return state.map(e => ArticleReducer(e, action));
        case ActionName.REMOVE_ARTICLES:
            return state.filter(e => !action.ids.has(e.id));
        case ActionName.ADD_ARTICLES:
            return [
                ...state,
                ...action.articles
            ];
        default:
            return state;
    }
}