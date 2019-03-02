import React from 'react';
import {Text} from 'react-native';
import {getTransactionAmountColor} from './colorHelper';
import {withNullCheck} from './maybe';

export const TRANSACTIONS_TYPES = {
    TRANSFER : 'transfer',
    TRANSFER_IN : 'transfer-in',
    TRANSFER_OUT : 'transfer-out'
};

export const getTitle = (moneyCellsIdsSet, articles) => (transaction) => {
    let transactionType = getTransactionType(transaction, moneyCellsIdsSet);
    let defaultValue = articles.first(e => e.id === transaction.articleId).name;

    return (
        [<Text key = 'name'>
            {`${withNullCheck(transaction.description, e => e, defaultValue)}`}
        </Text>,
            <Text key = 'amount' style={{color: getTransactionAmountColor(transactionType)}}>
                {`${getSign(transactionType)}${transaction.amount}`}
            </Text>]
    );
};

export const getTransactionType = (transaction, moneyCellsIdsSet) => {
    let hasTo = moneyCellsIdsSet.has(transaction.toId);
    let hasFrom = moneyCellsIdsSet.has(transaction.fromId);

    if(hasTo){
        if(hasFrom){
            return TRANSACTIONS_TYPES.TRANSFER;
        }

        return TRANSACTIONS_TYPES.TRANSFER_IN;
    }

    if(hasFrom){
        return TRANSACTIONS_TYPES.TRANSFER_OUT;
    }

    throw 'Transaction does not apply to context';
};

export const getSign = (transactionType) => {
    switch (transactionType){
        case TRANSACTIONS_TYPES.TRANSFER_OUT:{
            return '-';
        }
        case TRANSACTIONS_TYPES.TRANSFER_IN:{
            return '+';
        }
        case TRANSACTIONS_TYPES.TRANSFER:{
            return '';
        }
    }
};

export const createMoneyCellsIdsSet = (moneyCells) => {
    return new Set(moneyCells.map(e => e.id));
};

export const getAvatar = (moneyCellsIdsSet) => (transaction) => {
    let name;

    switch (getTransactionType(transaction, moneyCellsIdsSet)){
        case TRANSACTIONS_TYPES.TRANSFER_OUT:{
            name = 'arrow-circle-o-up';
            break;
        }
        case TRANSACTIONS_TYPES.TRANSFER_IN:{
            name = 'arrow-circle-o-down';
            break;
        }
        case TRANSACTIONS_TYPES.TRANSFER:{
            name = 'arrow-circle-o-right';
        }
    }

    return {
        type: 'font-awesome',
        name
    };
};