import * as tcomb from 'tcomb-form-native';
import {isNullOrUndefined} from "./maybe";

export const getEnumsFromList = (objects, valueFactory, displayValueFactory, name, defaultValue, sortFunc) => {
    let result = {};
    if(!isNullOrUndefined(defaultValue)){
        result[defaultValue.key]=defaultValue.value;
    }

    let sortedObjects = isNullOrUndefined(sortFunc)
        ? objects
        : objects.sort(sortFunc);
    let enumObject = sortedObjects.reduce((acc, cur) => {
        acc[valueFactory(cur)] = displayValueFactory(cur);
        return acc;
    }, result);

    return tcomb.enums(enumObject, name)
};

export const getEnumsFromObject = (object, name, defaultValue) => getEnumsFromList(Object.keys(object), key => object[key], key => object[key], name, defaultValue);