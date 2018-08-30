import ActionName from '../../constants/ActionName';
import uuid from 'uuid-v4';

export default AddTransaction = (fromId, toId, articleId, amount, description, date) => {
    return {
        type : ActionName.ADD_TRANSACTION,
        id: uuid(),
        fromId,
        toId,
        articleId,
        amount,
        description,
        date
    }
}