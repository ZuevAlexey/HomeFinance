import {ActionName} from "../../constants/ActionName";
import {SystemDataReducer} from './SystemDataReducer';
import {Sinchronize} from '../creators/Sinchronize';

let startState = {
    lastSinchronizationTime: new Date(2018, 8, 2, 14, 0)
};

for(let key in ActionName){
    if(key !== 'SINCHRONIZATION'){
        it(`SystemData reducer don\'t process action ${ActionName[key]}`, () => {
            expect(SystemDataReducer(startState, {type : ActionName[key]}))
            .toBe(startState);
        });
    }
}

it(`SystemData reducer process action ${ActionName.SINCHRONIZATION}`, () => {
    let lastSinchronizationTime = new Date(2019, 3, 5);

    let action = Sinchronize(null, null, null, null, lastSinchronizationTime);
    let newState = SystemDataReducer(startState, action);
    expect(newState).toEqual({lastSinchronizationTime});
});