export const getMoneyCellsSummary = (moneyCells) => {
    return moneyCells.reduce((acc, el) => acc + el.amount, 0);
};

export const getTransactionsSummary = (transactions, moneyCellIdsSet) => {
    return transactions.reduce((acc, tran) => {
        if(moneyCellIdsSet.has(tran.toId)){
            acc = acc + tran.amount;
        }

        if(moneyCellIdsSet.has(tran.fromId)){
            acc = acc - tran.amount;
        }

        return acc;
    }, 0);
};

export const getPeopleSummary = (moneyCells) => {
    return moneyCells.reduce((acc, el) => {
        if(acc[el.ownerId] === undefined){
            acc[el.ownerId] = el.amount;
        } else {
            acc[el.ownerId] = acc[el.ownerId] + el.amount;
        }

        return acc;
    }, {});
}