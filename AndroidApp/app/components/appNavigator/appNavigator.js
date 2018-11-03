import React from "react";
import {createDrawerNavigator, createStackNavigator} from "react-navigation";
import PeopleScreen from "../../screens/people/peopleScreen";
import {CustomDrawerContentComponent} from "../customDrawerComponent/customDrawerComponent";
import MoneyCellsScreen from "../../screens/moneyCells/moneyCellsScreen";
import {Theme} from "../theme";
import SynchronizationScreen from "../../screens/synchronization/synchronizationScreen";

export const AppNavigator = createDrawerNavigator({
    People: createStackNavigator({
        List: {
            screen: PeopleScreen
        }
    }, {
        headerMode: 'none'
    }),
    MoneyCells: createStackNavigator({
        List: {
            screen: MoneyCellsScreen
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