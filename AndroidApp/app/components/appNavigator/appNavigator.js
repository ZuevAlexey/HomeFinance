import React from 'react';
import {createAppContainer, createDrawerNavigator, createStackNavigator} from 'react-navigation';
import PeopleScreen from '../../screens/people/peopleScreen';
import {CustomDrawerContentComponent} from '../customDrawerComponent/customDrawerComponent';
import MoneyCellsScreen from '../../screens/moneyCells/moneyCellsScreen';
import Theme from '../theme';
import SynchronizationScreen from '../../screens/synchronization/synchronizationScreen';
import PersonInfoScreen from '../../screens/people/personInfoScreen';
import EditPersonScreen from '../../screens/people/editPersonScreen';
import MoneyCellInfoScreen from '../../screens/moneyCells/moneyCellInfoScreen';
import EditMoneyCellScreen from '../../screens/moneyCells/editMoneyCellScreen';
import TransactionsScreen from '../../screens/transactions/transactionsScreen';
import TransactionInfoScreen from '../../screens/transactions/transactionInfoScreen';
import EditTransactionScreen from '../../screens/transactions/editTransactionScreen';

export const AppNavigator = createAppContainer(createDrawerNavigator({
    People: createStackNavigator({
        PeopleList: {
            screen: PeopleScreen
        },
        Person: {
            screen: PersonInfoScreen
        },
        EditPerson: {
            screen: EditPersonScreen
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
        EditMoneyCell: {
            screen: EditMoneyCellScreen
        }
    }, {
        headerMode: 'none'
    }),
    Transactions: createStackNavigator({
        TransactionsList: {
            screen: TransactionsScreen
        },
        EditTransaction: {
            screen: EditTransactionScreen
        },
        Transaction: {
            screen: TransactionInfoScreen
        }
    }, {
        headerMode: 'none'
    }),
    Synchronization: SynchronizationScreen
}, {
    contentComponent: CustomDrawerContentComponent,
    header: null,
    contentOptions: {
        activeTintColor: Theme.mainColor
    }
}));