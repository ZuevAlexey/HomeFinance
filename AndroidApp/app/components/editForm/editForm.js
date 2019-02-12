import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Theme} from "../../components/theme";
import {Button} from "react-native-elements";
import withNavigation from "react-navigation/src/views/withNavigation";

let t = require('tcomb-form-native');
let Form = t.form.Form;

const onPress = (form, action, navigation) => {
    let value = form.getValue();
    if (value) {
        action && action(value);
        navigation.goBack();
    }
};

export const EditForm = withNavigation((props) => {
    let {type, options, startValue, action, postAction, navigation} = props;
    let form;
    return (
        <View style = {{flex:1}}>
            <ScrollView>
                <View style={styles.container}>
                    <Form
                        ref={input => form = input}
                        type={type}
                        value = {startValue}
                        options={options}
                    />
                    <View style={styles.buttonContainer}>
                        <Button
                            buttonStyle = {styles.button}
                            title = 'Save'
                            onPress={() => onPress(form, action, navigation, postAction)}
                        />
                    </View>
                </View>
            </ScrollView>
        </View>
    );
});

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