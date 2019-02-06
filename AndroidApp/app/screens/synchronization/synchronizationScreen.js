import React from 'react';
import {Text, StyleSheet, Alert} from "react-native";
import {Screen} from "../../components/screen/screen";
import {View} from "native-base";
import {Theme} from "../../components/theme";
import {Button} from "react-native-elements";
import {connect} from "react-redux";
import {deserialyze, getInfoForSynchronize} from "../../helpers/synchronizationHelper";
import {Synchronize} from "../../store/actions/synchronization";
import {EditForm} from "../../components/editForm/editForm";
import {EditSystemData} from "../../store/actions/editSystemData";

let tcomb = require('tcomb-form-native');


const CONNECTION_STATUS = {
    OK: 'OK',
    UNKNOWN: 'UNKNOWN',
    FAILED: 'FAILED'
};

const branches = [
  'people',
  'moneyCells',
  'transactions',
  'articles'
];

function getCount(collectionGetter, data) {
    return branches.reduce((acc, el) => {
        let branch = data[el];
        if(branch === null || branch === undefined){
            return acc;
        }

        acc = acc + collectionGetter(branch).length;
        return acc;
    }, 0);
}

class SynchronizationScreen extends React.Component {
    constructor(props){
        super(props);
        this.synchronization = this.synchronization.bind(this);
        this.getType = this.getType.bind(this);
        this.getFormValue = this.getFormValue.bind(this);
    }

    getFormValue(props){
        return {
            lastSynchronizationTime: props.systemData.lastSynchronizationTime.toLocaleString(),
            serverAddress: props.systemData.serverAddress
        }
    }

    async synchronization(serverAddress){
        try {
            let lastSynchronizationTime = this.props.systemData.lastSynchronizationTime;
            let peopleForSynchronize = getInfoForSynchronize(this.props.people, lastSynchronizationTime);
            let moneyCellsForSynchronize = getInfoForSynchronize(this.props.moneyCells, lastSynchronizationTime);
            let transactionsForSynchronize = getInfoForSynchronize(this.props.transactions, lastSynchronizationTime);

            let body = JSON.stringify({
                type: 'sync',
                data: {
                    systemData: {
                        lastSynchronizationTime: lastSynchronizationTime
                    },
                    people: peopleForSynchronize,
                    moneyCells: moneyCellsForSynchronize,
                    transactions: transactionsForSynchronize
                }
            });

            let response = await fetch(serverAddress + '/api/action', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: body
            });

            let json = await response.json();
            if(json.type !== 'sync'){
                this.setState({
                    connectionStatus: CONNECTION_STATUS.FAILED
                });

                return;
            }

            let deserializedData = deserialyze(json.data);
            this.props.sync(deserializedData);

            let pushCount = peopleForSynchronize.length + moneyCellsForSynchronize.length + transactionsForSynchronize.length;
            let editCount = getCount(p => p.edit, deserializedData);
            let removeCount = getCount(p => p.remove, deserializedData);
            let addCount = getCount(p => p.add, deserializedData);
            Alert.alert(
                "Синхронизация прошла успешно",
                `Изменений отправлено ${pushCount}. Изменение получено ${editCount + removeCount + addCount}`
            );
            this.setState({
                connectionStatus: CONNECTION_STATUS.OK
            });
        } catch (error) {
            this.setState({
                connectionStatus: CONNECTION_STATUS.FAILED
            })
        }
    }

    getType() {
        let options = {
            lastSynchronizationTime: tcomb.String,
            serverAddress: tcomb.String,
        };

        return tcomb.struct(options);
    };

    render() {
        let {systemData} = this.props;
        let {serverAddress} = systemData;
        return (
            <Screen
                {...this.props}
                headerTitle='Synchronization'
            >
                <View style={styles.container}>
                    <EditForm
                        type = {this.getType()}
                        options = {options}
                        startValue = {this.getFormValue(this.props)}
                        action = {(systemData) => this.props.saveSystemData(systemData)}
                    />
                </View>
                <View
                    style={styles.buttonContainer}
                >
                    <Button
                        title={'Synchronization'}
                        backgroundColor={Theme.mainColor}
                        onPress={() => this.synchronization(serverAddress)}
                    />
                </View>
            </Screen>
        );
    }
}

let options = {
    fields: {
        serverAddress: {
            label: 'Server address',
        },
        lastSynchronizationTime: {
            label: 'Last sync time',
            editable: false,
        }
    }
};

const styles = StyleSheet.create({
    container: {
        justifyContent : 'center',
        flex: 1,
    },
    buttonContainer: {
        height: 80,
        marginTop: 1,
        borderTopWidth: 1,
        borderWidth: 0,
        alignItems: 'center',
        justifyContent : 'center',
    },
});

const mapStateToProps = state => ({
    systemData: state.systemData,
    people: state.people,
    moneyCells: state.moneyCells,
    transactions: state.transactions,
});

const mapDispatchToProps = dispatch => {
    return {
        sync: (data) => {
            dispatch(Synchronize(data));
        },
        saveSystemData: (systemData) => {
            dispatch(EditSystemData(systemData.serverAddress));
        },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SynchronizationScreen)