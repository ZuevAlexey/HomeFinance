import {ActionName} from '../../constants/ActionName';

export const EditMoneyCell = (id, name, status) => {
    return {
        type : ActionName.EDIT_MONEY_CELL,
        id,
        name,
        status
    }
}