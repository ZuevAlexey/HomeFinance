import ActionName from "../../constants/ActionName";
import PersonReducer from './PersonReducer';

export default PeopleReducer = (state, action) => {
    switch(action.type){
        case ActionName.EDIT_PERSON:
            return state.map(e => PersonReducer(e));
        default:
            return state;
    }
}