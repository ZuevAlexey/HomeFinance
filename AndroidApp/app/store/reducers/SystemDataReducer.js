import {ActionName} from "../../constants/actionName";

export const SystemDataReducer = (state = {}, action) => {
    switch(action.type){
        case ActionName.SINCHRONIZATION:
            return {
                lastSinchronizationTime : action.lastSinchronizationTime
            };
        default:
            return state;
    }
}