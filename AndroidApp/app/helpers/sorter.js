import {GetFullPersonName} from "./displayStringHelper";

export const peopleSorter = (person1, person2) => {
    let fio1 = GetFullPersonName(person1);
    let fio2 = GetFullPersonName(person2);

    if(fio1 > fio2){
        return 1;
    }

    if(fio1 < fio2){
        return -1;
    }

    return 0;
};