import React from 'react';
import {Text} from "react-native";
import {Screen} from "../../components/screen/screen";

export const EditPersonScreen = (props) => {
    let {person} = props.navigation.state.params;
    return (
        <Screen
            {...props}
            headerTitle = {`Edit ${person.lastName}`}
        >
            {Object.keys(person).map(key => (
                <Text key = {person.id} style = {{textAlign: 'center'}}>{`Person[${key}] =  ${person[key]}`}</Text>
                ))}
        </Screen>
    );
  };