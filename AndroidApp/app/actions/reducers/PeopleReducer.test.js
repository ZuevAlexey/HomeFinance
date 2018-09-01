import {ActionName} from "../../constants/ActionName";
import {Sex} from "../../constants/Sex";
import {PeopleReducer} from "./PeopleReducer";
import {EditPerson} from '../creators/EditPerson';
import {DeletePerson} from '../creators/DeletePerson';
import {AddPerson} from '../creators/AddPerson';

let petya = {
    id: 1,
    lastName: 'Petrov',
    firstName: 'Petya',
    sex: Sex.MALE 
};
let vasya = {
    id: 2,
    lastName: 'Ivanov',
    firstName: 'Vasya',
    sex: Sex.MALE 
};
let tanya = {
    id: 3,
    lastName: 'Sidorova',
    firstName: 'Tanya',
    sex: Sex.FEMALE 
};
let startState = [petya, vasya, tanya];

for(let key in ActionName){
    if(!['EDIT_PERSON', 'ADD_PERSON', 'DELETE_PERSON'].includes(key)){
        it(`People reducer don\'t process action ${ActionName[key]}`, () => {
            expect(PeopleReducer(startState, {type : ActionName[key]}))
            .toBe(startState);
        });
    }
}

it(`People reducer process action ${ActionName.EDIT_PERSON}`, () => {
    expect(PeopleReducer(startState, EditPerson(1, 'Ivanov', 'Vasya', Sex.FEMALE)))
        .toEqual([{id: 1, lastName: 'Ivanov', firstName: 'Vasya', sex: Sex.FEMALE}, vasya, tanya]);
});

it(`People reducer don\'t process action ${ActionName.EDIT_PERSON}`, () => {
    expect(PeopleReducer(startState, EditPerson(5, 'Ivanov', 'Vasya', Sex.FEMALE)))
    .toEqual(startState);
});

it(`People reducer process action ${ActionName.DELETE_PERSON}`, () => {
    expect(PeopleReducer(startState, DeletePerson(3)))
    .toEqual([petya, vasya]);
});

it(`People reducer don\'t process action ${ActionName.DELETE_PERSON}`, () => {
    expect(PeopleReducer(startState, DeletePerson(5)))
    .toEqual(startState);
});

it(`People reducer process action ${ActionName.ADD_PERSON}`, () => {
    let stateLength = startState.length;
    let lastName = 'Sinicina';
    let firstName = 'Sveta';
    let sex = Sex.FEMALE;
    let newPerson = PeopleReducer(startState, AddPerson(lastName, firstName, sex))[stateLength];
    expect(newPerson.id).toBeDefined();
    let equalMap = {lastName, firstName, sex};
    for(let key in equalMap){
        expect(newPerson[key]).toEqual(equalMap[key]);
    }
});