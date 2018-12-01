import React from 'react';
import {Screen} from "../../components/screen/screen";
import {TransactionsList} from "../../components/list/transactions/transactionsList";
import {MoneyCellsList} from "../../components/list/moneyCellList/moneyCellsList";
import {View} from "native-base";
import {Theme} from "../../components/theme";
import {Button} from "react-native-elements";
import {StyleSheet} from "react-native";

const INNER_PAGES = {
    TRANSACTIONS : 'Transactions',
    MONEY_CELLS : 'MoneyCells'
};

export default class PersonInfoScreen extends React.Component {
    constructor(props){
        super(props);
        this.state = {innerPage: INNER_PAGES.MONEY_CELLS};
        this.setInnerPage = this.setInnerPage.bind(this);
        this.renderPageButton = this.renderPageButton.bind(this);
    }

    setInnerPage(innerPage){
        if(innerPage === this.state.innerPage){
            return;
        }

        this.setState({innerPage});
    }

    renderPageButton(page){
        return <Button
            title = {page}
            backgroundColor = {this.state.innerPage === page ? Theme.selectedButtonBackgroundColor : undefined}
            onPress={() => this.setInnerPage(page)}
        />
    };

    render() {
        let {navigation} = this.props;
        let {person} = navigation.state.params;
        return (
            <Screen
                {...this.props}
                headerTitle = {`${person.lastName} ${person.firstName}`}
            >
                <View style = {styles.listContainer}>
                    {this.state.innerPage === INNER_PAGES.MONEY_CELLS && <MoneyCellsList navigation = {navigation} />}
                    {this.state.innerPage === INNER_PAGES.TRANSACTIONS && <TransactionsList navigation = {navigation} />}
                </View>
                <View style = {styles.buttonsContainer}>
                    <View style = {styles.buttonContainer}>
                        {this.renderPageButton(INNER_PAGES.MONEY_CELLS)}
                    </View>
                    <View style = {styles.buttonContainer}>
                        {this.renderPageButton(INNER_PAGES.TRANSACTIONS)}
                    </View>
                </View>
            </Screen>
        );
    }
};

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
        justifyContent : 'center'
    }
});