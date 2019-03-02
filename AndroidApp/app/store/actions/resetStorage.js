import {ActionName} from '../../constants/actionName';
import {dateWithNullCheck, withNullCheck} from '../../helpers/maybe';
import {convertArticles, convertMoneyCells, convertPeople, convertTransactions} from '../../helpers/convert';

export const ResetStorage = (serializedData) => {
    return {
        type: ActionName.RESET_STORAGE,
        syncData: withNullCheck(serializedData, deserializeFromJson)
    }
};

const deserializeFromJson = (serializedData) => {
    let data = JSON.parse(serializedData);

    return {
        people: convertPeople(data.people),
        moneyCells: convertMoneyCells(data.moneyCells),
        transactions: convertTransactions(data.transactions),
        articles: convertArticles(data.articles),
        systemData: {
            lastSynchronizationTime: dateWithNullCheck(data.systemData.lastSynchronizationTime),
            serverAddress: data.systemData.serverAddress
        },
    };
};