import Actions from "../actions";
import {ItemReduce} from "../reducers/ItemReduce";

export const CollectionReduce = (state, action, collectionName) => {
    switch(action.type){
        case Actions.SYNC:{
            let collectionDiff = action.data[collectionName];
            if(collectionDiff === undefined || collectionDiff.length === undefined || collectionDiff.length === 0){
                return state;
            }

            return state.map(e => {
                return ItemReduce(e, action, collectionName);
            })
        }
        default:{
            return state;
        }
    };
};