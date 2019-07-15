import Actions from '../actions';
import {CollectionReduce} from './collectionReduce';
import StateBranches from '../branches';

export const reduce = (state, action, requestTime) => {
    switch(action.type){
        case Actions.SYNC:{
            let newState = {};
            StateBranches.forEach(branchName => {
                newState[branchName]= CollectionReduce(state[branchName], action, branchName, requestTime.toISOString());
            });

            return newState;
        }
        default:{
            return state;
        }
    };
};