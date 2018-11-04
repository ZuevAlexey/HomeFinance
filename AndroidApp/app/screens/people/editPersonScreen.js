import React from 'react';
import {Screen} from "../../components/screen/screen";
let t = require('tcomb-form-native');
import { StyleSheet, View } from 'react-native';
import {Sex} from '../../constants/sex';
import {Theme} from "../../components/theme";
import {Button} from "react-native-elements";
let Form = t.form.Form;

export default class EditPersonScreen extends React.Component {
    constructor(props){
        super(props);
        this.onPress = this.onPress.bind(this);
        let {person} = this.props.navigation.state.params;
        let defaultValue = person === undefined
            ? null
            : {
                firstName: person.firstName,
                lastName: person.lastName,
                sex: person.sex
            };

        this.state = {value: defaultValue};
    }

    onPress = () => {
        let value = this.refs.form.getValue();
        if (value) {
            this.props.navigation.state.params.action(value);
        }
    };

    render() {
        let {person} = this.props.navigation.state.params;
        let headerTitle = person === undefined ? 'Add New Person' : `Edit ${person.lastName} ${person.firstName}`;
        return (
            <Screen
                {...this.props}
                headerTitle={headerTitle}
            >
                <View style={styles.container}>
                    <Form
                        ref="form"
                        type={Person}
                        value = {this.state.value}
                        options={options}
                    />
                    <View style={styles.buttonContainer}>
                        <Button
                            buttonStyle = {styles.button}
                            title = 'Save'
                            onPress={() => this.onPress()}
                        />
                    </View>
                </View>
            </Screen>
        );
    }
};

let Person = t.struct({
    lastName: t.String,
    firstName: t.String,
    sex: t.enums({
        [Sex.MALE]: 'MALE',
        [Sex.FEMALE]: 'FEMALE'
    }, 'Sex')
});

let options = {
    fields:{
        firstName: {
            label: 'First name',
            placeholder: 'Enter first name'
        },
        lastName: {
            label: 'Last name',
            placeholder: 'Enter last name'
        },
        sex: {
            label: 'Sex',
            placeholder: 'Enter sex'
        }
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignContent: 'center',
        padding: 20
    },
    buttonContainer: {
        flexDirection: 'column',
        flex:1,
        alignItems: 'center'
    },
    button: {
        height: 36,
        width: 140,
        backgroundColor: Theme.mainColor,
        marginBottom: 10,
        justifyContent: 'center'
    }
});