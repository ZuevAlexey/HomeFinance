import {GetFullPersonName} from "./displayStringHelper";

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

const stringComparer = (str1, str2) => {
    if(str1 > str2){
        return 1;
    }

    if(str1 < str2){
        return -1;
    }

    return 0;
};