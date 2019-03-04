import {ActionName} from '../../constants/actionName';
import {dateWithNullCheck, withNullCheck} from '../../helpers/maybe';
import {convertArticles, convertMoneyCells, convertPeople, convertTransactions} from '../../helpers/convert';

export const ResetStorage = (serializedData) => {
    return {
        type: ActionName.RESET_STORAGE,
        resetData: withNullCheck(serializedData, deserializeFromJson)
    }
};

const deserializeFromJson = (serializedData) => {
    let data = JSON.parse(serializedData);

    return {
        main: {
            people: convertPeople(data.main.people),
            moneyCells: convertMoneyCells(data.main.moneyCells),
            transactions: convertTransactions(data.main.transactions),
            articles: convertArticles(data.main.articles),
            systemData: {
                lastSynchronizationTime: dateWithNullCheck(data.main.systemData.lastSynchronizationTime),
                serverAddress: data.main.systemData.serverAddress
            },
        }
    };
};