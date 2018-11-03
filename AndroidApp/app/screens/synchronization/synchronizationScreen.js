import React from 'react';
import {Text} from "react-native";
import {Screen} from "../../components/screen/screen";

export const SynchronizationScreen = (props) => {
    return (
        <Screen
            {...props}
            headerTitle = 'Synchronization'
        >
            <Text style = {{textAlign: 'center'}}>Synchronization</Text>
        </Screen>
    );
};