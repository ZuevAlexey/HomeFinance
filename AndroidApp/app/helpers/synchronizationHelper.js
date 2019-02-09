import {withNullCheck} from "./maybe";

export const synchronize = (state, diff) => {
    let removeIds = diff.remove;
    let editIds = diff.edit.map(e => e.id);
    let addIds = diff.add.map(e => e.id);
    let deleteMap = removeIds.concat(editIds).concat(addIds).reduce((acc, el) => {
        acc[el] = true;
        return acc
    }, {});

    return state
        .filter(e => deleteMap[e.id] !== true)
        .concat(diff.add)
        .concat(diff.edit);
};

export const getInfoForSynchronize = (data, lastSynchronizationTime) => {
  return data.filter(e => e.lastModificationTime > lastSynchronizationTime);
};

export const deserialyze = (json) => {
    return {
        systemData: {
            lastSynchronizationTime: new Date(json.systemData.lastSynchronizationTime)
        },
        people: {
            add: withNullCheck(json.people, p => convertPeople(p.add), []),
            edit: withNullCheck(json.people, p => convertPeople(p.edit), []),
            remove: withNullCheck(json.people, p => p.remove, [])
        },
        moneyCells: {
            add: withNullCheck(json.moneyCells, p => convertMoneyCells(p.add), []),
            edit: withNullCheck(json.moneyCells, p => convertMoneyCells(p.edit), []),
            remove: withNullCheck(json.moneyCells, p => p.remove, [])
        },
        transactions: {
            add: withNullCheck(json.transactions, p => convertTransactions(p.add), []),
            edit: withNullCheck(json.transactions, p => convertTransactions(p.edit), []),
            remove: withNullCheck(json.transactions, p => p.remove, [])
        },
        articles: {
            add: withNullCheck(json.articles, p => p.add, []),
            edit: withNullCheck(json.articles, p => p.edit, []),
            remove: withNullCheck(json.articles, p => p.remove, [])
        }
    };
};

const convertPeople = (people) => {
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

const convertMoneyCells = (moneyCells) => {
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

const convertTransactions = (transactions) => {
    return transactions.map(transaction => ({
        id: transaction.id,
        fromId: transaction.fromId,
        toId: transaction.toId,
        articleId: transaction.articleId,
        amount: transaction.amount,
        date: transaction.date,
        description: transaction.description,
        isValid: transaction.isValid,
        lastModificationTime: transaction.lastModificationTime,
        creationTime: transaction.creationTime,
        isDeleted: transaction.isDeleted
    }));
};