import {ActionName} from "../../constants/actionName";

export const SystemDataReducer = (state = {}, action) => {
    switch(action.type){
        case ActionName.EDIT_SYSTEM_DATA:
            return {
                ...state,
                serverAddress: action.serverAddress,
                lastSynchronizationTime: action.lastSynchronizationTime
            }
        default:
            return state;
    }
}