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
import {ResetStorage} from '../../store/actions/resetStorage';
import {readLocalSyncData, saveSyncData} from '../../helpers/resetStorageHelper';
import {isNullOrUndefined} from '../../helpers/maybe';
import {initializeStore, synchronizeWithGDrive} from "../../helpers/sinchronization/synchronizeManager";
import {debugObjectAsync, showMessageAsync} from "../../helpers/dialog";
import {SAVE_BUTTON_NAME} from "../../constants/editFormButtonNames";
import {branches_names} from '../../helpers/sinchronization/branches_names.js';

let tcomb = require('tcomb-form-native');

function getCount(collectionGetter, data) {
    return branches_names.reduce((acc, el) => {
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
        this.stopSync = this.stopSync.bind(this);
        this.startSync = this.startSync.bind(this);

        this.state = {isSyncNow: false}
    }

    stopSync() {
        this.setState({isSyncNow: false})
    }

    startSync() {
        this.setState({isSyncNow: true})
    }

    getFormValue() {
        return {
            lastSynchronizationTime: this.props.systemData.lastSynchronizationTime.toLocaleString(),
            key: this.props.systemData.key
        }
    }

    async save(key) {
        try {
            let gDriveEnv = await initializeStore(key);
            this.props.saveSystemData(key, gDriveEnv)
            await showMessageAsync(
                'GDrive initialization success',
                `Google Drive environment was successful initialized`
            );
        } catch (error) {
            await debugObjectAsync(error.message)
            await showMessageAsync(
                'GDrive initialization error',
                `Check your internet connection and try again. In case of repetition of the situation in technical support.`
            );
        }
    }

    async synchronization() {
        try {
            this.startSync();
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

            let json = await synchronizeWithGDrive(this.props.systemData.gDriveEnv, this.props.systemData.key, JSON.stringify(action));
            let deserializedData = deserialyzeFromSync(json);
            this.props.sync(deserializedData);


            let pushCount = peopleForSynchronize.length + moneyCellsForSynchronize.length + transactionsForSynchronize.length;

            let editCount = getCount(p => p.edit, deserializedData);

            let removeCount = getCount(p => p.remove, deserializedData);

            let addCount = getCount(p => p.add, deserializedData);

            await showMessageAsync(
                'Synchronization successful',
                `Changes sent ${pushCount}. Сhanges received ${editCount + removeCount + addCount}`
            );

            await saveSyncData(this.props.getState());
        } catch (error) {
            await debugObjectAsync(error.message)
            await showMessageAsync(
                'Sync error',
                `Check your internet connection and try again.`
            );
        } finally {
            this.stopSync()
        }
    }

    async resetStorage() {
        let data = await readLocalSyncData();
        this.props.resetStorage(data);
    }

    getType() {
        let options = {
            lastSynchronizationTime: tcomb.String,
            key: tcomb.String
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
                        type={this.getType()}
                        options={options}
                        startValue={this.getFormValue()}
                        buttons={[
                            {
                                title: SAVE_BUTTON_NAME,
                                action: async (systemData) => {
                                    await this.save(systemData.key)
                                }
                            }
                        ]}
                    />
                </View>
                <View
                    style={styles.buttonsContainer}
                >
                    <View
                        style={styles.buttonContainer}
                    >
                        <Button
                            buttonStyle={styles.buttonStyle}
                            title={'Reset storage'}
                            backgroundColor={Theme.mainColor}
                            onPress={() => {
                                showOkCancelDialogAsync(
                                    'Reset storage',
                                    `You want to reset the storage to the last sync. Are you sure?`,
                                    () => this.resetStorage(),
                                    'Yes, I do',
                                );
                            }}
                        />
                    </View>
                    <View
                        style={styles.buttonContainer}
                    >
                        <Button
                            disabled={this.state.isSyncNow}
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