import {ActionName} from "../../constants/actionName";
import {ArticlesReducer} from './articlesReducer';
import {Synchronize} from '../actions/synchronize';
import {AssertUnprocessedActions} from '../../helpers/testHelper';

const startState = [
    {
        id: 100,
        name: 'З/п'
    }
];

AssertUnprocessedActions([ActionName.SYNCHRONIZATION], 'Articles', ArticlesReducer);

it(`Articles reducer process action ${ActionName.SYNCHRONIZATION}`, () => {
    const newArticles = [{
        id: 100,
        name: 'З/п'
    },{
        id: 200,
        name: 'Комуналка'
    }];

    const action = Synchronize(null, null, null, newArticles, null);
    const newState = ArticlesReducer(startState, action);
    expect(newState).toBe(newArticles);
});