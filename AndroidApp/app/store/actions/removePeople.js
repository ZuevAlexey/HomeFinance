import {ActionName} from '../../constants/actionName';

export const RemovePeople = (ids) => {
    return {
        type : ActionName.REMOVE_PEOPLE,
        ids: new Set(ids)
    }
};