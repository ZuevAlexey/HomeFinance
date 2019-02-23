export const isNullOrUndefined = object => {
    return object === null || object === undefined;
};

export const hasAny = (object, props, predicate) => {
    if(isNullOrUndefined(predicate)){
        predicate = obj => !isNullOrUndefined(obj);
    }

    return props.reduce((acc, el) => {
        if(acc){
            return true;
        }

        return predicate(object[el]);
    }, false);
};