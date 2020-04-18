import {ActionName} from '../../constants/actionName';

export const EditSystemData = (newToken, newCredentials, gDriveEnv) => {
    return {
        type : ActionName.EDIT_SYSTEM_DATA,
        token: newToken,
        credentials: newCredentials,
        gDriveEnv: gDriveEnv
    }
};