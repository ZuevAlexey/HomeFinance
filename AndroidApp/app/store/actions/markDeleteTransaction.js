import {ActionName} from '../../constants/actionName';

export const MarkDeleteTransaction = (id) => {
    return {
        type : ActionName.MARK_DELETE_TRANSACTION,
        id,
        lastModificationTime: new Date()
    }
};