import {StyleSheet} from "react-native";
import {Theme} from '../theme';

module.exports = StyleSheet.create({
    container: {
        justifyContent : 'center',
        flex: 1,
        borderWidth:1,
        borderTopColor: Theme.borderColor
    },
    buttonContainer: {
        flex: 1,
        borderWidth:1,
        borderTopColor: Theme.borderColor,
        borderColor: Theme.noBorderColor,
        alignItems: 'center',
        justifyContent : 'center'
    },
    listContainer: {
        flex:7
    }
});