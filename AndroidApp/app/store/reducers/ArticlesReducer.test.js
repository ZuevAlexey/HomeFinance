import {ActionName} from "../../constants/actionName";
import {ArticlesReducer} from './articlesReducer';
import {AssertUnprocessedActions} from '../../helpers/testHelper';
import {AddArticles} from '../actions/addArticles';
import {RemoveArticles} from '../actions/removeArticles';
import {EditArticle} from '../actions/editArticle';

const workPay = {
    id: 100,
    name: 'З/п'
};
const depositIncome = {
    id: 101,
    name: '% с вкладов'
};
const flatCost = {
    id: 200,
    name: 'квартплата'
};

const healCost = {
    id: 201,
    name: 'лечение'
};

const startState = [workPay, depositIncome, flatCost, healCost];

AssertUnprocessedActions([ActionName.ADD_ARTICLES, ActionName.REMOVE_ARTICLES, ActionName.EDIT_ARTICLE], 'Articles', ArticlesReducer);

it(`Articles reducer process action ${ActionName.ADD_ARTICLES}`, () => {
    const additionalPay = {
        id: 102,
        name: 'Дополнительный доход'
    };

    const propertyTaxes = {
        id: 202,
        name: 'Налоги на имущество'
    };

    const action = AddArticles([additionalPay, propertyTaxes]);
    expect(ArticlesReducer(startState, action))
        .toEqual([...startState, additionalPay, propertyTaxes]);
});

it(`Articles reducer process action ${ActionName.EDIT_ARTICLE}`, () => {
    const id = 100;
    const name = 'Заработная плата';

    const action = EditArticle(id, name);
    expect(ArticlesReducer(startState, action))
        .toEqual([{id, name}, depositIncome, flatCost, healCost]);
});

it(`Articles reducer don't process action ${ActionName.EDIT_ARTICLE}`, () => {
    const id = 150;
    const name = 'Заработная плата';

    const action = EditArticle(id, name);
    expect(ArticlesReducer(startState, action))
        .toEqual(startState);
});


it(`Articles reducer process action ${ActionName.REMOVE_ARTICLES}`, () => {
    let action = RemoveArticles([100,200]);
    expect(ArticlesReducer(startState, action))
        .toEqual([depositIncome, healCost]);
});

it(`MoneyCells reducer don\'t process action ${ActionName.REMOVE_ARTICLES}`, () => {
    expect(ArticlesReducer(startState, RemoveArticles([302])))
        .toEqual(startState);
});