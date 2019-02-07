import React from 'react';
import {Screen} from "../../components/screen/screen";

import TransactionsList from "../../components/list/transactions/transactionsList";
import {connect} from "react-redux";
import {getStatusFromSummary} from "../../helpers/statusHelper";
import {getTransactionsSummary} from "../../helpers/calculator";

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
            />
        </Screen>
    );
};

const mapStateToProps = state => {
    return {
        transactions: state.transactions.filter(e => !e.isDeleted),
        moneyCellsIdsSet: new Set(state.moneyCells.filter(e => !e.isDeleted).map(e => e.id))
    }
};

export default connect(mapStateToProps, undefined)(TransactionsScreen)