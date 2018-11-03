import {StyleSheet} from "react-native";
import {Theme} from "../theme";

module.exports = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row'
    },
    avatar: {
        flex: 1
    },
    titleContainer: {
        flex: 4,
        alignContent: 'center',
        justifyContent: 'center'
    },
    titleText: {
        textAlign: 'center',
        fontSize: 30,
        color: Theme.mainColor
    },
    statusContainer: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center'
    }
});