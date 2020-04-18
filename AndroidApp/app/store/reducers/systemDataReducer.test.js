import {ActionName} from '../../constants/actionName';
import {SystemDataReducer} from './systemDataReducer';
import {EditSystemData} from '../actions/editSystemData';
import {AssertUnprocessedActions} from '../../helpers/testHelper';
import {SaveGDriveEnv} from "../actions/editGDriveEnv";

let startState = {
    lastSynchronizationTime: new Date(2018, 8, 2, 14, 0),
    serverAddress: 'http://localhost:12345'
};

AssertUnprocessedActions([ActionName.EDIT_SYSTEM_DATA, ActionName.SYNCHRONIZATION, ActionName.RESET_STORAGE, ActionName.SAVE_G_DRIVE_ENV], 'SystemData', SystemDataReducer);

it(`SystemData reducer process action ${ActionName.EDIT_SYSTEM_DATA}`, () => {
    const token = 'lkdhfglkjdsf;gjsd;fkgs;dlfkg;lsdkf;glksdjfgl;kjsdf;g';
    const credentials = 'kjdsf[gjsdfkgj;sdkfjg;sdlfkjg;sdfkj;gsdkfj;gksdfjgl;kdsjfg;klsjdfgkjsdf;gjksd;flg;sdflkjg;sdfkj;lskdfjgskdfjg';
    const gDriveEnv = {
        fileId: "sdfhsldfhsdhflsahdfouishdfoiuashdfoiuas",
        mainFolderId: "oiasjg8098ehg9e8gh0348hg-e9r8gh-4398gy-9",
        backupFolderId: "984u20985g20985yg20475yg2057yg02785gy0827"
    };


    const action = EditSystemData(token, credentials, gDriveEnv);
    const newState = SystemDataReducer(startState, action);
    expect(newState).toEqual({...startState, token, credentials, gDriveEnv});
});