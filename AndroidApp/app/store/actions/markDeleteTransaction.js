import {ActionName} from '../../constants/actionName';

export const MarkDeleteTransaction = (id, fromId, toId, amount) => {
    return {
        type: ActionName.MARK_DELETE_TRANSACTION,
        id,
        fromId,
        toId,
        amount,
        lastModificationTime: new Date()
    }
};