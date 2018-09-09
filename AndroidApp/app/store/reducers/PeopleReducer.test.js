import {ActionName} from "../../constants/ActionName";
import {Sex} from "../../constants/Sex";
import {PeopleReducer} from "./PeopleReducer";
import {EditPerson} from '../actions/EditPerson';
import {DeletePerson} from '../actions/DeletePerson';
import {AddPerson} from '../actions/AddPerson';
import {Sinchronize} from '../actions/Sinchronize';
import {AssertUnprocessedActions} from '../../helpers/TestHelper';

const petya = {
    id: 1,
    lastName: 'Petrov',
    firstName: 'Petya',
    sex: Sex.MALE 
};
const vasya = {
    id: 2,
    lastName: 'Ivanov',
    firstName: 'Vasya',
    sex: Sex.MALE 
};
const tanya = {
    id: 3,
    lastName: 'Sidorova',
    firstName: 'Tanya',
    sex: Sex.FEMALE 
};
const startState = [petya, vasya, tanya];

const processedActions = [
    ActionName.EDIT_PERSON,
    ActionName.ADD_PERSON,
    ActionName.DELETE_PERSON,
    ActionName.SINCHRONIZATION
];
AssertUnprocessedActions(processedActions, 'People', PeopleReducer);

it(`People reducer process action ${ActionName.EDIT_PERSON}`, () => {
    const id = 1;
    const lastName = 'Ivanov';
    const firstName = 'Vasya';
    const sex = Sex.FEMALE;
    expect(PeopleReducer(startState, EditPerson(id, lastName, firstName, sex)))
        .toEqual([{id, lastName, firstName, sex}, vasya, tanya]);
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
    const stateLength = startState.length;
    const lastName = 'Sinicina';
    const firstName = 'Sveta';
    const sex = Sex.FEMALE;
    const newPerson = PeopleReducer(startState, AddPerson(lastName, firstName, sex))[stateLength];
    expect(newPerson.id).toBeDefined();
    const equalMap = {lastName, firstName, sex};
    for(let key in equalMap){
        expect(newPerson[key]).toEqual(equalMap[key]);
    }
});

it(`People reducer process action ${ActionName.SINCHRONIZATION}`, () => {
    const newPeople = [{
        id: 51,
        lastName: 'Ivanov',
        firstName: 'Ivan',
        sex: Sex.MALE 
    },
    {
        id: 5,
        lastName: 'Stepanova',
        firstName: 'Irina',
        sex: Sex.FEMALE 
    }];

    const action = Sinchronize(newPeople, null, null, null, null);
    const newState = PeopleReducer(startState, action);
    expect(newState).toBe(newPeople);
});