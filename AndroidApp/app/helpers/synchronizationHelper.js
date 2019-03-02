import {dateWithNullCheck, withNullCheck} from './maybe';
import {convertArticles, convertMoneyCells, convertPeople, convertTransactions} from './convert';

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

export const deserialyzeFromSync = (json) => {
    return {
        systemData: {
            lastSynchronizationTime: dateWithNullCheck(json.systemData.lastSynchronizationTime)
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
            add: withNullCheck(json.articles, p => convertArticles(p.add), []),
            edit: withNullCheck(json.articles, p => convertArticles(p.edit), []),
            remove: withNullCheck(json.articles, p => p.remove, [])
        }
    };
};