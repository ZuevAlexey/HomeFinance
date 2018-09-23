let fs = require('fs');
let path = require('path');
import {createFolderIfNeed} from './fsHelpers';

const logDiretoryName = 'logs';
const fullLogDirectoryPath = path.resolve(process.cwd(), logDiretoryName);
createFolderIfNeed(fullLogDirectoryPath);

export const createLogger = (logName) => {
    let fullLogFilePath = path.resolve(fullLogDirectoryPath, `${logName}.log`);
    return {
        info : (message) => {
            fs.appendFileSync(fullLogFilePath, `${new Date().toISOString()}: INFO ${message}\n`, function (err) {
                if (err) throw err;
            });
        }
    };
};