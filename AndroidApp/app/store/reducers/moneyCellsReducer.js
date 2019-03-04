import {ActionName} from '../../constants/actionName';
import {MoneyCellReducer} from './moneyCellReducer';
import {synchronize} from '../../helpers/synchronizationHelper';
import {defaultState} from '../defaultState';
import {withNullCheck} from '../../helpers/maybe';

export const MoneyCellsReducer = (state = [], action) => {
    switch(action.type){
        case ActionName.EDIT_MONEY_CELL:
        case ActionName.MARK_DELETE_MONEY_CELL:
        case ActionName.ADD_TRANSACTION:
        case ActionName.EDIT_TRANSACTION:
        case ActionName.MARK_DELETE_TRANSACTION:
        case ActionName.MARK_DELETE_PERSON:
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
            return synchronize(state, action.data.main.moneyCells);
        case ActionName.RESET_STORAGE:
            return withNullCheck(action.resetData, e => e.main.moneyCells, defaultState.main.moneyCells);
        default:
            return state;
    }
};