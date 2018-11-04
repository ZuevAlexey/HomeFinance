import React from 'react';
import {List} from "../../components/list/list";
import {Alert, Text} from "react-native";
import {Theme} from "../../components/theme";
import {Screen} from "../../components/screen/screen";
import {showOkCancelDialog} from "../../helpers/okCancelDialog";

import state from '../../store/initialState';

const TRANSFER = 'transfer';
const TRANSFER_IN = 'transfer-in';
const TRANSFER_OUT = 'transfer-out';

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
            <List
                avatarFactory = {getAvatar}
                avatarStyle = {Theme.listAvatarStyle}
                titleFactory = {getTitle}
                onItemPress = {onTransactionPress(navigation)}
                onItemEditPress = {onTransactionEditPress(navigation)}
                onItemDeletePress = {onTransactionDeletePress}
                items = {state.transactions}
                addButtonInfo= {{
                    icon: {
                        name: 'credit-card-plus',
                        type: 'material-community'
                    },
                    title: 'Add new transaction',
                    onPress: addTransactionPress(navigation)
                }}
            />
        </Screen>
    );
};

const addTransactionPress = (navigation) => () => {
    navigation.push('EditTransaction');
};

const onTransactionPress = (navigation) => (transaction) => {
    navigation.push('Transaction', {transaction});
};

const onTransactionEditPress = (navigation) => (transaction) => {
    navigation.push('EditTransaction', {transaction});
};

const onTransactionDeletePress = (transaction) => {
    showOkCancelDialog(
        'Deleting transaction',
        `You want to delete a transaction '${transaction.description}'. Are you sure?`,
        'Delete',
        'Cancel',
        () => Alert.alert(`Delete '${transaction.description}'`)
    );
};

const getTitle = (transaction) => {
    return (
        [<Text key = 'name'>
            {`${transaction.description}`}
        </Text>,
        <Text key = 'amount' style={{color: getTransactionColor(transaction.articleId)}}>
            {`${getSign(transaction.articleId)}${transaction.amount}`}
        </Text>]
    );
};

const getTransactionType = (articleId) => {
    switch (articleId.charAt(0)){
        case '1':{
            return TRANSFER_OUT;
        }
        case '2':{
            return TRANSFER_IN;
        }
        case '3':{
            return TRANSFER;
        }
    }
};

const getSign = (articleId) => {
    switch (getTransactionType(articleId)){
        case TRANSFER_OUT:{
            return '-';
        }
        case TRANSFER_IN:{
            return '+';
        }
        case TRANSFER:{
            return '';
        }
    }
};



const getTransactionColor = (articleId) => {
    switch (getTransactionType(articleId)){
        case TRANSFER_OUT:{
            return Theme.badColor;
        }
        case TRANSFER_IN:{
            return Theme.goodColor;
        }
        case TRANSFER:{
            return Theme.normalColor;
        }
    }
};

const getAvatar = (transaction) => {
    let name;
    switch (getTransactionType(transaction.articleId)){
        case TRANSFER_OUT:{
            name = 'arrow-circle-o-up';
            break;
        }
        case TRANSFER_IN:{
            name = 'arrow-circle-o-down';
            break;
        }
        case TRANSFER:{
            name = 'arrow-circle-o-right';
        }
    }

    return {
        type: 'font-awesome',
        name
    };
};