import {ActionName} from "../../constants/actionName";
import {TransactionsReducer} from "./transactionsReducer";
import {EditTransaction} from '../actions/editTransaction';
import {DeleteTransaction} from '../actions/deleteTransaction';
import {AddTransaction} from '../actions/addTransaction';
import {Synchronize} from '../actions/synchronize';
import {AssertUnprocessedActions} from '../../helpers/testHelper';

const trans1 = {
    id: 1,
    fromId: 1,
    toId: 2,
    articleId: 100,
    amount: 1500,
    date: new Date(2018, 8, 1, 14, 55),
    description: "Оплата комуналки",
    isValid: true
};
const trans2 = {
    id: 2,
    fromId: 4,
    toId: 1,
    articleId: 100500,
    amount: 70,
    date: new Date(2018, 9, 8, 14, 55),
    description: "Молоко",
    isValid: true
};
const trans3 = {
    id: 3,
    fromId: 1,
    toId: 2,
    articleId: 250,
    amount: 3700,
    date: new Date(2018, 8, 1, 14, 55),
    description: "Лечение зубов",
    isValid: false
};
const startState = [trans1, trans2, trans3];

const processedActions = [
    ActionName.ADD_TRANSACTION,
    ActionName.DELETE_TRANSACTION, 
    ActionName.EDIT_TRANSACTION,
    ActionName.SYNCHRONIZATION
];
AssertUnprocessedActions(processedActions, 'Transactions', TransactionsReducer);

const lastModificationTime = new Date();

it(`Transactions reducer process action ${ActionName.EDIT_TRANSACTION}`, () => {
    const id = 1;
    const fromId = 23;
    const toId = 78;
    const articleId = 340;
    const amount = 3000;
    const description = 'зарплата';
    const date = new Date(2018, 10, 10);
    const isValid = false;
    const action = EditTransaction(id, trans1.fromId, trans1.toId, fromId, toId, articleId, trans1.amount,
        amount, description, date, isValid);
    action.lastModificationTime = lastModificationTime;
    expect(TransactionsReducer(startState, action))
        .toEqual([{id, fromId, toId, articleId, amount, description, date, isValid, lastModificationTime}, trans2, trans3]);
});

it(`Transactions reducer don\'t process action ${ActionName.EDIT_TRANSACTION}`, () => {
    expect(TransactionsReducer(startState, EditTransaction(67, 34, 45, 234, 300, 'оплата', null, true)))
    .toEqual(startState);
});

it(`Transactions reducer process action ${ActionName.DELETE_TRANSACTION}`, () => {
    let action = DeleteTransaction(2, null, null, null);
    action.lastModificationTime = lastModificationTime;
    expect(TransactionsReducer(startState, action))
    .toEqual([trans1, {...trans2, isDeleted: true, lastModificationTime}, trans3]);
});

it(`Transactions reducer don\'t process action ${ActionName.DELETE_TRANSACTION}`, () => {
    expect(TransactionsReducer(startState, DeleteTransaction(5, null, null, null)))
    .toEqual(startState);
});

it(`Transactions reducer process action ${ActionName.ADD_TRANSACTION}`, () => {
    const stateLength = startState.length;
    const fromId = 23;
    const toId = 78;
    const articleId = 340;
    const amount = 3000;
    const description = 'зарплата';
    const date = new Date(2018, 10, 10);
    const isValid = true;
    const id = 1;
    const action = AddTransaction(fromId, toId, articleId, amount, description, date);
    action.lastModificationTime = lastModificationTime;
    action.id = id;
    const newTransaction = TransactionsReducer(startState, action)[stateLength];
    expect(newTransaction).toEqual({fromId, toId, articleId, amount, description, date, isValid, lastModificationTime, id});
});

it(`Transactions reducer process action ${ActionName.SYNCHRONIZATION}`, () => {
    const newTransactions = [{
        id: 56,
        fromId: 34,
        toId: 87,
        articleId: 2345,
        amount: 1807,
        date: new Date(2018, 8, 2, 1, 55),
        description: "Премия",
        isValid: true
        }, {
        id: 25,
        fromId: 45,
        toId: 2,
        articleId: 1004,
        amount: 890,
        date: new Date(2018, 9, 8, 14, 55),
        description: "Телефон",
        isValid: true
        }];
    
    const action = Synchronize(null, null, newTransactions, null, null);
    const newState = TransactionsReducer(startState, action);
    expect(newState).toBe(newTransactions);
});