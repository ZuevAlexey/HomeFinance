import React from 'react';
import {Text} from "react-native";
import {Screen} from "../../components/screen/screen";

export const EditTransactionScreen = (props) => {
    let {transaction} = props.navigation.state.params;
    return (
        <Screen
            {...props}
            headerTitle = {`Edit ${transaction.description}`}
        >
            {Object.keys(transaction).map(key => (
                <Text key = {key} style = {{textAlign: 'center'}}>{`Transaction[${key}] =  ${transaction[key]}`}</Text>
                ))}
        </Screen>
    );
  };