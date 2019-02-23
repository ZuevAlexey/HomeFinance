import {ActionName} from '../../constants/actionName';

export const EditMoneyCell = (id, name, status) => {
    return {
        type : ActionName.EDIT_MONEY_CELL,
        id,
        name,
        status,
        lastModificationTime: new Date()
    }
};