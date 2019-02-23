import React from 'react';
import {List} from "../list";
import {Theme} from "../../theme";
import {showOkCancelDialog} from "../../../helpers/dialog";
import {AddTransaction} from "../../../store/actions/addTransaction";
import {EditTransaction} from "../../../store/actions/editTransaction";
import {connect} from "react-redux";
import {MarkDeleteTransaction} from "../../../store/actions/markDeleteTransaction";
import {getAvatar, getTitle} from "../../../helpers/transactionHelper";

const TransactionsList = (props) => {
    let {navigation, transactions, add, save, moneyCellsIdsSet} = props;
    return (
            <List
                avatarFactory = {getAvatar(moneyCellsIdsSet)}
                avatarStyle = {Theme.listAvatarStyle}
                titleFactory = {getTitle(moneyCellsIdsSet)}
                onItemPress = {onTransactionEditPress(navigation, save)}
                onItemEditPress = {onTransactionEditPress(navigation, save)}
                onItemDeletePress = {onTransactionDeletePress(props.delete)}
                items = {transactions.sort(e => e.date)}
                addButtonInfo= {{
                    icon: {
                        name: 'credit-card-plus',
                        type: 'material-community'
                    },
                    title: 'Add new transaction',
                    onPress: addTransactionPress(navigation, add)
                }}
            />
    );
};

const addTransactionPress = (navigation, add) => () => {
    navigation.push('EditTransaction', {
        action: (transaction) => add(transaction)
    });
};

const onTransactionEditPress = (navigation, save) => (transaction) => {
    let oldTransaction = {
        fromId: transaction.fromId,
        toId: transaction.toId,
        amount: transaction.amount
    };
    navigation.push('EditTransaction', {
        transactionId: transaction.id,
        action: (newTransaction) => save(newTransaction, oldTransaction)
    });
};

const onTransactionDeletePress = (deleteAction) => (transaction) => {
    showOkCancelDialog(
        'Deleting transaction',
        `You want to delete a transaction '${transaction.description}'. Are you sure?`,
        () => deleteAction(transaction),
        'Yes, I do',
    );
};

const mapDispatchToProps = dispatch => {
    return {
        add: (transaction) => {
            dispatch(AddTransaction(transaction.fromId, transaction.toId, transaction.articleId, transaction.amount, transaction.description, transaction.date))
        },
        save: (transaction, oldTransaction) => {
            dispatch(EditTransaction(transaction.id, transaction.fromId, transaction.toId, transaction.articleId, transaction.amount, transaction.description, transaction.date, oldTransaction.fromId, oldTransaction.toId, oldTransaction.amount))
        },
        delete: (transaction) => {
            dispatch(MarkDeleteTransaction(transaction.id, transaction.fromId, transaction.toId, transaction.amount))
        }
    }
};

export default connect(undefined, mapDispatchToProps)(TransactionsList)