import {ActionName} from '../../constants/actionName';

export const EditArticle = (id, name) => {
    return {
        type: ActionName.EDIT_ARTICLE,
        id,
        name
    }
}