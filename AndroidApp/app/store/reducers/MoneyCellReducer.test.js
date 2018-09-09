import {ActionName} from "../../constants/ActionName";
import {MoneyCellType} from "../../constants/MoneyCellType";
import {MoneyCellStatus} from "../../constants/MoneyCellStatus";
import {MoneyCellReducer} from "./MoneyCellReducer";
import {EditMoneyCell} from '../actions/EditMoneyCell';
import {AddTransaction} from '../actions/AddTransaction';
import {AssertUnprocessedActions} from '../../helpers/TestHelper';
import { DeleteTransaction } from "../actions/DeleteTransaction";
import { EditTransaction } from "../actions/EditTransaction";

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
}

const processedActions = [
    ActionName.EDIT_MONEY_CELL,
    ActionName.ADD_TRANSACTION,
    ActionName.DELETE_TRANSACTION, 
    ActionName.EDIT_TRANSACTION
];
AssertUnprocessedActions(processedActions, 'MoneyCell', MoneyCellReducer);

it(`MoneyCell reducer process action ${ActionName.EDIT_MONEY_CELL}`, () => {
    const name = 'Зарплатная карточка';
    const status = MoneyCellStatus.INACTIVE;
    expect(MoneyCellReducer(startState, EditMoneyCell(1, name, status)))
        .toEqual({...startState, name, status});
});

it(`MoneyCell reducer don\'t process action ${ActionName.EDIT_MONEY_CELL}`, () => {
    expect(MoneyCellReducer(startState, EditMoneyCell(2, 'Вклад', MoneyCellStatus.INACTIVE)))
        .toBe(startState);
});

it(`MoneyCell reducer process action ${ActionName.ADD_TRANSACTION}`, () => {
    const amount = 3000;
    const withdrawal = AddTransaction(startState.id, 45, null, amount, null, null);
    const deposit = AddTransaction(4, startState.id, null, amount, null, null);
    expect(MoneyCellReducer(startState, withdrawal))
        .toEqual({...startState, amount: startState.amount - amount});
    expect(MoneyCellReducer(startState, deposit))
        .toEqual({...startState, amount: startState.amount + amount});
});

it(`MoneyCell reducer don\'t process action ${ActionName.ADD_TRANSACTION}`, () => {
    const action = AddTransaction(45, 2, 1500, 5600, null, null);
    expect(MoneyCellReducer(startState, action))
        .toBe(startState);
});

it(`MoneyCell reducer process action ${ActionName.DELETE_TRANSACTION}`, () => {
    const amount = 3000;
    const revertWithdrawal = DeleteTransaction(78, startState.id, 34, amount);
    const revertDeposit = DeleteTransaction(4, 76, startState.id, amount);
    expect(MoneyCellReducer(startState, revertWithdrawal))
        .toEqual({...startState, amount: startState.amount + amount});
    expect(MoneyCellReducer(startState, revertDeposit))
        .toEqual({...startState, amount: startState.amount - amount});
});

it(`MoneyCell reducer don\'t process action ${ActionName.DELETE_TRANSACTION}`, () => {
    const action = AddTransaction(3, 2, null, 2700, null, null);
    expect(MoneyCellReducer(startState, action))
        .toBe(startState);
});

it(`MoneyCell reducer process action ${ActionName.EDIT_TRANSACTION}`, () => {
    const transactionId = 324;
    const oldAmount = 3000;
    const newAmount = 1300;
    const revertWithdrawal = EditTransaction(null, startState.id, 34, 56, 23, null,
        oldAmount, newAmount, null, null, null);
    expect(MoneyCellReducer(startState, revertWithdrawal))
        .toEqual({...startState, amount: startState.amount + oldAmount});

        
    const revertDeposit = EditTransaction(null, 34, startState.id, 56, 23, null,
        oldAmount, newAmount, null, null, null);
    expect(MoneyCellReducer(startState, revertDeposit))
        .toEqual({...startState, amount: startState.amount - oldAmount});

        
    const withdrawal = EditTransaction(null, 56, 34, startState.id, 23, null,
        oldAmount, newAmount, null, null, null);
    expect(MoneyCellReducer(startState, withdrawal))
        .toEqual({...startState, amount: startState.amount - newAmount});

    const deposit = EditTransaction(null, 34, 23, 56, startState.id, null,
        oldAmount, newAmount, null, null, null);
    expect(MoneyCellReducer(startState, deposit))
        .toEqual({...startState, amount: startState.amount + newAmount});

    const changeWithdrawal = EditTransaction(null, startState.id, 34, startState.id, 23, null,
        oldAmount, newAmount, null, null, null);
    expect(MoneyCellReducer(startState, changeWithdrawal))
        .toEqual({...startState, amount: startState.amount + oldAmount - newAmount});

    const changeDeposit = EditTransaction(null, 34, startState.id, 56,  startState.id, null,
        oldAmount, newAmount, null, null, null);
    expect(MoneyCellReducer(startState, changeDeposit))
        .toEqual({...startState, amount: startState.amount - oldAmount + newAmount});
        
    const revertWithdrawalAddDeposit = EditTransaction(null, startState.id, 34, 34, startState.id, 200,
        oldAmount, newAmount, null, null, null);
    expect(MoneyCellReducer(startState, revertWithdrawalAddDeposit))
        .toEqual({...startState, amount: startState.amount + oldAmount + newAmount});

        
    const revertDepositAddWithdrawal = EditTransaction(null, 56, startState.id, startState.id, 56, null,
        oldAmount, newAmount, null, null, null);
    expect(MoneyCellReducer(startState, revertDepositAddWithdrawal))
        .toEqual({...startState, amount: startState.amount - oldAmount - newAmount});
});

it(`MoneyCell reducer don\'t process action ${ActionName.EDIT_TRANSACTION}`, () => {
    const ourMoneyCellId = 3;
    const anotherMoneyCellId = 2;
    const amount = 1500;
    const action = AddTransaction(ourMoneyCellId, anotherMoneyCellId, null, amount, null, null);
    expect(MoneyCellReducer(startState, action))
        .toBe(startState);
});