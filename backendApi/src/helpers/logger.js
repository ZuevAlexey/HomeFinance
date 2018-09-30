import {getDateISO} from "./dateTimeHelper";

let fs = require('fs');
let path = require('path');
import {createFolderIfNeed, getModuleDirectory} from './fsHelpers';

const logDiretoryName = 'logs';
const fullLogDirectoryPath = path.resolve(getModuleDirectory(), logDiretoryName);
createFolderIfNeed(fullLogDirectoryPath);

export const createLogger = (logName) => {
    let fullLogFilePath = path.resolve(fullLogDirectoryPath, `${logName}.log`);
    return {
        info : (message) => {
            writeToLog(fullLogFilePath, message, 'INFO');
        },
        error : (message) => {
            writeToLog(fullLogFilePath, message, 'ERROR');
        }
    };
};

const writeToLog = (logFile, message, level) => {
    fs.appendFileSync(logFile, `${getDateISO()}: ${level} ${message}\r\n`, function (err) {
        if (err) throw err;
    });
};