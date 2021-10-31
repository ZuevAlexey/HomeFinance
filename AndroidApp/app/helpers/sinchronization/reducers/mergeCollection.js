import {mergeItem} from "./mergeItem";

export const mergeCollection = (fullState, action, collectionName, requestTime) => {
    let state = fullState[collectionName];
    let collectionDiff = action[collectionName];
    if (collectionDiff === undefined || collectionDiff.length === undefined || collectionDiff.length === 0) {
        return state;
    }

    let currentIds = {};
    let newState = [];
    state.forEach(e => {
        newState.push(mergeItem(e, action, collectionName, requestTime));
        currentIds[e.id] = true;
    });

    collectionDiff.forEach(e => {
        if (currentIds[e.id] !== true) {
            //deep copy
            e = {...e};
            e.lastModificationTime = requestTime;
            newState.push(e);
        }
    });

    return newState;
};