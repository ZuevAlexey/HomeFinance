import {ActionName} from '../../constants/actionName';

export const EditSystemData = (lastSynchronizationTime, serverAddress) => {
    return {
        type : ActionName.EDIT_SYSTEM_DATA,
        serverAddress,
        lastSynchronizationTime
    }
};