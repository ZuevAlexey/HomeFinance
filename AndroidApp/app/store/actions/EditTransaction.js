import {ActionName} from '../../constants/ActionName';

export const EditTransaction = (id, oldFromId, oldToId, newFromId, newToId, articleId, oldAmount, newAmount, description, date, isValid) => {
    return {
        type : ActionName.EDIT_TRANSACTION,
        id,
        oldFromId,
        oldToId,
        newFromId,
        newToId,
        articleId,
        oldAmount,
        newAmount,
        description,
        date,
        isValid
    };
}