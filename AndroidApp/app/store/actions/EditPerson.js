import {ActionName} from '../../constants/ActionName';

export const EditPerson = (id, lastName, firstName, sex) => {
    return {
        type : ActionName.EDIT_PERSON,
        id,
        lastName,
        firstName,
        sex
    }
}