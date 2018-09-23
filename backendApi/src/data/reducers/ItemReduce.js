import Actions from "../actions";

export const ItemReduce = (state, action, collectionName) => {
    switch(action.type){
        case Actions.SYNC:{
            let newState = action.data[collectionName].find(e => e.id === state.id);
            if(newState === undefined || newState.lastModificationTime === undefined || state.lastModificationTime > newState.lastModificationTime){
                return state;
            }

            return newState;
        }
        default:{
            return state;
        }
    };
};