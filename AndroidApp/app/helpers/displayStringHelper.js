import {isNullOrUndefined, stringWithNullCheck, withNullCheck} from './maybe';

export const GetFullPersonName = person => `${stringWithNullCheck(person.lastName)} ${stringWithNullCheck(person.firstName)}`;

export const GetShortPersonName = person => `${stringWithNullCheck(person.firstName)}${withNullCheck(person.lastName, p => ' ' + p.charAt(0) + '.', '')}`;

export const GetFullMoneyCellName = (owner, moneyCell) => {
    let result = moneyCell.name;
    if(!isNullOrUndefined(owner)) {
        result += ` (${GetShortPersonName(owner)})`;
    }

    return result;
};

export const getDateTimeDisplayString = (dateTime) => {
    return getDateDisplayString(dateTime) +
        'T' + pad(dateTime.getHours()) +
        '.' + pad(dateTime.getMinutes()) +
        '.' + pad(dateTime.getSeconds());
};

export const getDateDisplayString = (dateTime) => {
    return dateTime.getFullYear() +
        '-' + pad(dateTime.getMonth() + 1) +
        '-' + pad(dateTime.getDate());
};

export const getSummaryDisplayString = (summary) => {
    let sign = summary > 0 ? '+' : '';
    return `${sign}${summary}`;
};

export const WithCheckLength = (str, maxLength, substitute = '...') => {
    if(str.length > maxLength){
        return `${str.substring(0, maxLength - 3)}${substitute}`;
    }

    return str;
};

const pad = (num) => {
    let norm = Math.floor(Math.abs(num));
    return (norm < 10 ? '0' : '') + norm;
};