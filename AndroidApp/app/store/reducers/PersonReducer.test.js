import {ActionName} from "../../constants/actionName";
import {Sex} from "../../constants/sex";
import {PersonReducer} from "./personReducer";
import {EditPerson} from '../actions/editPerson';
import {AssertUnprocessedActions} from '../../helpers/testHelper';

const startState = {
    id: 1,
    lastName: 'Petrov',
    firstName: 'Petya',
    sex: Sex.MALE
}

AssertUnprocessedActions([ActionName.EDIT_PERSON], 'Person', PersonReducer);

it(`Person reducer process action ${ActionName.EDIT_PERSON}`, () => {
    const id = 1;
    const lastName = 'Ivanov';
    const firstName = 'Vasya';
    const sex = Sex.FEMALE;
    const lastModificationTime = new Date();
    let action = EditPerson(id, lastName, firstName, sex);
    action.lastModificationTime = lastModificationTime;
    expect(PersonReducer(startState, action))
    .toEqual({id, lastName, firstName, sex, lastModificationTime});
});

it(`Person reducer don\'t process action ${ActionName.EDIT_PERSON}`, () => {
    expect(PersonReducer(startState, EditPerson(2, 'Ivanov', 'Vasya', Sex.FEMALE)))
    .toBe(startState);
});