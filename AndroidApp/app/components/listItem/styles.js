import {StyleSheet} from "react-native";
import {Theme} from "../theme";

module.exports = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 1,
        paddingTop: 0,
        paddingBottom: 0,
        borderTopColor: Theme.borderColor,
        borderBottomColor: Theme.borderColor,
        borderColor: Theme.noBorderColor,
        borderWidth: 1,
        alignItems: 'center',
    },
    avatarContainer:{
        flex: 1
    },
    titleContainer: {
        flex: 3,
        alignItems: 'center',
        justifyContent : 'center'
    },
    editContainer: {
        marginLeft: 'auto',
        flexDirection: 'row',
        alignItems: 'center'
    }
});