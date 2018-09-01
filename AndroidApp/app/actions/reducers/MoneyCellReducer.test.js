import {ActionName} from "../../constants/ActionName";
import {MoneyCellType} from "../../constants/MoneyCellType";
import {MoneyCellStatus} from "../../constants/MoneyCellStatus";
import {MoneyCellReducer} from "./MoneyCellReducer";
import {EditMoneyCell} from '../creators/EditMoneyCell';

let startState = {
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

for(let key in ActionName){
    if(key !=='EDIT_MONEY_CELL'){
        it(`MoneyCell reducer don\'t process action ${ActionName[key]}`, () => {
            expect(MoneyCellReducer(startState, {type : ActionName[key]}))
            .toBe(startState);
        });
    }
}

it(`MoneyCell reducer process action ${ActionName.EDIT_MONEY_CELL}`, () => {
    let name = 'Зарплатная карточка';
    let status = MoneyCellStatus.INACTIVE;
    expect(MoneyCellReducer(startState, EditMoneyCell(1, name, status)))
        .toEqual({...startState, name, status});
});

it(`MoneyCell reducer don\'t process action ${ActionName.EDIT_MONEY_CELL}`, () => {
    expect(MoneyCellReducer(startState, EditMoneyCell(2, 'Вклад', MoneyCellStatus.INACTIVE)))
        .toBe(startState);
});

it(`MoneyCell reducer process action ${ActionName.ADD_TRANSACTION}`, () => {
    let name = 'Зарплатная карточка';
    let status = MoneyCellStatus.INACTIVE;
    expect(MoneyCellReducer(startState, EditMoneyCell(1, name, status)))
        .toEqual({...startState, name, status});
});

it(`MoneyCell reducer don\'t process action ${ActionName.EDIT_MONEY_CELL}`, () => {
    expect(MoneyCellReducer(startState, EditMoneyCell(2, 'Вклад', MoneyCellStatus.INACTIVE)))
        .toBe(startState);
});