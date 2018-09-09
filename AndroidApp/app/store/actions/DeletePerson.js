import {ActionName} from '../../constants/actionName';

export const DeletePerson = (id) => {
    return {
        type : ActionName.DELETE_PERSON,
        id
    }
}