export const withNullCheck = (object, valueGetter, defaultValue) => {
    if (isNullOrUndefined(object)) {
        return defaultValue || object;
    }

    return valueGetter(object);
};

export const isNullOrUndefined = object => {
    return object === null || object === undefined;
};

export const dateWithNullCheck = (dateString) => withNullCheck(dateString, e => new Date(e));

export const stringWithNullCheck = (string) => withNullCheck(string, e => e, '');

export const hasAny = (object, props, predicate) => {
    if (isNullOrUndefined(predicate)) {
        predicate = obj => !isNullOrUndefined(obj);
    }

    return props.reduce((acc, el) => {
        if (acc) {
            return true;
        }

        return predicate(object[el]);
    }, false);
};