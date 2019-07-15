import Actions from "../actions";
import {ItemReduce} from "../reducers/ItemReduce";

export const CollectionReduce = (state, action, collectionName, requestTime) => {
    switch(action.type){
        case Actions.SYNC:{
            let collectionDiff = action.data[collectionName];
            if(collectionDiff === undefined || collectionDiff.length === undefined || collectionDiff.length === 0){
                return state;
            }

            let currentIds = {};
            let newState = [];
            state.forEach(e => {
                newState.push(ItemReduce(e, action, collectionName, requestTime));
                currentIds[e.id] = true;
            });

            collectionDiff.forEach(e => {
                if(currentIds[e.id] !== true){
                    e.lastModificationTime = requestTime;
                    newState.push(e);
                }
            });

            return newState;
        }
        default:{
            return state;
        }
    };
};