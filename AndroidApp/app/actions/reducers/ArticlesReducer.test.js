import {ActionName} from "../../constants/ActionName";
import {ArticlesReducer} from './ArticlesReducer';
import {Sinchronize} from '../creators/Sinchronize';

let startState = [{
    id: 100,
    name: 'З/п'
}
]

for(let key in ActionName){
    if(key !== 'SINCHRONIZATION'){
        it(`Articles reducer don\'t process action ${ActionName[key]}`, () => {
            expect(ArticlesReducer(startState, {type : ActionName[key]}))
            .toBe(startState);
        });
    }
}

it(`Articles reducer process action ${ActionName.SINCHRONIZATION}`, () => {
    let newArticles = [{
        id: 100,
        name: 'З/п'
    },{
        id: 200,
        name: 'Комуналка'
    }];

    let action = Sinchronize(null, null, null, newArticles, null);
    let newState = ArticlesReducer(startState, action);
    expect(newState).toBe(newArticles);
});