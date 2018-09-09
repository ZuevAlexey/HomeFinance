import {ActionName} from '../../constants/actionName';

export const DeleteMoneyCell = (id) => {
    return {
        type : ActionName.DELETE_MONEY_CELL,
        id
    }
}