import {ActionName} from "../../constants/actionName";

function processTransactionAction(state, action, amountModifier) {
    let result = {
        ...state,
        lastModificationTime: action.lastModificationTime
    };

    if(amountModifier !== null){
        result.amount = amountModifier(state, action);
    }

    return result;
}

const processAddTransaction = (state, action) => {
    let amountModifier = null;
    if (state.id === action.toId) {
        amountModifier = (s,a) => s.amount + a.amount;
    }

    if (state.id === action.fromId) {
        amountModifier = (s,a) => s.amount - a.amount;
    }

    return processTransactionAction(state, action, amountModifier);
};

const processMarkDeleteTransaction = (state, action) => {
    let amountModifier = null;
    if (state.id === action.toId) {
        amountModifier = (s,a) => s.amount - a.amount;
    }

    if (state.id === action.fromId) {
        amountModifier = (s,a) => s.amount + a.amount;
    }

    return processTransactionAction(state, action, amountModifier);
};

const processEditTransaction = (state, action) => {
    let amountModifier = (s, a) => {
        let result = s.amount;
        if(a.oldToId === s.id){
            result -= a.oldAmount;
        }

        if(a.oldFromId === s.id){
            result += a.oldAmount;
        }

        if(a.toId === s.id){
            result += a.amount;
        }

        if(a.fromId === s.id){
            result -= a.amount;
        }

        return result;
    };

    return processTransactionAction(state, action, amountModifier);
};

export const MoneyCellReducer = (state = {}, action) => {
    switch(action.type){
        case ActionName.EDIT_MONEY_CELL:
            return action.id === state.id ? {
                ...state,
                name: action.name,
                status: action.status,
                lastModificationTime: action.lastModificationTime
            } : state;
        case ActionName.MARK_DELETE_MONEY_CELL:
            return action.id === state.id ? {
                ...state,
                isDeleted: true,
                lastModificationTime: action.lastModificationTime
            } : state;
        case ActionName.ADD_TRANSACTION:
            return processAddTransaction(state, action);
        case ActionName.EDIT_TRANSACTION:
            return processEditTransaction(state, action);
        case ActionName.MARK_DELETE_TRANSACTION:
            return processMarkDeleteTransaction(state, action);
        default:
            return state;
    }
};