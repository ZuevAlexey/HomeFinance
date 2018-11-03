import React from 'react';
import {Text} from "react-native";
import {Screen} from "../../components/screen/screen";

export const PersonInfoScreen = (props) => {
    let {person} = props.navigation.state.params;
    return (
        <Screen
            {...props}
            headerTitle = {`${person.lastName} ${person.firstName}`}
        >
            {Object.keys(person).map(key => (
                <Text key = {key} style = {{textAlign: 'center'}}>{`Person${key} =  ${person[key]}`}</Text>
                ))}
        </Screen>
    );
  };