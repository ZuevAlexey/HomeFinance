import {ActionName} from '../../constants/ActionName';
import uuid from 'uuid-v4';

export const AddMoneyCell = (ownerId, type, name, status, amount = 0, isValid = true, startDate = null,
                               endDate = null, roi = null, parentId = null) => {
    return {
        type : ActionName.ADD_MONEY_CELL,
        id: uuid(),
        ownerId,
        type,
        amount,
        startDate,
        endDate,
        name,
        roi,
        parentId,
        isValid
    }
}