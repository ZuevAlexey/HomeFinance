import {ActionName} from '../../constants/actionName';

export const EditSystemData = (newKey, gDriveEnv) => {
    return {
        type: ActionName.EDIT_SYSTEM_DATA,
        key: newKey,
        gDriveEnv: gDriveEnv
    }
};