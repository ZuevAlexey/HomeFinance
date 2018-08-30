import ActionName from '../../constants/ActionName';

export default DeleteTransaction = (id) => {
    return {
        type : ActionName.DELETE_TRANSACTION,
        id
    }
}