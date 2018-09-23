import {ActionName} from "../../constants/actionName";
import {Sex} from "../../constants/sex";
import {PeopleReducer} from "./peopleReducer";
import {EditPerson} from '../actions/editPerson';
import {DeletePerson} from '../actions/deletePerson';
import {AddPerson} from '../actions/addPerson';
import {Synchronize} from '../actions/synchronize';
import {AssertUnprocessedActions} from '../../helpers/testHelper';

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
    ActionName.SYNCHRONIZATION
];
AssertUnprocessedActions(processedActions, 'People', PeopleReducer);

const lastModificationTime = new Date();

it(`People reducer process action ${ActionName.EDIT_PERSON}`, () => {
    const id = 1;
    const lastName = 'Ivanov';
    const firstName = 'Vasya';
    const sex = Sex.FEMALE;
    let action = EditPerson(id, lastName, firstName, sex);
    action.lastModificationTime = lastModificationTime;
    expect(PeopleReducer(startState, action))
        .toEqual([{id, lastName, firstName, sex, lastModificationTime}, vasya, tanya]);
});

it(`People reducer don\'t process action ${ActionName.EDIT_PERSON}`, () => {
    expect(PeopleReducer(startState, EditPerson(5, 'Ivanov', 'Vasya', Sex.FEMALE)))
    .toEqual(startState);
});

it(`People reducer process action ${ActionName.DELETE_PERSON}`, () => {
    let action = DeletePerson(3);
    action.lastModificationTime = lastModificationTime;
    expect(PeopleReducer(startState, action))
    .toEqual([petya, vasya, {...tanya, isDeleted: true, lastModificationTime}]);
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
    const lastModificationTime = new Date();
    const id = 1;
    let action = AddPerson(lastName, firstName, sex);
    action.lastModificationTime = lastModificationTime;
    action.id = id;
    const newPerson = PeopleReducer(startState, action)[stateLength];
    expect(newPerson).toEqual({lastName, firstName, sex, lastModificationTime, id});
});

it(`People reducer process action ${ActionName.SYNCHRONIZATION}`, () => {
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

    const action = Synchronize(newPeople, null, null, null, null);
    const newState = PeopleReducer(startState, action);
    expect(newState).toBe(newPeople);
});