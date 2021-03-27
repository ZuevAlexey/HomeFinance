import {Alert} from 'react-native';
import {DIALOG_RESULT_CANCEL, DIALOG_RESULT_YES} from "../constants/dialogResult";

export const showOkCancelDialogAsync = (title, message, okTitle, cancelTitle) => {
    return new Promise((resolve, reject) => {
        Alert.alert(
            title,
            message,
            [
                {
                    text: cancelTitle ? cancelTitle : 'Cancel',
                    onPress: () => resolve(DIALOG_RESULT_CANCEL)
                },
                {
                    text: okTitle ? okTitle : 'Ok',
                    onPress: () => resolve(DIALOG_RESULT_YES)
                }
            ],
            {cancelable: false}
        );
    });
};

export const showMessageAsync = (title, message, okAction) => {
    return new Promise((resolve, reject) => {
        Alert.alert(title, message, [
                {
                    text: 'Ok',
                    onPress: () => {
                        okAction && okAction()
                        resolve(DIALOG_RESULT_YES)
                    }
                }],
            {cancelable: false}
        );
    });
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