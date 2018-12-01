import React from 'react';
import {Text} from "react-native";
import {Theme} from "../../components/theme";
import {Screen} from "../../components/screen/screen";

import {MoneyCellsList} from "../../components/list/moneyCellList/moneyCellsList";

export const MoneyCellsScreen = (props) => {
    let {navigation} = props;
    return (
        <Screen {...props}
                headerTitle = 'MoneyCells'
                headerStatus = {<Text style = {
                {
                    textAlign: 'center',
                    fontSize: 30,
                    color: Theme.badColor
                }}
            >-400$</Text>}
        >
            <MoneyCellsList navigation = {navigation} />
        </Screen>
    );
};