import express from 'express';
import routing from '../route.config';
import {createStore} from './data/createStore';
import {createLogger} from './helpers/logger';
import {safetyCall} from './helpers/safety';
import * as Actions from "./data/actions";

const app = express();
app.listen(routing.port);
app.use(express.json());

var appLog = createLogger('app');
var store = createStore('HomeFinanceStore');

app.get(routing.api.getState, (req, res) => {
    safetyCall(req, res, (request, response) => {
        response.json(store.getState());
    }, {isSuccess: false}, appLog);
});

app.get(routing.api.test, (req, res) => {
    safetyCall(req, res, (request, response) => {
        response.json({isSuccess: true});
    }, {isSuccess: false}, appLog);
});

app.post(routing.api.action, (req, res) => {
    safetyCall(req, res, (request, response) => {
        let requestTime = new Date();
        let action = req.body;
        store.dispatch(action, requestTime);
        response.json(store.getDiff(action, requestTime));
    }, {
        type: Actions.SYNC,
        isSuccess: false
    },
    appLog);
});

let message = `web server is running on port ${routing.port}`;
console.log(message);
appLog.info(message);