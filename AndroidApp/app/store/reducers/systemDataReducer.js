import {ActionName} from '../../constants/actionName';
import {defaultState} from '../defaultState';
import {withNullCheck} from '../../helpers/maybe';

export const SystemDataReducer = (state = {}, action) => {
    switch (action.type) {
        case ActionName.EDIT_SYSTEM_DATA: {
            return {
                ...state,
                key: action.key,
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
            return withNullCheck(action.resetData, e => e.main.systemData, {
                ...defaultState.main.systemData,
                key: state.key,
                gDriveEnv: state.gDriveEnv
            });
        }
        default:
            return state;
    }
};