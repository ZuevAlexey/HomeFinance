import {ActionName} from '../../constants/actionName';
import {Sex} from '../../constants/sex';
import {PeopleReducer} from './peopleReducer';
import {EditPerson} from '../actions/editPerson';
import {MarkDeletePerson} from '../actions/markDeletePerson';
import {AddPerson} from '../actions/addPerson';
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
    ActionName.MARK_DELETE_PERSON,
    ActionName.SYNCHRONIZATION,
    ActionName.RESET_STORAGE
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

it(`People reducer process action ${ActionName.MARK_DELETE_PERSON}`, () => {
    let action = MarkDeletePerson(3);
    action.lastModificationTime = lastModificationTime;
    expect(PeopleReducer(startState, action))
    .toEqual([petya, vasya, {...tanya, isDeleted: true, lastModificationTime}]);
});

it(`People reducer don\'t process action ${ActionName.MARK_DELETE_PERSON}`, () => {
    expect(PeopleReducer(startState, MarkDeletePerson(5)))
    .toEqual(startState);
});

it(`People reducer process action ${ActionName.ADD_PERSON}`, () => {
    const stateLength = startState.length;
    const lastName = 'Sinicina';
    const firstName = 'Sveta';
    const sex = Sex.FEMALE;
    const lastModificationTime = new Date();
    const creationTime = lastModificationTime;
    const id = 1;
    let action = AddPerson(lastName, firstName, sex);
    action.lastModificationTime = lastModificationTime;
    action.creationTime = creationTime;
    action.id = id;
    const newPerson = PeopleReducer(startState, action)[stateLength];
    expect(newPerson).toEqual({creationTime, lastName, firstName, sex, lastModificationTime, id, isDeleted: false});
});