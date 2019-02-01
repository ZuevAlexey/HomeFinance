import {getDateISO} from '../helpers/dateTimeHelper';
import Actions from './actions';

let path = require('path');
import {createLogger} from '../helpers/logger';
import {
    saveObjectToFile,
    readObjectFromFile,
    createFolderIfNeed,
    createFileIfNeed,
    getModuleDirectory
} from '../helpers/fsHelpers';
import {reduce} from './reducers/mainReducer';
import StateBranches from './branches';

export const createStore = (storeName) => {
    let dataFolder = path.resolve(getModuleDirectory(), 'data');
    createFolderIfNeed(dataFolder);
    let rootFolder = path.resolve(dataFolder, storeName);
    createFolderIfNeed(rootFolder);
    let historyFolder = path.resolve(dataFolder, storeName, 'history');
    createFolderIfNeed(historyFolder);
    let storeFileName = path.resolve(rootFolder, `state.json`);
    createFileIfNeed(storeFileName, {
        people: [],
        moneyCells: [],
        transactions: [],
        articles: []
    });

    let state = readObjectFromFile(storeFileName);
    let logger = createLogger('storage');
    logger.info(`Проинициализировали хранилище ${JSON.stringify(state)}`)
    return {
        getState: () => {
            return {...state};
        },
        dispatch: (action) => {
            logger.info(`Поступил запрос на диспетчеризацию события ${JSON.stringify(action)}`);
            state = reduce(state, action);
            let historyFileName = path.resolve(historyFolder, `state_${getDateISO()}.json`);
            saveObjectToFile(state, historyFileName);
            saveObjectToFile(state, storeFileName);
            logger.info(`Обработан запрос на диспетчеризацию события. Результирующее состояние cохранили в файл ${historyFileName}`);
        },
        getDiff: (action, reqDateTime) => {
            let diff = {
                type: Actions.SYNC,
                isSuccess: true,
                data: {
                    systemData: {
                        lastSynchronizationTime: reqDateTime
                    }
                }
            };
            StateBranches.forEach(branchName => {
                let branchDiff = getBranchDiff(state[branchName], action.data.systemData.lastSynchronizationTime);
                if(branchDiff !== undefined){
                    diff.data[branchName] = branchDiff;
                }
            });
            return diff;
        }
    };
};

const getBranchDiff = (branch, lastSynchronizationTime) => {
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