import Actions from '../actions';
import {CollectionReduce} from './collectionReduce';
import StateBranches from '../branches';

export const reduce = (state, action) => {
    switch(action.type){
        case Actions.SYNC:{
            let newState = {};
            StateBranches.forEach(branchName => {
                newState[branchName]= CollectionReduce(state[branchName], action, branchName);
            });

            return newState;
        }
        default:{
            return state;
        }
    };
};