import {ActionName} from "../../constants/actionName";

export const Synchronize = (data) => {
    return {
        type : ActionName.SYNCHRONIZATION,
        data
    }
};