import express from 'express';
import routing from '../route.config';
import {createStore} from './data/createStore';
import {createLogger} from './helpers/logger';
import * as Actions from "./data/actions";

const app = express();
app.listen(routing.port);
app.use(express.json());

var appLog = createLogger('app');
var store = createStore('HomeFinanceStore');

app.get(routing.api.getState, (req, res) => {
    safetyCall(req, res, (request, response) => {
        response.json(store.getState());
    }, {isSuccess: false});
});

app.get(routing.api.test, (req, res) => {
    safetyCall(req, res, (request, response) => {
        response.json({isSuccess: true});
    }, {isSuccess: false});
});

app.post(routing.api.action, (req, res) => {
    safetyCall(req, res, (request, response) => {
        let reqDateTime = new Date();
        let action = req.body;
        store.dispatch(action);
        response.json(store.getDiff(action, reqDateTime));
    }, {
        type: Actions.SYNC,
        isSuccess: false
    });
});

const safetyCall = (req, res, action, defaultValue) => {
  try {
      action(req, res);
  } catch (error){
      appLog.error(`request = ${req} ; error = ${error}; stack = ${error.stack}`);
      res.json(defaultValue);
  }
};

let message = `web server is running on port ${routing.port}`;
console.log(message);
appLog.info(message);