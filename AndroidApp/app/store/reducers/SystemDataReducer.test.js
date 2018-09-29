import {ActionName} from "../../constants/actionName";
import {SystemDataReducer} from './systemDataReducer';
import {EditSystemData} from '../actions/EditSystemData';
import {AssertUnprocessedActions} from '../../helpers/testHelper';

let startState = {
    lastSynchronizationTime: new Date(2018, 8, 2, 14, 0),
    serverAddress: "http://localhost:12345"
};

AssertUnprocessedActions([ActionName.EDIT_SYSTEM_DATA], 'SystemData', SystemDataReducer);

it(`SystemData reducer process action ${ActionName.EDIT_SYSTEM_DATA}`, () => {
    const lastSynchronizationTime = new Date(2019, 3, 5);
    const serverAddress = "http://myDomain.com"

    const action = EditSystemData(lastSynchronizationTime, serverAddress);
    const newState = SystemDataReducer(startState, action);
    expect(newState).toEqual({...startState, lastSynchronizationTime, serverAddress});
});