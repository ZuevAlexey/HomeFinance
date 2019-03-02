import {ActionName} from '../../constants/actionName';

export const Aggregate = (actions) => {
    return {
        type : ActionName.AGGREGATE,
        actions
    }
};