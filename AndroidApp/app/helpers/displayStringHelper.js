export const GetFullPersonName = person => `${person.lastName} ${person.firstName}`;

export const GetFullMoneyCellName = (owner, moneyCell) =>  `${moneyCell.Name} (${person.firstName})`;

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