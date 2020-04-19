import {ActionName} from '../../constants/actionName';
import uuid from 'uuid-v4';
import {isNullOrUndefined} from '../../helpers/maybe';
import {Aggregate} from "./aggregate";
import {AddTransaction} from "./addTransaction";
import {CommonConstants} from "../../constants/commonConstants";

export const AddMoneyCell = (ownerId, moneyCellType, name, status, amount = 0, isValid = true, startDate = null,
                             endDate = null, roi = null, parentId = null) => {
    let now = new Date();
    let newId = uuid();
    let moneyCellCreate = {
        type: ActionName.ADD_MONEY_CELL,
        id: newId,
        ownerId,
        moneyCellType,
        amount: 0,
        startDate,
        endDate,
        name,
        roi,
        parentId,
        isValid,
        status,
        lastModificationTime: now,
        creationTime: now,
    };

    if (amount === 0) {
        return moneyCellCreate;
    }

    let hasParent = !isNullOrUndefined(parentId);
    return Aggregate([moneyCellCreate, AddTransaction(
        hasParent
            ? parentId
            : CommonConstants.OUTSIDE_MONEY_CELL_ID,
        newId,
        hasParent
            ? CommonConstants.TRANSFER_TO_NEW_MONEY_CELL_ARTICLE_ID
            : CommonConstants.INCOME_TO_NEW_MONEY_CELL_ARTICLE_ID,
        amount,
        CommonConstants.INCOME_TO_NEW_MONEY_CELL_DESCRIPTION,
        now)
    ]);
};