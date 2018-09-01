import {ActionName} from "../../constants/ActionName";
import {MoneyCellType} from "../../constants/MoneyCellType";
import {MoneyCellStatus} from "../../constants/MoneyCellStatus";
import {MoneyCellsReducer} from "./MoneyCellsReducer";
import {EditMoneyCell} from '../creators/EditMoneyCell';
import {DeleteMoneyCell} from '../creators/DeleteMoneyCell';
import {AddMoneyCell} from '../creators/AddMoneyCell';

let cash = {
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
let card = {
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
let deposit = {
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
let startState = [cash, card, deposit];

for(let key in ActionName){
    if(!['EDIT_MONEY_CELL', 'ADD_MONEY_CELL', 'DELETE_MONEY_CELL'].includes(key)){
        it(`MoneyCells reducer don\'t process action ${ActionName[key]}`, () => {
            expect(MoneyCellsReducer(startState, {type : ActionName[key]})).toBe(startState);
        });
    }
}

it(`MoneyCells reducer process action ${ActionName.EDIT_MONEY_CELL}`, () => {
    let name = 'Зарплатная карточка';
    let status = MoneyCellStatus.ACTIVE;
    expect(MoneyCellsReducer(startState, EditMoneyCell(2, name, status)))
        .toEqual([cash, {...card, name, status}, deposit]);
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
    let stateLength = startState.length;
    let ownerId = 56;
    let moneyCellType = MoneyCellType.DEPOSIT;
    let amount = 250000;
    let startDate = new Date(2018, 10, 1);
    let endDate = new Date(2018, 1, 1);
    let name = 'вклад';
    let status = MoneyCellStatus.ACTIVE;
    let parentId = 67;
    let isValid = true;
    let roi = 10;

    let action = AddMoneyCell(ownerId, moneyCellType, name, status, amount, isValid, startDate, endDate, roi, parentId);
    let newMoneyCell = MoneyCellsReducer(startState, action)[stateLength];
    expect(newMoneyCell.id).toBeDefined();
    let equalMap = {ownerId, moneyCellType, name, status, amount, isValid, startDate, endDate, roi, parentId};
    for(let key in equalMap){
        expect(newMoneyCell[key]).toEqual(equalMap[key]);
    }
});