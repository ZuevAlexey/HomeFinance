import {ActionName} from '../../constants/actionName';

export const EditPerson = (id, lastName, firstName, sex) => {
    return {
        type : ActionName.EDIT_PERSON,
        id,
        lastName,
        firstName,
        sex,
        lastModificationTime: new Date()
    }
}