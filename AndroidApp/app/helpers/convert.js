import {DateWithNullCheck} from "./maybe";


export const convertPeople = (people) => {
    return people.map(person => ({
        id: person.id,
        lastName: person.lastName,
        firstName: person.firstName,
        sex: person.sex,
        lastModificationTime: DateWithNullCheck(person.lastModificationTime),
        creationTime: DateWithNullCheck(person.creationTime),
        isDeleted: person.isDeleted
    }));
};

export const convertMoneyCells = (moneyCells) => {
    return moneyCells.map(moneyCell => ({
        id: moneyCell.id,
        ownerId: moneyCell.ownerId,
        moneyCellType: moneyCell.moneyCellType,
        amount: moneyCell.amount,
        startDate: DateWithNullCheck(moneyCell.startDate),
        endDate: DateWithNullCheck(moneyCell.endDate),
        name: moneyCell.name,
        status: moneyCell.status,
        parentId: moneyCell.parentId,
        isValid: moneyCell.isValid,
        roi: moneyCell.roi,
        lastModificationTime: DateWithNullCheck(moneyCell.lastModificationTime),
        creationTime: DateWithNullCheck(moneyCell.creationTime),
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
        date: DateWithNullCheck(transaction.date),
        description: transaction.description,
        isValid: transaction.isValid,
        lastModificationTime: DateWithNullCheck(transaction.lastModificationTime),
        creationTime: DateWithNullCheck(transaction.creationTime),
        isDeleted: transaction.isDeleted
    }));
};


export const convertArticles = (articles) => {
    return articles.map(article => ({
        id: article.id,
        name: article.name,
        lastModificationTime: DateWithNullCheck(article.lastModificationTime),
        creationTime: DateWithNullCheck(article.creationTime),
    }));
};