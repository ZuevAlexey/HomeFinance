import {ActionName} from '../../constants/actionName';

export const DeleteMoneyCell = (id) => {
    return {
        type : ActionName.MARK_DELETE_MONEY_CELL,
        id,
        lastModificationTime: new Date()
    }
}