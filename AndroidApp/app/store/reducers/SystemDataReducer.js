import {ActionName} from "../../constants/actionName";

export const SystemDataReducer = (state = {}, action) => {
    switch(action.type){
        case ActionName.EDIT_SYSTEM_DATA:
            return {
                lastSynchronizationTime: state.lastSynchronizationTime,
                serverAddress: action.serverAddress
            };
        case ActionName.SYNCHRONIZATION: {
            return {
                lastSynchronizationTime: action.data.systemData.lastSynchronizationTime,
                serverAddress: state.serverAddress
            };
        }
        default:
            return state;
    }
};