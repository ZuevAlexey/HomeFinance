import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import Theme from '../../components/theme';
import {Button} from 'react-native-elements';
import {withNavigation} from 'react-navigation';
import {STOP_NAVIGATION} from "../../constants/navigationSign";

let t = require('tcomb-form-native');
let Form = t.form.Form;

const onPress = async (form, action, navigation) => {
    let value = form.getValue();
    if (value) {
        if (action) {
            let stopResult = await action(value);
            if (stopResult && stopResult === STOP_NAVIGATION) {
                return;
            }
        }

        navigation.goBack();
    }
};

export const EditForm = withNavigation((props) => {
    let {type, options, startValue, saveAction, deleteAction, navigation} = props;
    let form;
    return (
        <View style={{flex: 1}}>
            <ScrollView>
                <View style={styles.container}>
                    <Form
                        ref={input => form = input}
                        type={type}
                        value={startValue}
                        options={options}
                    />
                    <View style={styles.saveButtonContainer}>
                        <Button
                            buttonStyle={styles.button}
                            title='Save'
                            onPress={async () => await onPress(form, saveAction, navigation)}
                        />
                    </View>
                    {deleteAction &&
                    <View style={styles.deleteButtonContainer}>
                        <Button
                            buttonStyle={styles.button}
                            title='Delete'
                            onPress={() => onPress(form, deleteAction, navigation)}
                        />
                    </View>
                    }
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
    saveButtonContainer: {
        flexDirection: 'column',
        flex: 1,
        alignItems: 'center'
    },
    deleteButtonContainer: {
        marginTop: 20,
        flexDirection: 'column',
        flex: 1,
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