import {ActionName} from "../../constants/actionName";
import {defaultState} from "../defaultState";
import {resetState} from "../../helpers/resetStorageHelper";
import {isNullOrUndefined} from "../../helpers/maybe";

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
            return isNullOrUndefined(action.syncDate)
                ? defaultState.systemData
                : {
                    lastSynchronizationTime: action.syncDate,
                    serverAddress: state.serverAddress
                }
        }
        default:
            return state;
    }
};