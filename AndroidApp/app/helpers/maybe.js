export const withNullCheck = (object, valueGetter, defaultValue) => {
    if(isNullOrUndefined(object)){
        return defaultValue || object;
    }

    return valueGetter(object);
};

export const isNullOrUndefined = object => {
    return object === null || object === undefined;
};

export const DateWithNullCheck = (dateString) => withNullCheck(dateString, e => new Date(e));
