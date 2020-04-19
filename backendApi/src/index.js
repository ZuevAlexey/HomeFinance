import express from 'express';
import routing from '../route.config';
import {createLogger} from './helpers/logger';
import {safetyCall} from './helpers/safety';
import {DATA_TYPE, decrypt, encrypt} from "./helpers/coder/coder";
import {
    getFileContent,
    initializeGDriveEnvironment
} from "./helpers/gdriveConnector";

const MAIN_FOLDER_NAME = 'HomeFinance';
const BACKUP_FILE_NAME = 'history';
const MAIN_FILE_NAME = 'state';
const FILE_EXTENSION = '.txt';

const app = express();
app.listen(routing.port);
app.use(express.json({limit: '50mb', extended: true}));

let appLog = createLogger('app');

app.post(routing.api.getState, async (req, res) => {
    await safetyCall(req, res, async (request, response) => {
        let jsonKey = await decrypt(request.body.key, null, DATA_TYPE.KEY, false, false);
        let gDriveEnv = await initializeGDriveEnvironment(MAIN_FOLDER_NAME, BACKUP_FILE_NAME, MAIN_FILE_NAME + FILE_EXTENSION, async () => {
            let defaultState = {
                people: [],
                moneyCells: [],
                transactions: [],
                articles: []
            };
            return await encrypt(JSON.stringify(defaultState), key, DATA_TYPE.DATA, true, false);
        }, jsonKey.token, jsonKey.credentials);

        let state = JSON.parse(await decrypt(await getFileContent(gDriveEnv.fileId, jsonKey.token, jsonKey.credentials), request.body.key, DATA_TYPE.DATA, false, true));
        await response.send(state);
    }, {isSuccess: false}, appLog);
});

app.post(routing.api.encode, async (req, res) => {
    await safetyCall(req, res, async (request, response) => {
        let parameters = await request.body;
        let dataForEncrypt = parameters.data instanceof String ? parameters.data : JSON.stringify(parameters.data);
        let result = await encrypt(dataForEncrypt, parameters.key, parameters.dataType, parameters.compressBeforeEncrypt, parameters.compressAfterEcnrypt);
        await response.send(result);
    }, {isSuccess: false}, appLog);
});

app.post(routing.api.decode, async (req, res) => {
    await safetyCall(req, res, async (request, response) => {
        let parameters = await request.body;
        let result = await decrypt(parameters.data, parameters.key, parameters.dataType, parameters.compressBeforeDecrypt, parameters.compressAfterDecrypt);
        await response.send(result);
    }, {isSuccess: false}, appLog);
});

app.get(routing.api.test, async (req, res) => {
    await safetyCall(req, res, async (request, response) => {
        await response.json({isSuccess: true});
    }, {isSuccess: false}, appLog);
});

let message = `web server is running on port ${routing.port}`;
console.log(message);
appLog.info(message);