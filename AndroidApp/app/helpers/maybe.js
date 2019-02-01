export const withNullCheck = (object, valueGetter, defaultValue) => {
    if(isNullOrUndefined(object)){
        return defaultValue;
    }

    return valueGetter(object);
};

export const isNullOrUndefined = object => {
    return object === null || object === undefined;
};