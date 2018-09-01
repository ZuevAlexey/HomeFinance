import {ActionName} from '../../constants/ActionName';

export const DeletePerson = (id) => {
    return {
        type : ActionName.DELETE_PERSON,
        id
    }
}