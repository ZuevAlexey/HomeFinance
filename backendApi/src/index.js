import express from 'express';
import routing from '../route.config';
import {createStore} from './data/createStore';

const app = express();
app.listen(routing.port);
app.use(express.json());

var store = createStore('HomeFinanceStore');

app.get(routing.api.getState, (req, res) => {
    res.json(store.getState());
});

app.get(routing.api.test, (req, res) => {
    res.json({isSuccess: true});
});

app.post(routing.api.action, (req, res) => {
    let action = req.body;
    store.dispatch(action);
    res.json(store.getDiff(action));
});

console.log(`web server is running on port ${routing.port}`);