import {ActionName} from '../../constants/actionName';
import {isNullOrUndefined} from '../../helpers/maybe';
import {MoneyCellStatus} from "../../constants/moneyCellStatus";

export const MoneyCellReducer = (state = {}, action) => {
    switch (action.type) {
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
        case ActionName.CLOSE_MONEY_CELL:
            return action.id === state.id ? {
                ...state,
                status: MoneyCellStatus.INACTIVE,
                lastModificationTime: action.lastModificationTime
            } : state;
        case ActionName.MARK_DELETE_PERSON:
            return action.moneyCellsIdsSet.has(state.id) ? {
                ...state,
                lastModificationTime: action.lastModificationTime,
                isDeleted: true
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

function processTransactionAction(state, action, amountModifier) {
    if (isNullOrUndefined(amountModifier)) {
        return state;
    }

    return {
        ...state,
        amount: amountModifier(state, action),
        lastModificationTime: action.lastModificationTime
    };
}

const processAddTransaction = (state, action) => {
    let amountModifier = null;
    if (state.id === action.toId) {
        amountModifier = (s, a) => s.amount + a.amount;
    }

    if (state.id === action.fromId) {
        amountModifier = (s, a) => s.amount - a.amount;
    }

    return processTransactionAction(state, action, amountModifier);
};

const processMarkDeleteTransaction = (state, action) => {
    let amountModifier = null;
    if (state.id === action.toId) {
        amountModifier = (s, a) => s.amount - a.amount;
    }

    if (state.id === action.fromId) {
        amountModifier = (s, a) => s.amount + a.amount;
    }

    return processTransactionAction(state, action, amountModifier);
};

const processEditTransaction = (state, action) => {
    let amountModifier = null;
    if (action.oldToId === state.id || action.oldFromId === state.id || action.toId === state.id || action.fromId === state.id) {
        amountModifier = (s, a) => {
            let result = s.amount;

            if (a.oldToId === s.id) {
                result -= a.oldAmount;
            }

            if (a.oldFromId === s.id) {
                result += a.oldAmount;
            }

            if (a.toId === s.id) {
                result += a.amount;
            }

            if (a.fromId === s.id) {
                result -= a.amount;
            }

            return result;
        };
    }

    return processTransactionAction(state, action, amountModifier);
};