import {getDateISO} from '../helpers/dateTimeHelper';
import Actions from './actions';

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
        getDiff: (action, reqDateTime) => {
            let diff = {
                type: Actions.SYNC,
                data: {
                    systemData: {
                        lastSynchronizationTime: reqDateTime
                    }
                }
            };
            StateBranches.map(branchName => {
               diff.data[branchName] = state[branchName]
                   .filter(el => el.lastModificationTime > action.data.systemData.lastSynchronizationTime);
            });
            return diff;
        }
    };
};