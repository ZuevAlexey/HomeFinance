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
