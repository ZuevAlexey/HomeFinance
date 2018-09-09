import {ActionName} from '../../constants/ActionName';

export const Sinchronize = (people, moneyCells, transactions, articles, sinchronizationDate) => {
    return {
        type : ActionName.SINCHRONIZATION,
        people,
        moneyCells,
        transactions,
        articles,
        sinchronizationDate
    }
}