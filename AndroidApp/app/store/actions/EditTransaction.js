import {ActionName} from '../../constants/actionName';

export const EditTransaction = (id, fromId, toId, articleId, amount, description, date, isValid) => {
    return {
        type : ActionName.EDIT_TRANSACTION,
        id,
        fromId,
        toId,
        articleId,
        amount,
        description,
        date,
        isValid,
        lastModificationTime: new Date()
    };
}