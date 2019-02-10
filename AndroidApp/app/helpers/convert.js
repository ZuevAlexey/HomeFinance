export const convertPeople = (people) => {
    return people.map(person => ({
        id: person.id,
        lastName: person.lastName,
        firstName: person.firstName,
        sex: person.sex,
        lastModificationTime: new Date(person.lastModificationTime),
        creationTime: new Date(person.creationTime),
        isDeleted: person.isDeleted
    }));
};

export const convertMoneyCells = (moneyCells) => {
    return moneyCells.map(moneyCell => ({
        id: moneyCell.id,
        ownerId: moneyCell.ownerId,
        moneyCellType: moneyCell.moneyCellType,
        amount: moneyCell.amount,
        startDate: new Date(moneyCell.startDate),
        endDate: new Date(moneyCell.endDate),
        name: moneyCell.name,
        status: moneyCell.status,
        parentId: moneyCell.parentId,
        isValid: moneyCell.isValid,
        roi: moneyCell.roi,
        lastModificationTime: new Date(moneyCell.lastModificationTime),
        creationTime: new Date(moneyCell.creationTime),
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
        date: new Date(transaction.date),
        description: transaction.description,
        isValid: transaction.isValid,
        lastModificationTime: new Date(transaction.lastModificationTime),
        creationTime: new Date(transaction.creationTime),
        isDeleted: transaction.isDeleted
    }));
};


export const convertArticles = (articles) => {
    return articles.map(article => ({
        id: article.id,
        name: article.name,
        lastModificationTime: new Date(article.lastModificationTime),
        creationTime: new Date(article.creationTime),
    }));
};