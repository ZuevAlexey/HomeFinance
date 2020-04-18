import {ActionName} from '../../constants/actionName';
import {defaultState} from '../defaultState';
import {withNullCheck} from '../../helpers/maybe';

export const SystemDataReducer = (state = {}, action) => {
    switch(action.type){
        case ActionName.EDIT_SYSTEM_DATA: {
            return {
                ...state,
                credentials: action.credentials,
                token: action.token,
                gDriveEnv: action.gDriveEnv
            };
        }
        case ActionName.SYNCHRONIZATION: {
            return {
                ...state,
                lastSynchronizationTime: action.data.main.systemData.lastSynchronizationTime
            };
        }
        case ActionName.RESET_STORAGE: {
            return withNullCheck(action.resetData, e => e.main.systemData, {...defaultState.main.systemData, serverAddress: state.serverAddress});
        }
        default:
            return state;
    }
};