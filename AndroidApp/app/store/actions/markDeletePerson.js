import {ActionName} from '../../constants/actionName';

export const MarkDeletePerson = (id) => {
    return {
        type : ActionName.MARK_DELETE_PERSON,
        id,
        lastModificationTime: new Date()
    }
};