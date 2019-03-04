import {Theme} from '../components/theme';
import {TransactionType} from "../constants/transactionType";

export const getColorForAmount = (amount) => {
    if(amount < 0){
        return Theme.badColor
    }

    if(amount === 0){
        return Theme.normalColor;
    }

    return Theme.goodColor;
};


export const getTransactionAmountColor = (transactionType) => {
    switch (transactionType){
        case TransactionType.EXPENSE:{
            return Theme.badColor;
        }
        case TransactionType.INCOME:{
            return Theme.goodColor;
        }
        case TransactionType.TRANSFER:{
            return Theme.normalColor;
        }
    }
};