import {ActionName} from "../../constants/actionName";
import {ArticleReducer} from './articleReducer';
import {AssertUnprocessedActions} from '../../helpers/testHelper';
import {EditArticle} from '../actions/editArticle';

const startState = {
    id: 100,
    name: 'З/п'
};

AssertUnprocessedActions([ActionName.EDIT_ARTICLE], 'Article', ArticleReducer);

it(`Articles reducer process action ${ActionName.EDIT_ARTICLE}`, () => {
    const id = 100;
    const name = 'Заработная плата';

    const action = EditArticle(id, name);
    expect(ArticleReducer(startState, action))
        .toEqual({id, name});
});

it(`Articles reducer don't process action ${ActionName.EDIT_ARTICLE}`, () => {
    const id = 150;
    const name = 'Заработная плата';

    const action = EditArticle(id, name);
    expect(ArticleReducer(startState, action))
        .toEqual(startState);
});