import React from 'react';
import {Text} from "react-native";
import {Screen} from "../../components/screen/screen";

class SynchronizationScreen extends React.Component {
    render() {
        return (
            <Screen
                {...this.props}
                headerTitle = 'Synchronization'
            >
                <Text style = {{textAlign: 'center'}}>Synchronization</Text>
            </Screen>
        );
    }
}

export default SynchronizationScreen;