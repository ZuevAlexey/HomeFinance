import {ActionName} from '../../constants/actionName';
import {ArticlesReducer} from './articlesReducer';
import {AssertUnprocessedActions} from '../../helpers/testHelper';

AssertUnprocessedActions([ActionName.SYNCHRONIZATION, ActionName.RESET_STORAGE], 'Articles', ArticlesReducer);