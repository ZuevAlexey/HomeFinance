import React from 'react';
import {Text, StyleSheet, ScrollView} from 'react-native';
import {Screen} from '../../components/screen/screen';
import {View} from 'native-base';
import {connect} from 'react-redux';
import {Button} from 'react-native-elements';
import Theme from '../../components/theme';
import {ResetStorage} from '../../store/actions/resetStorage';
import {initializeGDriveEnvironment, getFileContent, createFile, updateFile} from "../../helpers/sinchronization/gdrive/gdriveConnector";

class TestScreen extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <Screen
                {...this.props}
                headerTitle='Test'
            >
                <ScrollView>
                    <View style={styles.container}>
                        <Text>{JSON.stringify(this.props.state.main.systemData, null, 2)}</Text>
                    </View>
                </ScrollView>
                <View
                    style={styles.buttonContainer}
                >
                    <Button
                        title={'Test button'}
                        buttonStyle = {Theme.mainButtonStyle}
                        onPress={async () => {
                            let gdriveEnv = await initializeGDriveEnvironment("HomeFinance", "Backup", "State.txt", () => "test data");
                            getFileContent(gdriveEnv.fileId);
                            let backFile = await (await createFile(gdriveEnv.backupFolderId, "backupfile" + new Date().toISOString() + ".txt", "backup content")).json();
                            updateFile(backFile.id, "restore backup content")
                        }}
                    />
                </View>
            </Screen>
        );
    }
}

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
    state: state
});

const mapDispatchToProps = dispatch => ({
    resetStore: () => dispatch(ResetStorage(undefined))
});

export default connect(mapStateToProps, mapDispatchToProps)(TestScreen)