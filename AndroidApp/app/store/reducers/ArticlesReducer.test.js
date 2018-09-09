import {ActionName} from "../../constants/ActionName";
import {ArticlesReducer} from './ArticlesReducer';
import {Sinchronize} from '../actions/Sinchronize';
import {AssertUnprocessedActions} from '../../helpers/TestHelper';

const startState = [
    {
        id: 100,
        name: 'З/п'
    }
];

AssertUnprocessedActions([ActionName.SINCHRONIZATION], 'Articles', ArticlesReducer);

it(`Articles reducer process action ${ActionName.SINCHRONIZATION}`, () => {
    const newArticles = [{
        id: 100,
        name: 'З/п'
    },{
        id: 200,
        name: 'Комуналка'
    }];

    const action = Sinchronize(null, null, null, newArticles, null);
    const newState = ArticlesReducer(startState, action);
    expect(newState).toBe(newArticles);
});