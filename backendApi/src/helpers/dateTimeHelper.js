export const getDateISO = () => {
    let now = new Date();
    let tzo = - now.getTimezoneOffset();
    let dif = tzo >= 0 ? '+' : '-';
    let pad = (num) => {
        let norm = Math.floor(Math.abs(num));
        return (norm < 10 ? '0' : '') + norm;
    };

    return now.getFullYear() +
        '-' + pad(now.getMonth() + 1) +
        '-' + pad(now.getDate()) +
        'T' + pad(now.getHours()) +
        '.' + pad(now.getMinutes()) +
        '.' + pad(now.getSeconds()) +
        dif + pad(tzo / 60) +
        '.' + pad(tzo % 60);
};
