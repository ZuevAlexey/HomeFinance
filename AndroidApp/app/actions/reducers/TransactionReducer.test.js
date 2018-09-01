import {ActionName} from "../../constants/ActionName";
import {TransactionReducer} from "./TransactionReducer";
import {EditTransaction} from '../creators/EditTransaction';

let startState = {
    id: 1,
    fromId: 1,
    toId: 2,
    articleId: 100,
    amount: 1500,
    date: new Date(2018, 8, 1, 14, 55),
    description: "Оплата комуналки",
    isValid: true
}

for(let key in ActionName){
    if(key !== 'EDIT_TRANSACTION'){
        it(`Transaction reducer don\'t process action ${ActionName[key]}`, () => {
            expect(TransactionReducer(startState, {type : ActionName[key]}))
            .toBe(startState);
        });
    }
}

it(`Transaction reducer process action ${ActionName.EDIT_TRANSACTION}`, () => {
    let id = 1;
    let fromId = 23;
    let toId = 78;
    let articleId = 340;
    let amount = 3000;
    let description = 'зарплата';
    let date = new Date(2018, 10, 10);
    let isValid = false;
    let action = EditTransaction(id, fromId, toId, articleId, amount, description, date, isValid);
    expect(TransactionReducer(startState, action))
    .toEqual({id, fromId, toId, articleId, amount, description, date, isValid});
});

it(`Transaction reducer don\'t process action ${ActionName.EDIT_TRANSACTION}`, () => {
    expect(TransactionReducer(startState, EditTransaction(2, 34, 45, 234, 300, 'оплата', null, true)))
    .toBe(startState);
});