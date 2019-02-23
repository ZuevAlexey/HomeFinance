import Actions from "../actions";
import {ItemReduce} from "../reducers/ItemReduce";

export const CollectionReduce = (state, action, collectionName) => {
    switch(action.type){
        case Actions.SYNC:{
            let collectionDiff = action.data[collectionName];
            if(collectionDiff === undefined || collectionDiff.length === undefined || collectionDiff.length === 0){
                return state;
            }

            let newState = state.map(e => {
                return ItemReduce(e, action, collectionName);
            });

            let curentIds = newState.map(e => e.id).reduce((acc, el) => {
                acc[el] = true;
                return acc
            }, {});

            let newElements = collectionDiff.filter(e => curentIds[e.id] !== true);
            newState = newState.concat(newElements);
            return newState;
        }
        default:{
            return state;
        }
    };
};