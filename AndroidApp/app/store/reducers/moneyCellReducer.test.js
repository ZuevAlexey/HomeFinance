import {ActionName} from '../../constants/actionName';
import {AssertUnprocessedActions} from '../../helpers/testHelper';
import {MoneyCellType} from '../../constants/moneyCellType';
import {MoneyCellStatus} from '../../constants/moneyCellStatus';
import {MoneyCellReducer} from './moneyCellReducer';
import {EditMoneyCell} from '../actions/editMoneyCell';
import {MarkDeleteMoneyCell} from '../actions/markDeleteMoneyCell';

const startState = {
    id: 1,
    ownerId: 1,
    type: MoneyCellType.CASH,
    amount: 1000,
    startDate: new Date(2018, 8, 0),
    endData: new Date(2018, 8, 0),
    name: 'Кошелек',
    status: MoneyCellStatus.ACTIVE,
    parent: null,
    isValid : true
};

const processedActions = [
    ActionName.EDIT_MONEY_CELL,
    ActionName.MARK_DELETE_MONEY_CELL,
    ActionName.ADD_TRANSACTION,
    ActionName.EDIT_TRANSACTION,
    ActionName.MARK_DELETE_TRANSACTION,
    ActionName.MARK_DELETE_PERSON,
];

const lastModificationTime = new Date();
AssertUnprocessedActions(processedActions, 'MoneyCell', MoneyCellReducer);

it(`MoneyCell reducer process action ${ActionName.EDIT_MONEY_CELL}`, () => {
    const name = 'Зарплатная карточка';
    const status = MoneyCellStatus.INACTIVE;
    let action = EditMoneyCell(1, name, status);
    action.lastModificationTime = lastModificationTime;
    let newMoneyCell = MoneyCellReducer(startState, action);
    expect({...startState, name, status, lastModificationTime}).toEqual(newMoneyCell);
});

it(`MoneyCell reducer don\'t process action ${ActionName.EDIT_MONEY_CELL}`, () => {
    expect(MoneyCellReducer(startState, EditMoneyCell(2, 'Вклад', MoneyCellStatus.INACTIVE)))
        .toBe(startState);
});

it(`MoneyCell reducer process action ${ActionName.MARK_DELETE_MONEY_CELL}`, () => {
    let action = MarkDeleteMoneyCell(1);
    action.lastModificationTime = lastModificationTime;
    expect(MoneyCellReducer(startState, action))
        .toEqual({...startState, isDeleted: true, lastModificationTime});
});

it(`MoneyCell reducer don\'t process action ${ActionName.MARK_DELETE_MONEY_CELL}`, () => {
    expect(MoneyCellReducer(startState, MarkDeleteMoneyCell(32)))
        .toEqual(startState);
});