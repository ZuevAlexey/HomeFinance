import {ActionName} from '../../constants/actionName';

export const RemoveArticles = (ids) => {
    return {
        type : ActionName.REMOVE_ARTICLES,
        ids: new Set(ids)
    }
}