import {StyleSheet} from 'react-native';
import {Theme} from '../theme';

module.exports = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 1,
        paddingTop: 0,
        paddingBottom: 0,
        borderColor: Theme.borderColor,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderWidth: 0,
        alignItems: 'center',
        paddingLeft: Theme.mainPaddingLeft,
    },
    avatarContainer: {
      flex:1
    },
    titleContainer: {
        flex: 3,
        alignItems: 'center',
        justifyContent : 'center',
    },
    editContainer: {
        marginLeft: 'auto',
        flexDirection: 'row',
        alignItems: 'center'
    }
});