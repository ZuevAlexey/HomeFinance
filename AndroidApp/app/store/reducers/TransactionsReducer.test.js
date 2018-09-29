import {ActionName} from "../../constants/actionName";
import {TransactionsReducer} from "./transactionsReducer";
import {EditTransaction} from '../actions/editTransaction';
import {MarkDeleteTransaction} from '../actions/markDeleteTransaction';
import {AddTransaction} from '../actions/addTransaction';
import {AssertUnprocessedActions} from '../../helpers/testHelper';
import {RemoveTransactions} from "../actions/removeTransactions";

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
    ActionName.MARK_DELETE_TRANSACTION,
    ActionName.EDIT_TRANSACTION,
    ActionName.REMOVE_TRANSACTIONS
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
    const action = EditTransaction(id, fromId, toId, articleId, amount, description, date, isValid);
    action.lastModificationTime = lastModificationTime;
    expect(TransactionsReducer(startState, action))
        .toEqual([{id, fromId, toId, articleId, amount, description, date, isValid, lastModificationTime}, trans2, trans3]);
});

it(`Transactions reducer don\'t process action ${ActionName.EDIT_TRANSACTION}`, () => {
    expect(TransactionsReducer(startState, EditTransaction(67, 34, 45, 234, 300, 'оплата', null, true)))
    .toEqual(startState);
});

it(`Transactions reducer process action ${ActionName.MARK_DELETE_TRANSACTION}`, () => {
    let action = MarkDeleteTransaction(2);
    action.lastModificationTime = lastModificationTime;
    expect(TransactionsReducer(startState, action))
    .toEqual([trans1, {...trans2, isDeleted: true, lastModificationTime}, trans3]);
});

it(`Transactions reducer don\'t process action ${ActionName.MARK_DELETE_TRANSACTION}`, () => {
    expect(TransactionsReducer(startState, MarkDeleteTransaction(5)))
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


it(`Transactions reducer process action ${ActionName.REMOVE_TRANSACTIONS}`, () => {
    let action = RemoveTransactions([1,3]);
    expect(TransactionsReducer(startState, action))
        .toEqual([trans2]);
});

it(`Transactions reducer don\'t process action ${ActionName.REMOVE_TRANSACTIONS}`, () => {
    expect(TransactionsReducer(startState, RemoveTransactions([32])))
        .toEqual(startState);
});