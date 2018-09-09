import {ActionName} from '../../constants/ActionName';

export const DeleteTransaction = (id, fromId, toId, amount) => {
    return {
        type : ActionName.DELETE_TRANSACTION,
        id,
        fromId,
        toId,
        amount
    }
}