import {ActionName} from "../../constants/ActionName";
import {MoneyCellType} from "../../constants/MoneyCellType";
import {MoneyCellStatus} from "../../constants/MoneyCellStatus";
import {MoneyCellsReducer} from "./MoneyCellsReducer";
import {EditMoneyCell} from '../actions/EditMoneyCell';
import {DeleteMoneyCell} from '../actions/DeleteMoneyCell';
import {AddMoneyCell} from '../actions/AddMoneyCell';
import {Sinchronize} from '../actions/Sinchronize';
import {AssertUnprocessedActions} from '../../helpers/TestHelper';

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
AssertUnprocessedActions(processedActions, 'MoneyCells', MoneyCellsReducer);

it(`MoneyCells reducer process action ${ActionName.EDIT_MONEY_CELL}`, () => {
    const name = 'Зарплатная карточка';
    const status = MoneyCellStatus.ACTIVE;
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

    const action = AddMoneyCell(ownerId, moneyCellType, name, status, amount, isValid, startDate, endDate, roi, parentId);
    const newMoneyCell = MoneyCellsReducer(startState, action)[stateLength];
    expect(newMoneyCell.id).toBeDefined();
    const equalMap = {ownerId, moneyCellType, name, status, amount, isValid, startDate, endDate, roi, parentId};
    for(let key in equalMap){
        expect(newMoneyCell[key]).toEqual(equalMap[key]);
    }
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