import {ActionName} from '../../constants/actionName';
import uuid from 'uuid-v4';

export const AddTransaction = (fromId, toId, articleId, amount, description, date) => {
    return {
        type : ActionName.ADD_TRANSACTION,
        id: uuid(),
        fromId,
        toId,
        articleId : +articleId,
        amount,
        description,
        date,
        isValid: true,
        lastModificationTime: new Date(),
        creationTime: new Date(),
    }
};