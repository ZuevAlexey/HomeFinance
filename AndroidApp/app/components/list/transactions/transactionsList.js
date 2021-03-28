import React from 'react';
import List from '../list';
import Theme from '../../theme';
import {showMessageAsync, showOkCancelDialogAsync} from '../../../helpers/dialog';
import {AddTransaction} from '../../../store/actions/addTransaction';
import {EditTransaction} from '../../../store/actions/editTransaction';
import {connect} from 'react-redux';
import {MarkDeleteTransaction} from '../../../store/actions/markDeleteTransaction';
import {getAvatar, getTransactionTitle} from '../../../helpers/transactionHelper';
import {transactionComparer} from '../../../helpers/sorter';
import {Ionicons} from "@expo/vector-icons";
import {STOP_NAVIGATION} from "../../../constants/navigationSign";
import {DIALOG_RESULT_CANCEL} from "../../../constants/dialogResult";
import {DELETE_BUTTON_NAME, SAVE_BUTTON_NAME} from "../../../constants/editFormButtonNames";

const TransactionsList = (props) => {
    let {navigation, transactions, add, save, moneyCellsIdsSet, articles} = props;
    return (
        <List
            avatarFactory={getAvatar(moneyCellsIdsSet)}
            avatarStyle={Theme.listAvatarStyle}
            titleFactory={getTransactionTitle(moneyCellsIdsSet, articles)}
            onItemPress={onTransactionPress(navigation)}
            onItemEditPress={onTransactionEditPress(navigation, save, props.delete)}
            items={transactions.sort(e => e.date)}
            comparer={transactionComparer}
            addButtonInfo={{
                icon: <Ionicons name="md-add-circle-outline" size={Theme.mainButtonIconSize} color={Theme.buttonIconColor} />,
                title: 'Add new transaction',
                onPress: addTransactionPress(navigation, add)
            }}
        />
    );
};

const addTransactionPress = (navigation, add) => () => {
    navigation.push('EditTransaction', {
        buttons: [
            {
                title: SAVE_BUTTON_NAME,
                action: async (transaction) => {
                    if (transaction.fromId === transaction.toId) {
                        await showMessageAsync('Error during transaction creation', 'Source money cell and destination money cell can\'t be the same')
                        return STOP_NAVIGATION;
                    }

                    add(transaction)
                }

            }
        ]
    });
};

const onTransactionPress = (navigation) => (transaction) => {
    navigation.push('Transaction', {transactionId: transaction.id});
};

const onTransactionEditPress = (navigation, save, deleteAction) => (transaction) => {
    let oldTransaction = {
        fromId: transaction.fromId,
        toId: transaction.toId,
        amount: transaction.amount
    };
    navigation.push('EditTransaction', {
        transactionId: transaction.id,
        buttons: [
            {
                title: SAVE_BUTTON_NAME,
                action: async (newTransaction) => {
                    if (newTransaction.fromId === newTransaction.toId) {
                        await showMessageAsync('Error during transaction update', 'Source money cell and destination money cell can\'t be the same')
                        return STOP_NAVIGATION;
                    }

                    save(newTransaction, oldTransaction)
                }
            },
            {
                title: DELETE_BUTTON_NAME,
                action: async (transactionToDelete) => {
                    let dialogResult = await showOkCancelDialogAsync(
                        'Deleting transaction',
                        `You want to delete a transaction '${transactionToDelete.description}'. Are you sure?`,
                        'Yes, I do'
                    );

                    if (dialogResult === DIALOG_RESULT_CANCEL) {
                        return STOP_NAVIGATION;
                    }

                    deleteAction(transactionToDelete)
                }
            }
        ],
    });
};

const mapStateToProps = state => {
    return {
        articles: state.main.articles
    }
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

export default connect(mapStateToProps, mapDispatchToProps)(TransactionsList)