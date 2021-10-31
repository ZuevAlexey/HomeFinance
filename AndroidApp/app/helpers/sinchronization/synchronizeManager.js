import {branches, branches_names} from './branches_names';
import {hasAny, isNullOrUndefined} from "../maybe";
import {createFile, getFileContent, initializeGDriveEnvironment, updateFile} from "./gdrive/gdriveConnector";
import {mergeCollection} from "./reducers/mergeCollection";
import {DATA_TYPE, decrypt, encrypt} from "../coder/coder"
import {CommonConstants} from "../../constants/commonConstants";

const MAIN_FOLDER_NAME = 'HomeFinance';
const BACKUP_FILE_NAME = 'history';
const MAIN_FILE_NAME = 'state';
const FILE_EXTENSION = '.txt';

export const synchronizeWithGDrive = async (gDriveEnv, key, actionJson) => {
    let action = JSON.parse(actionJson);
    let jsonKey = await decrypt(key, null, DATA_TYPE.KEY, false, false);
    let fileContent = await getFileContent(gDriveEnv.fileId, jsonKey.token, jsonKey.credentials);
    let decryptedData = await decrypt(fileContent, key, DATA_TYPE.DATA, false, true);
    let state = JSON.parse(decryptedData);
    let requestTime = new Date();
    let newState = await synchronize(gDriveEnv, state, action, requestTime, key, jsonKey.token, jsonKey.credentials);
    return await getDiff(newState, action, requestTime);
};

export const initializeStore = async (key) => {
    let jsonKey = await decrypt(key, null, DATA_TYPE.KEY, false, false);
    return await initializeGDriveEnvironment(MAIN_FOLDER_NAME, BACKUP_FILE_NAME, MAIN_FILE_NAME + FILE_EXTENSION, async () => {
        let defaultState = {}
        defaultState[branches.PEOPLE_BRANCH_NAME] = [];
        defaultState[branches.MONEY_CELLS_BRANCH_NAME] = [];
        defaultState[branches.TRANSACTIONS_BRANCH_NAME] = [];
        defaultState[branches.ARTICLES_BRANCH_NAME] = [];
        return await encrypt(JSON.stringify(defaultState), key, DATA_TYPE.DATA, true, false);
    }, jsonKey.token, jsonKey.credentials);
};

const synchronize = async (gDriveEnv, state, action, requestTime, key, token, credentials) => {
    if (!hasInfoForState(action)) {
        return state;
    }

    let resultState = mergeState(state, action, requestTime.toISOString());
    let resultStateString = JSON.stringify(resultState);
    let historyFileName = MAIN_FILE_NAME + new Date().toISOString() + FILE_EXTENSION;
    let fileContent = await encrypt(resultStateString, key, DATA_TYPE.DATA, true, false);
    let createFileTask = createFile(gDriveEnv.backupFolderId, historyFileName, fileContent, token, credentials);
    let updateFileTask = updateFile(gDriveEnv.fileId, fileContent, token, credentials);
    await createFileTask;
    await updateFileTask;
    return resultState;
};

const getDiff = async (state, action, requestTime) => {
    let diff = {
        systemData: {
            lastSynchronizationTime: requestTime.toISOString()
        }
    };
    await branches_names.asyncForEach(async branchName => {
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

    return hasAny(action, [branches.PEOPLE_BRANCH_NAME, branches.MONEY_CELLS_BRANCH_NAME, branches.TRANSACTIONS_BRANCH_NAME], e => !isNullOrUndefined(e) && !isNullOrUndefined(e.length) && e.length !== 0);
};

const mergeState = (state, action, requestTime) => {
    let newState = {};
    branches_names.forEach(branchName => {
        newState[branchName] = mergeCollection(state, action, branchName, requestTime);
    });

    recalculateMoneyCellsAmount(newState, action, requestTime);

    return newState;
};

const recalculateMoneyCellsAmount = (newState, action, requestTime) => {
    let moneyCellsToRecalculate = {}
    let newAmount = {amount: 0}
    action[branches.TRANSACTIONS_BRANCH_NAME].forEach(transaction => {
        moneyCellsToRecalculate[transaction.fromId] = {...newAmount};
        moneyCellsToRecalculate[transaction.toId] = {...newAmount};
    })

    action[branches.MONEY_CELLS_BRANCH_NAME].forEach(moneyCell => {
        moneyCellsToRecalculate[moneyCell.id] = {...newAmount};
    })

    delete moneyCellsToRecalculate[CommonConstants.OUTSIDE_MONEY_CELL_ID];

    newState[branches.TRANSACTIONS_BRANCH_NAME].forEach(transaction => {
        if (transaction.isDeleted) {
            return;
        }

        let fromMoneyCell = moneyCellsToRecalculate[transaction.fromId];
        if (fromMoneyCell) {
            fromMoneyCell.amount -= transaction.amount;
        }

        let toMoneyCell = moneyCellsToRecalculate[transaction.toId];
        if (toMoneyCell) {
            toMoneyCell.amount += transaction.amount;
        }
    })

    newState[branches.MONEY_CELLS_BRANCH_NAME].forEach(moneyCell => {
        let newAmount = moneyCellsToRecalculate[moneyCell.id];
        if(newAmount) {
            moneyCell.amount = newAmount.amount;
            moneyCell.lastModificationTime = requestTime;
        }
    });
}