import {ActionName} from '../../constants/actionName';
import uuid from 'uuid-v4';

export const AddPerson = (lastName, firstName, sex) => {
    return {
        type : ActionName.ADD_PERSON,
        id : uuid(),
        lastName,
        firstName,
        sex,
        lastModificationTime: new Date(),
        creationTime: new Date(),
        isDeleted: false
    }
};