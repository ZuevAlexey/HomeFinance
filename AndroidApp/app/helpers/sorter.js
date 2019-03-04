import {GetFullPersonName} from './displayStringHelper';
import {getTransactionTypeByArticle} from "./transactionHelper";

export const peopleComparer = (person1, person2) => stringComparer(GetFullPersonName(person1), GetFullPersonName(person2));

export const getMoneyCellsComparer = (people) => {
    return (cell1, cell2) => {
        let owner1 = people.first(e => e.id === cell1.ownerId);
        let owner2 = people.first(e => e.id === cell2.ownerId);

        let ownerCompareResult = peopleComparer(owner1, owner2);
        if(ownerCompareResult !== 0){
            return ownerCompareResult;
        }

        return stringComparer(cell1.name, cell2.name);
    };
};

export const articleComparer = (article1, article2) => {
    let type1 = getTransactionTypeByArticle(article1.id);
    let type2 = getTransactionTypeByArticle(article2.id);
    let typeComparer = type1 - type2;
    if(typeComparer !== 0){
        return typeComparer;
    }

    return stringComparer(article1.name, article2.name);
};

export const transactionComparer = (tran1, tran2) => {
    let timeSpan = tran1.date - tran2.date;
    if(timeSpan < 0){
        return 1;
    }

    if(timeSpan > 0){
        return -1;
    }

    return 0;
};

const stringComparer = (str1, str2) => {
    if(str1 > str2){
        return 1;
    }

    if(str1 < str2){
        return -1;
    }

    return 0;
};