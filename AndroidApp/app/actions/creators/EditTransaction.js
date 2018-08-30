import ActionName from '../../constants/ActionName';

export default EditTransaction = (id, fromId, toId, articleId, amount, description, date) => {
    return {
        type : ActionName.EDIT_MONEY_CELL,
        id,
        fromId,
        toId,
        articleId,
        amount,
        description,
        date
    }
}