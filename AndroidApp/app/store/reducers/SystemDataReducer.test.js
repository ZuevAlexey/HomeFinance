import {ActionName} from "../../constants/actionName";
import {SystemDataReducer} from './systemDataReducer';
import {Synchronize} from '../actions/synchronize';
import {EditSystemData} from '../actions/EditSystemData';
import {AssertUnprocessedActions} from '../../helpers/testHelper';

let startState = {
    lastSinchronizationTime: new Date(2018, 8, 2, 14, 0),
    serverAddress: "http://localhost:12345"
};

AssertUnprocessedActions([ActionName.SYNCHRONIZATION, ActionName.EDIT_SYSTEM_DATA], 'SystemData', SystemDataReducer);

it(`SystemData reducer process action ${ActionName.SYNCHRONIZATION}`, () => {
    const lastSinchronizationTime = new Date(2019, 3, 5);

    const action = Synchronize(null, null, null, null, lastSinchronizationTime);
    const newState = SystemDataReducer(startState, action);
    expect(newState).toEqual({...startState, lastSinchronizationTime});
});

it(`SystemData reducer process action ${ActionName.EDIT_SYSTEM_DATA}`, () => {
    const serverAddress = "http://myUrl.com";

    const action = EditSystemData(serverAddress);
    const newState = SystemDataReducer(startState, action);
    expect(newState).toEqual({...startState, serverAddress});
});