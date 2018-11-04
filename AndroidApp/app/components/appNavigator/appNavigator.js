import React from "react";
import {createDrawerNavigator, createStackNavigator} from "react-navigation";
import {PeopleScreen} from "../../screens/people/peopleScreen";
import {CustomDrawerContentComponent} from "../customDrawerComponent/customDrawerComponent";
import {MoneyCellsScreen} from "../../screens/moneyCells/moneyCellsScreen";
import {Theme} from "../theme";
import {SynchronizationScreen} from "../../screens/synchronization/synchronizationScreen";
import {PersonInfoScreen} from "../../screens/people/personInfoScreen";
import EditOrAddPersonScreen from "../../screens/people/editOrAddPersonScreen";
import {MoneyCellInfoScreen} from "../../screens/moneyCells/moneyCellInfoScreen";
import {EditOrAddMoneyCellScreen} from "../../screens/moneyCells/editOrAddMoneyCellScreen";
import {TransactionsScreen} from "../../screens/transactions/transactionsScreen";
import {TransactionInfoScreen} from "../../screens/transactions/transactionInfoScreen";
import {EditOrAddTransactionScreen} from "../../screens/transactions/editOrAddTransactionScreen";

export const AppNavigator = createDrawerNavigator({
    People: createStackNavigator({
        PeopleList: {
            screen: PeopleScreen
        },
        Person: {
            screen: PersonInfoScreen
        },
        EditOrAddPerson: {
            screen: EditOrAddPersonScreen
        }
    }, {
        headerMode: 'none'
    }),
    MoneyCells: createStackNavigator({
        MoneyCellsList: {
            screen: MoneyCellsScreen
        },
        MoneyCell: {
            screen: MoneyCellInfoScreen
        },
        EditOrAddMoneyCell: {
            screen: EditOrAddMoneyCellScreen
        }
    }, {
        headerMode: 'none'
    }),
    Transactions: createStackNavigator({
        TransactionsList: {
            screen: TransactionsScreen
        },
        Transaction: {
            screen: TransactionInfoScreen
        },
        EditOrAddTransaction: {
            screen: EditOrAddTransactionScreen
        }
    }, {
        headerMode: 'none'
    }),
    Synchronization: SynchronizationScreen
},{
    contentComponent: CustomDrawerContentComponent,
    header: null,
    contentOptions: {
        activeTintColor: Theme.mainColor
}});