import {ActionName} from '../../constants/actionName';

export const EditSystemData = (serverAddress) => {
    return {
        type : ActionName.EDIT_SYSTEM_DATA,
        serverAddress
    }
};