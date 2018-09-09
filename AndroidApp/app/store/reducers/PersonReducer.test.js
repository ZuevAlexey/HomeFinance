import {ActionName} from "../../constants/ActionName";
import {Sex} from "../../constants/Sex";
import {PersonReducer} from "./PersonReducer";
import {EditPerson} from '../actions/EditPerson';
import {AssertUnprocessedActions} from '../../helpers/TestHelper';

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
    expect(PersonReducer(startState, EditPerson(id, lastName, firstName, sex)))
    .toEqual({id, lastName, firstName, sex});
});

it(`Person reducer don\'t process action ${ActionName.EDIT_PERSON}`, () => {
    expect(PersonReducer(startState, EditPerson(2, 'Ivanov', 'Vasya', Sex.FEMALE)))
    .toBe(startState);
});