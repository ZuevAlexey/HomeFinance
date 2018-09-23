let path = require('path');
import {createLogger} from '../helpers/logger';
import {saveObjectToFile, readObjectFromFile, createFolderIfNeed, createFileIfNeed} from '../helpers/fsHelpers';
import {reduce} from './reducers/mainReducer';
import StateBranches from './branches';

export const createStore = (storeName) => {
    let dataFolder = path.resolve(process.cwd(), 'data');
    createFolderIfNeed(dataFolder);
    let rootFolder = path.resolve(dataFolder, storeName);
    createFolderIfNeed(rootFolder);
    let historyFolder = path.resolve(dataFolder, storeName, 'history');
    createFolderIfNeed(historyFolder);
    let storeFileName = path.resolve(rootFolder, `state.json`);
    createFileIfNeed(storeFileName, {});

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
        getDiff: (action) => {
            let diff = {type: action.type};
            StateBranches.map(branchName => {
               diff[branchName] = state[branchName].filter(el => el.lastModificationTime > action.data.systemData.lastSinchronizationTime);
            });
            return diff;
        }
    };
};

const getDateISO = () => {
    let now = new Date();
    let tzo = - now.getTimezoneOffset();
    let dif = tzo >= 0 ? '+' : '-';
    let pad = (num) => {
        let norm = Math.floor(Math.abs(num));
        return (norm < 10 ? '0' : '') + norm;
    };

    return now.getFullYear() +
        '-' + pad(now.getMonth() + 1) +
        '-' + pad(now.getDate()) +
        'T' + pad(now.getHours()) +
        '.' + pad(now.getMinutes()) +
        '.' + pad(now.getSeconds()) +
        dif + pad(tzo / 60) +
        '.' + pad(tzo % 60);
};

