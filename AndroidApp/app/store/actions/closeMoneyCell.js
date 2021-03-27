import {ActionName} from '../../constants/actionName';

export const CloseMoneyCell = (id) => {
    return {
        type: ActionName.CLOSE_MONEY_CELL,
        id,
        lastModificationTime: new Date()
    }
};