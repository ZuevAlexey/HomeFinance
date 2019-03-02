import {ActionName} from '../../constants/actionName';
import {defaultState} from '../defaultState';
import {withNullCheck} from '../../helpers/maybe';

export const SystemDataReducer = (state = {}, action) => {
    switch(action.type){
        case ActionName.EDIT_SYSTEM_DATA: {
            return {
                lastSynchronizationTime: state.lastSynchronizationTime,
                serverAddress: action.serverAddress
            };
        }
        case ActionName.SYNCHRONIZATION: {
            return {
                lastSynchronizationTime: action.data.systemData.lastSynchronizationTime,
                serverAddress: state.serverAddress
            };
        }
        case ActionName.RESET_STORAGE: {
            return withNullCheck(action.syncData, e => e.systemData, defaultState.systemData);
        }
        default:
            return state;
    }
};