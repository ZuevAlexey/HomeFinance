import {StyleSheet} from "react-native";
import {Theme} from "../theme";

module.exports = StyleSheet.create({
    container: {
        flexDirection:'row',
        paddingTop:0,
        paddingBottom:0,
        borderTopColor: Theme.borderColor,
        borderColor: 'white',
        borderWidth: 1,
        alignItems: 'center'
    },
    editContainer: {
        marginLeft:'auto',
        flexDirection: 'row',
        alignItems: 'center'
    },
    titleContainer: {
        alignItems: 'center',
        justifyContent : 'center',
        marginLeft: 10
    }
});