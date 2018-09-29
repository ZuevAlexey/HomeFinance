import {ActionName} from "../../constants/actionName";
import {MoneyCellReducer} from './moneyCellReducer';

export const MoneyCellsReducer = (state = [], action) => {
    switch(action.type){
        case ActionName.EDIT_MONEY_CELL:
        case ActionName.MARK_DELETE_MONEY_CELL:
            return state.map(e => MoneyCellReducer(e, action));
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
                    roi: action.roi,
                    lastModificationTime: action.lastModificationTime
                }
            ];
        default:
            return state;
    }
}