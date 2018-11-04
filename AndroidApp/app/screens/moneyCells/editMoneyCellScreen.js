import React from 'react';
import {Screen} from "../../components/screen/screen";
import {ScrollView, StyleSheet, View} from 'react-native';
import {MoneyCellType} from '../../constants/moneyCellType';
import {Theme} from "../../components/theme";
import {Button} from "react-native-elements";
import state from '../../store/initialState';
import {getEnumsFromList, getEnumsFromObject} from '../../helpers/getEnums';
import {MoneyCellStatus} from "../../constants/moneyCellStatus";

let t = require('tcomb-form-native');
let Form = t.form.Form;

export default class EditMoneyCellScreen extends React.Component {
    constructor(props){
        super(props);
        this.onPress = this.onPress.bind(this);
        this.getType = this.getType.bind(this);
        let {moneyCell} = this.props.navigation.state.params;
        let defaultValue = moneyCell === undefined
            ? {
                status: MoneyCellStatus.ACTIVE,
                startDate: new Date(),
                status: MoneyCellStatus.ACTIVE
            }
            : {
                ownerId: moneyCell.ownerId,
                moneyCellType: moneyCell.moneyCellType,
                amount: moneyCell.amount,
                startDate: moneyCell.startDate && new Date(moneyCell.startDate),
                endDate: moneyCell.endDate && new Date(moneyCell.endDate),
                name: moneyCell.name,
                status: moneyCell.status,
                parentId: moneyCell.parentId
            };

        this.state = {value: defaultValue};
    }

    onPress = () => {
        let value = this.refs.form.getValue();
        if (value) {
            let action = this.props.navigation.state.params.action;
            action && action(value);
        }
    };

    getType = () => {
        return t.struct({
            ownerId: getEnumsFromList(state.people, p => p.id, p => `${p.lastName} ${p.firstName}`, 'People'),
            moneyCellType: getEnumsFromObject(MoneyCellType, 'MoneyCellType'),
            amount: t.maybe(t.Number),
            name: t.String,
            status: getEnumsFromObject(MoneyCellStatus, 'MoneyCellStatus'),
            parentId: t.maybe(getEnumsFromList(state.moneyCells, mc => mc.id, mc => mc.name, 'MoneyCells')),
            startDate: t.maybe(t.Date),
            endDate: t.maybe(t.Date)
        });
    };

    render() {
        let type = this.getType();
        let {moneyCell} = this.props.navigation.state.params;
        let headerTitle = moneyCell === undefined ? 'Add new money cell' : `Edit ${moneyCell.name}`;
        return (
            <Screen
                {...this.props}
                headerTitle={headerTitle}
            >
                <View style = {{flex:1}}>
                    <ScrollView>
                        <View style={styles.container}>
                            <Form
                                ref="form"
                                type={type}
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
                    </ScrollView>
                </View>
            </Screen>
        );
    }
};

let options = {
    fields: {
        ownerId: {
            label: 'Owner'
        },
        moneyCellType: {
            label: 'Type'
        },
        amount: {
            label: 'Amount'
        },
        name: {
            label: 'Name',
            placeholder: 'Enter money cell name'
        },
        status: {
            label: 'Status'
        },
        parentId: {
            label: 'Parent money cell'
        },
        startDate: {
            label: 'Start date',
            mode: 'date',
            config: {
                format: date => date.toLocaleDateString('ru-Ru')
            }
        },
        endDate: {
            label: 'End date',
            mode: 'date',
            config: {
                format: date => date.toLocaleDateString('ru-Ru')
            }
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