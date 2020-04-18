import {ActionName} from '../../constants/actionName';

export const MarkDeletePerson = (id, moneyCellsIdsSet) => {
    return {
        type: ActionName.MARK_DELETE_PERSON,
        id,
        moneyCellsIdsSet,
        lastModificationTime: new Date()
    }
};