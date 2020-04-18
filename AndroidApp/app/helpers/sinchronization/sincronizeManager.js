import StateBranches from './branches';
import {hasAny, isNullOrUndefined} from "../maybe";
import {initializeGDriveEnvironment, updateFile, createFile, getFileContent} from "./gdrive/gdriveConnector";
import {debugObjectAsync} from "../dialog";
import {mergeCollection} from "./reducers/mergeCollection";

const MAIN_FOLDER_NAME = 'HomeFinance';
const BACKUP_FILE_NAME = 'history';
const MAIN_FILE_NAME = 'state';
const FILE_EXTENSION = '.txt';


export const synchornizeWithGDrive = async (actionJson) => {
    let env = await initializeStore();
    let action = JSON.parse(actionJson);
    let state = JSON.parse(await getFileContent(env.fileId));
    let requestTime = new Date();
    let newState = await synchronize(env, state, action, requestTime);
    let newVar = await getDiff(newState, action, requestTime);
    return newVar;
};

export const initializeStore = async () => {
    return await initializeGDriveEnvironment(MAIN_FOLDER_NAME, BACKUP_FILE_NAME, MAIN_FILE_NAME + FILE_EXTENSION, () => {
        let defaultState = {
            people: [],
            moneyCells: [],
            transactions: [],
            articles: []
        };
        return JSON.stringify(defaultState);
    });
};

const synchronize = async (gdriveEnv, state, action, requestTime) => {
    if (!hasInfoForState(action)) {
        return state;
    }

    let resultState = mergeState(state, action, requestTime);
    let resultStateString = JSON.stringify(resultState);
    let historyFileName = MAIN_FILE_NAME + new Date().toISOString() + FILE_EXTENSION;
    await createFile(gdriveEnv.backupFolderId, historyFileName, resultStateString);
    await updateFile(gdriveEnv.fileId, resultStateString);
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