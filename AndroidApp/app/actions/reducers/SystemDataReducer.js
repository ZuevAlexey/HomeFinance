import {ActionName} from "../../constants/ActionName";

export const SystemDataReducer = (state, action) => {
    switch(action.type){
        case ActionName.SINCHRONIZATION:
            return {
                lastSinchronizationTime : action.sinchronizationDate
            };
        default:
            return state;
    }
}