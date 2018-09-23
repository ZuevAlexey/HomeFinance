import {ActionName} from '../../constants/actionName';

export const Synchronize = (people, moneyCells, transactions, articles, lastSinchronizationTime) => {
    return {
        type : ActionName.SYNCHRONIZATION,
        people,
        moneyCells,
        transactions,
        articles,
        lastSinchronizationTime
    }
}