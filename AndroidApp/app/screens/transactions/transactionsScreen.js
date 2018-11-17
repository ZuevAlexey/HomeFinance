import React from 'react';
import {Text} from "react-native";
import {Theme} from "../../components/theme";
import {Screen} from "../../components/screen/screen";

import {TransactionsList} from "../../components/list/transactions/transactionsList";

export const TransactionsScreen = (props) => {
    let {navigation} = props;
    return (
        <Screen {...props}
                headerTitle = 'Transactions'
                headerStatus = {<Text style = {
                {
                    textAlign: 'center',
                    fontSize: 30,
                    color: Theme.badColor
                }}
            >-400$</Text>}
        >
            <TransactionsList
                navigation = {navigation}
            />
        </Screen>
    );
};