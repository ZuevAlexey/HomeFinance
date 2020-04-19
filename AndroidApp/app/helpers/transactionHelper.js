import React from 'react';
import {Text} from 'react-native';
import {getTransactionAmountColor} from './colorHelper';
import {withNullCheck} from './maybe';
import {getFullArticleName, WithCheckLength} from "./displayStringHelper";
import {TransactionType} from "../constants/transactionType";

export const getTransactionTitle = (moneyCellsIdsSet, articles) => (transaction) => {
    let transactionType = getTransactionType(transaction, moneyCellsIdsSet);
    let defaultValue = getFullArticleName(articles.first(e => e.id === transaction.articleId));

    return (
        [
            <Text key='name' style={{textAlign: 'center'}}>
                {`${withNullCheck(transaction.description, e => WithCheckLength(e, 40), defaultValue)}`}
            </Text>,
            <Text key='amount' style={{textAlign: 'center', color: getTransactionAmountColor(transactionType)}}>
                {`${getSign(transactionType)}${transaction.amount}`}
            </Text>
        ]
    );
};

export const getTransactionType = (transaction, moneyCellsIdsSet) => {
    let hasTo = moneyCellsIdsSet.has(transaction.toId);
    let hasFrom = moneyCellsIdsSet.has(transaction.fromId);

    if (hasTo) {
        if (hasFrom) {
            return TransactionType.TRANSFER;
        }

        return TransactionType.INCOME;
    }

    if (hasFrom) {
        return TransactionType.EXPENSE;
    }

    throw 'Transaction does not apply to context';
};

export const getSign = (transactionType) => {
    switch (transactionType) {
        case TransactionType.EXPENSE: {
            return '-';
        }
        case TransactionType.INCOME: {
            return '+';
        }
        case TransactionType.TRANSFER: {
            return '';
        }
    }
};

export const createMoneyCellsIdsSet = (moneyCells) => {
    return new Set(moneyCells.map(e => e.id));
};

export const getAvatar = (moneyCellsIdsSet) => (transaction) => {
    let name;

    switch (getTransactionType(transaction, moneyCellsIdsSet)) {
        case TransactionType.EXPENSE: {
            name = 'arrow-circle-o-up';
            break;
        }
        case TransactionType.INCOME: {
            name = 'arrow-circle-o-down';
            break;
        }
        case TransactionType.TRANSFER: {
            name = 'arrow-circle-o-right';
        }
    }

    return {
        type: 'font-awesome',
        name
    };
};

export const getTransactionTypeByArticle = (articleId) => {
    let result = div(articleId, 100);
    switch (result) {
        case 1:
            return TransactionType.EXPENSE;
        case 2:
            return TransactionType.INCOME;
        case 3:
            return TransactionType.TRANSFER;
        default:
            throw `This article (${articleId}) is not expected`;
    }
};

const div = (val, by) => {
    return (val - val % by) / by;
};