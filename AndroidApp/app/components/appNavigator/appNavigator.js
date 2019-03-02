import React from 'react';
import {createDrawerNavigator, createStackNavigator} from 'react-navigation';
import DebugScreen from '../../screens/debug/debugScreen';
import PeopleScreen from '../../screens/people/peopleScreen';
import {CustomDrawerContentComponent} from '../customDrawerComponent/customDrawerComponent';
import MoneyCellsScreen from '../../screens/moneyCells/moneyCellsScreen';
import {Theme} from '../theme';
import SynchronizationScreen from '../../screens/synchronization/synchronizationScreen';
import PersonInfoScreen from '../../screens/people/personInfoScreen';
import EditPersonScreen from '../../screens/people/editPersonScreen';
import MoneyCellInfoScreen from '../../screens/moneyCells/moneyCellInfoScreen';
import EditMoneyCellScreen from '../../screens/moneyCells/editMoneyCellScreen';
import TransactionsScreen from '../../screens/transactions/transactionsScreen';
import EditTransactionScreen from '../../screens/transactions/editTransactionScreen';

export const AppNavigator = createDrawerNavigator({
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
        }
    }, {
        headerMode: 'none'
    }),
    Synchronization: SynchronizationScreen,
    Debug: DebugScreen,
},{
    contentComponent: CustomDrawerContentComponent,
    header: null,
    contentOptions: {
        activeTintColor: Theme.mainColor
}});