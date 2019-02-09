import {isNullOrUndefined} from "./maybe";

export const resetState = (state, date, defaultState) => {
    if(isNullOrUndefined(date)){
        return defaultState;
    }

    return state.filter(e => e.lastModificationTime < date);
};