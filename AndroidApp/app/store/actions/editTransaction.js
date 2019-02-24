import {ActionName} from '../../constants/actionName';

export const EditTransaction = (id, fromId, toId, articleId, amount, description, date, oldFromId, oldToId, oldAmount, isValid = true) => {
    return {
        type : ActionName.EDIT_TRANSACTION,
        id,
        fromId,
        toId,
        articleId : + articleId,
        amount,
        description,
        date,
        oldFromId,
        oldToId,
        oldAmount,
        isValid,
        lastModificationTime: new Date()
    };
};