import {ActionName} from "../../constants/ActionName";
import {Sex} from "../../constants/Sex";
import {PersonReducer} from "./PersonReducer";
import {EditPerson} from '../creators/EditPerson';

let startState = {
    id: 1,
    lastName: 'Petrov',
    firstName: 'Petya',
    sex: Sex.MALE 
}

for(let key in ActionName){
    if(key !== 'EDIT_PERSON'){
        it(`Person reducer don\'t process action ${ActionName[key]}`, () => {
            expect(PersonReducer(startState, {type : ActionName[key]}))
            .toBe(startState);
        });
    }
}

it(`Person reducer process action ${ActionName.EDIT_PERSON}`, () => {
    let id = 1;
    let lastName = 'Ivanov';
    let firstName = 'Vasya';
    let sex = Sex.FEMALE;
    expect(PersonReducer(startState, EditPerson(id, lastName, firstName, sex)))
    .toEqual({id, lastName, firstName, sex});
});

it(`Person reducer don\'t process action ${ActionName.EDIT_PERSON}`, () => {
    expect(PersonReducer(startState, EditPerson(2, 'Ivanov', 'Vasya', Sex.FEMALE)))
    .toBe(startState);
});