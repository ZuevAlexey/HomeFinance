import {ActionName} from "../../constants/actionName";
import {MoneyCellType} from "../../constants/moneyCellType";
import {MoneyCellStatus} from "../../constants/moneyCellStatus";
import {MoneyCellsReducer} from "./moneyCellsReducer";
import {EditMoneyCell} from '../actions/editMoneyCell';
import {DeleteMoneyCell} from '../actions/deleteMoneyCell';
import {AddMoneyCell} from '../actions/addMoneyCell';
import {Sinchronize} from '../actions/sinchronize';
import {AssertUnprocessedActions} from '../../helpers/testHelper';
import {AddTransaction} from '../actions/addTransaction';
import {DeleteTransaction} from "../actions/deleteTransaction";
import {EditTransaction} from "../actions/editTransaction";

const cash = {
    id: 1,
    ownerId: 1,
    type: MoneyCellType.CASH,
    amount: 1000,
    startDate: new Date(2018, 8, 0),
    endData: new Date(2018, 8, 0),
    name: 'Кошелек',
    status: MoneyCellStatus.ACTIVE,
    parentId: null
};
const card = {
    id: 2,
    ownerId: 1,
    type: MoneyCellType.CARD,
    amount: 7300,
    startDate: new Date(2018, 8, 0),
    endData: new Date(2018, 8, 0),
    name: 'Картонка',
    status: MoneyCellStatus.INACTIVE,
    parentId: null
};
const deposit = {
    id: 3,
    ownerId: 1,
    type: MoneyCellType.DEPOSIT,
    amount: 120000,
    startDate: new Date(2018, 8, 0),
    endData: new Date(2018, 10, 0),
    name: 'Вклад',
    status: MoneyCellStatus.ACTIVE,
    parentId: 2
};
const startState = [cash, card, deposit];

const processedActions = [
    ActionName.EDIT_MONEY_CELL,
    ActionName.ADD_MONEY_CELL,
    ActionName.DELETE_MONEY_CELL,
    ActionName.ADD_TRANSACTION,
    ActionName.DELETE_TRANSACTION, 
    ActionName.EDIT_TRANSACTION,
    ActionName.SINCHRONIZATION
];

const lastModificationTime = new Date();

AssertUnprocessedActions(processedActions, 'MoneyCells', MoneyCellsReducer);

it(`MoneyCells reducer process action ${ActionName.EDIT_MONEY_CELL}`, () => {
    const name = 'Зарплатная карточка';
    const status = MoneyCellStatus.ACTIVE;
    let action = EditMoneyCell(2, name, status);
    action.lastModificationTime = lastModificationTime;
    expect(MoneyCellsReducer(startState, action))
        .toEqual([cash, {...card, name, status, lastModificationTime}, deposit]);
});

it(`MoneyCells reducer don\'t process action ${ActionName.EDIT_MONEY_CELL}`, () => {
    expect(MoneyCellsReducer(startState, EditMoneyCell(5, 'Новаякарточка', MoneyCellStatus.ACTIVE)))
        .toEqual(startState);
});

it(`MoneyCells reducer process action ${ActionName.DELETE_MONEY_CELL}`, () => {
    expect(MoneyCellsReducer(startState, DeleteMoneyCell(1)))
        .toEqual([card, deposit]);
});

it(`MoneyCells reducer don\'t process action ${ActionName.DELETE_MONEY_CELL}`, () => {
    expect(MoneyCellsReducer(startState, DeleteMoneyCell(32)))
        .toEqual(startState);
});

