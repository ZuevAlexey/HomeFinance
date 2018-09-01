import {ActionName} from '../../constants/ActionName';

export const DeleteMoneyCell = (id) => {
    return {
        type : ActionName.DELETE_MONEY_CELL,
        id
    }
}