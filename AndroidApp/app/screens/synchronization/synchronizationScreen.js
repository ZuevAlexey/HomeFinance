import React from 'react';
import {StyleSheet} from 'react-native';
import {Screen} from '../../components/screen/screen';
import {View} from 'native-base';
import {Theme} from '../../components/theme';
import {Button} from 'react-native-elements';
import {connect} from 'react-redux';
import {deserialyzeFromSync, getInfoForSynchronize} from '../../helpers/synchronizationHelper';
import {Synchronize} from '../../store/actions/synchronization';
import {EditForm} from '../../components/editForm/editForm';
import {EditSystemData} from '../../store/actions/editSystemData';
import {showMessage, showOkCancelDialog} from '../../helpers/dialog';
import {ResetStorage} from '../../store/actions/resetStorage';
import {readLocalSyncData, saveSyncData} from '../../helpers/resetStorageHelper';
import {isNullOrUndefined} from '../../helpers/maybe';

let tcomb = require('tcomb-form-native');

const branches = [
  'people',
  'moneyCells',
  'transactions',
  'articles'
];

function getCount(collectionGetter, data) {
    return branches.reduce((acc, el) => {
        let branch = data.main[el];
        if(isNullOrUndefined(branch)){
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
        this.resetStorage = this.resetStorage.bind(this);
        this.getType = this.getType.bind(this);
        this.getFormValue = this.getFormValue.bind(this);
    }

    getFormValue(){
        return {
            lastSynchronizationTime: this.props.systemData.lastSynchronizationTime.toLocaleString(),
            serverAddress: this.props.systemData.serverAddress
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
                throw 'Unknown response from server';
            }

            let deserializedData = deserialyzeFromSync(json.data);
            this.props.sync(deserializedData);

            let pushCount = peopleForSynchronize.length + moneyCellsForSynchronize.length + transactionsForSynchronize.length;
            let editCount = getCount(p => p.edit, deserializedData);
            let removeCount = getCount(p => p.remove, deserializedData);
            let addCount = getCount(p => p.add, deserializedData);
            showMessage(
                'Synchronization successful',
                `Сhanges sent ${pushCount}. Сhanges received ${editCount + removeCount + addCount}`
            );

            await saveSyncData(this.props.getState());
        } catch (error) {
            showMessage(
                'Sync error',
                // `Check your internet connection and try again. In case of repetition of the situation in technical support.`,
                error.toString()
            );
        }
    }

    async resetStorage(){
        let data = await readLocalSyncData();
        this.props.resetStorage(data);
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
                        startValue = {this.getFormValue()}
                        action = {(systemData) => this.props.saveSystemData(systemData)}
                    />
                </View>
                <View
                    style={styles.buttonsContainer}
                >
                    <Button
                        buttonStyle={styles.buttonStyle}
                        title={'Reset storage'}
                        backgroundColor={Theme.mainColor}
                        onPress={() => {
                            showOkCancelDialog(
                                'Reset storage',
                                `You want to reset the storage to the last sync. Are you sure?`,
                                () => this.resetStorage(),
                                'Yes, I do',
                            );
                        }}
                    />
                    <Button
                        buttonStyle={styles.buttonStyle}
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
    buttonsContainer: {
        height: 80,
        marginTop: 1,
        borderTopWidth: 1,
        borderWidth: 0,
        alignItems: 'center',
        justifyContent : 'center',
        flexDirection: 'row'
    },
    buttonStyle: {
        width: 130
    }
});

const mapStateToProps = state => ({
    systemData: state.main.systemData,
    people: state.main.people,
    moneyCells: state.main.moneyCells,
    transactions: state.main.transactions,
    getState: () => state
});

const mapDispatchToProps = dispatch => {
    return {
        sync: (data) => {
            dispatch(Synchronize(data));
        },
        saveSystemData: (systemData) => {
            dispatch(EditSystemData(systemData.serverAddress));
        },
        resetStorage: (serializedData) => {
            dispatch(ResetStorage(serializedData))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SynchronizationScreen)