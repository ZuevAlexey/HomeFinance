import React from 'react';
import {Screen} from '../../components/screen/screen';
import TransactionsList from '../../components/list/transactions/transactionsList';
import MoneyCellsList from '../../components/list/moneyCellList/moneyCellsList';
import {View} from 'native-base';
import Theme from '../../components/theme';
import {Button} from 'react-native-elements';
import {StyleSheet} from 'react-native';
import {GetFullPersonName} from '../../helpers/displayStringHelper';
import {connect} from 'react-redux';
import {getStatusFromSummary} from '../../helpers/statusHelper';
import {getMoneyCellsSummary, getTransactionsSummary} from '../../helpers/calculator';
import {createMoneyCellsIdsSet} from '../../helpers/transactionHelper';

const INNER_PAGES = {
    TRANSACTIONS: 'Transactions',
    MONEY_CELLS: 'MoneyCells'
};

class PersonInfoScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {innerPage: INNER_PAGES.MONEY_CELLS};
        this.setInnerPage = this.setInnerPage.bind(this);
        this.renderPageButton = this.renderPageButton.bind(this);
    }

    setInnerPage(innerPage) {
        if (innerPage === this.state.innerPage) {
            return;
        }

        this.setState({innerPage});
    }

    renderPageButton(page) {
        backgroundColor = this.state.innerPage === page ? Theme.selectedButtonBackgroundColor : Theme.mainColor;
        return <Button
            title={page}
            buttonStyle={{backgroundColor: backgroundColor}}
            onPress={() => this.setInnerPage(page)}
        />
    };

    render() {
        let {navigation, getMoneyCells, getTransactions, getPerson} = this.props;
        let {personId} = navigation.state.params;
        let moneyCells = getMoneyCells(personId);
        let moneyCellIdsSet = createMoneyCellsIdsSet(moneyCells);
        let transactions = getTransactions(moneyCellIdsSet);

        let summary;
        if (this.state.innerPage === INNER_PAGES.MONEY_CELLS) {
            summary = getMoneyCellsSummary(moneyCells);
        } else {
            summary = getTransactionsSummary(transactions, moneyCellIdsSet);
        }

        let person = getPerson(personId);

        return (
            <Screen
                {...this.props}
                headerTitle={GetFullPersonName(person)}
                headerStatus={getStatusFromSummary(summary)}
            >
                <View style={styles.listContainer}>
                    {this.state.innerPage === INNER_PAGES.MONEY_CELLS &&
                    <MoneyCellsList navigation={navigation} moneyCells={moneyCells} ownerId={person.id}/>}
                    {this.state.innerPage === INNER_PAGES.TRANSACTIONS &&
                    <TransactionsList navigation={navigation} transactions={transactions}
                                      moneyCellsIdsSet={moneyCellIdsSet}/>}
                </View>
                <View style={styles.buttonsContainer}>
                    <View style={styles.buttonContainer}>
                        {this.renderPageButton(INNER_PAGES.MONEY_CELLS)}
                    </View>
                    <View style={styles.buttonContainer}>
                        {this.renderPageButton(INNER_PAGES.TRANSACTIONS)}
                    </View>
                </View>
            </Screen>
        );
    }
}

const styles = StyleSheet.create({
    listContainer: {
        flex: 1,
    },
    buttonsContainer: {
        height: 60,
        flexDirection: 'row',
    },
    buttonContainer: {
        flex: 1,
        margin: 1,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

const mapStateToProps = state => {
    return {
        getPerson: (personId) => state.main.people.first(e => e.id === personId),
        getMoneyCells: (personId) => state.main.moneyCells.filter(e => !e.isDeleted && e.ownerId === personId),
        getTransactions: (moneyCellIdsSet) => {
            return state.main.transactions.filter(tran =>
                !tran.isDeleted &&
                (moneyCellIdsSet.has(tran.toId) || moneyCellIdsSet.has(tran.fromId))
            )
        }
    }
};

export default connect(mapStateToProps, undefined)(PersonInfoScreen)