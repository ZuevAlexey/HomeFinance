import {StyleSheet, StatusBar} from "react-native";
import {Theme} from "../theme";

module.exports = StyleSheet.create({
    container: {
        backgroundColor: Theme.mainColor
    },
    headerContainer: {
        marginTop: StatusBar.currentHeight,
        borderWidth:1,
        backgroundColor: 'white',
        borderColor: Theme.borderColor,
        borderLeftColor: Theme.borderColor,
        borderRightColor: Theme.borderColor,
        borderBottomColor: Theme.borderColor
    },
    headerBody: {
        flex:5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    headerRight: {
        flex:2
    },
    contentContainer: {
        borderWidth:1,
        borderColor: Theme.borderColor,
        flex:1,
        alignContent: 'center',
        justifyContent: 'center'
    },
    titleText: {
        textAlign: 'center',
        fontSize: 30,
        color: Theme.mainColor
    }
});