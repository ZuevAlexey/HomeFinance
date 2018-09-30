import {ActionName} from '../../constants/actionName';

export const AddArticles = (articles) => {
    return {
        type: ActionName.ADD_ARTICLES,
        articles
    }
}