import {ActionName} from '../../constants/ActionName';

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
        isValid
    }
}