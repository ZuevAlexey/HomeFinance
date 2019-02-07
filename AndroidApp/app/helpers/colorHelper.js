import {Theme} from "../components/theme";
import {getTransactionTypeByArticleId, TRANSACTIONS_TYPES} from "./transactionHelper";

export const getColorForAmount = (amount) => {
    if(amount < 0){
        return Theme.badColor
    };

    if(amount === 0){
        return Theme.normalColor;
    }

    return Theme.goodColor;
};


export const getTransactionAmountColor = (articleId) => {
    switch (getTransactionTypeByArticleId(articleId)){
        case TRANSACTIONS_TYPES.TRANSFER_OUT:{
            return Theme.badColor;
        }
        case TRANSACTIONS_TYPES.TRANSFER_IN:{
            return Theme.goodColor;
        }
        case TRANSACTIONS_TYPES.TRANSFER:{
            return Theme.normalColor;
        }
    }
};