import {ActionName} from '../../constants/actionName';
import uuid from 'uuid-v4';

export const AddPerson = (lastName, firstName, sex) => {
    let now = new Date();
    return {
        type : ActionName.ADD_PERSON,
        id : uuid(),
        lastName,
        firstName,
        sex,
        lastModificationTime: now,
        creationTime: now,
        isDeleted: false
    }
};