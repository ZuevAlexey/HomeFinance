import React from 'react';
import {Text} from "react-native";
import {Screen} from "../../components/screen/screen";

class PersonInfoScreen extends React.Component {
  render() {
    let {person} = this.props.navigation.state.params;
    return (
        <Screen
            {...this.props}
            headerTitle = {`${person.lastName} ${person.firstName}`}
        >
            {Object.keys(person).map(key => (
                <Text key = {person.id} style = {{textAlign: 'center'}}>{`Person${key} =  ${person[key]}`}</Text>
                ))}
        </Screen>
    );
  }
}

export default PersonInfoScreen;