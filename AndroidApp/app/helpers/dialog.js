import {Alert} from 'react-native';
import {isNullOrUndefined} from './maybe';

export const showOkCancelDialog = (title, message, onOkPress, okTitle, cancelTitle) => {
    Alert.alert(
        title,
        message,
        [
            {text: cancelTitle ? cancelTitle : 'Cancel'},
            {
                text: okTitle ? okTitle : 'Ok', onPress: () => {
                    if (isNullOrUndefined(onOkPress)) {
                        return;
                    }
                    onOkPress()
                }
            }
        ],
        {cancelable: true}
    );
};

export const showMessage = (title, message, okAction) => {
    Alert.alert(title, message, [{text: 'Ok', onPress: () => okAction && okAction()}]);
};

export const debugObject = (object) => {
    showMessage('', JSON.stringify(object));
};

export const debugObjectAsync = (object) => {
    return new Promise((resolve, reject) => {
        Alert.alert('', JSON.stringify(object), [
            {text: 'OK', onPress: () => resolve('YES')},
        ], {cancelable: false})
    })
};