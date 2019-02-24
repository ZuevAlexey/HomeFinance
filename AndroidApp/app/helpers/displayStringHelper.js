import {stringWithNullCheck, withNullCheck} from "./maybe";

export const GetFullPersonName = person => `${stringWithNullCheck(person.lastName)} ${stringWithNullCheck(person.firstName)}`;

export const GetShortPersonName = person => `${stringWithNullCheck(person.firstName)}${withNullCheck(person.lastName, p => ' ' + p.charAt(0) + '.', '')}`;

export const GetFullMoneyCellName = (owner, moneyCell) => `${moneyCell.Name} (${GetShortPersonName(owner)})`;

export const getDateDisplayString = (dateTime) => {
    let pad = (num) => {
        let norm = Math.floor(Math.abs(num));
        return (norm < 10 ? '0' : '') + norm;
    };


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