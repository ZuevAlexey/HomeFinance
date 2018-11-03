import React from 'react';
import {Text} from "react-native";
import {Screen} from "../../components/screen/screen";

export const EditMoneyCellScreen = (props) => {
    let {moneyCell} = props.navigation.state.params;
    return (
        <Screen
            {...props}
            headerTitle = {`Edit ${moneyCell.name}`}
        >
            {Object.keys(moneyCell).map(key => (
                <Text key = {key} style = {{textAlign: 'center'}}>{`MoneyCell[${key}] =  ${moneyCell[key]}`}</Text>
                ))}
        </Screen>
    );
  };