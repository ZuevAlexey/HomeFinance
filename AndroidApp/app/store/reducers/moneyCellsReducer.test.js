import {ActionName} from "../../constants/actionName";
import {MoneyCellType} from "../../constants/moneyCellType";
import {MoneyCellStatus} from "../../constants/moneyCellStatus";
import {MoneyCellsReducer} from "./moneyCellsReducer";
import {EditMoneyCell} from '../actions/editMoneyCell';
import {MarkDeleteMoneyCell} from '../actions/markDeleteMoneyCell';
import {AddMoneyCell} from '../actions/addMoneyCell';
import {AssertUnprocessedActions} from '../../helpers/testHelper';

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
    ActionName.MARK_DELETE_MONEY_CELL,
    ActionName.SYNCHRONIZATION,
    ActionName.RESET_STORAGE,
    ActionName.ADD_TRANSACTION,
    ActionName.EDIT_TRANSACTION,
    ActionName.MARK_DELETE_TRANSACTION,
    ActionName.MARK_DELETE_PERSON,
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

it(`MoneyCells reducer process action ${ActionName.MARK_DELETE_MONEY_CELL}`, () => {
    let action = MarkDeleteMoneyCell(1);
    action.lastModificationTime = lastModificationTime;
    expect(MoneyCellsReducer(startState, action))
        .toEqual([{...cash, isDeleted: true, lastModificationTime}, card, deposit]);
});

it(`MoneyCells reducer don\'t process action ${ActionName.MARK_DELETE_MONEY_CELL}`, () => {
    expect(MoneyCellsReducer(startState, MarkDeleteMoneyCell(32)))
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
    const isDeleted = false;
    const isValid = true;
    const roi = 10;
    const id = 1;

    const action = AddMoneyCell(ownerId, moneyCellType, name, status, amount, isValid, startDate, endDate, roi, parentId);
    action.id = 1;
    action.lastModificationTime = lastModificationTime;
    const newMoneyCell = MoneyCellsReducer(startState, action)[stateLength];
    expect(newMoneyCell).toEqual({ownerId, moneyCellType, name, status, amount, isValid, startDate, endDate, roi, parentId, lastModificationTime, id, isDeleted});
});