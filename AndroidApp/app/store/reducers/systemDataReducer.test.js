import {ActionName} from '../../constants/actionName';
import {SystemDataReducer} from './systemDataReducer';
import {EditSystemData} from '../actions/editSystemData';
import {AssertUnprocessedActions} from '../../helpers/testHelper';

let startState = {
    lastSynchronizationTime: new Date(2018, 8, 2, 14, 0),
    serverAddress: 'http://localhost:12345'
};

AssertUnprocessedActions([ActionName.EDIT_SYSTEM_DATA, ActionName.SYNCHRONIZATION, ActionName.RESET_STORAGE], 'SystemData', SystemDataReducer);

it(`SystemData reducer process action ${ActionName.EDIT_SYSTEM_DATA}`, () => {
    const serverAddress = 'http://myDomain.com';

    const action = EditSystemData(serverAddress);
    const newState = SystemDataReducer(startState, action);
    expect(newState).toEqual({...startState, serverAddress});
});