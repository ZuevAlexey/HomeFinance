import {ActionName} from "../../constants/actionName";
import {MoneyCellReducer} from './moneyCellReducer';
import {synchronize} from "../../helpers/synchronizationHelper";
import {defaultState} from "../defaultState";

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
                    lastModificationTime: action.lastModificationTime,
                    creationTime: action.creationTime,
                    isDeleted: false
                }
            ];
        case ActionName.SYNCHRONIZATION:
            return synchronize(state, action.data.moneyCells);
        case ActionName.RESET_STORAGE:
            return defaultState.moneyCells;
        default:
            return state;
    }
};