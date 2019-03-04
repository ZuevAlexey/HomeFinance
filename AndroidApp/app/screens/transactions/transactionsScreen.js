import React from 'react';
import {Screen} from '../../components/screen/screen';

import TransactionsList from '../../components/list/transactions/transactionsList';
import {connect} from 'react-redux';
import {getStatusFromSummary} from '../../helpers/statusHelper';
import {getTransactionsSummary} from '../../helpers/calculator';
import {createMoneyCellsIdsSet} from '../../helpers/transactionHelper';

const TransactionsScreen = (props) => {
    let summary = getTransactionsSummary(props.transactions, props.moneyCellsIdsSet);
    return (
        <Screen
            {...props}
                headerTitle = 'Transactions'
                headerStatus = {getStatusFromSummary(summary)}
        >
            <TransactionsList
                navigation = {props.navigation}
                transactions = {props.transactions}
                moneyCellsIdsSet = {props.moneyCellsIdsSet}
            />
        </Screen>
    );
};

const mapStateToProps = state => {
    return {
        transactions: state.main.transactions.filter(e => !e.isDeleted),
        moneyCellsIdsSet: createMoneyCellsIdsSet(state.main.moneyCells.filter(e => !e.isDeleted))
    }
};

export default connect(mapStateToProps, undefined)(TransactionsScreen)