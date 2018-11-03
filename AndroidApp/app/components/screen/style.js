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
        borderLeftColor: Theme.noBorderColor,
        borderRightColor: Theme.noBorderColor,
        borderBottomColor: Theme.noBorderColor
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
        flex:1
    },
    titleText: {
        textAlign: 'center',
        fontSize: 30,
        color: Theme.mainColor
    }
});