import {ActionName} from "../../constants/actionName";

export const SystemDataReducer = (state = {}, action) => {
    switch(action.type){
        case ActionName.SYNCHRONIZATION:
            return {
                ...state,
                lastSinchronizationTime : action.lastSinchronizationTime
            };
        case ActionName.EDIT_SYSTEM_DATA:
            return {
                ...state,
                serverAddress: action.serverAddress
            }
        default:
            return state;
    }
}