import {debugObject} from "./dialog";

export const GetFullPersonName = person => `${person.lastName} ${person.firstName}`;

export const GetShortPersonName = person => `${person.firstName} ${person.lastName && person.lastName.charAt(0)}`;

export const GetFullMoneyCellName = (owner, moneyCell) => `${moneyCell.Name} (${owner.firstName} ${owner.lastName.charAt(0)})`;

export const getDateDisplayString = (dateTime) => {
    let pad = (num) => {
        let norm = Math.floor(Math.abs(num));
        return (norm < 10 ? '0' : '') + norm;
    };


    debugObject(dateTime);

    return dateTime.getFullYear() +
        '-' + pad(dateTime.getMonth() + 1) +
        '-' + pad(dateTime.getDate()) +
        'T' + pad(dateTime.getHours()) +
        '.' + pad(dateTime.getMinutes()) +
        '.' + pad(dateTime.getSeconds());
};

export const getSummaryDisplayString = (summary) => {
    let sign = summary > 0 ? '+' : '';
    return `${sign}${summary}`;
};