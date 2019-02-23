import {StyleSheet} from "react-native";
import {Theme} from '../theme';

module.exports = StyleSheet.create({
    container: {
        justifyContent : 'center',
        flex: 1
    },
    buttonContainer: {
        height: 80,
        marginTop: 1,
        borderTopWidth: 1,
        borderWidth: 0,
        alignItems: 'center',
        justifyContent : 'center'
    },
    listContainer: {
        flex: 1,
        borderTopWidth: 1,
        borderWidth: 0,
        borderTopColor: Theme.borderColor,
    }
});