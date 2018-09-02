import {ActionName} from "../../constants/ActionName";
import {MoneyCellReducer} from './MoneyCellReducer';

export const MoneyCellsReducer = (state, action) => {
    switch(action.type){
        case ActionName.EDIT_MONEY_CELL:
            return state.map(e => MoneyCellReducer(e, action));
        case ActionName.DELETE_MONEY_CELL:
            return state.filter(e => e.id !== action.id);
        case ActionName.ADD_MONEY_CELL:
            return [
                ...state,
                {
                    id: action.id,
                    ownerId: action.ownerId,
                    moneyCellType: action.moneyCellType,
                    amount: action.amount,
                    startDate: action.startDate,
                    endDate: action.endDate,
                    name: action.name,
                    status: action.status,
                    parentId: action.parentId,
                    isValid: action.isValid,
                    roi: action.roi
                }
            ];
        case ActionName.SINCHRONIZATION:
            return action.moneyCells;
        default:
            return state;
    }
}