import {ActionName} from '../../constants/actionName';
import uuid from 'uuid-v4';

export const AddMoneyCell = (ownerId, moneyCellType, name, status, amount = 0, isValid = true, startDate = null,
                               endDate = null, roi = null, parentId = null) => {
    return {
        type : ActionName.ADD_MONEY_CELL,
        id: uuid(),
        ownerId,
        moneyCellType,
        amount,
        startDate,
        endDate,
        name,
    roi,
    parentId,
    isValid,
    status,
    lastModificationTime: new Date()
    }
};