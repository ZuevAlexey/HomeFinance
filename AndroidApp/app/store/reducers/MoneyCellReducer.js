import {ActionName} from "../../constants/actionName";

export const MoneyCellReducer = (state = {}, action) => {
    switch(action.type){
        case ActionName.EDIT_MONEY_CELL:
            return action.id === state.id ? {
                ...state,
                name: action.name,
                status: action.status,
                lastModificationTime: action.lastModificationTime
            } : state;
        case ActionName.ADD_TRANSACTION:
            return processAddTransaction(state, action);
        case ActionName.DELETE_TRANSACTION:
            return processDeleteTransaction(state, action);
        case ActionName.EDIT_TRANSACTION:
            return processEditTransaction(state, action);
        default:
            return state;
    }
}

const processTransaction = (state, action, shouldProcess, amountProcessor) => {
    if(!shouldProcess(state, action)){
        return state;
    }

    return {
        ...state,
        amount: amountProcessor(state, action),
        lastModificationTime: action.lastModificationTime
    }
}

const addDeleteTransactionShouldProcess = (state, action) => {
    return action.toId === state.id || action.fromId === state.id;
}

const processAddTransaction = (state, action) => {
    const amountProcessor = (s, a) => a.toId === s.id ?
        s.amount + a.amount 
        : s.amount - a.amount;

    return processTransaction(state, action, addDeleteTransactionShouldProcess, amountProcessor);
}

const processDeleteTransaction = (state, action) => {
    const amountProcessor = (s, a) => a.toId === s.id ?
        s.amount - a.amount 
        : s.amount + a.amount;

    return processTransaction(state, action, addDeleteTransactionShouldProcess, amountProcessor);
}

const editTransactionShouldProcess = (state, action) => {
    let result = action.oldToId === state.id ||
            action.oldFromId === state.id || 
            action.newToId === state.id ||
            action.newFromId === state.id;
    return result;
}

const processEditTransaction = (state, action) => {
    const amountProcessor = (s, a) => {
        let newAmount = s.amount;
        if(a.oldFromId === s.id){
            newAmount += a.oldAmount;
        }
        
        if(a.oldToId === s.id){
            newAmount -= a.oldAmount;
        }

        if(a.newFromId === s.id){
            newAmount -= a.newAmount;
        }

        if(a.newToId === s.id){
            newAmount += a.newAmount;
        }
        
        return newAmount;
    };

    return processTransaction(state, action, editTransactionShouldProcess, amountProcessor);
}