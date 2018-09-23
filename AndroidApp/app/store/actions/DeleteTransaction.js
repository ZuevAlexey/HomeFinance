import {ActionName} from '../../constants/actionName';

export const DeleteTransaction = (id, fromId, toId, amount) => {
    return {
        type : ActionName.DELETE_TRANSACTION,
        id,
        fromId,
        toId,
        amount,
        lastModificationTime: new Date()
    }
}