import StateBranches from './branches';
import {hasAny, isNullOrUndefined} from "../maybe";
import {createFile, getFileContent, initializeGDriveEnvironment, updateFile} from "./gdrive/gdriveConnector";
import {mergeCollection} from "./reducers/mergeCollection";
import {DATA_TYPE, decrypt, encrypt} from "../coder/coder"

const MAIN_FOLDER_NAME = 'HomeFinance';
const BACKUP_FILE_NAME = 'history';
const MAIN_FILE_NAME = 'state';
const FILE_EXTENSION = '.txt';

export const synchronizeWithGDrive = async (gDriveEnv, key, actionJson) => {
    let action = JSON.parse(actionJson);
    let jsonKey = await decrypt(key, null, DATA_TYPE.KEY, false, false);
    let state = JSON.parse(await decrypt(await getFileContent(gDriveEnv.fileId, jsonKey.token, jsonKey.credentials), key, DATA_TYPE.DATA, false, true));
    let requestTime = new Date();
    let newState = await synchronize(gDriveEnv, state, action, requestTime, key, jsonKey.token, jsonKey.credentials);
    return await getDiff(newState, action, requestTime);
};

export const initializeStore = async (key) => {
    let jsonKey = await decrypt(key, null, DATA_TYPE.KEY, false, false);
    return await initializeGDriveEnvironment(MAIN_FOLDER_NAME, BACKUP_FILE_NAME, MAIN_FILE_NAME + FILE_EXTENSION, async () => {
        let defaultState = {
            people: [],
            moneyCells: [],
            transactions: [],
            articles: []
        };
        return await encrypt(JSON.stringify(defaultState), key, DATA_TYPE.DATA, true, false);
    }, jsonKey.token, jsonKey.credentials);
};

const synchronize = async (gDriveEnv, state, action, requestTime, key, token, credentials) => {
    if (!hasInfoForState(action)) {
        return state;
    }

    let resultState = mergeState(state, action, requestTime);
    let resultStateString = JSON.stringify(resultState);
    let historyFileName = MAIN_FILE_NAME + new Date().toISOString() + FILE_EXTENSION;
    await createFile(gDriveEnv.backupFolderId, historyFileName, await encrypt(resultStateString, key, DATA_TYPE.DATA, true, false), token, credentials);
    await updateFile(gDriveEnv.fileId, await encrypt(resultStateString, key, DATA_TYPE.DATA, true, false), token, credentials);
    return resultState;
};

const getDiff = async (state, action, requestTime) => {
    let diff = {
        systemData: {
            lastSynchronizationTime: requestTime.toISOString()
        }
    };
    await StateBranches.asyncForEach(async branchName => {
        let branchDiff = await getBranchDiff(state[branchName], action.systemData.lastSynchronizationTime);
        if (branchDiff !== undefined) {
            diff[branchName] = branchDiff;
        }
    });
    return diff;
};

const getBranchDiff = async (branch, lastSynchronizationTime) => {
    let branchDiff = {
        add: [],
        edit: [],
        remove: []
    };

    branch.forEach(el => {
        if (el.creationTime > lastSynchronizationTime) {
            if (el.isDeleted) {
                return;
            }

            branchDiff.add.push(el);
            return;
        }

        if (el.lastModificationTime > lastSynchronizationTime) {
            if (el.isDeleted) {
                branchDiff.remove.push(el.id);
                return;
            }

            branchDiff.edit.push(el);
            return;
        }
    });

    let isEmpty = branchDiff.add.length === 0
        && branchDiff.edit.length === 0
        && branchDiff.remove.length === 0;
    return isEmpty
        ? undefined
        : branchDiff;
};

const hasInfoForState = action => {
    if (isNullOrUndefined(action)) {
        return false;
    }

    if (isNullOrUndefined(action.systemData) || isNullOrUndefined(action.systemData.lastSynchronizationTime)) {
        return false;
    }

    return hasAny(action, ['people', 'moneyCells', 'transactions'], e => !isNullOrUndefined(e) && !isNullOrUndefined(e.length) && e.length !== 0);
};

const mergeState = (state, action, requestTime) => {
    let newState = {};
    StateBranches.forEach(branchName => {
        newState[branchName] = mergeCollection(state[branchName], action, branchName, requestTime.toISOString());
    });

    return newState;
};