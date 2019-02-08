import {Alert} from "react-native";
import {isNullOrUndefined} from "./maybe";

export const showOkCancelDialog = (title, message, onOkPress, okTitle, cancelTitle) => {
    Alert.alert(
        title,
        message,
        [
            {text: cancelTitle ? cancelTitle : 'Cancel'},
            {text: okTitle ? okTitle : 'Ok', onPress: () => {
                if(isNullOrUndefined(onOkPress)){
                    return;
                }
                onOkPress()
                }}
        ],
        { cancelable: true }
    );
};

export const showMessage = (title, message) => {
  Alert.alert(title, message);
};

export const debugObject = (object) => {
    showMessage('', JSON.stringify(object));
};