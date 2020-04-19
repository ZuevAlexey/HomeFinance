import React, {Component} from 'react';
import {Screen} from '../../components/screen/screen';
import {StyleSheet, View} from 'react-native';
import {getDateDisplayString, getFullArticleName, GetFullMoneyCellName} from '../../helpers/displayStringHelper';
import Theme from '../../components/theme';
import {connect} from 'react-redux';
import {GetInfoText} from "../../helpers/moneyCellsHelper";
import {CommonConstants} from "../../constants/commonConstants";

class TransactionInfoScreen extends Component {
    constructor(props) {
        super(props);
        this.getMoneyCellDisplayString = this.getMoneyCellDisplayString.bind(this);
    }

    getMoneyCellDisplayString(moneyCellId) {
        if (moneyCellId === CommonConstants.OUTSIDE_MONEY_CELL_ID) {
            return CommonConstants.OUTSIDE_MONEY_CELL_NAME;
        } else {
            let moneyCell = this.props.getMoneyCell(moneyCellId);
            let owner = this.props.getPerson(moneyCell.ownerId);
            return GetFullMoneyCellName(owner, moneyCell);
        }
    }


    render() {
        let {transactionId} = this.props.navigation.state.params;
        let transaction = this.props.getTransaction(transactionId);
        let articleName = getFullArticleName(this.props.getArticle(transaction.articleId));
        let fromMcDs = this.getMoneyCellDisplayString(transaction.fromId);
        let toMcDs = this.getMoneyCellDisplayString(transaction.toId);

        return (
            <Screen
                {...this.props}
                headerTitle={`${articleName}`}
            >
                <View style={styles.infoContainer}>
                    {GetInfoText('Amount', transaction.amount)}
                    {GetInfoText('Description', transaction.description)}
                    {GetInfoText('From', fromMcDs)}
                    {GetInfoText('To', toMcDs)}
                    {GetInfoText('Date', transaction.date, e => getDateDisplayString(e))}
                </View>
            </Screen>
        );
    }
}

const styles = StyleSheet.create({
    infoContainer: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'flex-start',
        paddingLeft: Theme.mainPaddingLeft
    }
});

const mapStateToProps = state => {
    return {
        getTransaction: (transactionId) => state.main.transactions.first(e => e.id === transactionId),
        getMoneyCell: (moneyCellId) => state.main.moneyCells.first(e => e.id === moneyCellId),
        getPerson: (personId) => state.main.people.first(e => e.id === personId),
        getArticle: (articleId) => state.main.articles.first(e => e.id === articleId)
    }
};

export default connect(mapStateToProps, undefined)(TransactionInfoScreen)