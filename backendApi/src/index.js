import express from 'express';
import routing from '../route.config';
import {createStore} from './data/createStore';
import {createLogger} from './helpers/logger';

const app = express();
app.listen(routing.port);
app.use(express.json());

var appLog = createLogger('app');
var store = createStore('HomeFinanceStore');

app.get(routing.api.getState, (req, res) => {
    safetyCall(req, res, (request, response) => {
        response.json(store.getState());
    });
});

app.get(routing.api.test, (req, res) => {
    safetyCall(req, res, (request, response) => {
        response.json({isSuccess: true});
    });
});

app.post(routing.api.action, (req, res) => {
    safetyCall(req, res, (request, response) => {
        let reqDateTime = new Date();
        let action = req.body;
        store.dispatch(action);
        response.json(store.getDiff(action, reqDateTime));
    });
});

const safetyCall = (req, res, action) => {
  try {
      action(req, res);
  } catch (error){
      appLog.error(`request = ${req} ; error = ${error}`)
      res.json({
          isSuccess: false,
          systemData : {}
      });
  }
};

let message = `web server is running on port ${routing.port}`;
console.log(message);
appLog.info(message);