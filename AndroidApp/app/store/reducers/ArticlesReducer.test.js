import {ActionName} from "../../constants/actionName";
import {ArticlesReducer} from './articlesReducer';
import {AssertUnprocessedActions} from '../../helpers/testHelper';

const startState = [
    {
        id: 100,
        name: 'З/п'
    }
];

AssertUnprocessedActions([ActionName.ADD_ARTICLE, ActionName.REMOVE_ARTICLE, ActionName.EDIT_ARTICLE], 'Articles', ArticlesReducer);