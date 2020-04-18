export const mergeItem = (state, action, collectionName, requestTime) => {
    let newState = action[collectionName].find(e => e.id === state.id);
    if(newState === undefined){
        return state;
    }

    //deep copy
    newState = {...newState};

    if (newState.lastModificationTime === undefined || state.lastModificationTime > newState.lastModificationTime) {
        return state;
    }

    newState.lastModificationTime = requestTime;

    return newState;
};