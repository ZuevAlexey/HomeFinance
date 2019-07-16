import React from 'react';
import {Screen} from '../../components/screen/screen';
import TransactionsList from '../../components/list/transactions/transactionsList';
import {Text, View, StyleSheet, Dimensions} from 'react-native';
import {getDateDisplayString, GetFullPersonName} from '../../helpers/displayStringHelper';
import Theme from '../../components/theme';
import {MoneyCellStatus} from '../../constants/moneyCellStatus';
import {connect} from 'react-redux';
import {withNullCheck} from '../../helpers/maybe';
import {getStatusFromSummary} from '../../helpers/statusHelper';
import {getTransactionsSummary} from '../../helpers/calculator';
import {createMoneyCellsIdsSet} from '../../helpers/transactionHelper';
import {GetInfoText} from "../../helpers/moneyCellsHelper";

const MoneyCellInfoScreen = (props) => {
    let {moneyCellId} = props.navigation.state.params;
    let transactions = props.getTransactions(moneyCellId);
    let moneyCell = props.getMoneyCell(moneyCellId);
    let owner = props.getPerson(moneyCell.ownerId);
    let summary = getTransactionsSummary(transactions, new Set([moneyCell.id]));

    return (
        <Screen
            {...props}
            headerTitle = {`${moneyCell.name}`}
            headerStatus = {getStatusFromSummary(summary)}
        >
            <View style ={styles.infoContainer} >
                <View style ={styles.halfInfoContainer} >
                    {GetInfoText('Owner', GetFullPersonName(owner))}
                    {GetInfoText('Type', moneyCell.moneyCellType)}
                    {GetInfoText('Amount', moneyCell.amount, e => `${e} RUB`, e => e > 0)}
                </View>
                <View style ={styles.halfInfoContainer} >
                    {GetInfoText('Start date', moneyCell.startDate, e => withNullCheck(e, getDateDisplayString, 'not set'))}
                    {GetInfoText('End date', moneyCell.endDate, e => withNullCheck(e, getDateDisplayString, 'not set'))}
                    {GetInfoText('Status', moneyCell.status, null, e => e === MoneyCellStatus.ACTIVE)}
                </View>
            </View>
            <Text style = {styles.transactionsListTitle} >Current moneycell's transactions:</Text>
            <TransactionsList navigation={props.navigation} transactions = {transactions} moneyCellsIdsSet = {createMoneyCellsIdsSet([moneyCell])} />
        </Screen>
    );
};

let {width} = Dimensions.get('window');
const styles = StyleSheet.create({
    infoContainer: {
        flexDirection: 'row',
        paddingLeft: Theme.mainPaddingLeft
    },
    halfInfoContainer: {
        width: width / 2
    },
    transactionsListTitle: {
        color: Theme.mainColor,
        fontSize: 18,
        marginTop: 10,
        paddingLeft: Theme.mainPaddingLeft
    }
});

const mapStateToProps = state => {
    return {
        getTransactions: (moneyCellId) => state.main.transactions.filter(e => !e.isDeleted && (e.toId === moneyCellId || e.fromId === moneyCellId)),
        getMoneyCell: (moneyCellId) => state.main.moneyCells.first(e => e.id === moneyCellId),
        getPerson: (personId) => state.main.people.first(e => e.id === personId)
    }
};

export default connect(mapStateToProps, undefined)(MoneyCellInfoScreen)