import {MoneyCellType} from "../constants/moneyCellType";

export const getAvatar = (moneyCell) => {
    let name;
    switch (moneyCell.moneyCellType){
        case MoneyCellType.CARD:{
            name = 'credit-card';
            break;
        }
        case MoneyCellType.CASH:{
            name = 'cash-100';
            break;
        }
        case MoneyCellType.DEPOSIT:{
            name = 'bank';
        }
    }

    return {
        type: 'material-community',
        name
    };
};