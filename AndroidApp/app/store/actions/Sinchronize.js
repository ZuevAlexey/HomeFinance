import {ActionName} from '../../constants/actionName';

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