import {ActionName} from '../../constants/actionName';
import uuid from 'uuid-v4';
import {isNullOrUndefined} from "../../helpers/maybe";

export const AddMoneyCell = (ownerId, moneyCellType, name, status, amount = 0, isValid = true, startDate = null,
                               endDate = null, roi = null, parentId = null) => {
    return {
        type : ActionName.ADD_MONEY_CELL,
        id: uuid(),
        ownerId,
        moneyCellType,
        amount: isNullOrUndefined(amount) ? 0 : amount,
        startDate,
        endDate,
        name,
        roi,
        parentId,
        isValid,
        status,
        lastModificationTime: new Date(),
        creationTime: new Date(),
    }
};