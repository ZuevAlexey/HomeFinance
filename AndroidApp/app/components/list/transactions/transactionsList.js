import React from 'react';
import {Text} from "react-native";
import {List} from "../list";
import {Theme} from "../../theme";
import {showOkCancelDialog} from "../../../helpers/okCancelDialog";
import {AddTransaction} from "../../../store/actions/addTransaction";
import {EditTransaction} from "../../../store/actions/editTransaction";
import {connect} from "react-redux";
import {MarkDeleteTransaction} from "../../../store/actions/markDeleteTransaction";

const TRANSFER = 'transfer';
const TRANSFER_IN = 'transfer-in';
const TRANSFER_OUT = 'transfer-out';

const TransactionsList = (props) => {
    let {navigation, transactions, add, save, articles, moneyCells} = props;
    return (
            <List
                avatarFactory = {getAvatar}
                avatarStyle = {Theme.listAvatarStyle}
                titleFactory = {getTitle}
                onItemPress = {onTransactionEditPress(navigation, save, articles, moneyCells)}
                onItemEditPress = {onTransactionEditPress(navigation, save, articles, moneyCells)}
                onItemDeletePress = {onTransactionDeletePress(props.delete)}
                items = {transactions}
                addButtonInfo= {{
                    icon: {
                        name: 'credit-card-plus',
                        type: 'material-community'
                    },
                    title: 'Add new transaction',
                    onPress: addTransactionPress(navigation, add, articles, moneyCells)
                }}
            />
    );
};

const addTransactionPress = (navigation, add, articles, moneyCells) => () => {
    navigation.push('EditTransaction', {
        articles,
        moneyCells,
        action: (transaction) => add(transaction)
    });
};

const onTransactionEditPress = (navigation, save, articles, moneyCells) => (transaction) => {
    navigation.push('EditTransaction', {
        transaction,
        articles,
        moneyCells,
        action: (newTransaction) => save(newTransaction)
    });
};

const onTransactionDeletePress = (deleteAction) => (transaction) => {
    showOkCancelDialog(
        'Deleting transaction',
        `You want to delete a transaction '${transaction.description}'. Are you sure?`,
        'Delete',
        'Cancel',
        () => deleteAction(transaction)
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

const mapStateToProps = state => ({
    articles: state.articles,
    moneyCells: state.moneyCells.filter(e => !e.isDeleted)
});

const mapDispatchToProps = dispatch => {
    return {
        add: (transaction) => {
            dispatch(AddTransaction(transaction.fromId, transaction.toId, transaction.articleId, transaction.amount, transaction.description, transaction.date))
        },
        save: (transaction) => {
            dispatch(EditTransaction(transaction.id, transaction.fromId, transaction.toId, transaction.articleId, transaction.amount, transaction.description, transaction.date))
        },
        delete: (transaction) => {
            dispatch(MarkDeleteTransaction(transaction.id))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(TransactionsList)