import {ActionName} from "../../constants/ActionName";
import {SystemDataReducer} from './SystemDataReducer';
import {Sinchronize} from '../actions/Sinchronize';
import {AssertUnprocessedActions} from '../../helpers/TestHelper';

let startState = {
    lastSinchronizationTime: new Date(2018, 8, 2, 14, 0)
};

AssertUnprocessedActions([ActionName.SINCHRONIZATION], 'SystemData', SystemDataReducer);

it(`SystemData reducer process action ${ActionName.SINCHRONIZATION}`, () => {
    const lastSinchronizationTime = new Date(2019, 3, 5);

    const action = Sinchronize(null, null, null, null, lastSinchronizationTime);
    const newState = SystemDataReducer(startState, action);
    expect(newState).toEqual({lastSinchronizationTime});
});