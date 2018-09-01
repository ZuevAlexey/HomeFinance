import {ActionName} from '../../constants/ActionName';

export const DeleteTransaction = (id) => {
    return {
        type : ActionName.DELETE_TRANSACTION,
        id
    }
}