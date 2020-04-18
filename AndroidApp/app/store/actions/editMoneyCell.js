import {ActionName} from '../../constants/actionName';
import {MoneyCellType} from "../../constants/moneyCellType";
import {Aggregate} from "./aggregate";
import {CommonConstants} from "../../constants/commonConstants";
import {AddTransaction} from "./addTransaction";

export const EditMoneyCell = (id, name, status, newAmount, oldAmount, moneyCellType) => {
    let changeMoneyCell = {
        type: ActionName.EDIT_MONEY_CELL,
        id,
        name,
        status,
        lastModificationTime: new Date()
    };
    if (moneyCellType !== MoneyCellType.BROKER || newAmount === oldAmount) {
        return changeMoneyCell
    }

    let transactionArticleId, fromId, toId, transactionAmount;

    if (newAmount > oldAmount) {
        transactionArticleId = CommonConstants.PORTFOLIO_GROWTH_ARTICLE_ID;
        fromId = CommonConstants.OUTSIDE_MONEY_CELL_ID;
        transactionAmount = newAmount - oldAmount;
        toId = id
    } else {
        transactionArticleId = CommonConstants.PORTFOLIO_FALLING_ARTICLE_ID;
        fromId = id;
        transactionAmount = oldAmount - newAmount;
        toId = CommonConstants.OUTSIDE_MONEY_CELL_ID
    }

    return Aggregate([
        changeMoneyCell,
        AddTransaction(fromId, toId, transactionArticleId, transactionAmount, null, new Date())
    ])
};