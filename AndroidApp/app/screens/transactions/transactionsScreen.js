import React from 'react';
import {Text} from "react-native";
import {Theme} from "../../components/theme";
import {Screen} from "../../components/screen/screen";

import TransactionsList from "../../components/list/transactions/transactionsList";
import {connect} from "react-redux";

const TransactionsScreen = (props) => {
    let {navigation, transactions} = props;
    let sum = transactions.reduce((acc, el) => acc + el, 0);
    return (
        <Screen
            {...props}
                headerTitle = 'Transactions'
                headerStatus = {<Text style = {
                {
                    textAlign: 'center',
                    fontSize: 30,
                    color: sum > 0 ? Theme.goodColor : Theme.badColor
                }}
            >{sum}</Text>}
        >
            <TransactionsList
                navigation = {navigation}
                transactions = {transactions}
            />
        </Screen>
    );
};

const mapStateToProps = state => {
    return {
        transactions: state.transactions.filter(e => !e.isDeleted),
    }
};

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(TransactionsScreen)