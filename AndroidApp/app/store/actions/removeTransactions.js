import {ActionName} from '../../constants/actionName';

export const RemoveTransactions = (ids) => {
    return {
        type : ActionName.REMOVE_TRANSACTIONS,
        ids: new Set(ids)
    }
};