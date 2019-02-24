import {ActionName} from '../constants/actionName';

export const AssertUnprocessedActions = (processedActions, reducerName, reducer) => {
    const startState = {};
    Object.values(ActionName).forEach(action => {
            if(!processedActions.includes(action)){
                it(`${reducerName} reducer don\'t process action ${action}`, () => {
                    expect(reducer(startState, {type : action})).toBe(startState);
                });
            }
        }
    );
};