import {ActionName} from "../../constants/actionName";

export const ResetStorage = (dateString) => {
    return {
        type: ActionName.RESET_STORAGE,
        syncDate: dateString && new Date(dateString)
    }
};