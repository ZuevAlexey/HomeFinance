import {ActionName} from "../../constants/ActionName";
import {TransactionsReducer} from "./TransactionsReducer";
import {EditTransaction} from '../creators/EditTransaction';
import {DeleteTransaction} from '../creators/DeleteTransaction';
import {AddTransaction} from '../creators/AddTransaction';
import {Sinchronize} from '../creators/Sinchronize';

let trans1 = {
    id: 1,
    fromId: 1,
    toId: 2,
    articleId: 100,
    amount: 1500,
    date: new Date(2018, 8, 1, 14, 55),
    description: "Оплата комуналки",
    isValid: true
};
let trans2 = {
    id: 2,
    fromId: 4,
    toId: 1,
    articleId: 100500,
    amount: 70,
    date: new Date(2018, 9, 8, 14, 55),
    description: "Молоко",
    isValid: true
};
let trans3 = {
    id: 3,
    fromId: 1,
    toId: 2,
    articleId: 250,
    amount: 3700,
    date: new Date(2018, 8, 1, 14, 55),
    description: "Лечение зубов",
    isValid: false
};
let startState = [trans1, trans2, trans3];

for(let key in ActionName){
    if(!['EDIT_TRANSACTION', 'ADD_TRANSACTION', 'DELETE_TRANSACTION', 'SINCHRONIZATION'].includes(key)){
        it(`Transactions reducer don\'t process action ${ActionName[key]}`, () => {
            expect(TransactionsReducer(startState, {type : ActionName[key]}))
            .toBe(startState);
        });
    }
}

it(`Transactions reducer process action ${ActionName.EDIT_TRANSACTION}`, () => {
    let id = 1;
    let fromId = 23;
    let toId = 78;
    let articleId = 340;
    let amount = 3000;
    let description = 'зарплата';
    let date = new Date(2018, 10, 10);
    let isValid = false;
    let action = EditTransaction(id, fromId, toId, articleId, amount, description, date, isValid);
    expect(TransactionsReducer(startState, action))
        .toEqual([{id, fromId, toId, articleId, amount, description, date, isValid}, trans2, trans3]);
});

it(`Transactions reducer don\'t process action ${ActionName.EDIT_TRANSACTION}`, () => {
    expect(TransactionsReducer(startState, EditTransaction(67, 34, 45, 234, 300, 'оплата', null, true)))
    .toEqual(startState);
});

it(`Transactions reducer process action ${ActionName.DELETE_TRANSACTION}`, () => {
    expect(TransactionsReducer(startState, DeleteTransaction(2)))
    .toEqual([trans1, trans3]);
});

it(`Transactions reducer don\'t process action ${ActionName.DELETE_TRANSACTION}`, () => {
    expect(TransactionsReducer(startState, DeleteTransaction(5)))
    .toEqual(startState);
});

it(`Transactions reducer process action ${ActionName.ADD_TRANSACTION}`, () => {
    let stateLength = startState.length;
    let fromId = 23;
    let toId = 78;
    let articleId = 340;
    let amount = 3000;
    let description = 'зарплата';
    let date = new Date(2018, 10, 10);
    let isValid = true;
    let action = AddTransaction(fromId, toId, articleId, amount, description, date);
    let newTransaction = TransactionsReducer(startState, action)[stateLength];
    expect(newTransaction.id).toBeDefined();
    let equalMap = {fromId, toId, articleId, amount, description, date, isValid};
    for(let key in equalMap){
        expect(newTransaction[key]).toEqual(equalMap[key]);
    }
});

it(`Transactions reducer process action ${ActionName.SINCHRONIZATION}`, () => {
    let newTransactions = [{
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
    
    let action = Sinchronize(null, null, newTransactions, null, null);
    let newState = TransactionsReducer(startState, action);
    expect(newState).toBe(newTransactions);
});