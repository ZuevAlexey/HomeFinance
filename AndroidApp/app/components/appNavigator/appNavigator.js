import React from "react";
import {createDrawerNavigator, createStackNavigator} from "react-navigation";
import {PeopleScreen} from "../../screens/people/peopleScreen";
import {CustomDrawerContentComponent} from "../customDrawerComponent/customDrawerComponent";
import {MoneyCellsScreen} from "../../screens/moneyCells/moneyCellsScreen";
import {Theme} from "../theme";
import {SynchronizationScreen} from "../../screens/synchronization/synchronizationScreen";
import {PersonInfoScreen} from "../../screens/people/personInfoScreen";
import {EditPersonScreen} from "../../screens/people/editPersonScreen";
import {AddNewPersonScreen} from "../../screens/people/addNewPersonScreen";
import {MoneyCellInfoScreen} from "../../screens/moneyCells/moneyCellInfoScreen";
import {EditMoneyCellScreen} from "../../screens/moneyCells/editMoneyCellScreen";
import {AddNewMoneyCellScreen} from "../../screens/moneyCells/addNewMoneyCellScreen";

export const AppNavigator = createDrawerNavigator({
    People: createStackNavigator({
        List: {
            screen: PeopleScreen
        },
        Person: {
            screen: PersonInfoScreen
        },
        Edit: {
            screen: EditPersonScreen
        },
        AddNew: {
            screen: AddNewPersonScreen
        }
    }, {
        headerMode: 'none'
    }),
    MoneyCells: createStackNavigator({
        List: {
            screen: MoneyCellsScreen
        },
        MoneyCell: {
            screen: MoneyCellInfoScreen
        },
        Edit: {
            screen: EditMoneyCellScreen
        },
        AddNew: {
            screen: AddNewMoneyCellScreen
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