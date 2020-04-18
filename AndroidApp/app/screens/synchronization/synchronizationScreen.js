import React from 'react';
import {StyleSheet} from 'react-native';
import {Screen} from '../../components/screen/screen';
import {View} from 'native-base';
import Theme from '../../components/theme';
import {Button} from 'react-native-elements';
import {connect} from 'react-redux';
import {deserialyzeFromSync, getInfoForSynchronize} from '../../helpers/synchronizationHelper';
import {Synchronize} from '../../store/actions/synchronization';
import {EditForm} from '../../components/editForm/editForm';
import {EditSystemData} from '../../store/actions/editSystemData';
import {debugObjectAsync, showMessage, showOkCancelDialog} from '../../helpers/dialog';
import {ResetStorage} from '../../store/actions/resetStorage';
import {readLocalSyncData, saveSyncData} from '../../helpers/resetStorageHelper';
import {isNullOrUndefined} from '../../helpers/maybe';
import {initializeStore, synchornizeWithGDrive} from "../../helpers/sinchronization/sincronizeManager";

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
        if (isNullOrUndefined(branch)) {
            return acc;
        }

        acc = acc + collectionGetter(branch).length;
        return acc;
    }, 0);
}

class SynchronizationScreen extends React.Component {
    constructor(props) {
        super(props);
        this.synchronization = this.synchronization.bind(this);
        this.resetStorage = this.resetStorage.bind(this);
        this.getType = this.getType.bind(this);
        this.getFormValue = this.getFormValue.bind(this);
        this.save = this.save.bind(this);
    }

    getFormValue() {
        return {
            lastSynchronizationTime: this.props.systemData.lastSynchronizationTime.toLocaleString(),
            credentials: this.props.systemData.credentials,
            token: this.props.systemData.token,
        }
    }

    async save(tokenString, credentialsString) {
        let token = JSON.parse(tokenString);
        let credentials = JSON.parse(credentialsString);
        let gDriveEnv = await initializeStore(token, credentials);
        this.props.saveSystemData(tokenString, credentialsString, gDriveEnv)
        showMessage(
            'Synchronization successful',
            `Google Drive environment was successful initialized`
        );
    }

    async synchronization() {
        try {
            let lastSynchronizationTime = this.props.systemData.lastSynchronizationTime;
            let peopleForSynchronize = getInfoForSynchronize(this.props.people, lastSynchronizationTime);
            let moneyCellsForSynchronize = getInfoForSynchronize(this.props.moneyCells, lastSynchronizationTime);
            let transactionsForSynchronize = getInfoForSynchronize(this.props.transactions, lastSynchronizationTime);

            let action = {
                systemData: {
                    lastSynchronizationTime: lastSynchronizationTime
                },
                people: peopleForSynchronize,
                moneyCells: moneyCellsForSynchronize,
                transactions: transactionsForSynchronize
            };

            let token = JSON.parse(this.props.systemData.token);
            let credentials = JSON.parse(this.props.systemData.credentials);
            let json = await synchornizeWithGDrive(this.props.systemData.gDriveEnv, token, credentials, JSON.stringify(action));
            let deserializedData = deserialyzeFromSync(json);
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
            await debugObjectAsync(error.message);
            showMessage(
                'Sync error',
                `Check your internet connection and try again. In case of repetition of the situation in technical support.`
            );
        }
    }

    async resetStorage() {
        let data = await readLocalSyncData();
        this.props.resetStorage(data);
    }

    getType() {
        let options = {
            lastSynchronizationTime: tcomb.String,
            credentials: tcomb.String,
            token: tcomb.String
        };

        return tcomb.struct(options);
    };

    render() {
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
                        action = {async (systemData) => {
                            await this.save(systemData.token, systemData.credentials)
                        }}
                    />
                </View>
                <View
                    style={styles.buttonsContainer}
                >
                    <View
                        style = {styles.buttonContainer}
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
                    </View>
                    <View
                        style = {styles.buttonContainer}
                    >
                        <Button
                            buttonStyle={styles.buttonStyle}
                            title={'Synchronization'}
                            onPress={() => this.synchronization()}
                        />
                    </View>
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
            label: 'Last server sync time',
            editable: false,
        },
        lastClientSynchronizationTime: {
            label: 'Last client sync time',
            editable: false,
        }
    }
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        flex: 1,
    },
    buttonsContainer: {
        height: 80,
        marginTop: 1,
        borderTopWidth: 1,
        borderWidth: 0,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    buttonContainer: {
        flex: 1,
        alignItems: 'center'
    },
    buttonStyle: {
        ...Theme.mainButtonStyle,
        width: 140
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
        saveSystemData: (token, credentials, gDriveEnv) => {
            dispatch(EditSystemData(token, credentials, gDriveEnv));
        },
        resetStorage: (serializedData) => {
            dispatch(ResetStorage(serializedData))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SynchronizationScreen)