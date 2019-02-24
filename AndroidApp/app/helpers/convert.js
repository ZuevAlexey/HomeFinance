import {dateWithNullCheck} from "./maybe";


export const convertPeople = (people) => {
    return people.map(person => ({
        id: person.id,
        lastName: person.lastName,
        firstName: person.firstName,
        sex: person.sex,
        lastModificationTime: dateWithNullCheck(person.lastModificationTime),
        creationTime: dateWithNullCheck(person.creationTime),
        isDeleted: person.isDeleted
    }));
};

export const convertMoneyCells = (moneyCells) => {
    return moneyCells.map(moneyCell => ({
        id: moneyCell.id,
        ownerId: moneyCell.ownerId,
        moneyCellType: moneyCell.moneyCellType,
        amount: moneyCell.amount,
        startDate: dateWithNullCheck(moneyCell.startDate),
        endDate: dateWithNullCheck(moneyCell.endDate),
        name: moneyCell.name,
        status: moneyCell.status,
        parentId: moneyCell.parentId,
        isValid: moneyCell.isValid,
        roi: moneyCell.roi,
        lastModificationTime: dateWithNullCheck(moneyCell.lastModificationTime),
        creationTime: dateWithNullCheck(moneyCell.creationTime),
        isDeleted: moneyCell.isDeleted
    }));
};

export const convertTransactions = (transactions) => {
    return transactions.map(transaction => ({
        id: transaction.id,
        fromId: transaction.fromId,
        toId: transaction.toId,
        articleId: transaction.articleId,
        amount: transaction.amount,
        date: dateWithNullCheck(transaction.date),
        description: transaction.description,
        isValid: transaction.isValid,
        lastModificationTime: dateWithNullCheck(transaction.lastModificationTime),
        creationTime: dateWithNullCheck(transaction.creationTime),
        isDeleted: transaction.isDeleted
    }));
};


export const convertArticles = (articles) => {
    return articles.map(article => ({
        id: article.id,
        name: article.name,
        lastModificationTime: dateWithNullCheck(article.lastModificationTime),
        creationTime: dateWithNullCheck(article.creationTime),
    }));
};