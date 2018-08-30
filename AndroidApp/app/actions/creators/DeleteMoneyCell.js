import ActionName from '../../constants/ActionName';

export default DeleteMoneyCell = (id) => {
    return {
        type : ActionName.DELETE_MONEY_CELL,
        id
    }
}