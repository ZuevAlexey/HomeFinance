import ActionName from '../../constants/ActionName';

export default DeletePerson = (id) => {
    return {
        type : ActionName.DELETE_PERSON,
        id
    }
}