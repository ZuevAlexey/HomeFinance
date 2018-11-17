import {Alert} from "react-native";

export const showOkCancelDialog = (title, message, okTitle, cancelTitle, onOkPress) => {
    Alert.alert(
        title,
        message,
        [
            {text: cancelTitle ? cancelTitle : 'Cancel'},
            {text: okTitle ? okTitle : 'Ok', onPress: () => onOkPress()}
        ],
        { cancelable: true }
    );
};