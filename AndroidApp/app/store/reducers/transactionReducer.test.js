import {ActionName} from '../../constants/actionName';
import {TransactionReducer} from './transactionReducer';
import {EditTransaction} from '../actions/editTransaction';
import {AssertUnprocessedActions} from '../../helpers/testHelper';
import {MarkDeleteTransaction} from '../actions/markDeleteTransaction';

const startState = {
    id: 1,
    fromId: 1,
    toId: 2,
    articleId: 100,
    amount: 1500,
    date: new Date(2018, 8, 1, 14, 55),
    description: 'Оплата комуналки',
    isValid: true
};

const processedActions = [
    ActionName.EDIT_TRANSACTION,
    ActionName.MARK_DELETE_TRANSACTION,
    ActionName.MARK_DELETE_MONEY_CELL,
    ActionName.MARK_DELETE_PERSON
];

AssertUnprocessedActions(processedActions, 'Transaction', TransactionReducer);

const lastModificationTime = new Date();

it(`Transaction reducer process action ${ActionName.EDIT_TRANSACTION}`, () => {
    const id = 1;
    const fromId = 23;
    const toId = 78;
    const articleId = 340;
    const amount = 3000;
    const description = 'зарплата';
    const date = new Date(2018, 10, 10);
    const action = EditTransaction(id, fromId, toId, articleId, amount, description, date);
    action.lastModificationTime = lastModificationTime;
    expect(TransactionReducer(startState, action))
        .toEqual({id, fromId, toId, articleId, amount, description, date, isValid: true, lastModificationTime});
});

it(`Transaction reducer don\'t process action ${ActionName.EDIT_TRANSACTION}`, () => {
    expect(TransactionReducer(startState, EditTransaction(2, 34, 45, 234, 300, 'оплата', null, true)))
        .toBe(startState);
});

it(`Transactions reducer process action ${ActionName.MARK_DELETE_TRANSACTION}`, () => {
    let action = MarkDeleteTransaction(1);
    action.lastModificationTime = lastModificationTime;
    expect(TransactionReducer(startState, action))
        .toEqual({...startState, isDeleted: true, lastModificationTime});
});

it(`Transactions reducer don't process action ${ActionName.MARK_DELETE_TRANSACTION}`, () => {
    expect(TransactionReducer(startState, MarkDeleteTransaction(2, null, null, null)))
        .toBe(startState);
});