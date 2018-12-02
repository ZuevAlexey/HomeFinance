import React from 'react';
import {Text, Alert, StyleSheet} from "react-native";
import {Screen} from "../../components/screen/screen";
import {View} from "native-base";
import {Theme} from "../../components/theme";
import {Button} from "react-native-elements";
import {EditMoneyCell} from "../../store/actions/editMoneyCell";
import {MarkDeleteMoneyCell} from "../../store/actions/markDeleteMoneyCell";
import {connect} from "react-redux";
import {AddMoneyCell} from "../../store/actions/addMoneyCell";

const CONNECTION_STATUS = {
    OK: 'OK',
    UNKNOWN: 'UNKNOWN',
    FAILED: 'FAILED'
};

class SynchronizationScreen extends React.Component {
    constructor(props){
        super(props);
        this.testConnection = this.testConnection.bind(this);
        this.synchronization = this.synchronization.bind(this);
        this.state = {
            connectionStatus: CONNECTION_STATUS.UNKNOWN,
            json: ''
        }
    }


    async testConnection(serverAddress){
        try{
            let response = await fetch(serverAddress + '/api/test');
            let json = await response.json();
            this.setState({json: JSON.stringify(json), connectionStatus: CONNECTION_STATUS.OK});
        } catch (error){
            this.setState({connectionStatus: CONNECTION_STATUS.FAILED})
        }
    };

    async synchronization(serverAddress){
        try {
            let response = await fetch(serverAddress + '/api/action', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    type: 'sync',
                    data: {
                        systemData: {
                            lastSynchronizationTime: this.props.systemData.lastSynchronizationTime
                        },
                        people: this.props.people,
                        moneyCells: this.props.moneyCells,
                        transactions: this.props.transactions
                    }
                })
            });

            let json = await response.json();
            
            this.setState({
                json: JSON.stringify(json),
                connectionStatus: CONNECTION_STATUS.OK
            });
        } catch (error) {
            this.setState({
                connectionStatus: CONNECTION_STATUS.FAILED,
                json: JSON.stringify(error.stack)
            })
        }
    }

    render() {
        let {systemData} = this.props;
        let {serverAddress} = systemData;
        return (
            <Screen
                {...this.props}
                headerTitle='Synchronization'
            >
                <View style={styles.container}>
                    <Text>{serverAddress}</Text>
                    <Text>{systemData.lastSynchronizationTime}</Text>
                    <Text>{this.state.connectionStatus}</Text>
                    <Text>{this.state.json}</Text>
                    <View style={styles.buttonContainer} >
                        <Button
                            title={'Test connection'}
                            backgroundColor={Theme.mainColor}
                            onPress={() => this.testConnection(serverAddress)}
                        />
                    </View>
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
        add: (moneyCell) => {
            dispatch(AddMoneyCell(moneyCell.ownerId, moneyCell.moneyCellType, moneyCell.name, moneyCell.status, moneyCell.amount, moneyCell.isValid, moneyCell.startDate,
                moneyCell.endDate, moneyCell.roi, moneyCell.parentId))
        },
        save: (moneyCell) => {
            dispatch(EditMoneyCell(moneyCell.id, moneyCell.name, moneyCell.status))
        },
        delete: (moneyCell) => {
            dispatch(MarkDeleteMoneyCell(moneyCell.id))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SynchronizationScreen)