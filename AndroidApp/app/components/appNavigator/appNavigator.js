import React from "react";
import {createDrawerNavigator, createStackNavigator} from "react-navigation";
import PeoplePage from "../../pages/peopleList/peoplePage";
import {CustomDrawerContentComponent} from "../customDrawerComponent/customDrawerComponent";
import MoneyCellsPage from "../../pages/moneyCellsList/moneyCellsPage";

export const AppNavigator = createDrawerNavigator({
    People: createStackNavigator({
        List: {
            screen: PeoplePage
        }
    }, {
        headerMode: 'none'
    }),
    MoneyCells: createStackNavigator({
        List: {
            screen: MoneyCellsPage
        }
    }, {
        headerMode: 'none'
    })
},{
    contentComponent: CustomDrawerContentComponent,
    header: null,
    contentOptions: {
        activeTintColor: 'teal'
    }});