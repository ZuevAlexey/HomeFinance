import {ActionName} from '../../constants/actionName';

export const RemoveMoneyCells = (ids) => {
    return {
        type : ActionName.REMOVE_MONEY_CELLS,
        ids: new Set(ids)
    }
};