import React from 'react';
import {Text} from "react-native";
import {getTransactionAmountColor} from "./colorHelper";

export const TRANSACTIONS_TYPES = {
    TRANSFER : 'transfer',
    TRANSFER_IN : 'transfer-in',
    TRANSFER_OUT : 'transfer-out'
};

export const getTitle = (transaction) => {
    return (
        [<Text key = 'name'>
            {`${transaction.description}`}
        </Text>,
            <Text key = 'amount' style={{color: getTransactionAmountColor(transaction.articleId)}}>
                {`${getSign(transaction.articleId)}${transaction.amount}`}
            </Text>]
    );
};

export const getTransactionTypeByArticleId = (articleId) => {
    switch (articleId.charAt(0)){
        case '1':{
            return TRANSACTIONS_TYPES.TRANSFER_OUT;
        }
        case '2':{
            return TRANSACTIONS_TYPES.TRANSFER_IN;
        }
        case '3':{
            return TRANSACTIONS_TYPES.TRANSFER;
        }
    }
};

export const getSign = (articleId) => {
    switch (getTransactionTypeByArticleId(articleId)){
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

export const getAvatar = (transaction) => {
    let name;
    switch (getTransactionTypeByArticleId(transaction.articleId)){
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