it(`MoneyCells reducer process action ${ActionName.ADD_MONEY_CELL}`, () => {
    const stateLength = startState.length;
    const ownerId = 56;
    const moneyCellType = MoneyCellType.DEPOSIT;
    const amount = 250000;
    const startDate = new Date(2018, 10, 1);
    const endDate = new Date(2018, 1, 1);
    const name = 'вклад';
    const status = MoneyCellStatus.ACTIVE;
    const parentId = 67;
    const isValid = true;
    const roi = 10;
    const id = 1;

    const action = AddMoneyCell(ownerId, moneyCellType, name, status, amount, isValid, startDate, endDate, roi, parentId);
    action.id = 1;
    action.lastModificationTime = lastModificationTime;
    const newMoneyCell = MoneyCellsReducer(startState, action)[stateLength];
    expect(newMoneyCell).toEqual({ownerId, moneyCellType, name, status, amount, isValid, startDate, endDate, roi, parentId, lastModificationTime, id});
});

it(`MoneyCells reducer process action ${ActionName.SINCHRONIZATION}`, () => {
    const newMoneyCells = [{
        id: 145,
        ownerId: 13,
        type: MoneyCellType.CASH,
        amount: 1454,
        startDate: new Date(2018, 8, 0),
        endData: new Date(2018, 8, 0),
        name: 'Кошелек',
        status: MoneyCellStatus.ACTIVE,
        parentId: null
        }, {
        id: 16,
        ownerId: 45,
        type: MoneyCellType.CASH,
        amount: 23423,
        startDate: new Date(2018, 8, 0),
        endData: new Date(2018, 8, 0),
        name: 'Кошелек',
        status: MoneyCellStatus.ACTIVE,
        parentId: null
    }];
    
    const action = Sinchronize(null, newMoneyCells, null, null, null);
    const newState = MoneyCellsReducer(startState, action);
    expect(newState).toBe(newMoneyCells);
});

it(`MoneyCells reducer process action ${ActionName.ADD_TRANSACTION}`, () => {
    const amount = 3000;
    const action = AddTransaction(cash.id, deposit.id, null, amount, null, null);
    action.lastModificationTime = lastModificationTime;
    expect(MoneyCellsReducer(startState, action))
        .toEqual([
            {...cash, amount: cash.amount - amount, lastModificationTime},
            card,
            {...deposit, amount: deposit.amount + amount, lastModificationTime}
        ]);
});

it(`MoneyCells reducer don\'t process action ${ActionName.ADD_TRANSACTION}`, () => {
    const amount = 3000;
    const action = AddTransaction(456, 34, null, amount, null, null);
    expect(MoneyCellsReducer(startState, action))
        .toEqual(startState);
});

it(`MoneyCells reducer process action ${ActionName.DELETE_TRANSACTION}`, () => {
    const amount = 3000;
    const action = DeleteTransaction(78, cash.id, deposit.id, amount);
    action.lastModificationTime = lastModificationTime;
    expect(MoneyCellsReducer(startState, action))
        .toEqual([
            {...cash, amount: cash.amount + amount, lastModificationTime},
            card,
            {...deposit, amount: deposit.amount - amount, lastModificationTime}
]);
});

it(`MoneyCells reducer don\'t process action ${ActionName.DELETE_TRANSACTION}`, () => {
    const action = DeleteTransaction(35, 22, null, 2700, null, null);
    expect(MoneyCellsReducer(startState, action))
        .toEqual(startState);
});

it(`MoneyCell reducer process action ${ActionName.EDIT_TRANSACTION}`, () => {
    const oldAmount = 3000;
    const newAmount = 1300;
    const action = EditTransaction(null, cash.id, deposit.id, card.id, cash.id, null,
        oldAmount, newAmount, null, null, null);
    action.lastModificationTime = lastModificationTime;
    expect(MoneyCellsReducer(startState, action))
        .toEqual([
            {...cash, amount: cash.amount + oldAmount + newAmount, lastModificationTime},
            {...card, amount: card.amount - newAmount, lastModificationTime},
            {...deposit, amount: deposit.amount - oldAmount, lastModificationTime}
        ]);
});

it(`MoneyCell reducer don\'t process action ${ActionName.EDIT_TRANSACTION}`, () => {
    const action = EditTransaction(null, 56, 45, 22, 56, null,
        3000, 4500, null, null, null);
    expect(MoneyCellsReducer(startState, action))
        .toEqual(startState);
});