export const withNullCheck = (object, valueGetter, defaultValue) => {
    if(isNullOrUndefined(object)){
        return defaultValue || object;
    }

    return valueGetter(object);
};

export const isNullOrUndefined = object => {
    return object === null || object === undefined;
};

export const dateWithNullCheck = (dateString) => withNullCheck(dateString, e => new Date(e));

export const stringWithNullCheck = (string) => withNullCheck(string, e => e, '');
